-- phone_otps: 전화번호 OTP 임시 저장 (5분 유효)
create table if not exists phone_otps (
  phone text primary key,
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- Service role only (no RLS policies needed - accessed only via server-side API routes)
alter table phone_otps enable row level security;
