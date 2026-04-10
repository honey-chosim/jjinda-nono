"use client";

import BottomNav from "@/components/layout/BottomNav";
import RequestCard from "@/components/requests/RequestCard";
import { mockRequests } from "@/data/mock-requests";

const pendingRequests = mockRequests.filter((r) => r.status === "pending");

export default function RequestsPage() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[var(--surface)] border-b border-[var(--border)] px-4 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[var(--text)]">받은 요청</h1>
          {pendingRequests.length > 0 && (
            <span className="bg-[var(--danger)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingRequests.length}
            </span>
          )}
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          나에게 소개팅을 신청한 분들이에요
        </p>
      </div>

      <div className="px-4 pt-4">
        {mockRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-4xl mb-4">💌</p>
            <p className="text-base font-semibold text-[var(--text)]">
              아직 받은 요청이 없어요
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              프로필을 완성하면 더 많은 분들이 찾아올 거예요
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
