import { useMemo } from "react";

const COLORS = ["#d8a7b1", "#ff6b81", "#ffffff", "#f5c6cf"];

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 40 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2,
        size: Math.random() * 6 + 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
