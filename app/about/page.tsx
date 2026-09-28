"use client";

import React, { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import NavbarFloatingDock from "@/components/NavbarFloatingDock";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import SubpageHeroBanner from "@/components/SubpageHeroBanner";
import { useCms } from "@/context/CmsContext";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { cmsData } = useCms();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const team = cmsData.teamMembers.filter((m) => m.active).slice(0, 6);

  const stats = [
    { value: "50+", label: "Global Digital Flagships Delivered" },
    { value: "$28M+", label: "Client Revenue Generated" },
    { value: "4.9/5", label: "Clutch Verified Client Rating" },
    { value: "99.4%", label: "On-Time Sprint Completion Rate" }
  ];

  return (
    <main className="relative min-h-screen bg-[#07050E] text-slate-100 overflow-x-hidden selection:bg-[#00FF87]/30 selection:text-[#00FF87]">
      <AnimatedBackground />

      {/* ========================================================================= */}
      {/* TOP HERO BANNER (Unified Cyber Vortex Theme from Live CMS) */}
      {/* ========================================================================= */}
      <SubpageHeroBanner
        pageKey="about"
        title={<span>Engineering Digital <em className="text-[#00FF87] not-italic font-serif">Dominance</em></span>}
      />

      {/* ═══ WHITE SHEET CONTENT WRAPPER ═══ */}
      <div className="relative z-10 bg-[#FAF9F5] -mt-6 sm:-mt-8 pt-8 sm:pt-14 pb-20 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-black/5 text-slate-900">
        {/* Stats Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-black/5 text-center shadow-sm"
              >
                <div className="text-3xl sm:text-5xl font-extrabold text-[#00A854] font-mono mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Principles */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-white border border-black/5 p-8 sm:p-12 space-y-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif">Our 3 Non-Negotiable Tenets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#00A854] font-bold">01 / Visual Prestige</div>
                <h3 className="text-lg font-bold text-slate-950">Pixel Perfection</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Obsessive typography scale, tactile micro-animations, and visual balance. World-class design is your ultimate competitive moat.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#00A854] font-bold">02 / Relentless Velocity</div>
                <h3 className="text-lg font-bold text-slate-950">Rapid Sprint Rhythm</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Time-to-market is everything. Zero red tape, direct partner access, and continuous shipping across 48-hour cycles.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#00A854] font-bold">03 / Quantifiable ROI</div>
                <h3 className="text-lg font-bold text-slate-950">Revenue-First Focus</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every screen, layout, and ad variation is designed with one outcome: increasing qualified inbound pipeline and scalable enterprise revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00A854] font-bold">Team &amp; Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1 font-serif">The Specialists Behind Qllix</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="rounded-[28px] bg-white border border-black/5 hover:border-black/20 p-7 flex flex-col items-center text-center shadow-sm hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#00FF87] via-[#30FF97] to-[#059669] mb-4 shadow-[0_0_20px_rgba(0,255,135,0.25)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover bg-slate-900"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-1 font-serif">{member.name}</h3>
                <p className="text-sm text-slate-600 font-medium">{member.role}</p>
                {member.department && (
                  <span className="mt-3 px-3 py-0.5 rounded-full text-[11px] font-mono text-slate-600 bg-black/5 border border-black/5">
                    {member.department}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-all hover:scale-105 shadow-md"
            >
              <span>View All Team Members</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>

      {/* Footer & Floating Navigation Dock */}
      <Footer onOpenBooking={() => setBookingModalOpen(true)} />
      <NavbarFloatingDock onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </main>
  );
}
