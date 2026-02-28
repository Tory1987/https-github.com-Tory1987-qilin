
-- Config table for storing VAPID keys (only accessed by service role)
CREATE TABLE public.app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS enabled but no public policies - only service role can access
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;
