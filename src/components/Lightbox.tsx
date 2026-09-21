import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

  const goPrev = () => {
    if (index === null) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  };
  const goNext = () => {
    if (index === null) return;
    onNavigate((index + 1) % photos.length);
  };

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white"
                aria-label="Следующее фото"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full flex flex-col items-center"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-5 text-center max-w-lg">
              <p className="font-serif-display text-xl md:text-2xl text-white mb-1">
                {photo.title}
              </p>
              <p className="text-white/60 text-sm md:text-base font-light">{photo.text}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
