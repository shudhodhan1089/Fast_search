import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY as string | undefined;

export function createClient() {
  return createBrowserClient(
    supabaseUrl ?? "https://nobcmpazcprcoxuhrszq.supabase.co",
    supabaseKey ?? "sb_publishable_2KleWdBUgl14ioCWrJ-Llg_srki92Mf"
  );
}
