"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProfileCard from "@/components/profiles/ProfileCard";
import BottomNav from "@/components/layout/BottomNav";
import { getProfiles } from "@/services/profileService";
import { getSupabaseClient } from "@/lib/supabase";
import type { ProfileView } from "@/types/database";

const INITIAL_COUNT = 12;
const LOAD_MORE = 8;

export default function ProfilesPage() {
  const [allProfiles, setAllProfiles] = useState<ProfileView[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const visible = allProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < allProfiles.length;

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const supabase = getSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const profiles = await getProfiles(user.id);
        setAllProfiles(profiles);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      } finally {
        setIsFetching(false);
      }
    }
    fetchProfiles();
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => c + LOAD_MORE);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-dvh bg-white pb-24">
      <div
        className="sticky top-0 z-30 px-5 pt-4 pb-4"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        }}
      >
        <h1 className="text-[28px] font-black text-[#111827] tracking-[-0.03em]">탐색</h1>
      </div>

      <div className="px-4 pt-4">
        {isFetching ? (
          <div className="flex justify-center py-32">
            <div className="w-6 h-6 border-2 border-[#E5E7EB] border-t-[#111827] rounded-full animate-spin" />
          </div>
        ) : visible.length === 0 ? (
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
            <div ref={sentinelRef} className="h-1" />
            {isLoading && (
              <div className="flex justify-center py-6">
                <div className="w-5 h-5 border-2 border-[#E5E7EB] border-t-[#111827] rounded-full animate-spin" />
              </div>
            )}
            {!hasMore && visible.length > 0 && (
              <div className="py-8 text-center">
                <p className="text-[13px] text-[#9CA3AF]">모든 프로필을 확인했어요</p>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
