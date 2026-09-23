import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { siteData } from "../config/siteData";
import Confetti from "../components/Confetti";
import Petals from "../components/Petals";

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function RisingHearts({ active }: { active: boolean }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 4 + 5,
        delay: Math.random() * 3,
        size: Math.random() * 10 + 12,
      })),
    [active]
  );
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-[var(--accent)] animate-rise"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: 0.7,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export default function Finale() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [taps, setTaps] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);

  useEffect(() => {
    if (siteData.features.confetti) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleHeartTap = () => {
    if (secretOpen) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= 5) setSecretOpen(true);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 overflow-hidden">
      <Starfield />
      {siteData.features.petals && <Petals />}
      {showConfetti && <Confetti />}
      <RisingHearts active={true} />

      <motion.div
        className="absolute w-[320px] h-[320px] md:w-[520px] md:h-[520px] rounded-full bg-[var(--accent)]/15 blur-[100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center max-w-xl w-full px-2"
      >
        <motion.button
          onClick={handleHeartTap}
          initial={{ scale: 0 }}
          animate={{ scale: taps > 0 && !secretOpen ? [1, 1.3, 1] : 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.8 }}
          className="mb-6 text-[var(--accent)] cursor-pointer"
          aria-label="Нажми несколько раз"
        >
          <Heart size={36} fill="currentColor" />
        </motion.button>

        <h1 className="font-serif-display italic text-[clamp(2.25rem,11vw,3rem)] sm:text-5xl md:text-7xl text-white text-glow mb-6 overflow-hidden">
          <span className="inline-block animate-ink">{siteData.final.title}</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-white/60 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {siteData.final.text}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="font-serif-display italic text-xl md:text-2xl text-[var(--primary)]"
        >
          {siteData.final.signature}
        </motion.p>

        <AnimatePresence>
          {secretOpen && siteData.final.secret && (
            <motion.div
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.7 }}
              className="mt-8 card-glass rounded-2xl px-6 py-5 max-w-md w-full"
            >
              <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--primary)] mb-2">
                Секретное послание
              </p>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                {siteData.final.secret}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
