CREATE TABLE facility_admin_invites (
  email TEXT PRIMARY KEY,
  facility_id BIGINT NOT NULL REFERENCES healthcare_facilities(id),
  display_name TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE facility_profiles (
  facility_id BIGINT PRIMARY KEY REFERENCES healthcare_facilities(id),
  doctors JSONB NOT NULL DEFAULT '[]'::jsonb,
  healthcare_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  medicines JSONB NOT NULL DEFAULT '[]'::jsonb,
  availability JSONB NOT NULL DEFAULT '{}'::jsonb,
  operating_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
  free_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by TEXT
);

CREATE INDEX idx_facility_admin_invites_facility ON facility_admin_invites(facility_id);
CREATE INDEX idx_facility_submissions_facility_created ON facility_update_submissions(facility_id, created_at DESC);
CREATE INDEX idx_app_user_roles_facility ON app_user_roles(facility_id, role);