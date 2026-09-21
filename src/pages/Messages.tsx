import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { ArrowRight, Mail, MailOpen } from "lucide-react";
import { siteData } from "../config/siteData";

interface MessagesProps {
  onNext: () => void;
}

export default function Messages({ onNext }: MessagesProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

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
          {siteData.messages.title}
        </h2>
        <p className="text-white/50 font-light text-sm md:text-base">
          {siteData.messages.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-xl">
        {siteData.messages.envelopes.map((env, i) => {
          const open = openIds.has(i);
          return (
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="card-glass rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center gap-3 aspect-square text-center"
            >
              <AnimatePresence mode="wait">
                {!open ? (
                  <motion.div
                    key="closed"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <Mail className="text-[var(--primary)]" size={28} />
                    <span className="text-white/80 text-sm md:text-base font-light">
                      {env.label}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <MailOpen className="text-[var(--accent)]" size={24} />
                    <span className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                      {env.text}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-12"
      >
        <Button onClick={onNext} icon={<ArrowRight size={18} />}>
          {siteData.messages.button}
        </Button>
      </motion.div>
    </div>
  );
}
