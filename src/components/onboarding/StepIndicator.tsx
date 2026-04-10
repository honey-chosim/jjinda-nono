interface StepIndicatorProps {
  current: number; // 2-9
  total?: number;
}

export default function StepIndicator({
  current,
  total = 8,
}: StepIndicatorProps) {
  const step = current - 1; // step 2 = step 1/8
  const progress = (step / total) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-[var(--border)]">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Step count */}
      <div className="flex items-center justify-end px-4 pt-2 pb-1">
        <span className="text-xs text-[var(--text-muted)] font-medium">
          {step} / {total}
        </span>
      </div>
    </div>
  );
}
