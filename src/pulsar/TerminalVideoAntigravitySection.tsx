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
          {/* Pulsar Logo Pill on Top Left */}
          <div className="flex items-center gap-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 pointer-events-auto shadow-lg select-none">
            <img
              src="/pulsar-logo-light.png"
              alt="Pulsar"
              className="w-11 h-11 object-contain"
              style={{ width: "24px", height: "24px" }}
            />
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
