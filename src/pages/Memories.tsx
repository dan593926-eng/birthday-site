import { motion } from "framer-motion";
import Button from "../components/Button";
import MemoryCard from "../components/MemoryCard";
import { ArrowRight } from "lucide-react";
import { siteData } from "../config/siteData";

interface MemoriesProps {
  onNext: () => void;
}

export default function Memories({ onNext }: MemoriesProps) {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h2 className="font-serif-display italic text-3xl md:text-5xl text-white mb-3">
          {siteData.memories.title}
        </h2>
        <p className="text-white/50 font-light text-sm md:text-base">
          {siteData.memories.subtitle}
        </p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-xl">
        {siteData.memories.cards.map((card, i) => (
          <MemoryCard
            key={i}
            index={i}
            question={card.question}
            image={card.image}
            text={card.text}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-12"
      >
        <Button onClick={onNext} icon={<ArrowRight size={18} />}>
          {siteData.memories.button}
        </Button>
      </motion.div>
    </div>
  );
}
