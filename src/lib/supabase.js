import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn(
    "[founderOs] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. " +
    "Content will use local defaults and saving will be disabled."
  );
}

// Use placeholder values when env vars are absent so createClient never throws.
// All Supabase calls will fail gracefully — ContentContext and EditContext handle errors.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  key || "placeholder-anon-key"
);
