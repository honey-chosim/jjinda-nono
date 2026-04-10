import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

// Typed client for use in components (select queries)
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Untyped client for service layer mutations (works around postgrest-js v2
// RejectExcessProperties resolving Update types to never)
export function createRawClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

let client: ReturnType<typeof createClient> | null = null
let rawClient: ReturnType<typeof createRawClient> | null = null

export function getSupabaseClient() {
  if (!client) client = createClient()
  return client
}

export function getRawSupabaseClient() {
  if (!rawClient) rawClient = createRawClient()
  return rawClient
}
