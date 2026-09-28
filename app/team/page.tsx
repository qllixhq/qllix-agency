"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import NavbarFloatingDock from "@/components/NavbarFloatingDock";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import SubpageHeroBanner from "@/components/SubpageHeroBanner";
import { useCms } from "@/context/CmsContext";
import { TeamMember } from "@/lib/cmsStore";
import {
  ArrowRight, X, Sparkles, Code, Palette, Film, Globe, Briefcase, CheckCircle2,
  Users, Layers, ExternalLink
} from "lucide-react";

// Department tag helper
const getTagsForMember = (member: TeamMember): [string, string] => {
  const role = member.role.toLowerCase();
  if (role.includes("manager") || role.includes("officer") || role.includes("lead")) {
    return ["Leadership", "Executive"];
  }
  if (role.includes("developer") || role.includes("engineer")) {
    return ["Engineering", "Full-Time"];
  }
  if (role.includes("3d") || role.includes("motion") || role.includes("vfx")) {
    return ["3D & Motion", "Visuals"];
  }
  if (role.includes("marketing") || role.includes("admin")) {
    return ["Growth", "Operations"];
  }
  if (role.includes("researcher") || role.includes("ux")) {
    return ["Product UX", "Strategy"];
  }
  return ["Design", "Creative"];
};

// Icon helper based on role
const getIconForMember = (member: TeamMember): React.ElementType => {
  const role = member.role.toLowerCase();
  if (role.includes("developer") || role.includes("engineer")) return Code;
  if (role.includes("3d") || role.includes("motion") || role.includes("vfx")) return Film;
  if (role.includes("marketing")) return Globe;
  if (role.includes("manager") || role.includes("officer") || role.includes("lead") || role.includes("admin")) return Briefcase;
  return Palette;
};

// Bio snippet generator
const getBioForMember = (member: TeamMember): string => {
  if (member.bio && member.bio.trim()) return member.bio;
  const role = member.role.toLowerCase();
  if (role.includes("manager") || role.includes("officer")) {
    return "Directing high-impact creative vision and delivering category-defining brand systems.";
  }
  if (role.includes("lead")) {
    return "Spearheading multi-disciplinary sprint teams for guaranteed on-time client execution.";
  }
  if (role.includes("developer") || role.includes("engineer")) {
    return "Engineering ultra-fast, responsive web architectures with modern frameworks.";
  }
  if (role.includes("3d") || role.includes("environment")) {
    return "Creating photorealistic 3D assets, lighting, and immersive spatial environments.";
  }
  if (role.includes("motion") || role.includes("vfx")) {
    return "Crafting kinetic typography, dynamic video effects, and high-retention motion graphics.";
  }
  if (role.includes("ux")) {
    return "Conducting user behavioral research and prototyping high-converting interfaces.";
  }
  if (role.includes("marketing")) {
    return "Managing data-driven growth funnels, audience targeting, and high-CTR campaigns.";
  }
  return "Designing bespoke visual identities, typography, and commercial print assets.";
};

export default function TeamPage() {
  const { cmsData } = useCms();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [modalMember, setModalMember] = useState<TeamMember | null>(null);
  const activeMembers = [...cmsData.teamMembers]
    .filter((m) => m.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <main className="relative min-h-screen bg-[#07050E] text-slate-900 overflow-x-hidden selection:bg-[#00FF87]/30 selection:text-emerald-950 font-sans">
      <AnimatedBackground />

      {/* ═══ SLIM HERO BANNER ═══ */}
      <SubpageHeroBanner
        pageKey="team"
        title={<span>Comprehensive Creative <em className="text-[#00FF87] not-italic font-serif">Squad</em> for Everyone</span>}
      />

      {/* ═══ WHITE SHEET CONTENT WRAPPER ═══ */}
      <section className="relative z-10 bg-white -mt-6 sm:-mt-8 pt-8 sm:pt-12 pb-28 sm:pb-36 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ═══ FULL RESPONSIVE TEAM GRID (1 to 4 Columns, Symmetrical, Zero Edge Cutoff) ═══ */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
          >
            <AnimatePresence>
              {activeMembers.map((member, index) => {
                const bio = getBioForMember(member);

                return (
                  <motion.div
                    layout
                    key={member.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
                    onClick={() => setModalMember(member)}
                    className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,135,90,0.12)] hover:-translate-y-2 hover:border-[#00875A]/40 transition-all duration-300 cursor-pointer"
                  >
                    {/* ═══ TOP PORTRAIT IMAGE (Clean Rectangular Portrait, No Badges/Icons) ═══ */}
                    <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200/60">
                      <img
                        key={member.imageUrl}
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 select-none"
                        loading="lazy"
                      />

                      {/* Subtle hover gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* ═══ BOTTOM INFORMATION & ACTION ═══ */}
                    <div className="p-6 pt-5 bg-white flex flex-col justify-between flex-1">
                      <div>
                        {/* Member Name */}
                        <h3 className="text-xl sm:text-[22px] font-extrabold text-[#0B132B] tracking-tight group-hover:text-[#00875A] transition-colors leading-snug font-serif">
                          {member.name}
                        </h3>

                        {/* Member Role */}
                        <p className="text-xs sm:text-[13px] font-bold text-[#00875A] mt-1 tracking-tight">
                          {member.role}
                        </p>

                        {/* Bio snippet */}
                        <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-2.5 leading-relaxed line-clamp-2">
                          {bio}
                        </p>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#00875A] transition-colors">
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#00C853] shadow-[0_0_8px_#00C853]" title="Available" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ═══ BOTTOM CTA BANNER ═══ */}
          <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#00FF87]/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="relative z-10 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Collaborate with Our Creators</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
                Have a vision? Let&apos;s engineer it together.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                Our cross-functional squad is ready to transform your brand identity, product presence, and digital growth.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-4 shrink-0">
              <a
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#00FF87] hover:bg-[#30FF97] text-[#02180C] font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,255,135,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ MEMBER SPOTLIGHT MODAL ═══ */}
      <AnimatePresence>
        {modalMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 text-slate-950 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalMember(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
                {/* Large Portrait Avatar */}
                <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-[22px] overflow-hidden bg-slate-100 shrink-0 shadow-md border-2 border-slate-200 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img key={modalMember.imageUrl} src={modalMember.imageUrl} alt={modalMember.name} className="w-full h-full object-cover object-top" />
                </div>

                <div className="text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                    {modalMember.department || "Core Team"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-2 font-serif">
                    {modalMember.name}
                  </h3>
                  <p className="text-sm font-bold text-[#00875A] mt-0.5">{modalMember.role}</p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed">
                <p>{getBioForMember(modalMember)}</p>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#00875A]" />
                  <span>Available for custom brand, design &amp; tech sprints</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalMember(null);
                    setBookingModalOpen(true);
                  }}
                  className="flex-1 py-3 px-5 rounded-full bg-[#00FF87] hover:bg-[#30FF97] text-[#02180C] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <span>Work With {modalMember.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => setModalMember(null)}
                  className="py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ FLOATING DOCK & MODALS ═══ */}
      <NavbarFloatingDock onOpenBooking={() => setBookingModalOpen(true)} />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <Footer onOpenBooking={() => setBookingModalOpen(true)} />
    </main>
  );
}
