import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteData } from "../config/siteData";
import Confetti from "../components/Confetti";
import Petals from "../components/Petals";

export default function Finale() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (siteData.features.confetti) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {siteData.features.petals && <Petals />}
      {showConfetti && <Confetti />}

      <motion.div
        className="absolute w-[320px] h-[320px] md:w-[520px] md:h-[520px] rounded-full bg-[var(--accent)]/15 blur-[100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center max-w-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-6 text-[var(--accent)]"
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>

        <h1 className="font-serif-display italic text-4xl sm:text-5xl md:text-7xl text-white text-glow mb-6">
          {siteData.final.title}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-white/60 text-sm md:text-lg font-light leading-relaxed mb-10"
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
      </motion.div>
    </div>
  );
}
