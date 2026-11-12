import { db } from 'hatchable';

export const access = 'user';
export const methods = ['PUT'];

async function requireSuperAdmin(user) {
  const { rows } = await db.query(
    "SELECT role, is_active FROM app_user_roles WHERE user_id = $1 AND lower(email) = lower($2) LIMIT 1",
    [String(user.id), user.email]
  );
  return rows.length > 0 && rows[0].is_active && rows[0].role === 'SUPER_ADMIN';
}

function safeColor(value) {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value);
}

function safeUrl(value) {
  if (typeof value !== 'string' || value.length > 500) return false;
  return value.startsWith('#') || (value.startsWith('/') && !value.startsWith('//')) ||
    /^https:\/\//i.test(value) || /^mailto:/i.test(value);
}

export default async function (req, res) {
  const user = req.user;
  if (!await requireSuperAdmin(user)) {
    return res.status(403).json({ error: 'Super Admin access required.' });
  }

  const design = req.body?.design;
  if (!design || typeof design !== 'object' || Array.isArray(design)) {
    return res.status(400).json({ error: 'Invalid website design.' });
  }

  const incoming = design.elements && typeof design.elements === 'object' && !Array.isArray(design.elements)
    ? design.elements : {};
  const entries = Object.entries(incoming);
  if (entries.length > 120) return res.status(400).json({ error: 'Too many editable elements.' });

  const elements = {};
  for (const [selector, value] of entries) {
    if (typeof selector !== 'string' || selector.length > 500 || !value || typeof value !== 'object') continue;
    const item = {};
    if (typeof value.text === 'string') item.text = value.text.slice(0, 600);
    if (safeColor(value.color)) item.color = value.color;
    if (safeColor(value.background)) item.background = value.background;
    if (Object.keys(item).length) elements[selector] = item;
  }

  const allowedSections = new Set(['home', 'find', 'philhealth', 'services', 'programs', 'about', 'contact']);
  const buttonsIn = Array.isArray(design.customButtons) ? design.customButtons.slice(0, 20) : [];
  const customButtons = [];
  for (const b of buttonsIn) {
    if (!b || typeof b !== 'object') continue;
    const id = String(b.id || '').slice(0, 60);
    const label = String(b.label || '').trim().slice(0, 60);
    const url = String(b.url || '').trim();
    const section = String(b.section || 'home');
    if (!/^[a-zA-Z0-9_-]{1,60}$/.test(id) || !label || !safeUrl(url) || !allowedSections.has(section)) continue;
    customButtons.push({ id, label, url, section });
  }

  const cleanDesign = { elements, customButtons };
  await db.query(
    'INSERT INTO site_design_settings (id, design, updated_by, updated_at) VALUES (1, $1::jsonb, $2, now()) ON CONFLICT (id) DO UPDATE SET design = EXCLUDED.design, updated_by = EXCLUDED.updated_by, updated_at = now()',
    [JSON.stringify(cleanDesign), String(user.id)]
  );
  await db.query(
    'INSERT INTO audit_logs (actor_user_id, actor_email, action, entity_type, entity_id, details) VALUES ($1,$2,$3,$4,$5,$6::jsonb)',
    [String(user.id), user.email, 'SITE_DESIGN_UPDATED', 'SITE_DESIGN', null, JSON.stringify({ editableElements: Object.keys(elements).length, customButtons: customButtons.length })]
  );
  return res.json({ ok: true, design: cleanDesign });
}