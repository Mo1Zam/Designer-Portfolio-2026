import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BacklightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  size?: number;
  blur?: number;
}

export function Backlight({
  children,
  className = "",
  glowColor = "rgba(0, 242, 254, 0.15)", // Premium cyber cyan glow by default matching Mohd Azam's site
  size = 350,
  blur = 0,
  ...props
}: BacklightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const cleanClassName = blur > 0 
    ? className.replace(/\boverflow-hidden\b/g, "overflow-visible") 
    : className;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group",
        blur > 0 ? "overflow-visible" : "overflow-hidden",
        cleanClassName
      )}
      {...props}
    >
      {/* Backlight Glow/Ambient Mode Layer */}
      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          // Expand the area so the blur doesn't get clipped by bounding box if overflow-visible is active
          ...(blur > 0 ? {
            top: `-${blur * 1.5}px`,
            left: `-${blur * 1.5}px`,
            right: `-${blur * 1.5}px`,
            bottom: `-${blur * 1.5}px`,
          } : {
            inset: 0
          })
        }}
      />

      {/* If blur > 0, render a secondary backup glow to make it super rich (just like real YouTube Ambient light) */}
      {blur > 0 && (
        <div
          className="absolute pointer-events-none transition-all duration-500 ease-out z-0"
          style={{
            opacity: isHovered ? 0.8 : 0,
            background: `radial-gradient(${size * 0.6}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
            filter: `blur(${blur / 2}px)`,
            inset: "-10px",
          }}
        />
      )}
      
      {/* Interactive dynamic outline highlighter in real-time */}
      {blur === 0 && (
        <div
          className="absolute pointer-events-none -inset-[1px] transition-opacity duration-300 ease-out z-0 rounded-[inherit] opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${size / 2}px circle at ${coords.x}px ${coords.y}px, rgba(0, 242, 254, 0.45), transparent 75%)`,
            maskImage: "linear-gradient(#fff, #fff) exclude, linear-gradient(#fff, #fff)",
            WebkitMaskImage: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Inner wrapper to isolate overflow for children while preserving overall card borders/rounds */}
      <div className={cn("relative z-10 w-full h-full", blur > 0 && "overflow-hidden rounded-[inherit]")}>
        {children}
      </div>
    </div>
  );
}

export default Backlight;
