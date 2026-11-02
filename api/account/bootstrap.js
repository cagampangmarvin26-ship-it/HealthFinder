import { db } from 'hatchable';
export const access='user';
export const methods=['POST'];
export default async function(req,res){
 const email=String(req.user.email||'').trim().toLowerCase();
 if(!email)return res.status(400).json({error:'Account email is unavailable.'});
 const {rows:existing}=await db.query('SELECT role,facility_id FROM app_user_roles WHERE lower(email)=$1 LIMIT 1',[email]);
 if(existing.length){
  const r=existing[0];
  if(r.role==='SUPER_ADMIN')return res.json({ok:true,role:r.role,redirect:'/admin'});
  if(r.role==='FACILITY_ADMIN')return res.json({ok:true,role:r.role,redirect:'/facility-admin'});
 }
 const {rows:superInvite}=await db.query('SELECT email FROM super_admin_invites WHERE email=$1',[email]);
 if(superInvite.length){
  await db.query('INSERT INTO app_user_roles(user_id,email,role) VALUES($1,$2,$3)',[String(req.user.id),email,'SUPER_ADMIN']);
  await db.query('DELETE FROM super_admin_invites WHERE email=$1',[email]);
  await db.query('INSERT INTO audit_logs(actor_user_id,actor_email,action,entity_type,details) VALUES($1,$2,$3,$4,$5::jsonb)',[String(req.user.id),email,'SUPER_ADMIN_BOOTSTRAPPED','USER_ROLE',JSON.stringify({role:'SUPER_ADMIN'})]);
  return res.json({ok:true,role:'SUPER_ADMIN',redirect:'/admin'});
 }
 const {rows:invite}=await db.query('SELECT facility_id,display_name FROM facility_admin_invites WHERE lower(email)= $1 AND is_active=true LIMIT 1',[email]);
 if(!invite.length)return res.status(403).json({error:'This email has no active Health Finder admin invitation.'});
 await db.query('INSERT INTO app_user_roles(user_id,email,role,facility_id) VALUES($1,$2,$3,$4)',[String(req.user.id),email,'FACILITY_ADMIN',invite[0].facility_id]);
 await db.query('INSERT INTO audit_logs(actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES($1,$2,$3,$4,$5,$6::jsonb)',[String(req.user.id),email,'FACILITY_ADMIN_ACTIVATED','HEALTHCARE_FACILITY',invite[0].facility_id,JSON.stringify({display_name:invite[0].display_name})]);
 return res.json({ok:true,role:'FACILITY_ADMIN',facility_id:invite[0].facility_id,redirect:'/facility-admin'});
}