import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Play, ExternalLink } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import ProjectDetail from "./components/ProjectDetail.tsx";
import VideoThumbnail from "./components/VideoThumbnail.tsx";
import Lightbox from "./components/Lightbox.tsx";
import ContactModal from "./components/ContactModal.tsx";
import { Particles } from "./components/Particles.tsx";
import { KineticText } from "@/src/components/ui/kinetic-text";
import { usePingPongVideo } from "./lib/usePingPongVideo";

const PROJECTS = [
  {
    id: 1,
    title: "Social Media Post Design",
    category: "Graphic Design",
    aspect: "1/1",
    color: "from-indigo-500/20",
    videoUrl: null,
    posterUrl: null,
    company: "Vutto | Puneet Wheels | Self-Initiated",
    software: "Illustrator, Photoshop",
    video: "https://res.cloudinary.com/darldfhin/video/upload/v1781436727/Social_Media_Design_odmtoi.mp4",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "Marketing Campaigns built entirely from scratch to drive visual storytelling, boosting audience engagement and increasing digital sales metrics.",
    showTimeline: false,
    showGallery: true,
    galleryImages: [
      "public/images/Shalimar Post Design.jpg",
      "public/images/Artboard 1.jpg",
      "public/images/Incel_tourism.jpg",
      "public/images/Lady_gaga_poster.jpg",
      "public/images/Scooter_Inventory_carousel_S3.jpg",
      "public/images/REPS_IAFD.jpg",
      "public/images/Edited.jpg",
      "public/images/Cars.jpg",
      "public/images/commuter_Inventory_carousel_S3.jpg",
      "public/images/Diwali_PuneetTATA.jpg",
      "public/images/Matcha.jpg",
      "public/images/Navratri_D2.jpg",
      "public/images/Puneet TVS Dhanteras.jpg",
      "public/images/S1_HTD_9_16.jpg",
      "public/images/Sell_Commuter_S1.jpg",
      "public/images/Sell_Scooter_S2.jpg",
    ],
    galleryCaptions: [
      "Bespoke Shalimar Post Design Canvas",
      "Modern Grid Layout & Geometry Concept",
      "Creative Typography & Letterform Pairings",
      "Abstract Branding & Contrast Frame",
      "Visual Strategy and Color Palette Mockup",
      "Dynamic Social Feed Deliverable Mockup"
    ],
    workflowBrief: "Designing bespoke graphic grids, creative typography pairings, and multi-platform layouts to build a strong, high-contrast visual brand identity."
  },
   {   id: 2,
    title: "Logo | Animation",
    category: "Motion Graphic",
    aspect: "16/9",
    color: "from-purple-500/20",
    videoUrl: null,
    posterUrl: null,
    client: "Freelance | Self Initiated",
    software: "After Effects",
    video: "https://res.cloudinary.com/darldfhin/video/upload/v1781956101/Logo-Animation_pmygu4.mp4",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "An atmospheric title sequence exploring time-dilation effects. We utilize macro-cinematography combined with extreme dynamic slow-motion editing.",
    showTimeline: false,
    showGallery: true,
    workflowBrief: "Developing fluid vector animation algorithms, perfecting spatial ease curves, and rendering high-contrast kinetic layouts to establish a memorable, motion-first brand identity.",
    galleryImages: [
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956150/Harry-Winston_logo-2_ztxpyh.png",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956150/mascot_1_nteldl.jpg",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956149/mascot-2_qadxbv.png",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956121/Harry-Winston_logo-3_mqrazj.png",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956116/minimal-logo_2023_3_wchbwz.jpg",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956116/minimal-logo_2023_1_toj7dd.jpg",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956115/nex-tech_logo-2_xahql9.png",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956116/Harry-Winston_logo-1_xti5zr.png",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956115/nex-tech_logo-4_ygzuc7.png",
      "https://res.cloudinary.com/darldfhin/image/upload/v1781956114/nex-tech_logo-1_umkyez.png",
    ],
    galleryCaptions: [
      "Luxury Brand Harry Winston | Fashion | Fashionable word mark",
      "Mascot Logo | Self Initiated | Brand personality building",
      "Mascot Logo | Self Initiated | Restaurant Brand personality building",
      "Luxury Brand Harry Winston | Fashion | Fashionable word mark",
      "Spoonful | A restaurant brand with spoon concept",
      "Minimal Logo | Self Initiated",
      "Nex Tech Logo | IT Services | Modern tech hexagon brand identity",
      "Luxury Brand Harry Winston | Fashion | Fashionable word mark",
      "Nex Tech Logo | IT Services | Modern tech hexagon brand identity",
      "Nex Tech Logo | IT Services | Modern tech hexagon brand identity"
    ],
  },
  {
    id: 3,
    title: "High Pace Video Editing",
    category: "Video Editing",
    aspect: "9/16",
    color: "from-emerald-500/20",
    videoUrl: null,
    posterUrl: null,
    client: "Viral Buzz | Designfins Studio",
    software: "After Effects, Premiere Pro, Gemini",
    video: "https://res.cloudinary.com/darldfhin/video/upload/v1781436243/High_Pace_Video_Editing_j4kvtw.mp4",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "Vertical brand identity for social platforms, focusing on rhythm and typography-driven storytelling that captures contemporary digital trends.",
    showTimeline: true,
    showGallery: true,
    galleryVideos: [
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289697/HJ_kids_effect_edit_with_filter_S2_V1_tjirza.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781290804/Revolt_AD_1_hkcm7j.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289695/Ranbhumi_Teaser_v5_g4wzmw.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781286883/Naman_Sir_Event_ive35v.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781286882/KMO_Cinemation_Women_1_dkwnym.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781286872/Dekho_Sharma_ji_ka_beta_incmjk.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781286872/Marks_Obssession_j8xpt2.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781292358/CBBTP_v2_zeeobq.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781292444/talking_head_V3_1_mbzjzn.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781292460/Womens_Day_v2_1_c98aup.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781293211/Daal_1_kjjf9w.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289715/Ranbhumi_Teaser_3_v1_ccgipa.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289728/WibhooX_Clean_Up_Drive_V2_smm8hp.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289698/Ranbhumi_Teaser_2_v7_loozli.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781444368/Hyrox_AA23_edit_V4_eooc44.mp4",
      
    ],
    galleryCaptions: [
      "Cinematic Voice-Over Portrait Flow",
      "Cyberpunk Synthwave Rhythm Cut",
      "Vibrant Color Correction Matrix",
      "Retro-Futuristic Motion Graphic Loop",
      "Tactile Sound SFX Alignment Cut",
      "High-Retention Multi-Angle Sequence"
    ],
    workflowBrief: "Developing dynamic caption systems, fine-tuning edit pacing to enhance viewer retention, and applying responsive zoom transitions for modern vertical feeds."
  },

  {
    id: 4,
    title: "Motion Graphics",
    category: "Video Editing",
    aspect: "9/16",
    color: "from-red-500/20",
    videoUrl: null,
    posterUrl: null,
    client: "Viral Buzz",
    software: "After Effects, Adobe Premiere Pro, Photoshop, Illustrator",
    video: "https://res.cloudinary.com/darldfhin/video/upload/v1781959847/Motion_Graphic_ujnwao.mp4",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "Interactive dashboard transitions and high-fidelity prototype animations designed to refine operational workflows for a scaling fintech application.",
    showTimeline: false,
    showGallery: true,
    workflowBrief: "Translating static interface layouts into smooth, interactive motion choreographies with customized cubic-bezier curves to enhance perceived responsiveness.",
    galleryVideos : [
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289608/Iphone_Ad_qx9kfs.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781293209/9_police_men_sentence_to_death_1_rdw3kt.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781293212/Deoriya_by_pass-_wxk1tq.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289649/Dushehra_q9b1dj.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781440425/Zindagi_ek_khoobsurat_tohfa_hai_rgp9wo.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781443217/eid_mubarak_scsbtv.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781289604/Bounce_bk3owo.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781443218/tea_post_with_music_wqhhpi.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781443219/Shampoo_Ad_qaximq.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781443216/Tablet_Ad_m2wg6s.mp4",
      "https://res.cloudinary.com/darldfhin/video/upload/v1781443708/Reel_1_S_v2_1_numoio.mp4"
    ],
    galleryCaptions: [
      "Self Initiated Project, with 3d Iphone in 2d space with ease curves and utilising the breathing pacing",
      "Generated images from gemini , make them into Videos and utilising the hanging rope using motion graphics",
      "from raw footages turned into motion graphic for realstate",
      "Motion for Dushehra Event it is my personal project",
      "Generated images from gemini , make them into Videos and utilising the hanging rope using motion graphics | Viral Buzz",
      "Motion for Eid Event it is my personal project",
      "A simple logo animation using effect and easing techniques",
      "a self initiated project turned static image into motion graphic",
      "a self initiated project turned static image into motion graphic",
      "a self initiated project turned static image into motion graphic for commercial just for testing easing",
      "from raw footages turned into motion graphic for realstate which got 35k organic views on insta",
    ]
  },
  /*  {
    id: 5,
    title: "Brand Guidelines",
    category: "Branding",
    aspect: "16/9",
    color: "from-amber-500/20",
    videoUrl: null,
    posterUrl: null,
    client: "Designfin Studio",
    software: "Illustrator, Photoshop, Gemini",
    video: "https://www.youtube.com/watch?v=wXis8jS-eic",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "An experimental 3D simulation exploring particle density, structural chaos, and controlled physical forces inside a closed virtual laboratory environment.",
    showTimeline: false,
    showGallery: true,
    galleryImages: [
      "https://images.unsplash.com/photo-1509343256512-d77a53778d6a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626785774625-ddc7c8241314?auto=format&fit=crop&q=80&w=800"
    ],
    galleryCaptions: [
      "Strict Typographical Grid Framework",
      "Visual Identity Cohesive Matrix",
      "Color Palette Structure Mapping",
      "Production Spec Guidelines Spec",
      "User Persona Research & Layouts",
      "Brand Collateral Asset Matrix Mockup"
    ],
    workflowBrief: "Constructing rigorous visual identity frameworks, defining strict typographical scale models, and supplying a cohesive palette matrix to support scalable global campaigns."
  },*/
/*  {
    id: 6,
    title: "Editorial Design",
    category: "Graphic Design",
    aspect: "16/9",
    color: "from-blue-500/20",
    videoUrl: null,
    posterUrl: null,
    client: "Communicadance",
    software: "Indesign, Photoshop, Illustrator",
    video: "https://www.youtube.com/watch?v=kGgLndfREno",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "Complex computational fluid dynamics and organic particle simulation. This study creates realistic interaction points for a narrative short film.",
    showTimeline: false,
    showGallery: true,
    workflowBrief: "Baking high-accuracy volumetric solvers, texturing cellular fluid vectors, and compositing raw simulation renders into seamless Cinematic-format overlays.",
    galleryImages: [
      "public/images/SAFANA Company Profile presentation A4 pdf.pdf",
      "",
      "",
    ],
    galleryCaptions: [
      "SAFANA Corporate Brand Profile - Editorial Design A4 Presentation"
    ]
  },*/

/*  {
    id: 7,
    title: "Package Design",
    category: "Design",
    aspect: "16/9",
    color: "from-purple-500/20",
    videoUrl: null,
    posterUrl: null,
    client: "Freelance",
    software: "Photoshop, Illustrator",
    video: "https://www.youtube.com/watch?v=CH7nB61F6I0",
    timeline: "https://www.reddit.com/r/editors/comments/1dhit3q/how_do_you_take_a_super_highresolution_screenshot/",
    description: "An atmospheric title sequence exploring time-dilation effects. We utilize macro-cinematography combined with extreme dynamic slow-motion editing.",
    showTimeline: true,
    showGallery: false,
    workflowBrief: "Stylizing visual contrast via HDR color-grading tables, syncing temporal drift effects to custom-engineered soundscapes, and perfecting cinematic titles."
  },*/
];

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

