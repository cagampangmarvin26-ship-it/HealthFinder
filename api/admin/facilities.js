import { db } from 'hatchable';

export const access = 'user';
export const methods = ['GET', 'POST', 'PUT', 'DELETE'];

async function requireSuperAdmin(user) {
  const { rows } = await db.query(
    "SELECT role, is_active FROM app_user_roles WHERE user_id = $1 AND lower(email) = lower($2) LIMIT 1",
    [String(user.id), user.email]
  );
  return rows.length > 0 && rows[0].is_active && rows[0].role === 'SUPER_ADMIN';
}

function clean(value) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  return s || null;
}

export default async function (req, res) {
  const user = req.user;
  if (!await requireSuperAdmin(user)) return res.status(403).json({ error: 'Super Admin access required.' });

  if (req.method === 'GET') {
    const includeArchived = req.query?.archived === 'true';
    const { rows } = await db.query(
      'SELECT id, name, facility_type, province, municipality, barangay, address, contact_number, email, verification_status, last_verified_at, is_archived, created_at, updated_at FROM healthcare_facilities WHERE is_archived = $1 ORDER BY name ASC',
      [includeArchived]
    );
    return res.json({ facilities: rows });
  }

  if (req.method === 'POST') {
    const b = req.body || {};
    const name = clean(b.name);
    if (!name) return res.status(400).json({ error: 'Facility name is required.' });
    const type = clean(b.facility_type) || 'Other';
    const municipality = clean(b.municipality);
    const { rows } = await db.query(
      'INSERT INTO healthcare_facilities (name, facility_type, municipality, barangay, address, contact_number, email, verification_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,name,facility_type,province,municipality,barangay,address,contact_number,email,verification_status,is_archived,created_at',
      [name, type, municipality, clean(b.barangay), clean(b.address), clean(b.contact_number), clean(b.email), 'PENDING']
    );
    const f = rows[0];
    await db.query(
      'INSERT INTO audit_logs (actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES ($1,$2,$3,$4,$5,$6::jsonb)',
      [String(user.id), user.email, 'FACILITY_CREATED', 'HEALTHCARE_FACILITY', f.id, JSON.stringify({ name: f.name })]
    );
    return res.status(201).json({ facility: f });
  }

  const id = Number(req.body?.id ?? req.query?.id);
  if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({ error: 'A valid facility ID is required.' });

  if (req.method === 'PUT') {
    const b = req.body || {};
    const name = clean(b.name);
    if (!name) return res.status(400).json({ error: 'Facility name is required.' });
    const { rows } = await db.query(
      'UPDATE healthcare_facilities SET name=$1, facility_type=$2, municipality=$3, barangay=$4, address=$5, contact_number=$6, email=$7, updated_at=now() WHERE id=$8 AND is_archived=false RETURNING id,name,facility_type,province,municipality,barangay,address,contact_number,email,verification_status,is_archived,updated_at',
      [name, clean(b.facility_type) || 'Other', clean(b.municipality), clean(b.barangay), clean(b.address), clean(b.contact_number), clean(b.email), id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Facility not found.' });
    await db.query(
      'INSERT INTO audit_logs (actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES ($1,$2,$3,$4,$5,$6::jsonb)',
      [String(user.id), user.email, 'FACILITY_UPDATED', 'HEALTHCARE_FACILITY', id, JSON.stringify({ name })]
    );
    return res.json({ facility: rows[0] });
  }

  if (req.method === 'DELETE') {
    const { rows } = await db.query(
      "UPDATE healthcare_facilities SET is_archived=true, updated_at=now() WHERE id=$1 AND is_archived=false RETURNING id,name",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Active facility not found.' });
    await db.query(
      'INSERT INTO audit_logs (actor_user_id,actor_email,action,entity_type,entity_id,details) VALUES ($1,$2,$3,$4,$5,$6::jsonb)',
      [String(user.id), user.email, 'FACILITY_ARCHIVED', 'HEALTHCARE_FACILITY', id, JSON.stringify({ name: rows[0].name })]
    );
    return res.json({ ok: true, archived: rows[0] });
  }
}