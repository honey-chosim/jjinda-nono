import { getRawSupabaseClient } from '@/lib/supabase'

export async function validateInviteCode(code: string): Promise<boolean> {
  const supabase = getRawSupabaseClient()
  const { data, error } = await supabase
    .from('invite_codes')
    .select('id')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .is('used_by', null)
    .maybeSingle()

  if (error) throw error
  return data !== null
}

export async function consumeInviteCode(code: string, userId: string): Promise<void> {
  const supabase = getRawSupabaseClient()

  const { data: existing } = await supabase
    .from('invite_codes')
    .select('id')
    .eq('code', code.toUpperCase())
    .is('used_by', null)
    .maybeSingle()

  if (!existing) return

  const { error } = await supabase
    .from('invite_codes')
    .update({ used_by: userId, used_at: new Date().toISOString() })
    .eq('id', (existing as { id: string }).id)

  if (error) throw error
}
