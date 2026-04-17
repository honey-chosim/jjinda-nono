import { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAuthUser(request: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// GET: 내가 발급한 코드 목록
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('invite_codes')
    .select('*')
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

// POST: 새 초대코드 발급 (1회 제한 — 미사용 코드 있으면 새로 못 만듦)
export async function POST(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // 미사용 코드가 이미 있으면 거절
  const { data: existing } = await supabaseAdmin
    .from('invite_codes')
    .select('id')
    .eq('created_by', user.id)
    .is('used_by', null)
    .eq('is_active', true)
    .limit(1)

  if (existing && existing.length > 0) {
    return Response.json({ error: '미사용 초대코드가 이미 있습니다' }, { status: 409 })
  }

  const code = generateCode()
  const { data, error } = await supabaseAdmin
    .from('invite_codes')
    .insert({ code, created_by: user.id, is_active: true })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
