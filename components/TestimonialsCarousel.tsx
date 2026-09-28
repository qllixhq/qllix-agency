"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Quote, Star, VolumeX } from "lucide-react";
import { AgencyTestimonial } from "@/lib/cmsStore";

export default function TestimonialsCarousel({ testimonials }: { testimonials: AgencyTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    if (activeIndex >= testimonials.length) setActiveIndex(0);
  }, [activeIndex, testimonials.length]);

  useEffect(() => {
    if (testimonials.length < 2 || isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % testimonials.length), 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, testimonials.length]);

  useEffect(() => {
    const activeId = testimonials[activeIndex]?.id;
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
  }, [activeIndex, testimonials]);

  const goTo = (index: number) => {
    if (testimonials.length > 0) setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mx-auto max-w-6xl" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative h-[356px] overflow-hidden sm:h-[418px] lg:h-[456px]">
        {testimonials.map((testimonial, index) => {
          let offset = index - activeIndex;
          if (offset > testimonials.length / 2) offset -= testimonials.length;
          if (offset < -testimonials.length / 2) offset += testimonials.length;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          return (
            <article
              key={testimonial.id}
              className="absolute left-1/2 top-0 w-[208px] cursor-pointer overflow-hidden rounded-[22px] border border-white/10 bg-slate-900 shadow-2xl transition-all duration-700 ease-out sm:w-[245px] lg:w-[275px]"
              style={{
                transform: `translateX(calc(-50% + ${offset * 230}px)) scale(${isActive ? 1 : 0.84})`,
                opacity: isVisible ? (isActive ? 1 : 0.48) : 0,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                pointerEvents: isVisible ? "auto" : "none",
              }}
              onClick={() => goTo(index)}
              aria-label={`Show ${testimonial.clientName}'s feedback`}
            >
              <div className="relative aspect-[9/13] overflow-hidden bg-[#10221a]">
                {testimonial.videoUrl ? (
                  <video
                    ref={(element) => { videoRefs.current[testimonial.id] = element; }}
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
                    <div className="absolute inset-x-5 bottom-5">
                      <Quote className="mb-3 h-6 w-6 text-[#00FF87]" />
                      <p className="line-clamp-4 text-xs leading-relaxed text-white sm:text-sm">“{testimonial.text}”</p>
                    </div>
                  </>
                )}

                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {testimonial.videoUrl ? <VolumeX className="h-3 w-3" /> : <Quote className="h-3 w-3" />}
                  {testimonial.videoUrl ? "Video review" : "Client story"}
                </div>
                {testimonial.videoUrl && !isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
                  </div>
                )}
              </div>

              <div className="flex min-h-[72px] items-center gap-2.5 bg-white px-3 py-3 sm:min-h-[82px] sm:px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={testimonial.avatar} alt={testimonial.clientName} className="h-8 w-8 rounded-full border border-slate-200 object-cover sm:h-9 sm:w-9" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-slate-950 sm:text-xs">{testimonial.clientName}</p>
                  <p className="truncate text-[10px] text-slate-500">{testimonial.company || testimonial.position || "Qllix client"}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400"><Star className="h-3 w-3 fill-current" /><span className="text-[10px] font-bold">{testimonial.rating}</span></div>
              </div>
            </article>
          );
        })}
      </div>

      {testimonials.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button type="button" onClick={() => goTo(activeIndex - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#00FF87] hover:text-[#00FF87]" aria-label="Previous client story"><ChevronLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-1.5">
            {testimonials.map((testimonial, index) => <button key={testimonial.id} type="button" onClick={() => goTo(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-[#00FF87]" : "w-1.5 bg-white/30 hover:bg-white/60"}`} aria-label={`Show story ${index + 1}`} />)}
          </div>
          <button type="button" onClick={() => goTo(activeIndex + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#00FF87] hover:text-[#00FF87]" aria-label="Next client story"><ChevronRight className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  );
}
