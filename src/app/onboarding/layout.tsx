"use client";

import { useRouter, usePathname } from "next/navigation";
import StepIndicator from "@/components/onboarding/StepIndicator";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const stepMatch = pathname.match(/\/onboarding\/(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 2;

  function handleBack() {
    if (currentStep <= 2) {
      router.push("/");
    } else {
      router.push(`/onboarding/${currentStep - 1}`);
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--surface)]">
      {/* Top bar */}
      <div className="flex-shrink-0">
        <StepIndicator current={currentStep} total={8} />
        <div className="px-4 pt-2 pb-1">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors py-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            뒤로
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
