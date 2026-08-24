"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function GifVideo({
  src,
  poster,
  soundOnLabel,
  soundOffLabel,
  className,
}: {
  src: string;
  poster?: string;
  soundOnLabel: string;
  soundOffLabel: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  // React не выписывает атрибут muted в серверную разметку (известный баг),
  // поэтому iOS Safari блокирует автозапуск как «видео со звуком».
  // После гидрации явно ставим muted и перезапускаем воспроизведение.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute("muted", "");
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
    } else {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {});
      setSoundOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={soundOn ? soundOffLabel : soundOnLabel}
      className={`relative block w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${className ?? ""}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover object-top"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-1 right-1 md:bottom-2 md:right-2 rounded-full bg-black/50 text-white p-1 md:p-2 pointer-events-none"
      >
        {soundOn ? (
          <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
        ) : (
          <VolumeX className="w-3 h-3 md:w-4 md:h-4" />
        )}
      </span>
    </button>
  );
}
