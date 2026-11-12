import { db } from 'hatchable';

export const access = 'public';
export const methods = ['GET'];

export default async function (req, res) {
  const { rows } = await db.query(
    'SELECT design, updated_at FROM site_design_settings WHERE id = 1'
  );
  return res.json({
    design: rows[0]?.design || {},
    updated_at: rows[0]?.updated_at || null
  });
}