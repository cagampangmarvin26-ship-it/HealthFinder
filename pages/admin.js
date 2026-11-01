import { db } from 'hatchable';

export const access = 'user';

export default async function (req, res) {
  const user = req.user;
  const { rows: roles } = await db.query(
    'SELECT role, is_active FROM app_user_roles WHERE user_id = $1 AND lower(email) = lower($2) LIMIT 1',
    [String(user.id), user.email]
  );
  if (!roles.length || !roles[0].is_active || roles[0].role !== 'SUPER_ADMIN') {
    return res.status(403).send('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Access denied</title></head><body style="font-family:Arial,sans-serif;padding:48px;color:#253f55"><h1>Access denied</h1><p>This account is not authorized to access the Health Finder administration area.</p><a href="/">Return to Health Finder</a></body></html>');
  }
  const [{ rows: facilities }, { rows: pending }, { rows: verified }] = await Promise.all([
    db.query('SELECT count(*)::int AS total FROM healthcare_facilities WHERE is_archived = false'),
    db.query("SELECT count(*)::int AS total FROM facility_update_submissions WHERE status = 'PENDING'"),
    db.query("SELECT count(*)::int AS total FROM healthcare_facilities WHERE verification_status = 'VERIFIED' AND is_archived = false")
  ]);
  const email = String(user.email || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const total = facilities[0]?.total ?? 0, waiting = pending[0]?.total ?? 0, confirmed = verified[0]?.total ?? 0;
  return res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Super Admin — Health Finder</title><style>
:root{--navy:#245b8f;--blue:#2878b6;--sky:#75c7ef;--ink:#253f55;--muted:#5d7a90;--line:#dceaf3;--soft:#f5faff}
*{box-sizing:border-box}body{margin:0;background:var(--soft);color:var(--ink);font:15px/1.5 "DM Sans",Arial,sans-serif}.top{background:#fff;border-bottom:1px solid var(--line);padding:18px clamp(20px,5vw,64px);display:flex;justify-content:space-between;align-items:center;gap:20px}.brand{display:flex;align-items:center;gap:12px;color:var(--navy);font-weight:800;font-size:19px}.mark{background:#eaf6ff;color:var(--blue);width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:25px}.top small{display:block;font-size:11px;letter-spacing:1px;color:var(--muted);font-weight:700}.top button{border:1px solid var(--line);background:white;border-radius:9px;padding:9px 14px;color:var(--navy);font-weight:700;cursor:pointer}.wrap{max-width:1180px;margin:auto;padding:38px 24px}.eyebrow{color:var(--blue);font-size:12px;font-weight:800;letter-spacing:1.5px}h1{font-size:30px;color:var(--navy);margin:6px 0}.intro{color:var(--muted);margin:0 0 28px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}.card{background:#fff;border:1px solid var(--line);border-radius:15px;padding:22px;box-shadow:0 8px 28px rgba(43,100,145,.05)}.card span{color:var(--muted);font-weight:700;font-size:13px}.num{font-size:32px;font-weight:800;color:var(--navy);margin-top:8px}.section{margin-top:30px}.section h2{color:var(--navy);font-size:20px}.panel{background:white;border:1px solid var(--line);border-radius:15px;padding:22px;color:var(--muted)}a{color:var(--blue)}@media(max-width:600px){.top{align-items:flex-start}.wrap{padding:28px 16px}h1{font-size:25px}}
</style></head><body><header class="top"><div class="brand"><span class="mark">+</span><div>Health Finder<small>SUPER ADMIN PORTAL</small></div></div><button id="signout">Sign out</button></header><main class="wrap"><p class="eyebrow">ADMINISTRATION</p><h1>Welcome, Super Admin</h1><p class="intro">Signed in as ${email}. Manage facility information and review submitted updates.</p><section class="grid"><article class="card"><span>Active facilities</span><div class="num">${total}</div></article><article class="card"><span>Verified facilities</span><div class="num">${confirmed}</div></article><article class="card"><span>Pending submissions</span><div class="num">${waiting}</div></article></section><section class="section"><h2>Management workspace</h2><div class="panel">Your admin foundation is ready. The next build step will add facility management, submission review (approve/reject), user roles, and audit history. Existing public Health Finder pages remain separate and unchanged.</div></section><p style="margin-top:24px"><a href="/">← View public Health Finder website</a></p></main><script>document.getElementById('signout').onclick=async()=>{await window.hatchable.auth.signOut();location.href='/login'};</script></body></html>`);
}