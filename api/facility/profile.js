import { db } from 'hatchable';
export const access = 'user';
export const methods = ['GET','POST'];
async function assigned(user) {
 const {rows}=await db.query("SELECT r.role,r.facility_id,r.is_active,f.name AS facility_name FROM app_user_roles r JOIN healthcare_facilities f ON f.id=r.facility_id WHERE r.user_id=$1 AND lower(r.email)=lower($2) LIMIT 1",[String(user.id),user.email]);
 return rows.length&&rows[0].is_active&&rows[0].role==='FACILITY_ADMIN'?rows[0]:null;
}
export default async function(req,res) {
 const user=req.user; const role=await assigned(user);
 if(!role) return res.status(403).json({error:'Facility Admin access required.'});
 if(req.method==='GET') {
  const [{rows:p},{rows:s}]=await Promise.all([
   db.query('SELECT doctors,healthcare_services,medicines,availability,operating_hours,free_services,updated_at FROM facility_profiles WHERE facility_id=$1',[role.facility_id]),
   db.query('SELECT id,submission_type,payload,status,review_note,created_at,reviewed_at FROM facility_update_submissions WHERE facility_id=$1 ORDER BY created_at DESC LIMIT 50',[role.facility_id])
  ]);
  return res.json({facility:{id:role.facility_id,name:role.facility_name},approved:p[0]||{doctors:[],healthcare_services:[],medicines:[],availability:{},operating_hours:{},free_services:[]},history:s});
 }
 const b=req.body||{};
 const allowed=['doctors','healthcare_services','medicines','availability','operating_hours','free_services'];
 const payload={};
 for(const key of allowed) if(Object.prototype.hasOwnProperty.call(b,key)) payload[key]=b[key];
 if(!Object.keys(payload).length) return res.status(400).json({error:'No profile changes were supplied.'});
 for(const key of ['doctors','healthcare_services','medicines','free_services']) if(payload[key]!==undefined&&!Array.isArray(payload[key])) return res.status(400).json({error:key+' must be a list.'});
 for(const key of ['availability','operating_hours']) if(payload[key]!==undefined&&(typeof payload[key]!=='object'||payload[key]===null||Array.isArray(payload[key]))) return res.status(400).json({error:key+' must be an object.'});
 const {rows}=await db.query("INSERT INTO facility_update_submissions(facility_id,submitted_by,submission_type,payload,status) VALUES($1,$2,'PROFILE_UPDATE',$3::jsonb,'PENDING') RETURNING id,status,created_at",[role.facility_id,String(user.id),JSON.stringify(payload)]);
 await db.query('INSERT INTO audit_logs(actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES($1,$2,$3,$4,$5,$6::jsonb)',[String(user.id),user.email,'FACILITY_UPDATE_SUBMITTED','HEALTHCARE_FACILITY',role.facility_id,JSON.stringify({submission_id:rows[0].id,sections:Object.keys(payload)})]);
 return res.status(201).json({submission:rows[0],message:'Your changes are pending Super Admin review. The public profile has not changed.'});
}