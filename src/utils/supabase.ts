import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://zvqtdtrsgkzmphqwmvsy.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_API_ANON_KEY!
);
