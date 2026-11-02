import { db } from 'hatchable';
export const access='user';
export const methods=['GET','PUT'];
async function isSuper(user){const {rows}=await db.query("SELECT role,is_active FROM app_user_roles WHERE user_id=$1 AND lower(email)=lower($2) LIMIT 1",[String(user.id),user.email]);return rows.length&&rows[0].is_active&&rows[0].role==='SUPER_ADMIN'}
export default async function(req,res){
 const user=req.user;if(!await isSuper(user))return res.status(403).json({error:'Super Admin access required.'});
 if(req.method==='GET'){
  const {rows}=await db.query("SELECT s.id,s.facility_id,f.name AS facility_name,s.submitted_by,u.email AS submitter_email,s.submission_type,s.payload,s.status,s.review_note,s.created_at FROM facility_update_submissions s JOIN healthcare_facilities f ON f.id=s.facility_id LEFT JOIN users u ON u.id=s.submitted_by WHERE s.status='PENDING' ORDER BY s.created_at ASC");
  const {rows:history}=await db.query("SELECT id,actor_email,action,entity_type,entity_id,details,created_at FROM audit_logs ORDER BY created_at DESC LIMIT 100");
  return res.json({pending:rows,history});
 }
 const id=Number(req.body?.id);const decision=String(req.body?.decision||'').toUpperCase();const note=String(req.body?.review_note||'').trim();
 if(!Number.isSafeInteger(id)||id<1||!['APPROVE','REJECT'].includes(decision))return res.status(400).json({error:'A valid request and decision are required.'});
 if(decision==='REJECT'&&!note)return res.status(400).json({error:'Please provide a reason when rejecting a request.'});
 const {rows}=await db.query("SELECT id,facility_id,submitted_by,payload,status FROM facility_update_submissions WHERE id=$1 LIMIT 1",[id]);
 if(!rows.length)return res.status(404).json({error:'Submission not found.'});
 const s=rows[0];if(s.status!=='PENDING')return res.status(409).json({error:'This request has already been reviewed.'});
 if(decision==='APPROVE'){
  const p=s.payload||{};
  const {rows:current}=await db.query('SELECT facility_id FROM facility_profiles WHERE facility_id=$1',[s.facility_id]);
  if(current.length){
   const keys=['doctors','healthcare_services','medicines','availability','operating_hours','free_services'];
   const sets=[];const vals=[s.facility_id];let n=2;
   for(const k of keys)if(Object.prototype.hasOwnProperty.call(p,k)){sets.push(k+'=$'+n+'::jsonb');vals.push(JSON.stringify(p[k]));n++}
   if(sets.length)await db.query('UPDATE facility_profiles SET '+sets.join(',')+',updated_at=now(),updated_by=$'+n+' WHERE facility_id=$1',[...vals,String(user.id)]);
  }else{
   await db.query('INSERT INTO facility_profiles(facility_id,doctors,healthcare_services,medicines,availability,operating_hours,free_services,updated_by) VALUES($1,$2::jsonb,$3::jsonb,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8)',[s.facility_id,JSON.stringify(p.doctors||[]),JSON.stringify(p.healthcare_services||[]),JSON.stringify(p.medicines||[]),JSON.stringify(p.availability||{}),JSON.stringify(p.operating_hours||{}),JSON.stringify(p.free_services||[]),String(user.id)]);
  }
  await db.query("UPDATE healthcare_facilities SET verification_status='VERIFIED',last_verified_at=now(),updated_at=now() WHERE id=$1",[s.facility_id]);
 }
 await db.query('UPDATE facility_update_submissions SET status=$1,review_note=$2,reviewed_by=$3,reviewed_at=now(),updated_at=now() WHERE id=$4',[decision==='APPROVE'?'APPROVED':'REJECTED',note||null,String(user.id),id]);
 await db.query('INSERT INTO audit_logs(actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES($1,$2,$3,$4,$5,$6::jsonb)',[String(user.id),user.email,decision==='APPROVE'?'FACILITY_UPDATE_APPROVED':'FACILITY_UPDATE_REJECTED','HEALTHCARE_FACILITY',s.facility_id,JSON.stringify({submission_id:id,review_note:note})]);
 return res.json({ok:true,status:decision==='APPROVE'?'APPROVED':'REJECTED'});
}