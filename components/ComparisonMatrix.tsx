"use client";

import React from "react";
import { Sparkles, Check, X, ShieldCheck } from "lucide-react";

export default function ComparisonMatrix() {
  const comparisonData = [
    {
      platform: "Qllix Studio",
      desc: "World-class senior design and engineering squad with zero overhead. Full agility, award-winning craft, and rapid execution.",
      isHighlighted: true,
      metrics: [
        { label: "Speed", value: "48–72h Sprints", pass: true },
        { label: "Flexibility", value: "Cancel anytime", pass: true },
        { label: "Quality", value: "Award-winning craft", pass: true },
        { label: "Scalability", value: "Instant elastic squad", pass: true },
        { label: "Affordability", value: "Transparent flat rate", pass: true },
      ]
    },
    {
      platform: "In-House Team",
      desc: "Full-time hiring provides permanent presence, but carries high salaries, recruitment delays, and narrow single-skill limits.",
      isHighlighted: false,
      metrics: [
        { label: "Speed", value: "3–6 month hiring", pass: false },
        { label: "Flexibility", value: "Rigid annual contract", pass: false },
        { label: "Quality", value: "Single skill limit", pass: false },
        { label: "Scalability", value: "Costly to scale", pass: false },
        { label: "Affordability", value: "৳1,50,000+/mo salary & perks", pass: false },
      ]
    },
    {
      platform: "Freelancers",
      desc: "Freelancers can appear cost-effective initially, but lack guaranteed delivery schedules, quality control, and accountability.",
      isHighlighted: false,
      metrics: [
        { label: "Speed", value: "Unpredictable delays", pass: false },
        { label: "Flexibility", value: "High ghosting risk", pass: false },
        { label: "Quality", value: "Inconsistent craft", pass: false },
        { label: "Scalability", value: "Single point of failure", pass: false },
        { label: "Affordability", value: "Hidden hourly billing", pass: false },
      ]
    },
    {
      platform: "Traditional Agency",
      desc: "Legacy agencies offer full services, but move slowly with endless meetings, junior account offloading, and marked-up retainers.",
      isHighlighted: false,
      metrics: [
        { label: "Speed", value: "Weeks of bureaucracy", pass: false },
        { label: "Flexibility", value: "Rigid locked scopes", pass: false },
        { label: "Quality", value: "Junior & intern staff", pass: false },
        { label: "Scalability", value: "High change fees", pass: false },
        { label: "Affordability", value: "৳1,50,000+/mo retainers", pass: false },
      ]
    }
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-obsidian-950 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">


          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Looking for an alternative to <span className="text-[#30FF97]">Qllix</span>?<br />
            <em className="text-white serif-italic font-normal">Think again.</em>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Compare velocity, cost efficiency, and craft quality between Qllix, in-house hires, freelancers, and traditional agencies.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="space-y-4">
          
          {/* Table Header (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
            <div className="col-span-4">Platform &amp; Model</div>
            <div className="col-span-1 text-center">Speed</div>
            <div className="col-span-2 text-center">Flexibility</div>
            <div className="col-span-2 text-center">Quality</div>
            <div className="col-span-1 text-center">Scalability</div>
            <div className="col-span-2 text-center">Cost Efficiency</div>
          </div>

          {/* Rows */}
          {comparisonData.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 transition-all ${
                item.isHighlighted
                  ? "bg-[#14121F] border-2 border-purple-500/60 shadow-2xl shadow-purple-900/40 relative overflow-hidden"
                  : "bg-[#0E0E14] border border-white/5 opacity-85 hover:opacity-100"
              }`}
            >
              {item.isHighlighted && (
                <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-[#30FF97] text-black font-extrabold text-xs uppercase tracking-wider">
                  Top Choice ✦
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Platform Name & Desc */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      item.isHighlighted 
                        ? "bg-[#6344F5] text-white shadow-md shadow-purple-500/30" 
                        : "bg-white/10 text-slate-400"
                    }`}>
                      {item.platform.charAt(0)}
                    </div>
                    <h3 className={`text-xl font-bold ${item.isHighlighted ? "text-white" : "text-slate-200"}`}>
                      {item.platform}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Metric 1: Speed */}
                <div className="lg:col-span-1 text-center flex lg:flex-col items-center justify-between lg:justify-center gap-2 py-2 lg:py-0 border-t lg:border-t-0 border-white/5">
                  <span className="lg:hidden text-xs text-slate-400">Speed:</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.metrics[0].pass ? "bg-[#30FF97]/20 text-[#30FF97]" : "bg-red-500/10 text-red-400/60"
                  }`}>
                    {item.metrics[0].pass ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4" />}
                  </div>
                </div>

                {/* Metric 2: Flexibility */}
                <div className="lg:col-span-2 text-center flex lg:flex-col items-center justify-between lg:justify-center gap-2 py-2 lg:py-0 border-t lg:border-t-0 border-white/5">
                  <span className="lg:hidden text-xs text-slate-400">Flexibility:</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.metrics[1].pass ? "bg-[#30FF97]/20 text-[#30FF97]" : "bg-red-500/10 text-red-400/60"
                    }`}>
                      {item.metrics[1].pass ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-medium text-slate-300 hidden sm:inline">{item.metrics[1].value}</span>
                  </div>
                </div>

                {/* Metric 3: Quality */}
                <div className="lg:col-span-2 text-center flex lg:flex-col items-center justify-between lg:justify-center gap-2 py-2 lg:py-0 border-t lg:border-t-0 border-white/5">
                  <span className="lg:hidden text-xs text-slate-400">Quality:</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.metrics[2].pass ? "bg-[#30FF97]/20 text-[#30FF97]" : "bg-red-500/10 text-red-400/60"
                    }`}>
                      {item.metrics[2].pass ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-medium text-slate-300 hidden sm:inline">{item.metrics[2].value}</span>
                  </div>
                </div>

                {/* Metric 4: Scalability */}
                <div className="lg:col-span-1 text-center flex lg:flex-col items-center justify-between lg:justify-center gap-2 py-2 lg:py-0 border-t lg:border-t-0 border-white/5">
                  <span className="lg:hidden text-xs text-slate-400">Scalability:</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.metrics[3].pass ? "bg-[#30FF97]/20 text-[#30FF97]" : "bg-red-500/10 text-red-400/60"
                  }`}>
                    {item.metrics[3].pass ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4" />}
                  </div>
                </div>

                {/* Metric 5: Affordability */}
                <div className="lg:col-span-2 text-center flex lg:flex-col items-center justify-between lg:justify-center gap-2 py-2 lg:py-0 border-t lg:border-t-0 border-white/5">
                  <span className="lg:hidden text-xs text-slate-400">Cost:</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.metrics[4].pass ? "bg-[#30FF97]/20 text-[#30FF97]" : "bg-red-500/10 text-red-400/60"
                    }`}>
                      {item.metrics[4].pass ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-medium text-slate-300 hidden sm:inline">{item.metrics[4].value}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
