"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, CheckCircle } from "lucide-react";

interface GrowthFormulaProps {
  onOpenBooking: () => void;
}

export default function GrowthFormula({ onOpenBooking }: GrowthFormulaProps) {
  const STEPS = [
    {
      num: "01",
      title: "Distinctive Visual Identity",
      subtitle: "Brand & Graphic Design",
      desc: "No high-value customer buys from an amateur-looking brand. We construct authoritative positioning and design systems that establish immediate trust upon first glance.",
      deliverable: "Brand Equity & Instant Authority",
      icon: ShieldCheck,
      color: "#30FF97"
    },
    {
      num: "02",
      title: "Conversion-Centric Platform",
      subtitle: "Web Design & Development",
      desc: "We engineer lightning-fast Next.js web applications that load in under 0.4s, eliminating checkout friction and transforming cold visitors into loyal paying clients.",
      deliverable: "High-Converting Digital Flagship",
      icon: Zap,
      color: "#00FF87"
    },
    {
      num: "03",
      title: "Targeted Customer Acquisition",
      subtitle: "Digital Marketing & CRO",
      desc: "Once your brand and digital flagship are primed to convert, we deploy scalable Meta & Google ad campaigns to funnel high-LTV buyers into your pipeline.",
      deliverable: "Scalable Profit & High ROAS",
      icon: TrendingUp,
      color: "#10B981"
    }
  ];

  return (
    <section id="formula" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-900 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">


          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Why Disjointed Freelancers Fail and <em className="text-emerald-glow serif-italic font-normal">Our Unified Engine Wins</em>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Hiring separate contractors for design, development, and ads creates brand friction and burns marketing budget. We unite all three disciplines under one cohesive growth squad.
          </p>
        </div>

        {/* 3 Steps Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glowing-border-card p-8 rounded-3xl bg-obsidian-950/90 border border-white/5 flex flex-col justify-between relative shadow-xl group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-glow group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-extrabold text-white/10 group-hover:text-emerald-glow/40 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-glow font-bold block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">{step.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Guaranteed Outcome:</span>
                  <span className="text-emerald-glow font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {step.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Synergy Callout Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-obsidian-950 to-emerald-500/20 border border-emerald-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-emerald-glow">
          <div className="text-left">
            <h4 className="text-xl font-bold text-white">Ready for an Integrated Growth Sprint?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Maximize speed-to-market and ROI with brand identity + Next.js platform + performance ads in one unified pipeline.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 rounded-xl bg-emerald-glow text-obsidian-950 font-extrabold text-xs sm:text-sm hover:bg-emerald-neon transition-all shadow-emerald-glow-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore Full-Stack Growth Bundle</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
