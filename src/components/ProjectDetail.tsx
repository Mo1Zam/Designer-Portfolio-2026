import { motion, AnimatePresence } from "motion/react";
import { X, Cpu, Target, Plus, Trash2, UploadCloud, Image, Eye, EyeOff, Edit, Volume2, VolumeX, Maximize2, FileText, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurFade } from "./BlurFade";
import { cn } from "../../lib/utils";
import { usePingPongVideo } from "../lib/usePingPongVideo";
import BookReader from "./BookReader";

function getCleanUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("public/")) {
    return "/" + trimmed.substring(7);
  }
  return trimmed;
}

interface ProjectDetailProps {
  project: {
    id: number | string;
    title: string;
    category: string;
    description: string;
    color: string;
    client?: string;
    company?: string;
    software?: string;
    video?: string;
    timeline?: string;
    showTimeline?: boolean;
    showGallery?: boolean;
    galleryImages?: string[];
    galleryVideos?: string[];
    galleryCaptions?: string[];
    workflowBrief?: string;
  } | null;
  isOpen: boolean;
  onBack: () => void;
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

interface GalleryVideoItemProps {
  vidUrl: string;
  index: number;
  initialCaption: string;
  isUnmuted: boolean;
  onToggleMute: () => void;
  onEnlarge?: (aspect?: "portrait" | "landscape") => void;
}

function GalleryVideoItem({
  vidUrl,
  index,
  initialCaption,
  isUnmuted,
  onToggleMute,
  onEnlarge,
}: GalleryVideoItemProps) {
  const [aspectRatio, setAspectRatio] = useState<"portrait" | "landscape">("portrait");
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "150px", // Pre-boot video slightly before it scrolls fully into view for responsive behavior
        threshold: 0.1,
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting) {
      if (!isMobile) {
        video.play().catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isIntersecting, isMobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      if (width > height) {
        setAspectRatio("landscape");
      } else {
        setAspectRatio("portrait");
      }
    }
  };

