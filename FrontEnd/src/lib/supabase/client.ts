import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://nobcmpazcprcoxuhrszq.supabase.co",
    "sb_publishable_2KleWdBUgl14ioCWrJ-Llg_srki92Mf"
  )
}
