"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function TerminalVideoAntigravitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Smooth scroll tracking without layout thrashing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 48%"],
  });

  // Spring smoothing to completely remove scroll-wheel stutter / "stucking"
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
    restDelta: 0.001,
  });

  // GPU-accelerated transform: scales from compact ~680px preview (scale: 0.65)
  // to well-proportioned widescreen stage (scale: 1.0, max 1080px)
  const videoScale = useTransform(smoothProgress, [0, 1], [0.65, 1.0]);
  const videoRadius = useTransform(smoothProgress, [0, 1], [28, 16]);
  const videoShadow = useTransform(
    smoothProgress,
    [0, 1],
    [
      "0 12px 30px -5px rgba(0, 0, 0, 0.12)",
      "0 32px 70px -12px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(0, 0, 0, 0.08)",
    ]
  );

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1080px] mx-auto mt-20 sm:mt-28 md:mt-36 pt-6 sm:pt-10 z-10 flex flex-col items-center px-4 sm:px-6"
    >
      {/* Video Container Stage: Expands smoothly via GPU transform without reflow or stuttering */}
      <motion.div
        style={{
          scale: videoScale,
          borderRadius: videoRadius,
          boxShadow: videoShadow,
          transformOrigin: "top center",
          willChange: "transform",
        }}
        onClick={togglePlayPause}
        className="group relative z-10 w-full aspect-video overflow-hidden bg-neutral-950 border border-neutral-300/80 cursor-pointer mt-4 sm:mt-6"
      >
        {/* Main Video */}
        <video
          ref={videoRef}
          src="/pulsar-launch-with-music.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover select-none"
        />

        {/* Top Bar of the Video: Google Icons (Left) & Increased Unmute Icon (Right) */}
        <div className="absolute top-5 left-5 right-5 sm:top-7 sm:left-7 sm:right-7 z-30 flex items-center justify-between pointer-events-none">
          {/* Google 4-Color Icons on Top Left */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 pointer-events-auto shadow-lg">
            {/* Google G Logo */}
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0" aria-label="Google">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {/* Google 4-Color Dots */}
            <div className="flex items-center gap-1.5 ml-0.5">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            </div>
          </div>

          {/* Increased Unmute / Sound Icon (Large, prominent) */}
          <button
            type="button"
            onClick={toggleSound}
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/25 transition-all shadow-lg hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>

        {/* Center of the Video: Prominent Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.button
            type="button"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className={`pointer-events-auto w-18 h-18 sm:w-22 sm:h-22 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-2xl cursor-pointer ${
              isPlaying
                ? "bg-black/35 hover:bg-black/60 text-white border border-white/25 opacity-0 group-hover:opacity-100"
                : "bg-white/95 hover:bg-white text-neutral-950 border border-white shadow-[0_0_40px_rgba(255,255,255,0.45)] opacity-100 scale-100"
            }`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1.5" />
                <rect x="14" y="4" width="4" height="16" rx="1.5" />
              </svg>
            ) : (
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 text-neutral-950"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
