import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { TouchEvent } from "react";
import { Photo } from "./PhotoGallery";

interface LightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const photo = open ? photos[index!] : null;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goPrev = () => {
    if (index === null) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    if (index === null) return;
    onNavigate((index + 1) % photos.length);
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, index, photos.length]);

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (!touchStart.current || index === null) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-3 sm:px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
        >
          <button
            onClick={onClose}
            className="absolute top-[calc(0.75rem+env(safe-area-inset-top))] right-[calc(0.75rem+env(safe-area-inset-right))] w-11 h-11 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white touch-manipulation z-10"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-[calc(0.5rem+env(safe-area-inset-left))] md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white touch-manipulation z-10"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-[calc(0.5rem+env(safe-area-inset-right))] md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white touch-manipulation z-10"
                aria-label="Следующее фото"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full max-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="max-h-[58dvh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl select-none"
              draggable={false}
            />
            <div className="mt-3 sm:mt-5 text-center max-w-lg px-8 sm:px-4">
              <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-white mb-1">
                {photo.title}
              </p>
              <p className="text-white/60 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                {photo.text}
              </p>
              <p className="mt-2 text-[10px] text-white/30 sm:hidden">
                Свайпните влево или вправо для смены фото
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
