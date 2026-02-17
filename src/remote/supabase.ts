import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(
  "https://tiyeqegtjzjwltyipntf.supabase.co",
  "sb_publishable_htx8F9LtDh3ZcgVb1r5GLw_jfMbZTt0",
);

export default supabase;
