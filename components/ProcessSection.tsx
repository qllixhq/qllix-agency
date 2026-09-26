"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Search, Compass, Palette, Code2, Rocket } from "lucide-react";

interface ProcessSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ProcessSection({ onOpenBooking }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Discovery & Growth Blueprint",
      icon: Search,
      tag: "Phase 1: Strategy",
      desc: "We dissect your business goals, user behavior patterns, and competitive positioning to engineer an airtight digital architecture.",
      deliverables: ["Product Roadmap", "User Personas", "Competitor Matrix", "Tech Stack Architecture"],
      duration: "1–3 Days"
    },
    {
      num: "02",
      title: "UX Architecture & Prototyping",
      icon: Compass,
      tag: "Phase 2: UX Structure",
      desc: "We structure frictionless user journeys and high-fidelity wireframes. Every interaction is validated via clickable prototypes before visual polishing.",
      deliverables: ["Information Architecture", "Interactive Wireframes", "User Flow Diagrams", "Prototype Usability Tests"],
      duration: "4–7 Days"
    },
    {
      num: "03",
      title: "Signature UI & Design System",
      icon: Palette,
      tag: "Phase 3: Visual Craft",
      desc: "We bring your brand to life with an iconic obsidian cyber aesthetic, typography hierarchy, design tokens, and modular Figma component kits.",
      deliverables: ["High-Fidelity Screens", "Complete Design System", "Motion Specs & Micro-Interactions", "Stakeholder Feedback Cycles"],
      duration: "8–14 Days"
    },
    {
      num: "04",
      title: "Full-Stack Next.js 14 Engineering",
      icon: Code2,
      tag: "Phase 4: Build",
      desc: "We build on clean, production-grade Next.js 14 / TypeScript codebases. Guaranteed 99+ Core Web Vitals, API orchestration, and structured schema SEO.",
      deliverables: ["Clean Next.js 14 Repo", "Sub-Second Load Speeds", "API & Headless CMS Integrations", "Automated CI/CD Pipelines"],
      duration: "15–21 Days"
    },
    {
      num: "05",
      title: "Launch, CRO & Growth Scaling",
      icon: Rocket,
      tag: "Phase 5: Scale",
      desc: "We deploy to production edge servers, verify tracking pixels, and accelerate inbound sales through data-driven media buying and SEO authority.",
      deliverables: ["Live Global Edge Deployment", "Server-Side CAPI Analytics", "High-Converting Paid Landers", "Dedicated SLA & Support"],
      duration: "Ongoing Sprints"
    }
  ];

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#08080C] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[400px] bg-emerald-600/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[#00FF87]/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">


          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Engineered For Speed. <br className="hidden sm:inline" />
            <em className="text-[#00FF87] not-italic">Our 5-Stage Sprint Process.</em>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            A disciplined, high-velocity delivery pipeline designed to turn visionary concepts into market-dominating digital flagships.
          </p>
        </div>

        {/* Step Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {steps.map((step, idx) => {
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeStep === idx
                    ? "bg-[#00FF87] text-[#02180C] shadow-[0_0_20px_rgba(0,255,135,0.4)] border border-[#00FF87]"
                    : "bg-[#111116] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-xs font-mono">{step.num}</span>
                <span>{step.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="rounded-3xl bg-[#0e1017] border border-white/15 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 text-[#00FF87] text-xs font-mono font-bold border border-[#00FF87]/30">
                  {steps[activeStep].tag}
                </span>
                <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 font-mono">
                  Duration: <strong className="text-white">{steps[activeStep].duration}</strong>
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {steps[activeStep].desc}
              </p>

              {/* Deliverables checklist */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-bold font-mono">
                  Phase Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {steps[activeStep].deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#00FF87] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] font-extrabold text-xs sm:text-sm hover:from-[#24FFA0] hover:to-[#00F58D] transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] flex items-center gap-2 group cursor-pointer"
                >
                  <span>Start Your Sprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Visual Stage */}
            <div className="lg:col-span-5 bg-[#06070a] rounded-2xl border border-white/10 p-6 flex flex-col justify-between min-h-[300px] shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00FF87]/10 blur-xl rounded-full pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-[#00FF87]/60" />
                </div>
                <span className="text-xs text-slate-400 font-mono">Step {activeStep + 1} of 5</span>
              </div>

              <div className="my-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center mx-auto shadow-lg">
                  {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-[#00FF87]" })}
                </div>
                <div className="text-base font-bold text-white">{steps[activeStep].title}</div>
                <div className="text-xs text-[#00FF87] font-semibold font-mono">100% Quality Assurance Guarantee</div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Next Phase:</span>
                <span className="text-white font-bold">
                  {steps[(activeStep + 1) % steps.length].title.split(" ")[0]} →
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
