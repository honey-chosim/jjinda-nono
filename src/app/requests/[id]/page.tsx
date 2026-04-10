"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockRequests } from "@/data/mock-requests";
import PhotoSwiper from "@/components/profiles/PhotoSwiper";
import Modal from "@/components/ui/Modal";

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const request = mockRequests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <p className="text-[var(--text-muted)]">요청을 찾을 수 없습니다</p>
          <Link href="/requests" className="mt-4 inline-block text-sm text-[var(--primary)]">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  function handleReject() {
    setShowRejectModal(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/requests");
    }, 1800);
  }

  function handleAccept() {
    setShowAcceptModal(false);
    router.push(`/match/${request!.id}`);
  }

  return (
    <div className="min-h-dvh bg-[var(--surface)] pb-32">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>

      {/* Photo gallery */}
      <PhotoSwiper photos={request.requesterPhotos} name={request.requesterName} />

      {/* Content */}
      <div className="px-4 pt-5 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">
            {request.requesterName}, {request.requesterAge}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {request.requesterResidence}
          </p>
        </div>

        <div className="h-px bg-[var(--border)]" />

        {/* 기본 정보 */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            기본 정보
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "나이", value: `${request.requesterAge}세` },
              { label: "키", value: `${request.requesterHeight}cm` },
              { label: "거주지", value: request.requesterResidence.split(" ")[0] },
            ].map((item) => (
              <div key={item.label} className="bg-[var(--bg)] rounded-2xl p-3 text-center">
                <p className="text-xs text-[var(--text-muted)] mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-[var(--text)]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 스펙 */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            스펙
          </h2>
          <div className="bg-[var(--bg)] rounded-2xl divide-y divide-[var(--border)]">
            {[
              { label: "학력", value: `${request.requesterEducation} · ${request.requesterSchool}` },
              { label: "직장", value: request.requesterCompany },
              { label: "직업", value: request.requesterJob },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 px-4 py-3">
                <span className="text-xs text-[var(--text-muted)] w-12 flex-shrink-0 pt-0.5">{item.label}</span>
                <span className="text-sm text-[var(--text)]">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 라이프스타일 */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            라이프스타일
          </h2>
          <div className="bg-[var(--bg)] rounded-2xl divide-y divide-[var(--border)]">
            {[
              { label: "MBTI", value: request.requesterMbti },
              { label: "흡연", value: request.requesterSmoking },
              { label: "음주", value: request.requesterDrinking },
              { label: "반려동물", value: request.requesterPet },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 px-4 py-3">
                <span className="text-xs text-[var(--text-muted)] w-12 flex-shrink-0 pt-0.5">{item.label}</span>
                <span className="text-sm text-[var(--text)]">{item.value}</span>
              </div>
            ))}
            <div className="flex gap-4 px-4 py-3">
              <span className="text-xs text-[var(--text-muted)] w-12 flex-shrink-0 pt-0.5">취미</span>
              <div className="flex flex-wrap gap-1.5">
                {request.requesterHobbies.map((h) => (
                  <span key={h} className="text-xs bg-[#F3F4F6] text-[#374151] px-2.5 py-1 rounded-full font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 자기소개 */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            자기소개
          </h2>
          <div className="bg-[var(--bg)] rounded-2xl p-4">
            <p className="text-sm text-[var(--text)] leading-relaxed">{request.requesterBio}</p>
          </div>
        </section>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--text)] text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg animate-slide-up">
          거절 완료되었습니다
        </div>
      )}

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--surface)] border-t border-[var(--border)] px-4 py-4 pb-safe">
        <div className="flex gap-3">
          <button
            onClick={() => setShowRejectModal(true)}
            className="flex-1 h-14 rounded-2xl border border-[var(--border)] text-sm font-semibold text-[var(--text)] hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            거절하기
          </button>
          <button
            onClick={() => setShowAcceptModal(true)}
            className="flex-1 h-14 rounded-2xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[#1F2937] active:scale-[0.98] transition-all shadow-sm "
          >
            수락하기
          </button>
        </div>
      </div>

      {/* Reject modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="요청 거절"
        description={`${request.requesterName}님의 소개팅 요청을 거절하시겠습니까?`}
        confirmLabel="거절하기"
        cancelLabel="취소"
        onConfirm={handleReject}
        variant="danger"
      />

      {/* Accept modal */}
      <Modal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        title="요청 수락"
        description={`${request.requesterName}님의 소개팅 요청을 수락하시겠습니까?`}
        confirmLabel="수락하기"
        cancelLabel="취소"
        onConfirm={handleAccept}
      />
    </div>
  );
}
