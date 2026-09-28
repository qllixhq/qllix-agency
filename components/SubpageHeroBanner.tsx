"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import CyberVortexBackground from "./CyberVortexBackground";
import CelestialComet from "./CelestialComet";
import { useCms } from "@/context/CmsContext";
import { CmsData } from "@/lib/cmsStore";

interface SubpageHeroBannerProps {
  pageKey?: keyof CmsData["banners"];
  breadcrumb?: string;
  title?: React.ReactNode;
  titleLine1?: React.ReactNode;
  titleLine2?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function SubpageHeroBanner({
  pageKey,
  breadcrumb,
  title,
  titleLine1,
  titleLine2,
  subtitle,
  children,
}: SubpageHeroBannerProps) {
  const { cmsData } = useCms();

  const bannerData = (pageKey && cmsData?.banners) ? cmsData.banners[pageKey] : null;

  // Resolve dynamic values from CMS if pageKey provided
  const finalBreadcrumb = breadcrumb || bannerData?.breadcrumb || (pageKey ? pageKey.charAt(0).toUpperCase() + pageKey.slice(1) : "Overview");
  const finalSubtitle = subtitle || bannerData?.subtitle || "";
  const finalLogo = cmsData?.general?.logoUrl || "/images/logo.png";

  const renderTitle = title || (
    <>
      <span>
        {titleLine1 || (
          <>
            {bannerData?.line1Prefix}{" "}
            <em className="italic font-normal text-[#00FF87] drop-shadow-[0_0_24px_rgba(0,255,135,0.7)] font-serif">
              {bannerData?.line1Accent}
            </em>
          </>
        )}
      </span>
      {(titleLine2 || bannerData?.line2Prefix || bannerData?.line2Accent) && (
        <>
          {" "}
          <span>
            {titleLine2 || (
              <>
                {bannerData?.line2Prefix}{" "}
                <em className="italic font-normal text-[#00FF87] drop-shadow-[0_0_24px_rgba(0,255,135,0.7)] font-serif">
                  {bannerData?.line2Accent}
                </em>
              </>
            )}
          </span>
        </>
      )}
    </>
  );

  return (
    <section className="relative w-full bg-[#000000] bg-gradient-to-b from-[#000000] via-[#000502] to-[#000000] text-white pt-4 sm:pt-6 pb-9 sm:pb-11 md:pb-12 overflow-hidden select-none">
      
      {/* 1. Cyber Dot Matrix Canvas */}
      <CyberVortexBackground />

      {/* 2. Celestial Comet transit */}
      <div className="absolute top-[30%] sm:top-[28%] left-0 w-full pointer-events-none z-10 overflow-hidden select-none">
        <div className="w-[180px] sm:w-[240px] animate-left-to-right-comet">
          <CelestialComet direction="pointing-right" />
        </div>
      </div>

      {/* 3. Subtle Deep Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-[#00FF87]/8 blur-[120px] rounded-full pointer-events-none" />

      {/* 4. Centered Top Brand Logo (Kept as requested) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center pt-1 sm:pt-2 pb-1.5 sm:pb-2">
        <a 
          href="/" 
          className="inline-flex items-center justify-center group cursor-pointer transition-transform hover:scale-105" 
          title="Return to Homepage"
        >
          <img
            src={finalLogo}
            alt="Qllix Logo"
            className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(48,255,151,0.5)] group-hover:brightness-110 transition-all"
          />
        </a>
      </div>

      {/* 5. Breadcrumb Badge (Back to Home) */}
      <div className="relative z-20 flex items-center justify-center mb-2 sm:mb-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[11px] text-slate-300 backdrop-blur-md shadow-sm">
          <a 
            href="/" 
            className="hover:text-[#00FF87] transition-colors flex items-center gap-1 font-semibold text-slate-200"
            title="Go to Homepage"
          >
            <span>←</span>
            <span>Home</span>
          </a>
          <span className="text-slate-500">›</span>
          <span className="text-[#00FF87] font-semibold">{finalBreadcrumb}</span>
        </div>
      </div>

      {/* 6. Section's Actual Headline (No Subtitle, No Button) */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-white tracking-tight leading-snug mb-1 font-serif">
          <span className="drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">{renderTitle}</span>
        </h1>

        {children && <div className="mt-3">{children}</div>}
      </div>

    </section>
  );
}
