import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px), (pointer: coarse)";

export function getIsMobile() {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches;
}

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return isMobile;
}
