import { motion } from "framer-motion";
import Button from "../components/Button";
import { ArrowRight } from "lucide-react";
import { siteData } from "../config/siteData";

interface MessageProps {
  onNext: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Message({ onNext }: MessageProps) {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-xl w-full text-center px-1 flex flex-col items-center gap-6"
      >
        <motion.span
          variants={item}
          className="text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.3em] text-[var(--primary)] uppercase"
        >
          {siteData.personName}
        </motion.span>

        <motion.h2
          variants={item}
          className="font-serif-display italic text-[clamp(1.7rem,7.5vw,2.25rem)] sm:text-3xl md:text-5xl text-white leading-snug"
        >
          {siteData.message.title}
        </motion.h2>

        <div className="mt-2 flex flex-col gap-4">
          {siteData.message.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className="text-white/60 text-sm sm:text-base md:text-lg font-light leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div variants={item} className="mt-6 sm:mt-8">
          <Button onClick={onNext} icon={<ArrowRight size={18} />}>
            {siteData.message.button}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
