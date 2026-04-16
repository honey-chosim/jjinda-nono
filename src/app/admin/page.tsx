'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalUsers: number
  activeUsers: number
  usedCodes: number
  totalCodes: number
  pendingRequests: number
  totalRequests: number
  paidMatches: number
  totalMatches: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [usersRes, codesRes, requestsRes, matchesRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/invite-codes'),
          fetch('/api/admin/requests'),
          fetch('/api/admin/matches'),
        ])

        const [users, codes, requests, matches] = await Promise.all([
          usersRes.json(),
          codesRes.json(),
          requestsRes.json(),
          matchesRes.json(),
        ])

        setStats({
          totalUsers: Array.isArray(users) ? users.length : 0,
          activeUsers: Array.isArray(users) ? users.filter((u: { is_active: boolean }) => u.is_active).length : 0,
          usedCodes: Array.isArray(codes) ? codes.filter((c: { used_by: string | null }) => c.used_by).length : 0,
          totalCodes: Array.isArray(codes) ? codes.length : 0,
          pendingRequests: Array.isArray(requests) ? requests.filter((r: { status: string }) => r.status === 'pending').length : 0,
          totalRequests: Array.isArray(requests) ? requests.length : 0,
          paidMatches: Array.isArray(matches) ? matches.filter((m: { payment_status: string }) => m.payment_status === 'paid').length : 0,
          totalMatches: Array.isArray(matches) ? matches.length : 0,
        })
      } catch (err) {
        console.error('Failed to load stats', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const cards = [
    {
      title: '유저',
      href: '/admin/users',
      primary: stats?.activeUsers ?? '-',
      primaryLabel: '활성 유저',
      secondary: stats?.totalUsers ?? '-',
      secondaryLabel: '전체 유저',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: '초대코드',
      href: '/admin/invite-codes',
      primary: stats?.usedCodes ?? '-',
      primaryLabel: '사용된 코드',
      secondary: stats?.totalCodes ?? '-',
      secondaryLabel: '전체 코드',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      title: '소개팅 요청',
      href: '/admin/requests',
      primary: stats?.pendingRequests ?? '-',
      primaryLabel: '진행중',
      secondary: stats?.totalRequests ?? '-',
      secondaryLabel: '전체 요청',
      color: 'bg-yellow-50 text-yellow-700',
    },
    {
      title: '매칭/결제',
      href: '/admin/payments',
      primary: stats?.paidMatches ?? '-',
      primaryLabel: '결제 완료',
      secondary: stats?.totalMatches ?? '-',
      secondaryLabel: '전체 매칭',
      color: 'bg-green-50 text-green-700',
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">대시보드</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-medium text-gray-500 mb-3">{card.title}</p>
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${card.color}`}>
                {card.primaryLabel}
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.primary}</p>
              <p className="text-xs text-gray-400">
                전체 {card.secondaryLabel}: <span className="font-medium text-gray-600">{card.secondary}</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
