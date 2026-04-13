import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json()

  const digits = phone.replace(/[-\s]/g, '')

  // Fetch OTP from DB
  const { data: otpRow, error: fetchError } = await supabaseAdmin
    .from('phone_otps')
    .select('code, expires_at')
    .eq('phone', digits)
    .single()

  if (fetchError || !otpRow) {
    return NextResponse.json({ error: '인증번호를 먼저 요청해주세요' }, { status: 400 })
  }

  if (new Date(otpRow.expires_at) < new Date()) {
    return NextResponse.json({ error: '인증번호가 만료됐습니다. 다시 요청해주세요' }, { status: 400 })
  }

  if (otpRow.code !== code) {
    return NextResponse.json({ error: '인증번호가 올바르지 않습니다' }, { status: 400 })
  }

  // OTP valid — delete it
  await supabaseAdmin.from('phone_otps').delete().eq('phone', digits)

  // Find or create Supabase user by phone (stored as synthetic email)
  const syntheticEmail = `${digits}@jjinda.nono`

  let userId: string
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()

  if (listError) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }

  const existing = users.find((u) => u.email === syntheticEmail)

  if (existing) {
    userId = existing.id
  } else {
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: syntheticEmail,
      email_confirm: true,
      user_metadata: { phone: digits },
    })
    if (createError || !newUser.user) {
      return NextResponse.json({ error: '계정 생성에 실패했습니다' }, { status: 500 })
    }
    userId = newUser.user.id
  }

  // Generate magic link token for this user → client uses it to set session
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: syntheticEmail,
  })

  if (linkError || !linkData) {
    return NextResponse.json({ error: '세션 생성에 실패했습니다' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    userId,
    tokenHash: linkData.properties.hashed_token,
    email: syntheticEmail,
  })
}
