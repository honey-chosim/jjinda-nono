import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/admin', label: '대시보드', icon: '📊' },
  { href: '/admin/users', label: '유저 관리', icon: '👥' },
  { href: '/admin/invite-codes', label: '초대코드', icon: '🎟️' },
  { href: '/admin/requests', label: '요청/매칭', icon: '💌' },
  { href: '/admin/payments', label: '결제 현황', icon: '💳' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 데스크탑 사이드바 */}
      <aside className="hidden md:flex flex-col w-60 bg-gray-900 min-h-screen fixed top-0 left-0 z-10">
        <div className="px-6 py-6 border-b border-gray-700">
          <h1 className="text-white font-bold text-lg">찐따노노</h1>
          <p className="text-gray-400 text-xs mt-0.5">관리자</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* 모바일 상단 탭 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-gray-900">
        <div className="flex items-center px-4 py-3 border-b border-gray-700">
          <h1 className="text-white font-bold">찐따노노 관리자</h1>
        </div>
        <nav className="flex overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 text-gray-300 hover:text-white text-xs"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* 콘텐츠 영역 */}
      <main className="flex-1 md:ml-60 pt-24 md:pt-0">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
