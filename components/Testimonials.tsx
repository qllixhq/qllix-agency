"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function Testimonials() {
  const { cmsData } = useCms();
  const section = cmsData.homeSections.find((s) => s.id === "testimonials");
  if (section && !section.enabled) return null;

  const active = [...cmsData.agencyTestimonials]
    .filter((t) => t.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="relative py-24 md:py-32 bg-white" id="testimonials">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            {section?.title || "What Clients Say"}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
            {section?.subtitle || "Real feedback from real clients who trusted Qllix with their brand."}
          </p>
        </motion.div>

        {/* Grid */}
        {active.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {active.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white border border-slate-200/90 rounded-2xl p-8 hover:border-emerald-400 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Quote icon & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={`w-4 h-4 ${
                            si < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-emerald-100" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.clientName}</div>
                    <div className="text-xs text-slate-500">{t.position}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
            No testimonials yet.
          </div>
        )}
      </div>
    </section>
  );
}