  return (
    <BlurFade
      delay={0.15 + index * 0.05}
      inView
      className="break-inside-avoid mb-3 md:mb-6 w-full inline-block transition-all duration-500 ease-in-out"
    >
      <div
        className={cn(
          "relative overflow-hidden group border border-white/5 bg-neutral-950/40 rounded-none cursor-pointer transition-all duration-500",
          aspectRatio === "landscape" ? "aspect-video" : "aspect-[9/16]"
        )}
        onClick={() => {
          onEnlarge?.(aspectRatio);
        }}
      >
        <video
          ref={videoRef}
          src={vidUrl}
          loop
          playsInline
          muted={!isUnmuted}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full object-cover brightness-95 transition-all duration-700 ease-out md:group-hover:scale-[1.02]"
        />

        {/* Elegant Play Button Overlay - styled like a social media post */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-all duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#00f2fe] shadow-[0_0_25px_rgba(0,242,254,0.3)] transition-all duration-300 md:group-hover:scale-110 md:group-hover:bg-neutral-950 md:group-hover:border-[#00f2fe]">
            <Play size={18} className="md:w-6 md:h-6 ml-1 fill-current" />
          </div>
        </div>

        {/* Hover Caption Overlay - only on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-350 hidden md:flex flex-col justify-end p-6 select-none">
          <span className="text-[9px] font-mono text-[#00f2fe]/90 mb-1">
            {aspectRatio === "landscape" ? `GALLERY_CLIP_WIDE_0${index + 1}` : `GALLERY_CLIP_PORTRAIT_0${index + 1}`}
          </span>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {initialCaption}
          </h4>
          <p className="text-[8px] font-mono text-[#00f2fe]/50 opacity-0 md:group-hover:opacity-100 transition-opacity mt-0.5 animate-pulse">
            Click to play in fullscreen with audio
          </p>
        </div>
      </div>
    </BlurFade>
  );
}

// Brand accurate colors and abbreviations for professional video production softwares
const SOFTWARE_MAP: Record<string, { short: string; bg: string; text: string; border: string; fullName: string; glow: string }> = {
  "after effects": {
    short: "Ae",
    bg: "bg-[#00061e]/85",
    text: "text-[#3fa6ff]",
    border: "border-[#002f8c]/40",
    fullName: "Adobe After Effects",
    glow: "shadow-[0_0_12px_rgba(63,166,255,0.1)] hover:shadow-[0_0_24px_rgba(63,166,255,0.35)] hover:border-[#3fa6ff]/60"
  },
  "adobe after effects": {
    short: "Ae",
    bg: "bg-[#00061e]/85",
    text: "text-[#3fa6ff]",
    border: "border-[#002f8c]/40",
    fullName: "Adobe After Effects",
    glow: "shadow-[0_0_12px_rgba(63,166,255,0.1)] hover:shadow-[0_0_24px_rgba(63,166,255,0.35)] hover:border-[#3fa6ff]/60"
  },
  "premiere pro": {
    short: "Pr",
    bg: "bg-[#11001c]/85",
    text: "text-[#e056fd]",
    border: "border-[#520082]/40",
    fullName: "Adobe Premiere Pro",
    glow: "shadow-[0_0_12px_rgba(224,86,253,0.1)] hover:shadow-[0_0_24px_rgba(224,86,253,0.35)] hover:border-[#e056fd]/60"
  },
  "adobe premiere pro": {
    short: "Pr",
    bg: "bg-[#11001c]/85",
    text: "text-[#e056fd]",
    border: "border-[#520082]/40",
    fullName: "Adobe Premiere Pro",
    glow: "shadow-[0_0_12px_rgba(224,86,253,0.1)] hover:shadow-[0_0_24px_rgba(224,86,253,0.35)] hover:border-[#e056fd]/60"
  },
  "photoshop": {
    short: "Ps",
    bg: "bg-[#000b1d]/85",
    text: "text-[#00c5ff]",
    border: "border-[#003882]/40",
    fullName: "Adobe Photoshop",
    glow: "shadow-[0_0_12px_rgba(0,197,255,0.1)] hover:shadow-[0_0_24px_rgba(0,197,255,0.35)] hover:border-[#00c5ff]/60"
  },
  "adobe photoshop": {
    short: "Ps",
    bg: "bg-[#000b1d]/85",
    text: "text-[#00c5ff]",
    border: "border-[#003882]/40",
    fullName: "Adobe Photoshop",
    glow: "shadow-[0_0_12px_rgba(0,197,255,0.1)] hover:shadow-[0_0_24px_rgba(0,197,255,0.35)] hover:border-[#00c5ff]/60"
  },
  "illustrator": {
    short: "Ai",
    bg: "bg-[#1d0b00]/85",
    text: "text-[#ff9300]",
    border: "border-[#7c3800]/40",
    fullName: "Adobe Illustrator",
    glow: "shadow-[0_0_12px_rgba(255,147,0,0.1)] hover:shadow-[0_0_24px_rgba(255,147,0,0.35)] hover:border-[#ff9300]/60"
  },
  "adobe illustrator": {
    short: "Ai",
    bg: "bg-[#1d0b00]/85",
    text: "text-[#ff9300]",
    border: "border-[#7c3800]/40",
    fullName: "Adobe Illustrator",
    glow: "shadow-[0_0_12px_rgba(255,147,0,0.1)] hover:shadow-[0_0_24px_rgba(255,147,0,0.35)] hover:border-[#ff9300]/60"
  },
  "figma": {
    short: "Fg",
    bg: "bg-[#180a0a]/85",
    text: "text-[#ff5223]",
    border: "border-[#6b1814]/40",
    fullName: "Figma",
    glow: "shadow-[0_0_12px_rgba(255,82,35,0.1)] hover:shadow-[0_0_24px_rgba(255,82,35,0.35)] hover:border-[#ff5223]/60"
  },
  "gemini": {
    short: "Ge",
    bg: "bg-[#02181c]/85",
    text: "text-[#00f2fe]",
    border: "border-[#00525b]/40",
    fullName: "Google Gemini AI",
    glow: "shadow-[0_0_12px_rgba(0,242,254,0.1)] hover:shadow-[0_0_24px_rgba(0,242,254,0.35)] hover:border-[#00f2fe]/60"
  }
};

const SOFTWARE_ICONS: Record<string, string> = {
  "after effects": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(144,68,255,0.15)] hover:shadow-[0_0_24px_rgba(144,68,255,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#030010" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#9044FF" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#ae-grad)" />
      <defs>
        <linearGradient id="ae-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14002D" />
          <stop offset="100%" stop-color="#04000C" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#E4C1FF" text-anchor="middle" letter-spacing="-0.5">Ae</text>
    </svg>
  `,
  "adobe after effects": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(144,68,255,0.15)] hover:shadow-[0_0_24px_rgba(144,68,255,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#030010" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#9044FF" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#ae-grad)" />
      <defs>
        <linearGradient id="ae-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14002D" />
          <stop offset="100%" stop-color="#04000C" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#E4C1FF" text-anchor="middle" letter-spacing="-0.5">Ae</text>
    </svg>
  `,
  "premiere pro": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(224,86,253,0.15)] hover:shadow-[0_0_24px_rgba(224,86,253,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#05000C" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#e056fd" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#pr-grad)" />
      <defs>
        <linearGradient id="pr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1B0030" />
          <stop offset="100%" stop-color="#070014" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#FFC9FE" text-anchor="middle" letter-spacing="-0.5">Pr</text>
    </svg>
  `,
  "adobe premiere pro": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(224,86,253,0.15)] hover:shadow-[0_0_24px_rgba(224,86,253,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#05000C" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#e056fd" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#pr-grad)" />
      <defs>
        <linearGradient id="pr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1B0030" />
          <stop offset="100%" stop-color="#070014" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#FFC9FE" text-anchor="middle" letter-spacing="-0.5">Pr</text>
    </svg>
  `,
  "photoshop": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(0,197,255,0.15)] hover:shadow-[0_0_24px_rgba(0,197,255,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#000615" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#00C5FF" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#ps-grad)" />
      <defs>
        <linearGradient id="ps-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#001430" />
          <stop offset="100%" stop-color="#000410" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#A8EBFF" text-anchor="middle" letter-spacing="-0.5">Ps</text>
    </svg>
  `,
  "adobe photoshop": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(0,197,255,0.15)] hover:shadow-[0_0_24px_rgba(0,197,255,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#000615" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#00C5FF" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#ps-grad)" />
      <defs>
        <linearGradient id="ps-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#001430" />
          <stop offset="100%" stop-color="#000410" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#A8EBFF" text-anchor="middle" letter-spacing="-0.5">Ps</text>
    </svg>
  `,
  "illustrator": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(255,147,0,0.15)] hover:shadow-[0_0_24px_rgba(255,147,0,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#0D0600" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#FF9300" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#ai-grad)" />
      <defs>
        <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2D1400" />
          <stop offset="100%" stop-color="#0F0300" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#FFE5C2" text-anchor="middle" letter-spacing="-0.5">Ai</text>
    </svg>
  `,
  "adobe illustrator": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(255,147,0,0.15)] hover:shadow-[0_0_24px_rgba(255,147,0,0.45)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#0D0600" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="#FF9300" stroke-width="1.5" opacity="0.6" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#ai-grad)" />
      <defs>
        <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2D1400" />
          <stop offset="100%" stop-color="#0F0300" />
        </linearGradient>
      </defs>
      <text x="24" y="31.5" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#FFE5C2" text-anchor="middle" letter-spacing="-0.5">Ai</text>
    </svg>
  `,
  "figma": `
    <svg viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(255,82,35,0.15)] hover:shadow-[0_0_24px_rgba(255,82,35,0.45)] transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#1C1C1C" />
      <g transform="translate(14, 8)">
        <path d="M 5, 0 a 5,5 0 0,0 -5,5 a 5,5 0 0,0 5,5 h 5 v -10 z" fill="#F24E1E" />
        <path d="M 15, 0 a 5,5 0 0,0 -5,5 v 5 h 5 a 5,5 0 0,0 5,-5 a 5,5 0 0,0 -5,-5 z" fill="#FF7262" />
        <path d="M 5, 10 a 5,5 0 0,0 -5,5 a 5,5 0 0,0 5,5 h 5 v -10 z" fill="#A259FF" />
        <circle cx="15" cy="15" r="5" fill="#1ABC9C" />
        <path d="M 5, 20 a 5,5 0 0,0 -5,5 a 5,5 0 0,0 5,5 a 5,5 0 0,0 5,-5 v -5 z" fill="#5551FF" />
      </g>
    </svg>
  `,
  "gemini": `
    <svg viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(36,107,253,0.15)] hover:shadow-[0_0_24px_rgba(36,107,253,0.45)] transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#040914" />
      <path d="M24,7 C24,16.5 16.5,24 7,24 C16.5,24 24,31.5 24,41 C24,31.5 31.5,24 41,24 C31.5,24 24,16.5 24,7 Z" fill="url(#gemini-grad)" />
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9BC5FF" />
          <stop offset="30%" stop-color="#246BFD" />
          <stop offset="70%" stop-color="#E289FF" />
          <stop offset="100%" stop-color="#FFBD9B" />
        </linearGradient>
      </defs>
    </svg>
  `
};

const getFallbackIcon = (name: string) => {
  const short = (name.match(/\b\w/g) || [name[0], name[1] || '']).join("").substring(0, 2).toUpperCase();
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full rounded-sm shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all duration-300">
      <rect width="48" height="48" rx="8" fill="#0A0A0A" />
      <rect x="1" y="1" width="46" height="46" rx="7" fill="none" stroke="hsl(${hue}, 80%, 50%)" stroke-width="1.5" opacity="0.4" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="5.5" fill="url(#fallback-grad-${hue})" />
      <defs>
        <linearGradient id="fallback-grad-${hue}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="hsl(${hue}, 90%, 12%)" />
          <stop offset="100%" stop-color="hsl(${hue}, 90%, 4%)" />
        </linearGradient>
      </defs>
      <text x="24" y="31" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="hsl(${hue}, 90%, 80%)" text-anchor="middle" letter-spacing="-0.5">${short}</text>
    </svg>
  `;
};

export default function ProjectDetail({ project, isOpen, onBack }: ProjectDetailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const enlargedVideoRef = useRef<HTMLVideoElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);
  const [enlargedVideo, setEnlargedVideo] = useState<{ url: string; caption: string; aspect?: "portrait" | "landscape" } | null>(null);
  const [enlargedPdf, setEnlargedPdf] = useState<{ url: string; caption: string } | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; caption: string; index: number } | null>(null);

  usePingPongVideo(videoRef, isOpen);
  usePingPongVideo(enlargedVideoRef, !!enlargedVideo);

  useEffect(() => {
    if (project) {
      setShowGallery(!!project.showGallery);
      setImages((project.galleryImages || []).filter(img => img && img.trim() !== ""));
      setVideos(project.project?.galleryVideos || (project as any).galleryVideos || []);
      setUnmutedIndex(null);
      setEnlargedVideo(null);
      setEnlargedPdf(null);
      setEnlargedImage(null);
      
      const stored = localStorage.getItem(`gallery_captions_${project.id}`);
      const fallbackCaptions = project.galleryCaptions || [];
      const totalItemsLength = Math.max((project.galleryImages || []).length, (project.project?.galleryVideos || (project as any).galleryVideos || []).length);
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length === totalItemsLength) {
            setCaptions(parsed);
          } else {
            setCaptions(fallbackCaptions);
          }
        } catch (e) {
          setCaptions(fallbackCaptions);
        }
      } else {
        setCaptions(fallbackCaptions);
      }
    }
  }, [project]);

  // Escape key handler to close enlarged video overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEnlargedVideo(null);
        setEnlargedPdf(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSaveCaption = (index: number, value: string) => {
    if (!project) return;
    const updated = [...captions];
    while (updated.length <= index) {
      updated.push("");
    }
    updated[index] = value;
    setCaptions(updated);
    localStorage.setItem(`gallery_captions_${project.id}`, JSON.stringify(updated));
    setEditingIndex(null);
  };

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

  // JS Dynamic Injection when modal is opened and project data changes
  useEffect(() => {
    if (isOpen && project) {
      // 1. Text content injection
      const titleEl = document.querySelector(".modal-title");
      if (titleEl) titleEl.textContent = project.title || "";

      const descEl = document.querySelector(".modal-desc");
      if (descEl) descEl.textContent = project.description || "";

      const clientEl = document.querySelector(".modal-client");
      if (clientEl) clientEl.textContent = project.client || project.company || "Self-Initiated";

      const categoryEl = document.querySelector(".modal-category");
      if (categoryEl) categoryEl.textContent = project.category || "Design / Motion";

      const idEl = document.querySelector(".modal-id");
      if (idEl) idEl.textContent = `ID_00${project.id}`;

      const workflowBriefEl = document.querySelector(".modal-workflow-brief");
      if (workflowBriefEl) {
        workflowBriefEl.textContent = project.workflowBrief || "Utilizing standard tools inside high-efficiency pipelines for rapid rendering, cinematic precision and seamless media delivery.";
      }



      // 2. Software tag injection
      const softwareEl = document.querySelector(".modal-software");
      if (softwareEl) {
        softwareEl.innerHTML = "";
        const list = (project.software || "").split(",").map(s => s.trim()).filter(Boolean);
        if (list.length === 0) list.push("Premiere Pro", "After Effects");
        list.forEach(item => {
          const normalized = item.toLowerCase();
          const fullName = SOFTWARE_MAP[normalized]?.fullName || item;
          const svgContent = SOFTWARE_ICONS[normalized] || getFallbackIcon(item);
          
          const div = document.createElement("div");
          // Beautiful signature square app tile utilizing the latest high-fidelity vector icons
          div.className = `w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-300 select-none cursor-help relative group active:scale-95`;
          div.setAttribute("title", fullName);
          
          div.innerHTML = `
            ${svgContent}
            <span class="absolute bottom-full mb-2.5 hidden group-hover:block bg-black/95 text-[8px] font-mono tracking-widest text-[#00f2fe] uppercase px-2 py-1 border border-[#00f2fe]/20 whitespace-nowrap shadow-xl z-50 pointer-events-none">
              ${fullName}
            </span>
          `;
          softwareEl.appendChild(div);
        });
      }



      // 4. Video player src update and load
      const videoEl = document.querySelector(".modal-video") as HTMLVideoElement;
      const containerEl = document.querySelector(".modal-video-container");
      
      if (videoEl && containerEl) {
        const url = project.video || "";
        const ytId = getYouTubeId(url);
        const vimeoId = getVimeoId(url);

        // Clear out any previous dynamic iframe elements first
        const existingIframe = containerEl.querySelector(".modal-iframe");
        if (existingIframe) {
          existingIframe.remove();
        }

        if (ytId) {
          videoEl.style.display = "none";
          videoEl.pause();

          const iframe = document.createElement("iframe");
          iframe.className = "modal-iframe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[56.25vw] min-w-full min-h-full scale-[1.3] grayscale opacity-50 pointer-events-none";
          iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allow", "autoplay; encrypted-media");
          containerEl.appendChild(iframe);
        } else if (vimeoId) {
          videoEl.style.display = "none";
          videoEl.pause();

          const iframe = document.createElement("iframe");
          iframe.className = "modal-iframe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[56.25vw] min-w-full min-h-full scale-[1.3] grayscale opacity-50 pointer-events-none";
          iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1&autoplay=1`;
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
          containerEl.appendChild(iframe);
        } else {
          videoEl.style.display = "block";
          videoEl.src = url;
          try {
            videoEl.load();
            videoEl.play().catch(() => {});
          } catch (e) {
            // Ignore error
          }
        }
      }
    }
  }, [isOpen, project]);

  // Keyboard navigation for enlarged image gallery lightbox
  useEffect(() => {
    if (!enlargedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEnlargedImage(null);
      } else if (e.key === "ArrowLeft") {
        // Go to previous image
        const prevIdx = (enlargedImage.index - 1 + images.length) % images.length;
        const prevUrl = images[prevIdx];
        const prevCaption = captions[prevIdx] || project?.galleryCaptions?.[prevIdx] || "Production Deliverable";
        setEnlargedImage({ url: getCleanUrl(prevUrl), caption: prevCaption, index: prevIdx });
      } else if (e.key === "ArrowRight") {
        // Go to next image
        const nextIdx = (enlargedImage.index + 1) % images.length;
        const nextUrl = images[nextIdx];
        const nextCaption = captions[nextIdx] || project?.galleryCaptions?.[nextIdx] || "Production Deliverable";
        setEnlargedImage({ url: getCleanUrl(nextUrl), caption: nextCaption, index: nextIdx });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedImage, images, captions, project]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-[#0a0a0a] overflow-y-auto overflow-x-hidden scrollbar-hide"
        >
          {/* Fixed Close Button */}
          <div className="fixed top-6 right-6 z-[310]" style={{ pointerEvents: (enlargedVideo || enlargedPdf) ? "none" : "auto" }}>
            <button 
              onClick={(e) => {
                if (enlargedVideo || enlargedPdf) {
                  e.stopPropagation();
                  return;
                }
                onBack();
              }}
              className="lightbox-btn group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="relative w-full text-white">
            {/* 1. Full-width Hero Container */}
            <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${project?.color || "from-purple-500/20"} opacity-20 z-0`} />
              
              {/* Wide Hero Placeholder (Final Looping Video HTML template - starts blank) */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#111] modal-video-container">
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  className="modal-video w-full h-full object-cover grayscale opacity-50"
                  poster={undefined}
                >
                  <source src={undefined} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <span className="text-[20vw] font-black italic uppercase tracking-tighter mix-blend-overlay">HERO_EDIT</span>
                </div>
              </div>

              <div className="absolute bottom-12 left-6 md:left-12 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 flex items-center gap-4">
                    <span className="modal-category"></span>
                    <div className="h-[1px] w-12 bg-white/20" />
                    <span className="modal-id"></span>
                  </div>
                  <h1 className="modal-title text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85]"></h1>
                </motion.div>
              </div>
            </section>

            {/* 2. Two-Column 'Project Brief' Section */}
            <section className="px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 border-b border-white/5">
              <div className="space-y-8">
                <div className="flex items-center gap-4 opacity-30">
                  <Target size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Column A // Objectives</span>
                </div>
                <div>
                  <h2 className="text-[28px] md:text-3xl font-light tracking-tight mb-6">Brief & Production Metrics</h2>
                  <p className="modal-desc text-[17px] md:text-lg opacity-50 leading-relaxed max-w-xl"></p>
                </div>
                <div className="pt-8">
                  <div className="text-[10px] font-mono opacity-20 uppercase mb-2">Client / Agency Name</div>
                  <div className="modal-client text-[20px] md:text-xl font-light tracking-tight"></div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4 opacity-30">
                  <Cpu size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Column B // Software & Stack</span>
                </div>
                <div className="space-y-6">
                  <p className="modal-workflow-brief text-[17px] md:text-lg opacity-50 leading-relaxed">
                    Utilizing standard tools inside high-efficiency pipelines for rapid rendering, cinematic precision and seamless media delivery.
                  </p>
                  <div className="modal-software flex flex-wrap gap-4">
                    {/* Empty target container for software tags */}
                  </div>
                </div>
              </div>
            </section>

            {/* 2.5 'Final Output Gallery' Section (Pinterest Masonry Style or Video Grid) */}
            {showGallery && (
              <section className="px-6 md:px-12 py-24 bg-[#050505] border-b border-white/5">
                {videos.length > 0 ? (
                  // Video Gallery Section
                  <>
                    <div className="mb-16 animate-fade-in">
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-6 font-mono text-[#00f2fe]/80">Motion Deliverables // Video Gallery</h2>
                      <p className="text-[34px] md:text-4xl font-light tracking-tight leading-tight max-w-2xl">High-fidelity final social clips, vertical edits, and master rendering sequences.</p>
                      <p className="text-xs font-mono text-white/40 mt-3 flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse"></span>
                        Click on any video clip to play in immersive theater mode
                      </p>
                    </div>

                     <div className="columns-2 lg:columns-3 gap-3 md:gap-6 [column-fill:_balance] w-full">
                      {videos.map((vidUrl, index) => {
                        const initialCaption = captions[index] || project?.galleryCaptions?.[index] || "Production Deliverable";
                        return (
                          <GalleryVideoItem
                            key={index}
                            vidUrl={vidUrl}
                            index={index}
                            initialCaption={initialCaption}
                            isUnmuted={unmutedIndex === index}
                            onToggleMute={() => {
                              setUnmutedIndex(unmutedIndex === index ? null : index);
                            }}
                            onEnlarge={(aspect) => {
                              setEnlargedVideo({ url: vidUrl, caption: initialCaption, aspect });
                            }}
                          />
                        );
                      })}
                    </div>
                  </>
                ) : (
                  // Default Image Gallery Section
                  <>
                    <div className="mb-16 animate-fade-in">
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-6 font-mono text-[#00f2fe]/80">Creative Deliverables // Final Output</h2>
                      <p className="text-[34px] md:text-4xl font-light tracking-tight leading-tight max-w-2xl">High-fidelity final static assets, vector layouts, and master canvases.</p>
                    </div>

                    {/* Pinterest Masonry Grid */}
                    {images.length > 0 && (
                      <div className="columns-2 lg:columns-3 gap-3 md:gap-6 [column-fill:_balance] w-full">
                        {images.map((imgUrl, index) => {
                          const initialCaption = captions[index] || project?.galleryCaptions?.[index] || "Production Deliverable";
                          const isEditing = editingIndex === index;
                          const isPdf = imgUrl.toLowerCase().endsWith(".pdf") || imgUrl.toLowerCase().includes(".pdf");

                          if (isPdf) {
                            return (
                              <BlurFade 
                                key={index} 
                                delay={0.15 + index * 0.05} 
                                inView
                                className="break-inside-avoid mb-3 md:mb-6 cursor-pointer"
                              >
                                <div 
                                  onClick={() => setEnlargedPdf({ url: getCleanUrl(imgUrl), caption: initialCaption })}
                                  className="relative overflow-hidden group border border-[#00f2fe]/10 hover:border-[#00f2fe]/40 rounded-none bg-neutral-950/80 p-8 flex flex-col justify-between hover:bg-[#0c0c0c] aspect-[3/4] transition-all duration-500 ease-out shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
                                >
                                  {/* Grid background pattern */}
                                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#00f2fe]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  
                                  {/* Top badges */}
                                  <div className="flex items-center justify-between z-10">
                                    <span className="text-[8px] font-mono tracking-[0.2em] text-[#00f2fe] uppercase border border-[#00f2fe]/20 px-2.5 py-1 bg-[#00f2fe]/5">
                                      PDF Document
                                    </span>
                                    <FileText size={18} className="text-[#00f2fe] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                                  </div>
                                  
                                  {/* Middle Visual Element */}
                                  <div className="flex flex-col items-center justify-center py-6 text-center z-10">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#00f2fe]/30 group-hover:bg-white/10 transition-all duration-500">
                                      <FileText size={24} className="text-[#00f2fe]" />
                                    </div>
                                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Interactive View</span>
                                    <span className="text-[8px] font-mono text-white/30 mt-1 uppercase tracking-widest">A4 Specification</span>
                                  </div>
                                  
                                  {/* Footer metadata info */}
                                  <div className="z-10 pt-4 border-t border-white/5">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00f2fe] transition-colors duration-300 truncate">
                                      {initialCaption}
                                    </h4>
                                    <div className="flex items-center justify-between mt-2.5">
                                      <span className="text-[8px] font-mono text-white/30 truncate max-w-[65%]">
                                        {imgUrl.split("/").pop()}
                                      </span>
                                      <span className="text-[8px] font-mono text-[#00f2fe]/80 group-hover:translate-x-1.5 transition-transform duration-350 flex items-center gap-1 font-bold">
                                        READ DOCUMENT &rarr;
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </BlurFade>
                            );
                          }

                           return (
                            <BlurFade 
                              key={index} 
                              delay={0.15 + index * 0.05} 
                              inView
                              className="break-inside-avoid mb-3 md:mb-6"
                            >
                              <div 
                                onClick={() => setEnlargedImage({ url: getCleanUrl(imgUrl), caption: initialCaption, index })}
                                className="relative overflow-hidden group border border-white/5 rounded-none bg-neutral-950/40 cursor-zoom-in"
                              >
                                <img 
                                  src={getCleanUrl(imgUrl)} 
                                  alt={initialCaption}
                                  className="w-full h-auto object-cover brightness-100 transition-all duration-700 ease-out group-hover:scale-[1.02]"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&q=80&w=800";
                                  }}
                                />
                                
                                {/* Hover Caption Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6 select-none">
                                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#00f2fe] group-hover:scale-110 transition-all duration-300">
                                    <Maximize2 size={12} />
                                  </div>
                                  <span className="text-[9px] font-mono text-[#00f2fe]/90 mb-1">{`WORK_CANVAS_0${index + 1}`}</span>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                    {initialCaption}
                                  </h4>
                                  <span className="text-[8px] font-mono text-white/30 mt-1 uppercase tracking-widest">
                                    Click to Enlarge
                                  </span>
                                </div>
                              </div>
                            </BlurFade>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </section>
            )}



            {/* Footer Section */}
            <section className="px-6 md:px-12 py-32 text-center border-t border-white/5 bg-[#0a0a0a]">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-20 mb-12">Case Study End // Next Project</h2>
              <div 
                onClick={onBack}
                className="group cursor-pointer inline-block"
              >
                <div className="overflow-hidden">
                  <motion.h3 
                    whileHover={{ y: "-100%" }}
                    className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter h-[1em] leading-none"
                  >
                    <div className="transition-transform duration-500">CHRONOS_02</div>
                    <div className="transition-transform duration-500 text-transparent stroke-white stroke-[1px] [-webkit-text-stroke:1px_white]">CHRONOS_02</div>
                  </motion.h3>
                </div>
                <div className="mt-12 flex items-center justify-center gap-6 opacity-40 group-hover:opacity-100 transition-all group-hover:gap-10">
                   <div className="w-12 h-[1px] bg-white" />
                   <span className="text-xs font-bold uppercase tracking-[0.3em]">Return to Gallery</span>
                   <div className="w-12 h-[1px] bg-white" />
                </div>
              </div>
            </section>
          </div>

          {/* Immersive Cinema Lightbox / Enlarged View for Horizontal Videos */}
          <AnimatePresence>
            {enlargedVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setEnlargedVideo(null);
                }}
              >
                {/* Close button in top-right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEnlargedVideo(null);
                  }}
                  className="absolute top-6 right-6 z-[510] p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#00f2fe] hover:bg-white/10 hover:border-[#00f2fe]/40 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Close Overlay"
                >
                  <X size={20} />
                </button>

                {/* Cinematic Video Player wrapper */}
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 28, stiffness: 220 }}
                  className={cn(
                    "relative bg-[#030303] border border-white/10 shadow-[0_0_80px_rgba(0,242,254,0.18)]",
                    enlargedVideo.aspect === "portrait"
                      ? "h-[65vh] sm:h-[75vh] aspect-[9/16]"
                      : "w-full max-w-5xl aspect-video"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    ref={enlargedVideoRef}
                    src={enlargedVideo.url}
                    autoPlay
                    controls
                    playsInline
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Caption details below */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="mt-6 text-center max-w-2xl px-4 select-none pointer-events-none"
                >
                  <span className="text-[9px] font-mono tracking-[0.4em] text-[#00f2fe] uppercase">
                    {enlargedVideo.aspect === "portrait" 
                      ? "Cinematic Presentation // Portrait Clip" 
                      : "Cinematic Presentation // Landscape Detail"}
                  </span>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-white mt-2">
                    {enlargedVideo.caption}
                  </h3>
                  <p className="text-[9px] font-mono text-white/40 mt-1">
                    Press ESC or click anywhere outside to close
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Immersive Gallery Lightbox / Enlarged View for Images */}
          <AnimatePresence>
            {enlargedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setEnlargedImage(null);
                }}
              >
                {/* Close button inside top-right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEnlargedImage(null);
                  }}
                  className="absolute top-6 right-6 z-[510] p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#00f2fe] hover:bg-white/10 hover:border-[#00f2fe]/40 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Close Overlay"
                >
                  <X size={20} />
                </button>

                {/* Left/Right Slider Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIdx = (enlargedImage.index - 1 + images.length) % images.length;
                        const prevUrl = images[prevIdx];
                        const prevCaption = captions[prevIdx] || project?.galleryCaptions?.[prevIdx] || "Production Deliverable";
                        setEnlargedImage({ url: getCleanUrl(prevUrl), caption: prevCaption, index: prevIdx });
                      }}
                      className="absolute left-4 md:left-8 z-[510] p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#00f2fe] hover:bg-white/10 hover:border-[#00f2fe]/40 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                      title="Previous Image"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = (enlargedImage.index + 1) % images.length;
                        const nextUrl = images[nextIdx];
                        const nextCaption = captions[nextIdx] || project?.galleryCaptions?.[nextIdx] || "Production Deliverable";
                        setEnlargedImage({ url: getCleanUrl(nextUrl), caption: nextCaption, index: nextIdx });
                      }}
                      className="absolute right-4 md:right-8 z-[510] p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#00f2fe] hover:bg-white/10 hover:border-[#00f2fe]/40 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                      title="Next Image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Cinematic Image Frame/Wrapper */}
                <motion.div
                  key={enlargedImage.url}
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ type: "spring", damping: 28, stiffness: 220 }}
                  className="relative max-w-full max-h-[72vh] md:max-h-[85vh] flex items-center justify-center bg-[#030303] border border-white/10 shadow-[0_0_80px_rgba(0,242,254,0.18)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={enlargedImage.url}
                    alt={enlargedImage.caption}
                    className="max-w-full max-h-[72vh] md:max-h-[85vh] object-contain select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  
                  {/* Slider Progress Indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 px-3 py-1 text-[9px] font-mono tracking-widest text-[#00f2fe] uppercase">
                    {`${enlargedImage.index + 1} / ${images.length}`}
                  </div>
                </motion.div>

                {/* Caption details below */}
                <motion.div
                  key={`caption-${enlargedImage.index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="mt-6 text-center max-w-2xl px-4 select-none pointer-events-none"
                >
                  <span className="text-[9px] font-mono tracking-[0.4em] text-[#00f2fe] uppercase">
                    Creative Review // Enlarged View
                  </span>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-white mt-1">
                    {enlargedImage.caption}
                  </h3>
                  <p className="text-[9px] font-mono text-white/40 mt-1 uppercase tracking-widest leading-none">
                    Use &larr; &rarr; arrows to switch • Press ESC or click outside to close
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Immersive PDF / Amazon Kindle Style Book Reader Overlay */}
          <BookReader 
            isOpen={!!enlargedPdf} 
            onClose={() => setEnlargedPdf(null)} 
            title={enlargedPdf?.caption || "SAFANA BRAND PROFILE"} 
            pdfUrl={enlargedPdf?.url || ""} 
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
