"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface ShowcaseItem {
  id: string;
  title: string;
  image: string;
  aspectRatio?: number;
  video?: string;
  category?: string;
  description?: string;
}

interface ShowcaseMediaModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export default function ShowcaseMediaModal({
  item,
  onClose,
  onOpenBooking,
}: ShowcaseMediaModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isVideo = Boolean(item.video);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Deep Dark Glassmorphic Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

      {/* Pure Frame Hugging the Media's Exact Size & Aspect Ratio */}
      <div 
        className="relative z-10 max-w-[92vw] max-h-[88vh] flex items-center justify-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 sm:-top-12 sm:-right-2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer z-30 shadow-xl group"
          aria-label="Close preview"
        >
          <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {isVideo ? (
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(0,255,135,0.15)] bg-black flex items-center justify-center">
            <video
              src={item.video}
              controls
              autoPlay
              playsInline
              className="max-w-[92vw] max-h-[85vh] w-auto h-auto object-contain rounded-2xl sm:rounded-3xl"
            />
          </div>
        ) : (
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(0,255,135,0.15)] bg-transparent flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-w-[92vw] max-h-[85vh] w-auto h-auto object-contain rounded-2xl sm:rounded-3xl select-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
