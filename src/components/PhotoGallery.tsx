import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getIsMobile } from "../hooks/useIsMobile";

const MOBILE = getIsMobile();

export interface Photo {
  image: string;
  title: string;
  text: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onSelect: (index: number) => void;
}

// Небольшой фиксированный "случайный" наклон для каждой карточки — полароидное ощущение
const TILTS = [-4, 3, -2, 5, -5, 2, -3, 4];

function PolaroidCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const baseTilt = TILTS[index % TILTS.length];

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={MOBILE ? undefined : handleMove}
      onMouseLeave={MOBILE ? undefined : handleLeave}
      initial={{ opacity: 0, y: 40, rotate: baseTilt }}
      whileInView={{ opacity: 1, y: 0, rotate: baseTilt }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      whileHover={MOBILE ? undefined : { scale: 1.04, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      style={MOBILE ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className="group relative text-left touch-manipulation bg-[#fdfaf6] p-3 pb-10 rounded-sm shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={photo.image}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      <p className="absolute bottom-2 left-3 right-3 font-serif-display italic text-[13px] md:text-sm text-[#2a1a20] text-center">
        {photo.title}
      </p>
    </motion.button>
  );
}

export default function PhotoGallery({ photos, onSelect }: PhotoGalleryProps) {
  return (
    <div
      className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-5 sm:gap-6 md:gap-8 w-full max-w-3xl mx-auto px-2 sm:px-0"
      style={MOBILE ? undefined : { perspective: 1000 }}
    >
      {photos.map((photo, i) => (
        <PolaroidCard key={i} photo={photo} index={i} onClick={() => onSelect(i)} />
      ))}
    </div>
  );
}
