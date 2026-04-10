"use client";

import { useState } from "react";
import ProfileCard from "@/components/profiles/ProfileCard";
import BottomNav from "@/components/layout/BottomNav";
import { mockProfiles } from "@/data/mock-profiles";

const INITIAL_COUNT = 12;
const LOAD_MORE = 8;

// Repeat mock data to simulate more profiles
const allProfiles = [
  ...mockProfiles,
  ...mockProfiles.map((p) => ({
    ...p,
    id: p.id + "_2",
    name: p.name + " ",
  })),
];

export default function ProfilesPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visible = allProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < allProfiles.length;

  return (
    <div className="min-h-dvh bg-[var(--bg)] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[var(--surface)] border-b border-[var(--border)] px-4 py-4">
        <h1 className="text-xl font-bold text-[var(--text)]">탐색</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          오늘의 추천 프로필
        </p>
      </div>

      {/* Grid */}
      <div className="px-4 pt-4">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-base font-semibold text-[var(--text)]">
              프로필이 없습니다
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              나중에 다시 확인해보세요
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {visible.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 mb-2 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + LOAD_MORE)}
                  className="px-6 h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--text)] hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  더 보기
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
