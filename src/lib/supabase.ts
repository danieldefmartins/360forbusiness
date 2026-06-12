import { createClient } from "@supabase/supabase-js";

// Public client used by the intake wizard. The publishable (anon) key is safe to
// ship to the browser — all access is gated by RLS on `marketing_intake_submissions`
// (anon may insert/update by unguessable uuid, but cannot read any rows).
//
// Fallbacks keep the static export working even if the build host forgets to set the
// env vars (these are public values anyway). Override via .env.local for clarity.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://scasgwrikoqdwlwlwcff.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_G4L64iqx6Duzq2cx9h7D4A_qUBK8S9r";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export const INTAKE_TABLE = "marketing_intake_submissions";
export const INTAKE_BUCKET = "marketing-intake-uploads";
