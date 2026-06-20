import { useEffect } from "react";

/**
 * Custom React hook to manage elegant forward-only loop playback on videos.
 */
export function usePingPongVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean = true
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    // Set loop attribute to true for native continuous loop
    video.loop = true;

    // Fallback event listener to ensure seamless restart if native loop is blocked
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [enabled, videoRef]);
}
