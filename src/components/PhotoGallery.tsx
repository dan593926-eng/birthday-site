import { motion } from "framer-motion";

export interface Photo {
  image: string;
  title: string;
  text: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onSelect: (index: number) => void;
}

export default function PhotoGallery({ photos, onSelect }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl mx-auto">
      {photos.map((photo, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative aspect-[3/4] overflow-hidden rounded-2xl card-glass text-left"
        >
          <img
            src={photo.image}
            alt={photo.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <p className="font-serif-display text-sm md:text-base text-white leading-snug">
              {photo.title}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
