"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCms } from "@/context/CmsContext";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Testimonials() {
  const { cmsData } = useCms();
  const section = cmsData.homeSections.find((s) => s.id === "testimonials");
  if (section && !section.enabled) return null;

  const active = [...cmsData.agencyTestimonials]
    .filter((t) => t.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="relative overflow-hidden bg-[#07100c] py-16 sm:py-20 lg:py-24" id="testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,255,135,0.16),transparent_35%),linear-gradient(180deg,#07100c_0%,#040805_100%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-9 max-w-2xl text-center sm:mb-12"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00FF87]">Client stories</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            {section?.title || "What Clients Say"}
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {section?.subtitle || "Real feedback from real clients who trusted Qllix with their brand."}
          </p>
        </motion.div>

        {active.length > 0 ? (
          <TestimonialsCarousel testimonials={active} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-12 text-center text-sm text-slate-400">
            No client stories yet.
          </div>
        )}
      </div>
    </section>
  );
}