interface UniversalVideoBackgroundProps {
  url: string | null | undefined;
  lowDataMode?: boolean;
}

function UniversalVideoBackground({ url, lowDataMode }: UniversalVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const ytId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  usePingPongVideo(videoRef, !ytId && !vimeoId);

  if (lowDataMode) {
    return (
      <div className="absolute inset-0 bg-[#060608] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#0a0a0c] to-transparent opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.04)_0%,transparent_65%)]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="flex flex-col items-center gap-1 opacity-25 translate-y-8 select-none z-10 font-mono">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white font-bold">STREAM_STANDBY_LOW_DATA</span>
          <span className="text-[8px] tracking-[0.2em] text-[#00f2fe]/85 uppercase">Static frame active</span>
        </div>
      </div>
    );
  }

  if (!url) {
    // Elegant background placeholder back up
    return (
      <div className="absolute inset-0 bg-[#121212] flex items-center justify-center opacity-40">
        <span className="text-xs font-mono opacity-20">SHOWREEL_OFFLINE</span>
      </div>
    );
  }

  if (ytId) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[56.25vw] min-w-full min-h-full scale-[1.3] grayscale opacity-40"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Hero Showreel"
        />
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1&autoplay=1`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[56.25vw] min-w-full min-h-full scale-[1.3] grayscale opacity-40"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Hero Showreel"
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-full object-cover grayscale opacity-40 scale-105"
      poster={null}
    >
      <source src={url} type="video/mp4" />
    </video>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lowDataMode, setLowDataMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("low_data_mode");
    if (stored !== null) return stored === "true";
    
    // Auto-detect slow connection (2G, 3G or SaveData toggle in modern browser engines)
    if (typeof navigator !== "undefined" && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      if (conn.saveData) return true;
      if (conn.effectiveType === "2g" || conn.effectiveType === "3g") return true;
    }
    return false;
  });

  const toggleLowDataMode = () => {
    setLowDataMode((prev) => {
      const next = !prev;
      localStorage.setItem("low_data_mode", String(next));
      return next;
    });
  };

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<{
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
  } | null>(null);
  const [lightboxProjectId, setLightboxProjectId] = useState<number | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: "studio", label: "About Me", href: "#studio", action: null },
    { id: "work", label: "Work", href: "#work", action: null },
    { id: "contact", label: "Contact", href: null, action: () => { setIsContactOpen(true); setMobileMenuOpen(false); } },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Dynamic clean smooth-scroll navigation for anchor links (#work, #studio, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorNode = target.closest("a");
      if (!anchorNode) return;

      const href = anchorNode.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Reset case study state before scrolling block begins
          handleBack();
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, 100);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Javascript Intersection Observer trigger for CSS fade/slide reveals
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Scan elements with a slight delay to ensure correct initialization in dynamic pages
    const timeoutId = setTimeout(() => {
      const elementsToObserve = document.querySelectorAll(".reveal-fade, .reveal-slide-up");
      elementsToObserve.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const selectedProject = useMemo(() => 
    PROJECTS.find(p => p.id === selectedProjectId), 
  [selectedProjectId]);

  const lightboxProject = useMemo(() => 
    PROJECTS.find(p => p.id === lightboxProjectId), 
  [lightboxProjectId]);

  const handleProjectSelect = (id: number) => {
    const projectItem = PROJECTS.find(p => p.id === id);
    if (projectItem) {
      setTimeout(() => {
        const cardElements = document.querySelectorAll(".masonry-item");
        let matchedCard: HTMLElement | null = null;
        cardElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.dataset.title === projectItem.title) {
            matchedCard = htmlEl;
          }
        });

        if (matchedCard) {
          const dataset = (matchedCard as HTMLElement).dataset;
          setSelectedCaseStudy({
            id: id,
            title: dataset.title || "",
            client: dataset.client || "",
            software: dataset.software || "",
            video: dataset.video || "",
            timeline: dataset.timeline || "",
            description: dataset.description || "",
            category: projectItem.category,
            color: projectItem.color,
            showTimeline: projectItem.showTimeline !== false,
            showGallery: projectItem.showGallery,
            galleryImages: projectItem.galleryImages,
            galleryVideos: projectItem.galleryVideos,
            galleryCaptions: projectItem.galleryCaptions,
            workflowBrief: projectItem.workflowBrief
          });
        } else {
          setSelectedCaseStudy({
            id: id,
            title: projectItem.title,
            client: projectItem.client || projectItem.company,
            company: projectItem.company,
            software: projectItem.software,
            video: projectItem.video,
            timeline: projectItem.timeline,
            description: projectItem.description,
            category: projectItem.category,
            color: projectItem.color,
            showTimeline: projectItem.showTimeline !== false,
            showGallery: projectItem.showGallery,
            galleryImages: projectItem.galleryImages,
            galleryVideos: projectItem.galleryVideos,
            galleryCaptions: projectItem.galleryCaptions,
            workflowBrief: projectItem.workflowBrief
          });
        }
      }, 0);
    }
    setSelectedProjectId(id);
  };

  const handleBack = () => {
    setSelectedProjectId(null);
    setSelectedCaseStudy(null);
  };

  return (
    <div className="min-h-screen bg-charcoal selection:bg-white selection:text-black">
      {/* Main Home Page Content */}
      <div className="relative">
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center px-4 md:px-0">
          <motion.nav
            layout
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className={`pointer-events-auto flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
              scrolled
                ? "w-full max-w-lg px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-black/60 backdrop-blur-2xl border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.8)]"
                : "w-full max-w-5xl px-6 md:px-8 py-3.5 md:py-4 rounded-[60px] bg-[#0c0c0e]/30 backdrop-blur-xl border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_44px_rgba(0,0,0,0.5)]"
            } ${mobileMenuOpen ? "!rounded-3xl max-w-sm md:max-w-lg" : ""}`}
            style={{
              marginTop: scrolled ? "16px" : "24px"
            }}
          >
            {/* Header / Brand */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <span 
                className="text-sm font-black tracking-tighter uppercase cursor-pointer text-white hover:text-[#00f2fe] transition-colors duration-300"
                onClick={() => {
                  handleBack();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                M. Azam
              </span>
              
              {/* Mobile Menu Toggle Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-full text-white/70 hover:text-white transition-colors duration-200"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href || undefined}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    } else if (selectedProject) {
                      e.preventDefault();
                      handleBack();
                      setTimeout(() => {
                        const targetEl = document.getElementById(item.id);
                        if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="relative px-3.5 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors duration-300 rounded-full"
                >
                  {hoveredTab === item.id && (
                    <motion.span
                      layoutId="liquid-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.3)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Navigation Dropdown Panels (Expands Vertically) */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden md:hidden w-full flex flex-col gap-3 pt-4 border-t border-white/5 mt-3 animate-none"
                >
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={item.href || undefined}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        if (item.action) {
                          e.preventDefault();
                          item.action();
                        } else if (selectedProject) {
                          e.preventDefault();
                          handleBack();
                          setTimeout(() => {
                            const targetEl = document.getElementById(item.id);
                            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                      className="w-full text-left py-2 px-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>

        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal z-10" />
            <UniversalVideoBackground url="https://res.cloudinary.com/darldfhin/video/upload/v1781962216/Hero_Page_cvw4gf.mp4" lowDataMode={lowDataMode} />
          </div>

          <div className="relative z-20 w-full pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative justify-center"
            >
              <KineticText
                text="MOHD AZAM"
                as="h1"
                className="hero-text text-[6rem] tracking-[-5%] [font-optical-sizing:auto]"
              />
            </motion.div>

            <motion.div 
              className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="max-w-sm text-sm opacity-40 leading-relaxed uppercase tracking-wider">
                Started in coding, shifted to design & video editing.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-white/30" />
                <span className="text-[10px] font-mono opacity-60 tracking-widest">SHOWREEL '26</span>
                <button
                  onClick={() => setShowreelOpen(true)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors group"
                >
                  <Play size={16} fill="currentColor" className="ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="studio" className="px-6 md:px-12 py-24 border-y border-white/5 bg-[#080808] relative overflow-hidden">
          <Particles
            className="absolute inset-0 z-0 pointer-events-none opacity-30"
            quantity={lowDataMode ? 20 : 140}
            ease={80}
            color="#ffffff"
            refresh
          />
          <div className="max-w-4xl relative z-10">
            <h2 className="reveal-slide-up text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-12">About Me</h2>
            <div className="space-y-12">
              <p className="reveal-slide-up text-[22px] md:text-3xl font-light leading-snug tracking-tight">
                I am <span className="text-white font-medium italic">Mohammad Azam</span>, a professional video editor and graphic designer operating at the sharp end of digital media. With a Bachelor of Computer Applications degree and a Diploma of Advanced Media and Animation, my technical foundation is anchored in <span className="text-white font-medium italic">Adobe Premiere Pro and After Effects</span>. I specialize in transforming raw footage into high-impact narratives that thrive in the fast-paced ecosystems of top-tier agencies like <span className="opacity-60">Viral Buzz</span>, <span className="opacity-60">Designfin Studio</span>, and <span className="opacity-60">Communicadance</span>.
              </p>
              
              <p className="reveal-slide-up text-[17px] md:text-xl opacity-50 leading-relaxed" style={{ transitionDelay: "150ms" }}>
                My workflow is built for scale without sacrificing precision. I have a proven track record of high-velocity production, notably delivering <span className="text-white font-bold tracking-tighter">64 dynamic reels in a single month</span> while maintaining absolute control over pacing, visual rhythm, and brand impact. I don't just edit content; I engineer experiences that command attention.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section id="work" className="px-6 md:px-12 py-24 md:py-32">
          <div className="reveal-slide-up flex justify-between items-end mb-16">
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-4">Selected Work // 01-06</h2>
            </div>
            {/*<button 
              className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 group"
            >
              View Archive <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>*/}
          </div>

          <div className="masonry-grid font-sans">
            {PROJECTS.map((project, index) => (
              <div 
                key={project.id}
                className="reveal-slide-up"
                style={{ transitionDelay: `${(index % 3) * 150}ms` }}
              >
                <VideoThumbnail 
                  title={project.title}
                  category={project.category}
                  aspect={project.aspect}
                  color={project.color}
                  videoUrl={project.videoUrl}
                  posterUrl={project.posterUrl}
                  client={project.client}
                  company={project.company}
                  software={project.software}
                  video={project.video}
                  timeline={project.timeline}
                  description={project.description}
                  onClick={() => setLightboxProjectId(project.id)}
                  onViewCaseStudy={() => handleProjectSelect(project.id)}
                  lowDataMode={lowDataMode}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox 
          isOpen={!!lightboxProject || showreelOpen}
          onClose={() => {
            setLightboxProjectId(null);
            setShowreelOpen(false);
          }}
          videoUrl={showreelOpen ? "https://res.cloudinary.com/darldfhin/video/upload/v1781962216/Hero_Page_cvw4gf.mp4" : (lightboxProject?.videoUrl || lightboxProject?.video || "")}
          title={showreelOpen ? "MOHD AZAM - SHOWREEL '26" : (lightboxProject?.title || "")}
        />

        {/* Footer */}
        <footer className="px-6 md:px-12 py-12 border-t border-white/5 bg-[#080808]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <span className="text-xl font-black tracking-tighter">MOHD. AZAM</span>
              <p className="text-sm opacity-40 leading-relaxed max-w-xs">
                Pushing the boundaries of visual storytelling through technical excellence and creative vision.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Connect</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a href="https://www.instagram.com/sayedsha0021/" className="hover:opacity-60 transition-opacity">Instagram</a>
                <a href="https://vimeo.com/user255769742" className="hover:opacity-60 transition-opacity">Vimeo</a>
                <a href="https://www.behance.net/azammohd2" className="hover:opacity-60 transition-opacity">Behance</a>
                <a href="www.linkedin.com/in/mohammad-azam-a56571173" className="hover:opacity-60 transition-opacity">LinkedIn</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Location</h4>
              <p className="text-sm opacity-60">
                Lucknow, India<br/>
                26.8467° N, 80.9462° E
              </p>
              <div className="pt-4">
                <a href="mailto:sayedsha0021@gmail.com" className="text-sm font-bold border-b border-white/20 pb-1 hover:border-white transition-colors">
                  sayedsha0021@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] font-mono opacity-20">
            <span>© 2024 MOHAMMAD AZAM. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8">
              <span>PRIVACY POLICY</span>
              <span>TERMS OF SERVICE</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Case Study Modal Overlay */}
      <ProjectDetail 
        project={selectedCaseStudy} 
        isOpen={!!selectedProjectId}
        onBack={handleBack} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}

