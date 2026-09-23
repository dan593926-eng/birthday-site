import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import PhotoGallery from "../components/PhotoGallery";
import Lightbox from "../components/Lightbox";
import { ArrowRight } from "lucide-react";
import { siteData } from "../config/siteData";

interface GalleryProps {
  onNext: () => void;
}

export default function Gallery({ onNext }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-7 sm:mb-10 max-w-xl px-2"
      >
        <h2 className="font-serif-display italic text-[clamp(2rem,8vw,3rem)] md:text-5xl text-white mb-3">
          {siteData.gallery.title}
        </h2>
        <p className="text-white/50 font-light text-sm md:text-base">
          {siteData.gallery.subtitle}
        </p>
      </motion.div>

      <PhotoGallery
        photos={siteData.gallery.photos}
        onSelect={(i) => siteData.features.lightbox && setSelected(i)}
      />

      {siteData.features.lightbox && (
        <Lightbox
          photos={siteData.gallery.photos}
          index={selected}
          onClose={() => setSelected(null)}
          onNavigate={setSelected}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 sm:mt-12"
      >
        <Button onClick={onNext} icon={<ArrowRight size={18} />}>
          {siteData.gallery.button}
        </Button>
      </motion.div>
    </div>
  );
}
