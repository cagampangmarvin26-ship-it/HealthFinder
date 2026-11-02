import { db } from 'hatchable';
export const access = 'user';
export const methods = ['GET','POST'];
async function superAdmin(user) {
 const {rows}=await db.query("SELECT role,is_active FROM app_user_roles WHERE user_id=$1 AND lower(email)=lower($2) LIMIT 1",[String(user.id),user.email]);
 return rows.length && rows[0].is_active && rows[0].role==='SUPER_ADMIN';
}
export default async function(req,res) {
 const user=req.user;
 if(!await superAdmin(user)) return res.status(403).json({error:'Super Admin access required.'});
 if(req.method==='GET') {
  const {rows}=await db.query("SELECT i.email,i.display_name,i.facility_id,f.name AS facility_name,i.is_active,i.created_at,r.user_id,r.role FROM facility_admin_invites i JOIN healthcare_facilities f ON f.id=i.facility_id LEFT JOIN app_user_roles r ON lower(r.email)=lower(i.email) ORDER BY f.name,i.display_name");
  return res.json({accounts:rows});
 }
 const b=req.body||{};
 const email=String(b.email||'').trim().toLowerCase();
 const displayName=String(b.display_name||'').trim();
 const facilityId=Number(b.facility_id);
 if(!email.includes('@')||!email.split('@')[1]?.includes('.')||email.includes(' ')) return res.status(400).json({error:'Enter a valid email address.'});
 if(!displayName||!Number.isSafeInteger(facilityId)||facilityId<1) return res.status(400).json({error:'Display name and facility are required.'});
 const {rows:fac}=await db.query('SELECT id FROM healthcare_facilities WHERE id=$1 AND is_archived=false',[facilityId]);
 if(!fac.length) return res.status(404).json({error:'Facility not found.'});
 const {rows:existing}=await db.query('SELECT role FROM app_user_roles WHERE lower(email)=lower($1)',[email]);
 if(existing.length) return res.status(409).json({error:'This email already has an assigned account.'});
 await db.query('INSERT INTO facility_admin_invites(email,facility_id,display_name,created_by) VALUES($1,$2,$3,$4)',[email,facilityId,displayName,String(user.id)]);
 await db.query('INSERT INTO invited_users(email) VALUES($1) ON CONFLICT DO NOTHING',[email]);
 await db.query('INSERT INTO audit_logs(actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES($1,$2,$3,$4,$5,$6::jsonb)',[String(user.id),user.email,'FACILITY_ADMIN_INVITED','FACILITY_ADMIN',facilityId,JSON.stringify({email,display_name:displayName})]);
 return res.status(201).json({ok:true,email,display_name:displayName,facility_id:facilityId,note:'The invite is created. The person must be able to receive the email verification code at this address.'});
}