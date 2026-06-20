import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePingPongVideo } from "../lib/usePingPongVideo";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null | undefined;
  title: string;
}

function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getVimeoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function Lightbox({ isOpen, onClose, videoUrl, title }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const ytId = getYouTubeId(videoUrl);
  const vimeoId = getVimeoId(videoUrl);

  usePingPongVideo(videoRef, isOpen && !ytId && !vimeoId);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest leading-none">SCREENING_MODE</span>
              <div className="h-[1px] w-12 bg-white/20" />
              <h2 className="text-xl font-black tracking-tighter uppercase leading-none">{title}</h2>
            </div>
            <button onClick={onClose} className="lightbox-btn group">
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Media Container */}
          <div className="relative w-full h-full max-w-7xl flex items-center justify-center p-8 md:p-20">
            <div className="relative w-full max-h-full aspect-video glass overflow-hidden bg-black">
              {ytId ? (
                <iframe
                   src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=1&rel=0&playsinline=1`}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              ) : vimeoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&color=ffffff`}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              ) : (
                <video
                  ref={videoRef}
                  src={videoUrl || undefined}
                  autoPlay
                  controls
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Background Decorative Text */}
          <div className="absolute bottom-12 left-12 opacity-10 pointer-events-none hidden md:block">
            <span className="text-[12rem] font-black italic tracking-tighter uppercase whitespace-nowrap overflow-hidden leading-none">
              {title}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
