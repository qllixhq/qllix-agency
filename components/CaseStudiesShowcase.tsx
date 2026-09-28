"use client";

import React, { useState } from "react";
import { 
  FolderKanban, 
  ArrowUpRight, 
  Palette, 
  Layout, 
  Target,
  X,
  Sparkles
} from "lucide-react";
import { CASE_STUDIES_DATA, CaseStudy } from "@/data/caseStudiesData";

interface CaseStudiesShowcaseProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function CaseStudiesShowcase({ onOpenBooking }: CaseStudiesShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredProjects = activeCategory === "all"
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="case-studies" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#08080C] border-t border-white/5 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>


            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Real Impact. <em className="text-[#00FF87] not-italic">Proven Numbers.</em>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl font-normal">
              Explore how our three core capabilities generate transformational growth for ambitious market leaders.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap p-1.5 bg-[#0e1017] rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Projects ({CASE_STUDIES_DATA.length})
            </button>

            <button
              onClick={() => setActiveCategory("web-design")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeCategory === "web-design"
                  ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Web &amp; UI/UX</span>
            </button>

            <button
              onClick={() => setActiveCategory("graphic-design")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeCategory === "graphic-design"
                  ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Brand &amp; Identity</span>
            </button>

            <button
              onClick={() => setActiveCategory("digital-marketing")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeCategory === "digital-marketing"
                  ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Marketing &amp; CRO</span>
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-3xl bg-[#0e1017]/90 border border-white/8 flex flex-col justify-between group shadow-xl hover:-translate-y-1.5 hover:border-[#00FF87]/40 transition-all duration-300"
            >
              <div>
                {/* Visual Card Top Header */}
                <div className="p-6 rounded-2xl bg-[#06070a] border border-white/10 mb-6 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                  <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#00FF87]/15 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-full bg-emerald-500/15 text-[#00FF87] border border-[#00FF87]/30">
                      {project.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{project.year}</span>
                  </div>

                  <div className="z-10 mt-4">
                    <span className="text-xs font-mono text-slate-400">{project.client}</span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5 group-hover:text-[#00FF87] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Tagline & Challenge/Solution */}
                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {project.tagline}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {project.solution}
                </p>

                {/* Verified Results Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#06070a]/90 border border-white/5 mb-6">
                  {project.results.map((res, i) => (
                    <div key={i} className="text-center">
                      <div className="text-base font-extrabold text-[#00FF87] font-mono">
                        {res.stat}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCase(project)}
                  className="text-xs text-[#00FF87] font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenBooking(project.category)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#00FF87] hover:text-[#02180C] text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Book Similar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0e1017] border border-[#00FF87]/30 rounded-3xl p-6 md:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#00FF87] font-bold">
                  {selectedCase.categoryLabel} Case Study
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedCase.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 text-left">
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">The Challenge</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#06070a] p-4 rounded-xl border border-white/5">
                  {selectedCase.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Our Solution</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#06070a] p-4 rounded-xl border border-white/5">
                  {selectedCase.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Verified Results</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedCase.results.map((r, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#06070a] border border-[#00FF87]/30 text-center">
                      <div className="text-2xl font-bold text-[#00FF87] font-mono">{r.stat}</div>
                      <div className="text-xs text-slate-400 mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Ready to replicate these results?</span>
                <button
                  onClick={() => {
                    const cat = selectedCase.category;
                    setSelectedCase(null);
                    onOpenBooking(cat);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] font-extrabold text-xs hover:from-[#24FFA0] hover:to-[#00F58D] transition-colors shadow-[0_0_20px_rgba(0,255,135,0.4)] cursor-pointer"
                >
                  Book Discovery Call
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
