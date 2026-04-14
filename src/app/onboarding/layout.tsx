"use client";

import { useRouter, usePathname } from "next/navigation";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const stepMatch = pathname.match(/\/onboarding\/(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 2;
  // Steps 2,3,4,5,7,8,9 → display 1,2,3,4,5,6,7
  const stepToDisplay: Record<number, number> = { 2:1, 3:2, 4:3, 5:4, 7:5, 8:6, 9:7 };
  const displayStep = stepToDisplay[currentStep] ?? 1;
  const totalSteps = 7;
  const progress = (displayStep / totalSteps) * 100;

  function handleBack() {
    if (currentStep <= 2) router.push("/");
    else if (currentStep === 7) router.push("/onboarding/5");
    else router.push(`/onboarding/${currentStep - 1}`);
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white items-center">
      {/* Progress bar */}
      <div className="w-full h-[2px] bg-[#F3F4F6] flex-shrink-0">
        <div
          className="h-full bg-[#111827] transition-all duration-400 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="w-full max-w-lg flex items-center justify-between px-5 pt-5 pb-2 flex-shrink-0">
        <button
          onClick={handleBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F3F4F6] active:scale-95 transition-transform"
          aria-label="뒤로"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <span className="text-[13px] font-medium text-[#9CA3AF] tabular-nums">
          {displayStep} / {totalSteps}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full max-w-lg">{children}</div>
    </div>
  );
}
