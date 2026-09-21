import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface MemoryCardProps {
  question: string;
  image: string;
  text: string;
  index: number;
}

export default function MemoryCard({ question, image, text, index }: MemoryCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setOpen(!open)}
      whileHover={{ y: -4 }}
      className="cursor-pointer card-glass rounded-2xl overflow-hidden w-full"
    >
      <div className="p-5 md:p-6 flex items-center justify-between gap-3">
        <span className="font-serif-display text-lg md:text-xl text-white">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--accent)]"
        >
          <Heart size={16} fill={open ? "currentColor" : "none"} />
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={image}
                alt={question}
                className="w-full sm:w-40 h-40 object-cover rounded-xl shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                {text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
