import { useMemo } from "react";

interface PetalsProps {
  count?: number;
}

export default function Petals({ count = 14 }: PetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * 8,
        size: Math.random() * 10 + 10,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-fall"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <path
              d="M12 2C8 6 6 10 6 14a6 6 0 0012 0c0-4-2-8-6-12z"
              fill="var(--primary)"
              opacity="0.55"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
