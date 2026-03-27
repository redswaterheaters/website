-- 1. Create the contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email_address TEXT NOT NULL,
  service_needed TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new'
);

-- 2. Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form submissions)
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Restrict reads to authenticated users only
CREATE POLICY "Allow authenticated reads"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- 3. Index on created_at for sorting by newest first
CREATE INDEX idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);
