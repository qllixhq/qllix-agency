"use client";

import React, { useState } from "react";
import { 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  TrendingUp, 
  Check
} from "lucide-react";
import { SERVICES_DATA } from "@/data/servicesData";

interface ServicesPillarsProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ServicesPillars({ onOpenBooking }: ServicesPillarsProps) {
  const [activeGraphicColor, setActiveGraphicColor] = useState<string>("#00FF87");
  const [simulatedRoas, setSimulatedRoas] = useState<number>(4.8);

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#08080C] overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Make Brands <em className="text-[#00FF87] not-italic">Desirable</em> &amp; Accelerate <em className="text-[#00FF87] not-italic">Revenue</em>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            We avoid bloated menus to master three complementary growth engines: <span className="text-white font-semibold">Brand Identity</span>, <span className="text-white font-semibold">Web Engineering</span>, and <span className="text-white font-semibold">Performance Marketing</span>.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="space-y-20">
          
          {/* PILLAR 1: BRAND & GRAPHIC DESIGN */}
          <div id="graphic-design" className="p-8 md:p-12 rounded-3xl bg-[#0e1017] border border-white/8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF87]/60 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-[#00FF87]/40 text-[#00FF87] flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_12px_rgba(0,255,135,0.3)]">
                    01
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00FF87] font-bold">
                    Visual Authority &amp; Identity
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Brand &amp; <em className="text-[#00FF87] not-italic">Graphic Design</em>
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We craft iconic visual systems that command instant authority. From bespoke vector logo suites to comprehensive style manuals and conversion-tested marketing collateral.
                </p>

                {/* Sub-services pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {SERVICES_DATA[0].subServices.map((sub, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#06070a] border border-white/5 hover:border-[#00FF87]/40 transition-all group/item">
                      <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5 group-hover/item:text-[#00FF87] transition-colors">
                        <Check className="w-3.5 h-3.5 text-[#00FF87] shrink-0" />
                        <span>{sub.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{sub.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">Included In This Discipline:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICES_DATA[0].deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => onOpenBooking("graphic-design")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] font-extrabold text-xs sm:text-sm hover:from-[#24FFA0] hover:to-[#00F58D] transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Start Brand Sprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="/projects" className="text-xs text-slate-300 hover:text-[#00FF87] font-medium underline">
                    View Case Studies
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Visual Brand Studio Preview */}
              <div className="lg:col-span-6 bg-[#06070a] rounded-2xl border border-[#00FF87]/25 p-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#00FF87]" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Dynamic Design System</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-[#00FF87] border border-[#00FF87]/30 font-bold">
                    Figma Vector Engine
                  </span>
                </div>

                {/* Interactive Color Swatch Selector */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Test Palette Harmony:</span>
                      <span className="text-[#00FF87] font-bold">{activeGraphicColor}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { name: "Obsidian", color: "#08080C", border: true },
                        { name: "Slate Dark", color: "#111822", border: false },
                        { name: "Cyber Emerald", color: "#00FF87", border: false },
                        { name: "Mint Neon", color: "#00DF81", border: false }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveGraphicColor(item.color)}
                          className={`p-3 rounded-xl bg-[#0e1017] border transition-all cursor-pointer text-center ${
                            activeGraphicColor === item.color
                              ? "border-[#00FF87] shadow-[0_0_15px_rgba(0,255,135,0.3)] bg-[#0B0D13]"
                              : "border-white/10 hover:border-white/25"
                          }`}
                        >
                          <div 
                            className="w-full h-8 rounded-lg mb-1 transition-transform hover:scale-105" 
                            style={{ 
                              backgroundColor: item.color,
                              border: item.border ? "1px solid rgba(255,255,255,0.2)" : "none" 
                            }} 
                          />
                          <span className="text-[10px] font-mono text-slate-300 block truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography & Mark Showcase with Live Accent Reaction */}
                  <div 
                    className="p-5 rounded-xl bg-[#0e1017] border space-y-3 transition-all duration-300"
                    style={{ borderColor: activeGraphicColor === "#00FF87" || activeGraphicColor === "#00DF81" ? "rgba(0,255,135,0.4)" : "rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Typography Hierarchy</span>
                      <span style={{ color: activeGraphicColor }}>Geist + Inter Precision</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white">
                      Modern Visual Standard for <span style={{ color: activeGraphicColor }}>Enterprise Brands</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pixel-perfect vector geometry calibrated for 4K Retina displays, mobile interfaces, and luxury packaging print specs.
                    </p>
                  </div>

                  {/* Badges Footer */}
                  <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-400">
                    <span>Tools: Figma • AI • After Effects</span>
                    <span className="text-[#00FF87] font-bold">100% Vector Asset Handover</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* PILLAR 2: WEB DESIGN & DEVELOPMENT */}
          <div id="web-design" className="p-8 md:p-12 rounded-3xl bg-[#0e1017] border border-white/8 shadow-2xl relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-[#00FF87]/40 text-[#00FF87] flex items-center justify-center font-mono font-bold text-sm">
                    02
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00FF87] font-bold">
                    High-Speed &amp; Conversion
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Web Design &amp; <em className="text-[#00FF87] not-italic">Next.js Development</em>
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We build ultra-fast Next.js 14 and Webflow web flagships that load in milliseconds, mesmerize visitors, and convert inbound attention into revenue.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {SERVICES_DATA[1].subServices.map((sub, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#06070a] border border-white/5 hover:border-[#00FF87]/40 transition-all group/item">
                      <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5 group-hover/item:text-[#00FF87] transition-colors">
                        <Check className="w-3.5 h-3.5 text-[#00FF87] shrink-0" />
                        <span>{sub.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{sub.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => onOpenBooking("web-design")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] font-extrabold text-xs sm:text-sm hover:from-[#24FFA0] hover:to-[#00F58D] transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Start Web Sprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="/pricing" className="text-xs text-slate-300 hover:text-[#00FF87] font-medium underline">
                    Explore Pricing Tiers
                  </a>
                </div>
              </div>

              {/* Right Column: Code & UI Preview */}
              <div className="lg:col-span-6 bg-[#06070a] rounded-2xl border border-[#00FF87]/25 p-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#00FF87]" />
                    <span className="text-xs font-mono font-bold text-white">Next.js 14 + Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF87] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#00FF87] font-bold">100/100 Lighthouse Performance</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-black border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-slate-500">// Global Production Benchmarks</div>
                  <div><span className="text-purple-400">const</span> <span className="text-[#00FF87]">speedTTFB</span> = <span className="text-amber-300">&quot;0.28s Global Edge&quot;</span>;</div>
                  <div><span className="text-purple-400">const</span> <span className="text-[#00FF87]">seoScore</span> = <span className="text-amber-300">100</span>;</div>
                  <div><span className="text-purple-400">const</span> <span className="text-[#00FF87]">coreWebVitals</span> = <span className="text-amber-300">&quot;Guaranteed Green&quot;</span>;</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Stack: Next.js 14 • React • Tailwind • Framer</span>
                  <span className="text-[#00FF87] font-bold">Sub-Second Speed</span>
                </div>
              </div>

            </div>
          </div>

          {/* PILLAR 3: DIGITAL MARKETING & GROWTH */}
          <div id="digital-marketing" className="p-8 md:p-12 rounded-3xl bg-[#0e1017] border border-white/8 shadow-2xl relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-[#00FF87]/40 text-[#00FF87] flex items-center justify-center font-mono font-bold text-sm">
                    03
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00FF87] font-bold">
                    Revenue Scaling
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Performance Marketing &amp; <em className="text-[#00FF87] not-italic">CRO</em>
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Turn customer acquisition spend into predictable enterprise revenue through targeted Meta &amp; Google media buying paired with relentless CRO.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {SERVICES_DATA[2].subServices.map((sub, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#06070a] border border-white/5 hover:border-[#00FF87]/40 transition-all group/item">
                      <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5 group-hover/item:text-[#00FF87] transition-colors">
                        <Check className="w-3.5 h-3.5 text-[#00FF87] shrink-0" />
                        <span>{sub.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{sub.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => onOpenBooking("digital-marketing")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] font-extrabold text-xs sm:text-sm hover:from-[#24FFA0] hover:to-[#00F58D] transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Launch Growth Engine</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="/pricing" className="text-xs text-slate-300 hover:text-[#00FF87] font-medium underline">
                    Marketing Retainer Plans
                  </a>
                </div>
              </div>

              {/* Right Column: Live ROAS Telemetry */}
              <div className="lg:col-span-6 bg-[#06070a] rounded-2xl border border-[#00FF87]/25 p-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00FF87]" />
                    <span className="text-xs font-mono font-bold text-white uppercase">Live ROI Projection Simulator</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-[#00FF87] border border-[#00FF87]/30 font-bold">
                    4.4x Average ROAS
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-mono mb-2">
                      <span>Targeted Return on Ad Spend (ROAS):</span>
                      <span className="text-[#00FF87] font-bold">{simulatedRoas}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="2.5" 
                      max="7.5" 
                      step="0.1"
                      value={simulatedRoas}
                      onChange={(e) => setSimulatedRoas(parseFloat(e.target.value))}
                      className="w-full accent-[#00FF87] cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-white/10 flex justify-between items-center text-xs font-mono">
                    <div>
                      <div className="text-slate-400">Projected Monthly Lead Growth</div>
                      <div className="text-lg font-bold text-white mt-0.5">+{Math.round(simulatedRoas * 45)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400">Target CAC Reduction</div>
                      <div className="text-lg font-bold text-[#00FF87] mt-0.5">-{Math.round(simulatedRoas * 7)}% Reduction</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Channels: Meta • Google Ads • Programmatic SEO</span>
                  <span className="text-[#00FF87] font-bold">Live Tracking Dashboards</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
