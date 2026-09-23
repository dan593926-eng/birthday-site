import { motion } from "framer-motion";
import Button from "../components/Button";
import { ArrowRight } from "lucide-react";
import { siteData } from "../config/siteData";

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full bg-[var(--primary)]/20 blur-[90px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.35em] text-[var(--primary)]/90 uppercase mb-6"
      >
        {siteData.date}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative font-serif-display italic text-[clamp(2rem,9vw,3rem)] sm:text-4xl md:text-6xl leading-tight text-white text-glow max-w-2xl"
      >
        {siteData.welcome.eyebrow}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="relative mt-5 sm:mt-6 text-white/50 text-sm md:text-base font-light max-w-md leading-relaxed"
      >
        {siteData.welcome.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.05 }}
        className="relative mt-9 sm:mt-12"
      >
        <Button onClick={onNext} icon={<ArrowRight size={18} />}>
          {siteData.welcome.button}
        </Button>
      </motion.div>
    </div>
  );
}
