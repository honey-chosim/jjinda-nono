"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VALID_CODE_LENGTH = 8;

export default function LandingPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== VALID_CODE_LENGTH) {
      setError("유효하지 않은 코드입니다");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/onboarding/2");
    }, 600);
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[var(--surface)] px-6">
      {/* Logo mark */}
      <div className="mb-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 15.5c-3.315 0-6.26-1.57-8.12-4.004C9.815 18.52 12.79 17.5 16 17.5s6.185 1.02 8.12 2.996C22.26 22.93 19.315 24.5 16 24.5z"
              fill="white"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-[var(--text)] tracking-tight">
          찐따노노
        </h1>
        <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">
          검증된 사람들만의 소개팅
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-7 shadow-sm">
          <p className="text-base font-medium text-[var(--text)] text-center mb-1">
            초대받은 사람만 가입할 수 있습니다
          </p>
          <p className="text-sm text-[var(--text-muted)] text-center mb-6">
            초대 코드를 입력해 시작하세요
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase().replace(/\s/g, ""));
                  setError("");
                }}
                placeholder="초대 코드 입력 (8자리)"
                maxLength={8}
                className={`w-full h-14 px-5 rounded-2xl border text-center text-lg font-semibold tracking-widest bg-[var(--bg)] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] placeholder:text-[var(--text-muted)] placeholder:font-normal placeholder:tracking-normal ${
                  error
                    ? "border-[var(--danger)] focus:ring-[var(--danger)]"
                    : "border-[var(--border)]"
                }`}
              />
              {error && (
                <p className="mt-2 text-sm text-[var(--danger)] text-center animate-slide-up">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || code.length === 0}
              className="w-full h-14 rounded-2xl bg-[var(--primary)] text-white text-base font-semibold transition-all duration-150 hover:bg-blue-600 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-blue-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  확인 중...
                </span>
              ) : (
                "시작하기"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-xs text-[var(--text-muted)] text-center leading-relaxed">
          초대 코드가 없으신가요?{" "}
          <span className="text-[var(--primary)] font-medium cursor-pointer">
            운영팀에 문의하기
          </span>
        </p>
      </div>
    </div>
  );
}
