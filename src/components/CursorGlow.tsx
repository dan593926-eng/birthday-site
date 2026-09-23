import { useEffect, useRef, useState } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
}

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    // На тач-устройствах живого курсора нет смысла показывать
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onClick = (e: MouseEvent) => {
      const id = idRef.current++;
      setHearts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 900);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(216,167,177,0.55) 0%, rgba(255,107,129,0.25) 45%, transparent 75%)",
          filter: "blur(1px)",
          transition: "opacity .3s",
        }}
      />
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-[var(--accent)] text-sm animate-heart-pop"
          style={{ left: h.x, top: h.y }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
