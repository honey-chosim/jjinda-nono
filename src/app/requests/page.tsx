"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/layout/BottomNav";
import RequestCard from "@/components/requests/RequestCard";
import { getReceivedRequests } from "@/services/requestService";
import { getSupabaseClient } from "@/lib/supabase";
import type { RequestWithRequester } from "@/types/database";

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestWithRequester[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const supabase = getSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const data = await getReceivedRequests(user.id);
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      } finally {
        setIsFetching(false);
      }
    }
    fetchRequests();
  }, []);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-dvh bg-white pb-28">
      <div
        className="fixed top-0 left-0 right-0 z-30 px-5 pb-4"
        style={{
          paddingTop: "max(16px, env(safe-area-inset-top))",
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <h1 className="text-[28px] font-black text-[#111827] tracking-[-0.03em]">받은 요청</h1>
          {pendingCount > 0 && (
            <span className="bg-[#DC2626] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pt-[84px]">
        {isFetching ? (
          <div className="flex justify-center py-32">
            <div className="w-6 h-6 border-2 border-[#E5E7EB] border-t-[#111827] rounded-full animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[15px] font-semibold text-[#111827]">아직 받은 요청이 없어요</p>
            <p className="text-[13px] text-[#9CA3AF] mt-1">프로필을 완성하면 더 많은 분들이 찾아올 거예요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
