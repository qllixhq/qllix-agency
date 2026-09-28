"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Quote, Star, VolumeX } from "lucide-react";
import { AgencyTestimonial } from "@/lib/cmsStore";

export default function TestimonialsCarousel({ testimonials }: { testimonials: AgencyTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const previousActiveIndex = useRef(0);
  // Keep the full seven-card composition even while the admin has fewer than seven testimonials.
  // These are display-only repetitions, not additional client records.
  const displayTestimonials = testimonials.length >= 7
    ? testimonials
    : Array.from({ length: 7 }, (_, index) => testimonials[index % testimonials.length]);

  useEffect(() => {
    if (activeIndex >= displayTestimonials.length) setActiveIndex(0);
  }, [activeIndex, displayTestimonials.length]);

  useEffect(() => {
    previousActiveIndex.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (displayTestimonials.length < 2 || isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % displayTestimonials.length), 5000);
    return () => window.clearInterval(timer);
  }, [displayTestimonials.length, isPaused]);

  useEffect(() => {
    const activeId = `${displayTestimonials[activeIndex]?.id}-${activeIndex}`;
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;
      if (id === activeId) {
        video.muted = true;
        video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, displayTestimonials]);

  const goTo = (index: number) => {
    if (displayTestimonials.length > 0) setActiveIndex((index + displayTestimonials.length) % displayTestimonials.length);
  };

  return (
    <div className="relative mx-auto max-w-6xl" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative h-[330px] overflow-hidden sm:h-[360px] lg:h-[390px]">
        {displayTestimonials.map((testimonial, index) => {
          let offset = index - activeIndex;
          let previousOffset = index - previousActiveIndex.current;
          if (offset > displayTestimonials.length / 2) offset -= displayTestimonials.length;
          if (offset < -displayTestimonials.length / 2) offset += displayTestimonials.length;
          if (previousOffset > displayTestimonials.length / 2) previousOffset -= displayTestimonials.length;
          if (previousOffset < -displayTestimonials.length / 2) previousOffset += displayTestimonials.length;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 3;
          const wrapsAcrossTrack = Math.abs(offset - previousOffset) > 2;
          const slotKey = `${testimonial.id}-${index}`;

          return (
            <article
              key={slotKey}
              className={`absolute left-1/2 top-4 overflow-hidden rounded-[22px] border bg-slate-900 shadow-xl transition-[transform,opacity,border-color,box-shadow] duration-500 ease-out ${
                isActive
                  ? "w-[170px] border-[#00FF87]/50 shadow-[0_0_20px_rgba(0,255,135,0.25)] sm:w-[190px] lg:w-[210px]"
                  : "w-[132px] border-white/10 sm:w-[142px] lg:w-[152px]"
              }`}
              style={{
                transform: `translateX(calc(-50% + ${offset * 150}px)) translateY(${isActive ? "-10px" : "0px"}) scale(${isActive ? 1.08 : 0.96})`,
                opacity: isVisible ? (isActive ? 1 : 0.62) : 0,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                pointerEvents: isVisible ? "auto" : "none",
                transitionDuration: wrapsAcrossTrack ? "0ms" : "500ms",
              }}
              onClick={() => goTo(index)}
              aria-label={`Show ${testimonial.clientName}'s feedback`}
            >
              <div className="relative aspect-[9/12] overflow-hidden bg-[#10221a]">
                {testimonial.videoUrl ? (
                  <video
                    ref={(element) => { videoRefs.current[slotKey] = element; }}
                    src={testimonial.videoUrl}
                    poster={testimonial.avatar || undefined}
                    muted
                    loop
                    playsInline
                    preload={isActive ? "metadata" : "none"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={testimonial.avatar} alt="" className="h-full w-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#07100c]/10 via-[#07100c]/25 to-[#07100c]" />
                    <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                      <Quote className="mb-2 h-4 w-4 text-[#00FF87]" />
                      <p className="line-clamp-4 text-[10px] leading-relaxed text-white sm:text-[11px]">“{testimonial.text}”</p>
                    </div>
                  </>
                )}

                <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:left-3 sm:top-3 sm:text-[8px]">
                  {testimonial.videoUrl ? <VolumeX className="h-2.5 w-2.5" /> : <Quote className="h-2.5 w-2.5" />}
                  {testimonial.videoUrl ? "Video review" : "Client story"}
                </div>
                {testimonial.videoUrl && !isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg"><Play className="ml-0.5 h-3.5 w-3.5 fill-current" /></span>
                  </div>
                )}
              </div>

              <div className={`flex min-h-[58px] items-center gap-2 bg-white px-2.5 py-2 sm:min-h-[64px] sm:px-3 ${isActive ? "min-h-[68px] sm:min-h-[72px]" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={testimonial.avatar} alt={testimonial.clientName} className={`rounded-full border border-slate-200 object-cover ${isActive ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6 sm:h-7 sm:w-7"}`} />
                <div className="min-w-0 flex-1">
                  <p className={`truncate font-bold text-slate-950 ${isActive ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]"}`}>{testimonial.clientName}</p>
                  <p className={`truncate text-slate-500 ${isActive ? "text-[9px] sm:text-[10px]" : "text-[8px] sm:text-[9px]"}`}>{testimonial.company || testimonial.position || "Qllix client"}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400"><Star className="h-3 w-3 fill-current" /><span className={`font-bold ${isActive ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]"}`}>{testimonial.rating}</span></div>
              </div>
            </article>
          );
        })}
      </div>

      {displayTestimonials.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5">
            {displayTestimonials.map((testimonial, index) => (
              <button
                key={`${testimonial.id}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-[#00FF87]" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                aria-label={`Show story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
