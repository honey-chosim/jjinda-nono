import { getRawSupabaseClient } from '@/lib/supabase'
import type { MatchWithProfiles } from '@/types/database'

export async function getMatchById(matchId: string): Promise<MatchWithProfiles | null> {
  const supabase = getRawSupabaseClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      user1:profiles!matches_user1_id_fkey(*),
      user2:profiles!matches_user2_id_fkey(*),
      request:dating_requests(*)
    `)
    .eq('id', matchId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data as MatchWithProfiles
}

export async function getMatchByRequestId(requestId: string): Promise<MatchWithProfiles | null> {
  const supabase = getRawSupabaseClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      user1:profiles!matches_user1_id_fkey(*),
      user2:profiles!matches_user2_id_fkey(*),
      request:dating_requests(*)
    `)
    .eq('request_id', requestId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data as MatchWithProfiles
}

export async function markPaymentComplete(matchId: string, userId: string): Promise<void> {
  const supabase = getRawSupabaseClient()
  const { error } = await supabase
    .from('matches')
    .update({ payment_status: 'paid' })
    .eq('id', matchId)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)

  if (error) throw error
}

export async function getMyMatches(userId: string): Promise<MatchWithProfiles[]> {
  const supabase = getRawSupabaseClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      user1:profiles!matches_user1_id_fkey(*),
      user2:profiles!matches_user2_id_fkey(*),
      request:dating_requests(*)
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as MatchWithProfiles[]
}
