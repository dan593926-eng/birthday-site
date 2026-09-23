import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Welcome from "./pages/Welcome";
import Message from "./pages/Message";
import Gallery from "./pages/Gallery";
import Memories from "./pages/Memories";
import Messages from "./pages/Messages";
import Finale from "./pages/Finale";
import ProgressIndicator from "./components/ProgressIndicator";
import MusicPlayer from "./components/MusicPlayer";
import Particles from "./components/Particles";
import CursorGlow from "./components/CursorGlow";
import { siteData } from "./config/siteData";

const PAGES = ["welcome", "message", "gallery", "memories", "messages", "finale"] as const;

export default function App() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [started, setStarted] = useState(false);

  const goNext = () => {
    setDirection(1);
    setStarted(true);
    setStep((s) => Math.min(s + 1, PAGES.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const speed = siteData.settings.animationSpeed || 1;

  const renderPage = () => {
    switch (PAGES[step]) {
      case "welcome":
        return <Welcome onNext={goNext} />;
      case "message":
        return <Message onNext={goNext} />;
      case "gallery":
        return <Gallery onNext={goNext} />;
      case "memories":
        return <Memories onNext={goNext} />;
      case "messages":
        return <Messages onNext={goNext} />;
      case "finale":
        return <Finale />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-[100svh] min-h-[100dvh] overflow-x-clip">
      {siteData.features.particles && (
        <Particles
          count={siteData.settings.desktopParticles}
          mobileCount={siteData.settings.mobileParticles}
        />
      )}
      <CursorGlow />

      {siteData.settings.showProgress && step > 0 && (
        <ProgressIndicator current={step} total={PAGES.length} />
      )}

      {siteData.settings.showNavigation && step > 0 && step < PAGES.length - 1 && (
        <button
          onClick={goBack}
          className="fixed top-[calc(0.75rem+env(safe-area-inset-top))] left-[calc(0.75rem+env(safe-area-inset-left))] z-40 w-11 h-11 rounded-full card-glass flex items-center justify-center text-white/70 hover:text-white transition-colors touch-manipulation"
          aria-label="Назад"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <MusicPlayer started={started} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55 / speed, ease: "easeInOut" }}
          className="relative z-20 w-full overflow-x-clip"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
