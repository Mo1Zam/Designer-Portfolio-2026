import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Maximize2, Sparkles, Sliders } from "lucide-react";
import { Backlight } from "./ui/backlight";
import { usePingPongVideo } from "../lib/usePingPongVideo";

interface VideoThumbnailProps {
  videoUrl: string | null | undefined;
  posterUrl: string | null | undefined;
  aspect: string;
  color: string;
  title: string;
  category: string;
  onClick: () => void;
  onViewCaseStudy: () => void;
  client?: string;
  company?: string;
  software: string;
  video: string;
  timeline: string;
  description: string;
  lowDataMode?: boolean;
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

export default function VideoThumbnail({ 
  videoUrl, 
  posterUrl, 
  aspect, 
  color, 
  title, 
  category, 
  onClick,
  onViewCaseStudy,
  client,
  company,
  software,
  video,
  timeline,
  description,
  lowDataMode = false
}: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  usePingPongVideo(videoRef);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && videoRef.current && !lowDataMode && !getYouTubeId(videoUrl || video) && !getVimeoId(videoUrl || video)) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoUrl, video, lowDataMode, isMobile]);

  const activeVideo = videoUrl || video;
  const ytId = getYouTubeId(activeVideo);
  const vimeoId = getVimeoId(activeVideo);

  // Determine if we should attempt video rendering (only on desktop and when low data mode is disabled)
  const renderInteractiveVideo = !lowDataMode && !isMobile;

  return (
    <motion.div 
      className="masonry-item group cursor-pointer font-sans"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      data-title={title}
      data-client={client || company || "Self-Initiated"}
      data-software={software}
      data-video={video}
      data-timeline={timeline}
      data-description={description}
    >
      <Backlight 
        className="relative overflow-hidden glass md:group-hover:border-white/30 transition-all duration-500"
        style={{ aspectRatio: aspect }}
        onClick={onViewCaseStudy}
        glowColor="rgba(0, 242, 254, 0.16)"
        size={350}
        blur={40}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 md:group-hover:opacity-40 transition-opacity z-10 pointer-events-none`} />
        
        {/* Dynamic Video Render (Supports low data and responsive mobile restrictions!) */}
        {renderInteractiveVideo ? (
          ytId ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[56.25vw] min-w-full min-h-full scale-[1.3] grayscale opacity-40 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title={title}
              />
            </div>
          ) : vimeoId ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[56.25vw] min-w-full min-h-full scale-[1.3] grayscale opacity-40 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700"
                frameBorder="0"
                allow="autoplay; fullscreen"
                title={title}
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={activeVideo || undefined}
              poster={posterUrl || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              className="thumbnail-media w-full h-full object-cover grayscale opacity-40 md:group-hover:opacity-80 md:group-hover:grayscale-0 transition-all duration-700"
            />
          )
        ) : (
          /* High-fidelity static poster/cover backing to enforce zero bandwidth consumption */
          <div className="absolute inset-0 flex flex-col justify-between p-6 z-0 bg-neutral-950/80">
            {activeVideo && !ytId && !vimeoId ? (
              <video
                src={activeVideo}
                poster={posterUrl || undefined}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-35"
              />
            ) : posterUrl ? (
              <img 
                src={posterUrl} 
                alt={title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-25 md:group-hover:opacity-40 transition-opacity duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent opacity-50" />
            )}
            
            <div className="flex justify-between items-start z-10 w-full">
              <span className="text-[8px] font-mono tracking-widest text-[#00f2fe]/80 uppercase">
                {category}
              </span>
              {lowDataMode && (
                <div className="glass px-2 py-0.5 border border-[#00f2fe]/20 text-[7px] font-mono font-bold text-[#00f2fe] uppercase tracking-wider rounded-sm shadow-sm select-none">
                  Data Save Active
                </div>
              )}
            </div>

            {/* Stylized geometric center icon to hint interactive launcher */}
            <div className={`my-auto mx-auto flex flex-col items-center justify-center gap-1 z-10 transition-opacity duration-300 ${isMobile ? "opacity-90" : "opacity-40 md:group-hover:opacity-100"}`}>
              <div className="w-12 h-12 rounded-full bg-neutral-950/80 border border-[#00f2fe]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.2)] md:group-hover:bg-[#00f2fe] md:group-hover:border-[#00f2fe] md:group-hover:text-black transition-all">
                <Play size={16} className="ml-1 fill-current text-[#00f2fe] md:group-hover:text-black" />
              </div>
              <span className="text-[8px] font-mono tracking-[0.2em] uppercase mt-1 text-white/80">
                {isMobile ? "Tap to view" : (lowDataMode ? "Click to play" : "Hover to stream")}
              </span>
            </div>

            <div className="text-[8px] font-mono opacity-25 uppercase tracking-widest z-10 select-none">
              M_AZAM_RENDER_ENG_26
            </div>
          </div>
        )}

        {/* Hover Controls Overlay - only on desktop */}
        <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-between p-6 z-20">
          <div className="flex justify-between items-start">
            <div className="glass px-3 py-1 text-[8px] font-bold tracking-widest uppercase">
              {category}
            </div>
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              title="Watch Showreel / Video"
            >
              <Maximize2 size={12} className="opacity-80 animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tighter leading-none">{title}</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 flex items-center gap-1.5">
                View Case Study <span className="text-white text-xs">→</span>
              </p>
            </div>
          </div>
        </div>
      </Backlight>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1 md:group-hover:text-white transition-colors">
            {title}
          </div>
          <div className="text-[10px] font-mono opacity-20 uppercase">
             {aspect.replace('/', ':')} / CINEMATIC 4K
          </div>
        </div>
      </div>
    </motion.div>
  );
}
