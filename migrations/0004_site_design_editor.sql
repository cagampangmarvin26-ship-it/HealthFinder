CREATE TABLE site_design_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  design JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_by TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO site_design_settings (id, design)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;