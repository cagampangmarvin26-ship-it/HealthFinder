import { db } from 'hatchable';

export const access = 'user';
export const methods = ['POST'];

export default async function (req, res) {
  const email = String(req.user.email || '').trim().toLowerCase();
  if (!email) return res.status(400).json({ error: 'Account email is unavailable.' });

  const { rows: allowed } = await db.query(
    'SELECT email FROM super_admin_invites WHERE email = $1 LIMIT 1',
    [email]
  );
  if (!allowed.length) return res.status(403).json({ error: 'This account is not approved for Super Admin setup.' });

  const { rows: existing } = await db.query(
    'SELECT role FROM app_user_roles WHERE lower(email) = $1 LIMIT 1',
    [email]
  );
  if (existing.length) {
    if (existing[0].role === 'SUPER_ADMIN') return res.json({ ok: true, role: 'SUPER_ADMIN', redirect: '/admin' });
    return res.status(409).json({ error: 'An administrator role is already assigned to this email.' });
  }

  await db.query(
    'INSERT INTO app_user_roles (user_id, email, role) VALUES ($1, $2, $3)',
    [String(req.user.id), email, 'SUPER_ADMIN']
  );
  await db.query(
    'INSERT INTO audit_logs (actor_user_id, actor_email, action, entity_type, details) VALUES ($1, $2, $3, $4, $5::jsonb)',
    [String(req.user.id), email, 'SUPER_ADMIN_BOOTSTRAPPED', 'USER_ROLE', JSON.stringify({ role: 'SUPER_ADMIN' })]
  );
  await db.query('DELETE FROM super_admin_invites WHERE email = $1', [email]);
  return res.json({ ok: true, role: 'SUPER_ADMIN', redirect: '/admin' });
}