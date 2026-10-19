import { useMemo } from "react";
import useIsMobile from "../hooks/useIsMobile";

interface ParticlesProps {
  count?: number;
  mobileCount?: number;
}

// Чистая CSS-анимация (transform + opacity) — работает на GPU и не грузит JS-поток
export default function Particles({ count = 22, mobileCount = 10 }: ParticlesProps) {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? mobileCount : count;

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 8 + 7,
        delay: Math.random() * 6,
      })),
    [particleCount]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[var(--primary)] animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
