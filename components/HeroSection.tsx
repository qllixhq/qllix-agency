"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import CyberVortexBackground from "./CyberVortexBackground";
import CelestialComet from "./CelestialComet";
import DraggableMarqueeRow from "./DraggableMarqueeRow";
import ShowcaseMediaModal, { ShowcaseItem } from "./ShowcaseMediaModal";
import { useCms } from "@/context/CmsContext";
import { triggerSecretAdminModal } from "./SecretAdminModal";
import AffiliateModal from "./AffiliateModal";

interface HeroSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const { cmsData } = useCms();
  const [activeMediaItem, setActiveMediaItem] = React.useState<ShowcaseItem | null>(null);
  const [isAffiliateOpen, setIsAffiliateOpen] = React.useState(false);

  const logoClickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const logoClickCountRef = React.useRef<number>(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logoClickCountRef.current += 1;
    if (logoClickCountRef.current >= 3) {
      if (logoClickTimeoutRef.current) clearTimeout(logoClickTimeoutRef.current);
      logoClickCountRef.current = 0;
      triggerSecretAdminModal();
      return;
    }

    if (logoClickTimeoutRef.current) clearTimeout(logoClickTimeoutRef.current);
    logoClickTimeoutRef.current = setTimeout(() => {
      if (logoClickCountRef.current === 1) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      logoClickCountRef.current = 0;
    }, 400);
  };

  const homeBanner = cmsData.banners.home;

  // Row 1 and Row 2 dynamically loaded from live CMS
  const row1Cards = cmsData.showcase?.row1 || [];
  const row2Cards = cmsData.showcase?.row2 || [];

  return (
    <section className="relative min-h-[96vh] sm:min-h-screen pt-8 sm:pt-12 md:pt-16 pb-14 overflow-hidden bg-[#000000] bg-gradient-to-b from-[#000000] via-[#000502] to-[#000000] flex flex-col justify-between select-none">

      {/* Cyber Dot Matrix Canvas */}
      <CyberVortexBackground />

      {/* ═══ CELESTIAL COMET: STRAIGHT LEFT TO RIGHT (10s Transit + 5s Pause Loop) ═══ */}
      {/* Positioned at z-10 directly underneath the typography and CTA buttons (z-20) */}
      <div className="absolute top-[28%] sm:top-[27%] md:top-[26%] left-0 w-full pointer-events-none z-10 overflow-hidden select-none">
        <div className="w-[300px] sm:w-[380px] lg:w-[440px] animate-left-to-right-comet">
          <CelestialComet direction="pointing-right" />
        </div>
      </div>

      {/* Subtle Deep Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00FF87]/8 blur-[180px] rounded-full pointer-events-none" />

      {/* ═══ Header Logo (Triple Click Secret Admin Gateway) ═══ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center pt-2 sm:pt-4 pb-3 sm:pb-5">
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="inline-flex items-center justify-center group cursor-pointer"
        >
          <img
            src={cmsData.general.logoUrl || "/images/logo.png"}
            alt="Qllix Logo"
            className="h-9 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(48,255,151,0.5)] group-hover:scale-105 transition-transform"
          />
        </a>
      </div>

      {/* ═══ Headline & CTA Button ═══ */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-2 pb-3">

        <h1 className="text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold text-white tracking-tight leading-[1.08] mb-4 font-serif">
          <span className="drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            {homeBanner.line1Prefix}
          </span>
          <em className="italic font-normal text-[#00FF87] drop-shadow-[0_0_28px_rgba(0,255,135,0.75)] font-serif">
            {homeBanner.line1Accent}
          </em>
          {(homeBanner.line2Prefix || homeBanner.line2Accent) && (
            <>
              <br />
              <span className="drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
                {homeBanner.line2Prefix}
              </span>
              <em className="italic font-normal text-[#00FF87] drop-shadow-[0_0_28px_rgba(0,255,135,0.75)] font-serif">
                {homeBanner.line2Accent}
              </em>
            </>
          )}
        </h1>

        <div className="flex items-center justify-center pt-2">
          <button
            onClick={() => onOpenBooking()}
            className="cta-animated-border px-8 sm:px-10 py-3 sm:py-3.5 rounded-full flex items-center gap-3.5 group active:scale-95 transition-all cursor-pointer shadow-[0_10px_35px_rgba(0,255,135,0.3)]"
          >
            <span className="font-sans font-black tracking-tight text-[#021A0C] text-sm sm:text-base drop-shadow-[0_1px_0_rgba(255,255,255,0.45)]">
              {homeBanner.ctaText}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-[#012211] to-[#001007] text-[#00FF87] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#002B15] transition-all border border-emerald-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_6px_rgba(0,0,0,0.5)]">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </div>
          </button>
        </div>

        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setIsAffiliateOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-[#06140c]/85 px-3 py-2 text-left text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-emerald-300/45 hover:bg-[#092016]"
            aria-label="Become an affiliate and earn 20 percent commission"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00FF87] text-[#052012]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-semibold tracking-[-0.01em] sm:text-sm">Refer a client. Earn 20%.</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#00FF87] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* ═══ DUAL ROW DRAGGABLE & INFINITE MARQUEE CAROUSEL ═══ */}
      <div className="hero-marquee-mask relative z-20 w-full overflow-hidden mt-10 sm:mt-16 md:mt-20 pt-4 pb-4 space-y-3.5 sm:space-y-4">
        {/* Row 1: Drag to scroll left/right */}
        <DraggableMarqueeRow
          rowId="r1"
          direction="left"
          speed={0.65}
          items={row1Cards}
          onItemClick={(item) => setActiveMediaItem(item)}
        />

        {/* Row 2: Drag to scroll left/right */}
        <DraggableMarqueeRow
          rowId="r2"
          direction="right"
          speed={0.65}
          items={row2Cards}
          onItemClick={(item) => setActiveMediaItem(item)}
        />
      </div>

      {/* ═══ Fullscreen / Enlarged Image & Video Modal ═══ */}
      <ShowcaseMediaModal
        item={activeMediaItem}
        onClose={() => setActiveMediaItem(null)}
        onOpenBooking={(serviceId) => onOpenBooking(serviceId)}
      />

      <AffiliateModal
        isOpen={isAffiliateOpen}
        onClose={() => setIsAffiliateOpen(false)}
        defaultTab="partner"
      />

    </section>
  );
}
