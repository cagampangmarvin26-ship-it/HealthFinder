CREATE TABLE app_user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('SUPER_ADMIN', 'FACILITY_ADMIN')),
  facility_id BIGINT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_app_user_roles_email_unique ON app_user_roles (lower(email));

CREATE TABLE healthcare_facilities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  facility_type TEXT NOT NULL DEFAULT 'Other',
  province TEXT NOT NULL DEFAULT 'Davao del Sur',
  municipality TEXT,
  barangay TEXT,
  address TEXT,
  contact_number TEXT,
  email TEXT,
  operating_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
  verification_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (verification_status IN ('PENDING', 'VERIFIED', 'NEEDS_UPDATE', 'UNAVAILABLE')),
  last_verified_at TIMESTAMPTZ,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE app_user_roles
  ADD CONSTRAINT fk_app_user_roles_facility
  FOREIGN KEY (facility_id) REFERENCES healthcare_facilities(id);

CREATE TABLE facility_update_submissions (
  id BIGSERIAL PRIMARY KEY,
  facility_id BIGINT NOT NULL REFERENCES healthcare_facilities(id),
  submitted_by TEXT NOT NULL,
  submission_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  review_note TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_facility_submissions_status_created
  ON facility_update_submissions (status, created_at DESC);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id BIGINT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_created ON audit_logs (created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs (entity_type, entity_id);

CREATE TABLE super_admin_invites (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);