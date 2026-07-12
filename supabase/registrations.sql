-- ─────────────────────────────────────────────────────────────────────────
-- registrations table — full per-booking record written by the Stripe webhook
-- (app/api/webhook/route.js) on checkout.session.completed.
--
-- Captures every field from the /checkout form, including the ones the
-- parent_dashboard table does not keep: child DOB, phone, notes, camp/clinic
-- week, terms accepted and photo consent.
--
-- HOW TO RUN:
--   Supabase Dashboard → SQL Editor → New query → paste this → Run.
--
-- RLS is enabled with no policies, so anon/public users cannot read this PII.
-- The webhook uses the service-role key, which bypasses RLS, so it can write.
-- To view rows later: Supabase Dashboard → Table Editor → registrations
-- (the dashboard uses the service role, so it can read them).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.registrations (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  stripe_session_id  text unique,
  parent_name        text,
  parent_last_name   text,
  email              text,
  phone              text,
  child_name         text,
  child_dob          text,
  camp_week          text,
  clinic_week        text,
  notes              text,
  terms_accepted     text,
  photo_consent      text,
  product            text,
  amount             numeric,
  currency           text
);

alter table public.registrations enable row level security;
