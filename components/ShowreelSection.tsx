"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">


          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Why Qllix? Because Your <em className="text-[#00FF87] not-italic">Growth is Our North Star</em>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Experience how obsessive craft and forward-thinking digital architecture converge to generate enterprise-grade momentum.
          </p>
        </div>

        {/* Video Showreel Container */}
        <div className="relative rounded-[32px] overflow-hidden border border-white/15 bg-[#0D0D12] shadow-2xl shadow-emerald-900/20 group">
          
          {/* Ambient Glowing border */}
          <div className="absolute -inset-[1px] rounded-[33px] bg-gradient-to-r from-emerald-500/30 via-[#00FF87]/40 to-emerald-500/30 blur-sm pointer-events-none -z-10" />

          {/* Video Player */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src="https://designmonks.b-cdn.net/DM%20Others/DM%20Showreel%202026.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Bar Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-[#00FF87] hover:text-[#02180C] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-slate-300" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#00FF87]" />
                  )}
                </button>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
                  <span>Qllix Agency Showreel 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
                  4K • 60 FPS
                </span>
              </div>
            </div>

            {/* Center Play Button on Hover/Pause */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#00FF87] text-[#02180C] flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform pointer-events-auto z-30 cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
