"use client";

import React from "react";

export default function LogoMarquee() {
  const row1 = [
    { name: "ADDIE Soft", symbol: "ADDIE Soft" },
    { name: "Bangla Shikhi", symbol: "Bangla Shikhi" },
    { name: "Relaxy", symbol: "Relaxy" },
    { name: "Backpack", symbol: "▲ backpack" },
    { name: "Goldman Sachs", symbol: "Goldman Sachs" },
    { name: "CLARITY TRADERS", symbol: "CLARITY TRADERS" },
    { name: "Esdiac", symbol: "☎ Esdiac" },
    { name: "Learndojo", symbol: "Learndojo" },
    { name: "VOC AI", symbol: "VOC • AI" },
    { name: "Novapay", symbol: "NovaPay" },
  ];

  const row2 = [
    { name: "Klasio", symbol: "❄ klasio" },
    { name: "Affine", symbol: "▌ Affine" },
    { name: "Telenor", symbol: "☊ telenor" },
    { name: "Axiata", symbol: "⬡ axiata" },
    { name: "GUARDIAN", symbol: "GUARDIAN" },
    { name: "Crantech", symbol: "crantech ✦" },
    { name: "CRE Guard", symbol: "//. CRE Guard" },
    { name: "Klasio", symbol: "❄ klasio" },
    { name: "Affine", symbol: "▌ Affine" },
    { name: "Solara Health", symbol: "Solara" },
  ];

  const row3 = [
    { name: "Learndojo", symbol: "Learndojo" },
    { name: "Esdiac", symbol: "☎ Esdiac" },
    { name: "CLARITY TRADERS", symbol: "CLARITY TRADERS" },
    { name: "Goldman Sachs", symbol: "Goldman Sachs" },
    { name: "Backpack", symbol: "▲ backpack" },
    { name: "Relaxy", symbol: "Relaxy" },
    { name: "Bangla Shikhi", symbol: "Bangla Shikhi" },
    { name: "ADDIE Soft", symbol: "ADDIE Soft" },
    { name: "Yantrik", symbol: "Yantrik Auto" },
    { name: "Apex Labs", symbol: "Apex Labs" },
  ];

  const row4 = [
    { name: "Khan IT", symbol: "Khan IT" },
    { name: "IPDC", symbol: "IPDC" },
    { name: "heyLuna.ai", symbol: "◄||| heyLuna.ai" },
    { name: "GrowAffiliate.", symbol: "GrowAffiliate." },
    { name: "Gainsty", symbol: "⮞ Gainsty" },
    { name: "FITMATE", symbol: "FITMATE" },
    { name: "Farasha Digital", symbol: "Farasha Digital" },
    { name: "Docuseal", symbol: "● Docuseal" },
    { name: "Duplo", symbol: "Duplo" },
    { name: "Verge Commerce", symbol: "Verge" },
  ];

  return (
    <section className="relative py-20 bg-white text-slate-900 overflow-hidden border-y border-slate-200">
      
      {/* Title Header in English */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
          Trusted by 200+ Ambitious Brands and Hyper-Growth Startups Worldwide
        </h2>
      </div>

      {/* 4 Alternating Marquee Tracks */}
      <div className="relative w-full overflow-hidden space-y-6 hover-pause">
        
        {/* Soft edge gradient masks (White fade on sides) */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Right to Left */}
        <div className="flex w-max animate-marquee-left gap-10 sm:gap-14 items-center">
          {[...row1, ...row1, ...row1].map((brand, i) => (
            <div
              key={`r1-${i}`}
              className="flex items-center text-slate-400 hover:text-slate-900 transition-colors font-semibold text-sm sm:text-base tracking-wide flex-shrink-0 cursor-default opacity-70 hover:opacity-100"
            >
              <span className="font-sans font-extrabold tracking-tight">{brand.symbol}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex w-max animate-marquee-right gap-10 sm:gap-14 items-center">
          {[...row2, ...row2, ...row2].map((brand, i) => (
            <div
              key={`r2-${i}`}
              className="flex items-center text-slate-400 hover:text-slate-900 transition-colors font-semibold text-sm sm:text-base tracking-wide flex-shrink-0 cursor-default opacity-70 hover:opacity-100"
            >
              <span className="font-sans font-extrabold tracking-tight">{brand.symbol}</span>
            </div>
          ))}
        </div>

        {/* Row 3: Right to Left */}
        <div className="flex w-max animate-marquee-left-fast gap-10 sm:gap-14 items-center">
          {[...row3, ...row3, ...row3].map((brand, i) => (
            <div
              key={`r3-${i}`}
              className="flex items-center text-slate-400 hover:text-slate-900 transition-colors font-semibold text-sm sm:text-base tracking-wide flex-shrink-0 cursor-default opacity-70 hover:opacity-100"
            >
              <span className="font-sans font-extrabold tracking-tight">{brand.symbol}</span>
            </div>
          ))}
        </div>

        {/* Row 4: Left to Right */}
        <div className="flex w-max animate-marquee-right-fast gap-10 sm:gap-14 items-center">
          {[...row4, ...row4, ...row4].map((brand, i) => (
            <div
              key={`r4-${i}`}
              className="flex items-center text-slate-400 hover:text-slate-900 transition-colors font-semibold text-sm sm:text-base tracking-wide flex-shrink-0 cursor-default opacity-70 hover:opacity-100"
            >
              <span className="font-sans font-extrabold tracking-tight">{brand.symbol}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
