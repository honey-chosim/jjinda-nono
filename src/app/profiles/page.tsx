"use client";

import { useState } from "react";
import ProfileCard from "@/components/profiles/ProfileCard";
import BottomNav from "@/components/layout/BottomNav";
import { mockProfiles } from "@/data/mock-profiles";

const INITIAL_COUNT = 12;
const LOAD_MORE = 8;

const allProfiles = [
  ...mockProfiles,
  ...mockProfiles.map((p) => ({ ...p, id: p.id + "_2", name: p.name + " " })),
];

export default function ProfilesPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visible = allProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < allProfiles.length;

  return (
    <div className="min-h-dvh bg-white pb-24">
      {/* Header — fixed */}
      <div
        className="fixed top-0 left-0 right-0 z-30 px-5 pt-12 pb-4"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        }}
      >
        <h1 className="text-[28px] font-black text-[#111827] tracking-[-0.03em]">
          탐색
        </h1>
      </div>

      {/* Grid — offset for fixed header */}
      <div className="px-4 pt-[100px]">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[15px] font-semibold text-[#111827]">프로필이 없습니다</p>
            <p className="text-[13px] text-[#9CA3AF] mt-1">나중에 다시 확인해보세요</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {visible.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 mb-2 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + LOAD_MORE)}
                  className="px-8 h-11 rounded-full bg-[#F3F4F6] text-[14px] font-semibold text-[#111827] active:scale-[0.97] transition-transform"
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
