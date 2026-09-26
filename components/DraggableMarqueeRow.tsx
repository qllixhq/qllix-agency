"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play } from "lucide-react";
import { ShowcaseItem } from "./ShowcaseMediaModal";

interface DraggableMarqueeRowProps {
  items: ShowcaseItem[];
  direction?: "left" | "right";
  speed?: number;
  onItemClick: (item: ShowcaseItem) => void;
  rowId: string;
}

export default function DraggableMarqueeRow({
  items,
  direction = "left",
  speed = 0.65,
  onItemClick,
  rowId,
}: DraggableMarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const movedDistanceRef = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const scrollPosRef = useRef<number | null>(null);

  // Smooth continuous infinite auto-scroll loop with INSTANT start (0s delay)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pre-initialize scroll position with generous buffer to prevent wrap-around jumps on frame 0
    if (scrollPosRef.current === null) {
      const initialScroll = container.scrollWidth > 0 ? container.scrollWidth / 3 : 800;
      container.scrollLeft = initialScroll;
      scrollPosRef.current = initialScroll;
    }

    let animId: number;
    const moveStep = direction === "left" ? speed : -speed;

    const tick = () => {
      // Keep moving smoothly unless user is actively mouse-dragging / touch-dragging
      if (!isDownRef.current && container && scrollPosRef.current !== null) {
        scrollPosRef.current += moveStep;

        const halfScroll = container.scrollWidth / 2;
        if (halfScroll > 0) {
          if (scrollPosRef.current >= halfScroll) {
            scrollPosRef.current -= halfScroll;
          } else if (scrollPosRef.current <= 0) {
            scrollPosRef.current += halfScroll;
          }
        }
        
        container.scrollLeft = scrollPosRef.current;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDownRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
    movedDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    movedDistanceRef.current += Math.abs(walk);
    const targetScroll = scrollLeftStartRef.current - walk;
    container.scrollLeft = targetScroll;
    scrollPosRef.current = targetScroll;
  };

  const handleMouseUpOrLeave = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      setIsGrabbing(false);
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      // Keep movedDistanceRef positive for 60ms to prevent accidental card clicks
      setTimeout(() => {
        movedDistanceRef.current = 0;
      }, 60);
    }
  };

  // Touch handlers for mobile/tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDownRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
    movedDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    movedDistanceRef.current += Math.abs(walk);
    const targetScroll = scrollLeftStartRef.current - walk;
    container.scrollLeft = targetScroll;
    scrollPosRef.current = targetScroll;
  };

  const handleTouchEnd = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      setTimeout(() => {
        movedDistanceRef.current = 0;
      }, 60);
    }
  };

  const handleCardClick = (item: ShowcaseItem) => {
    // Only trigger modal preview if it was a distinct click, not a horizontal drag
    if (movedDistanceRef.current < 8) {
      onItemClick(item);
    }
  };

  // Quadruple items to ensure seamless infinite looping
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`flex items-center gap-3 sm:gap-4 overflow-x-hidden select-none cursor-grab active:cursor-grabbing w-full ${
        isGrabbing ? "cursor-grabbing" : ""
      }`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {duplicatedItems.map((item, idx) => {
        const isVideoUrl = (url?: string) => {
          if (!url) return false;
          return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov") || url.includes("video") || url.includes(".mp4?");
        };
        const videoSrc = item.video || (isVideoUrl(item.image) ? item.image : "");
        const isVideo = Boolean(videoSrc);

        return (
          <div
            key={`${rowId}-${item.id}-${idx}`}
            onClick={() => handleCardClick(item)}
            className="hero-marquee-card shrink-0 h-28 sm:h-36 md:h-40 lg:h-44 overflow-hidden cursor-pointer group relative rounded-xl sm:rounded-2xl transition-all duration-300"
            style={{ aspectRatio: item.aspectRatio || 1.4 }}
          >
            {/* Card Media: Autoplay Muted Video without sound or Image */}
            {isVideo ? (
              <video
                src={videoSrc}
                poster={item.image && !isVideoUrl(item.image) ? item.image : undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            )}

            {/* Video Play Indicator Badge */}
            {isVideo && (
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#00FF87] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#00FF87] group-hover:text-black transition-all">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            )}

            {/* Subtle Vignette & Emerald Hover Sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#00FF87]/12 transition-opacity duration-300 pointer-events-none" />

            {/* Hover Caption Overlay */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <p className="text-[11px] font-medium text-white line-clamp-1 drop-shadow-md">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
