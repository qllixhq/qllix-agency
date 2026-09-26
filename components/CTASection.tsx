"use client";

import React from "react";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";

interface CTASectionProps {
  onOpenBooking: () => void;
}

export default function CTASection({ onOpenBooking }: CTASectionProps) {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative p-10 sm:p-14 md:p-16 rounded-3xl bg-slate-950 text-white border border-emerald-500/30 text-center shadow-2xl overflow-hidden">
          
          {/* Subtle glowing center aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />



          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6 font-serif">
            Ready to Transform Your Brand Into an <em className="text-emerald-400 not-italic font-normal">Industry Leader</em>?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Book a 15-minute discovery call to map out project scope, timeline, and actionable growth architecture. No generic templates—pure high-impact execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-base hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Discovery Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span>✓ 15-Minute focused roadmap discussion</span>
            <span>✓ Custom budget &amp; milestone estimates</span>
            <span>✓ Direct consultation with senior creative leads</span>
          </div>
        </div>
      </div>
    </section>
  );
}
