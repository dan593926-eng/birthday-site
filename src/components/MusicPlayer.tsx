import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "../config/siteData";

interface MusicPlayerProps {
  started: boolean;
}

export default function MusicPlayer({ started }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!siteData.features.music || !siteData.music.enabled) return;
    if (started && audioRef.current) {
      audioRef.current.volume = siteData.music.volume;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [started]);

  if (!siteData.features.music || !siteData.music.enabled) return null;

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={siteData.music.src} loop />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full card-glass flex items-center justify-center text-white/80 hover:text-white transition-colors"
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>
    </>
  );
}
