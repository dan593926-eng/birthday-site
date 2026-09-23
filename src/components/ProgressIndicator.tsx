interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="fixed top-[calc(0.75rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-5 sm:w-6 bg-[var(--accent)]"
                : i < current
                ? "w-1.5 bg-[var(--primary)]/70"
                : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] tracking-[0.2em] text-white/40 font-light">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
