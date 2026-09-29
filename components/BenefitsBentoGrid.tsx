"use client";

import React, { useState } from "react";
import { Sparkles, Check, RefreshCw, ShieldCheck, CreditCard, Users } from "lucide-react";

export default function BenefitsBentoGrid() {
  const [activePlan, setActivePlan] = useState<"Monthly" | "Quarterly" | "Annual">("Monthly");

  const candidates = [
    {
      name: "Alexander Vance",
      role: "Lead Product Designer",
      tags: ["UX Specialist", "Design Systems"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Marcus Thorne",
      role: "Creative Director",
      tags: ["Brand Identity", "Art Direction"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Elena Rostova",
      role: "Senior Full-Stack Engineer",
      tags: ["Next.js 14", "SaaS Architecture"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Julian Sterling",
      role: "Growth & SEO Strategist",
      tags: ["Performance Marketing", "CRO Scaling"],
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07070A] overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[#00FF87]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">


          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Engineered For Scale. <br className="hidden sm:inline" />
            <em className="text-[#00FF87] not-italic">Built For Speed.</em>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Agency-grade precision combined with Silicon Valley sprint velocity and 100% transparent flexibility.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Flexible Payment Plans */}
          <div className="lg:col-span-7 rounded-3xl bg-[#111116] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Flexible Payment Models</h3>
                  <p className="text-sm text-slate-400 mt-1 font-medium">Pay on your terms with milestones or predictable retainers</p>
                </div>

                {/* Switcher Pills */}
                <div className="flex p-1 bg-black/60 rounded-xl border border-white/10">
                  {(["Monthly", "Quarterly", "Annual"] as const).map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setActivePlan(plan)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activePlan === plan
                          ? "bg-[#00FF87] text-[#02180C] shadow-md font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  <Check className="w-4 h-4 text-[#00FF87]" />
                  <span>No Long-Term Lock-Ins</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  <Check className="w-4 h-4 text-[#00FF87]" />
                  <span>Pause or Cancel Anytime</span>
                </div>
              </div>
            </div>

            {/* Visual Credit Card Hologram Graphic */}
            <div className="relative z-10 w-full max-w-md mx-auto sm:mx-0 rounded-2xl p-6 bg-gradient-to-tr from-[#0b1c13] via-[#092b1b] to-[#044026] border border-[#00FF87]/30 shadow-2xl shadow-emerald-950/60 overflow-hidden transform group-hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00FF87]/15 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                    <span className="font-mono font-black text-sm text-[#00FF87]">Q</span>
                  </div>
                  <span className="font-extrabold text-sm tracking-wider text-white">QLLIX BLACK</span>
                </div>
                <CreditCard className="w-6 h-6 text-slate-300" />
              </div>

              <div className="font-mono text-sm sm:text-base tracking-[0.25em] text-slate-200 mb-6">
                •••• •••• •••• 2026
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Billing Cycle</div>
                  <div className="font-bold text-white">{activePlan} Rolling Sprint</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Security</div>
                  <div className="font-bold text-[#00FF87]">100% Escrow &amp; SLA Guarantee</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Unlimited Revisions & Lifetime Support */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Unlimited Revisions Card */}
            <div className="rounded-3xl bg-[#111116] border border-white/10 p-8 flex-1 relative overflow-hidden group shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center mb-6 shadow-md">
                <RefreshCw className="w-6 h-6 text-[#00FF87]" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Unlimited Revisions
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Until every pixel, interaction, and visual beat is 100% dialed into your vision, we iterate with relentless care and zero extra fees.
              </p>
            </div>

            {/* Lifetime Support Card */}
            <div className="rounded-3xl bg-[#111116] border border-white/10 p-8 flex-1 relative overflow-hidden group shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#00FF87]" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Direct Partner Support
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Post-launch peace of mind: direct private Slack channels with senior partners, swift hotfixes, and continuous optimization support.
              </p>
            </div>

          </div>

          {/* Bento Card 3: Diverse Skill Set */}
          <div className="lg:col-span-12 rounded-3xl bg-[#111116] border border-white/10 p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Candidates list */}
              <div className="lg:col-span-8">
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#00FF87] font-bold">
                    Top 1% Specialized Talent
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                    Senior Cross-Functional Squads
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-xl">
                    Every project is spearheaded by veteran leads across product design, full-stack Next.js architecture, and paid growth marketing.
                  </p>
                </div>

                {/* Candidate Squad Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {candidates.map((c, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-4 hover:border-[#00FF87]/40 transition-colors"
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
                          <span className="text-[10px] font-mono text-[#00FF87] font-bold bg-[#00FF87]/10 px-2 py-0.5 rounded-full border border-[#00FF87]/20">
                            Senior Lead
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium mb-1.5">{c.role}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {c.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Global Delivery Nodes */}
              <div className="lg:col-span-4 rounded-2xl bg-black/80 border border-white/10 p-6 flex flex-col justify-between h-full min-h-[260px] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#00FF87]/20 border border-[#00FF87]/40 text-[#00FF87] flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-[#00FF87]" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Dedicated Core Team</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Synchronous overlap across US, Europe, and Asia timezones ensuring seamless 24/7 momentum and rapid turnaround.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono">
                  <div>
                    <div className="text-lg font-extrabold text-[#00FF87]">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase">In-House Craft</div>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div>
                    <div className="text-lg font-extrabold text-[#00DF81]">48h</div>
                    <div className="text-[10px] text-slate-400 uppercase">Sprint Iteration</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
