"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Camera,
  Bot,
  FolderKanban,
  Target,
  CheckSquare,
  Calendar,
  Search,
  Share2,
  BarChart3,
  Settings,
  Zap,
  Check,
  X,
  Download,
  Printer,
  Eye,
  Palette,
  Type,
  ShieldCheck,
  Layers,
  Smartphone,
  Laptop,
  CreditCard,
  Image as ImageIcon,
  ArrowRight,
  Sun,
  Moon,
  FileText,
  MousePointerClick,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { BrandKit } from "./page";

interface BrandGuidelineSheetProps {
  brandKit: BrandKit | null;
  brandName?: string;
  tagline?: string;
  logoUrl?: string | null;
  isDarkTheme?: boolean;
}

export default function BrandGuidelineSheet({
  brandKit,
  brandName: customBrandName,
  tagline: customTagline,
  logoUrl: customLogoUrl,
  isDarkTheme = false,
}: BrandGuidelineSheetProps) {
  // Guidelines viewing theme (Light by default for authentic brand book / print look)
  const [sheetTheme, setSheetTheme] = useState<"light" | "dark">("light");

  // Resolved Brand Data
  const brandName = customBrandName || brandKit?.brandName || "Blinko";
  const tagline = customTagline || brandKit?.tagline || "Ideas in. Action out.";
  const logo = customLogoUrl || brandKit?.logoUrl || null;

  // Resolved Palette: Defaulting to the iconic Reference 02 palette or user's extracted colors
  const primaryColor = brandKit?.colors?.[0]?.hex || "#FF5A4F"; // Coral
  const secondaryColor = brandKit?.colors?.[1]?.hex || "#4DABFF"; // Sky Blue
  const accentLime = brandKit?.colors?.[2]?.hex || "#AEEA00"; // Lime
  const accentYellow = brandKit?.colors?.[3]?.hex || "#FFC83D"; // Warm Yellow
  const darkColor = brandKit?.colors?.[4]?.hex || "#111316"; // Charcoal
  const lightColor = brandKit?.colors?.[5]?.hex || "#F7F8FA"; // Soft White

  const palette = [
    { name: "CORAL", role: "Primary Brand Accent", hex: primaryColor, rgb: "255, 90, 79", cmyk: "0, 78, 64, 0" },
    { name: "SKY BLUE", role: "Secondary Interface", hex: secondaryColor, rgb: "77, 171, 255", cmyk: "65, 25, 0, 0" },
    { name: "LIME", role: "Active Highlight", hex: accentLime, rgb: "174, 234, 0", cmyk: "35, 0, 100, 0" },
    { name: "WARM YELLOW", role: "Vibrant Accent", hex: accentYellow, rgb: "255, 200, 61", cmyk: "0, 22, 80, 0" },
    { name: "CHARCOAL", role: "Deep Text & Contrast", hex: darkColor, rgb: "17, 19, 22", cmyk: "75, 68, 67, 85" },
    { name: "SOFT WHITE", role: "Canvas Background", hex: lightColor, rgb: "247, 248, 250", cmyk: "2, 1, 0, 2" },
  ];

  const headingFont = brandKit?.typography?.heading || "Satoshi, Plus Jakarta Sans, sans-serif";
  const bodyFont = brandKit?.typography?.body || "Inter, sans-serif";

  // Trigger browser print for PDF export
  const handlePrint = () => {
    window.print();
  };

  const isLightMode = sheetTheme === "light";
  const bgMain = isLightMode ? "bg-white text-slate-900" : "bg-[#090D11] text-white";
  const bgCard = isLightMode ? "bg-[#F8FAFC] border-slate-200" : "bg-[#11171F] border-white/10";
  const textMuted = isLightMode ? "text-slate-500" : "text-slate-400";
  const borderSubtle = isLightMode ? "border-slate-200" : "border-white/10";

  return (
    <div className="space-y-6">
      {/* ── Top Bar Controls: Theme Switcher & Print / PDF Export ── */}
      <div className="no-print flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-xs flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-[#00FF87] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Official Brand Identity Guidelines Manual
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Side-by-side design system sheet with cover page &amp; high-resolution PDF export
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Theme Switcher for Guideline View */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSheetTheme("light")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                isLightMode
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light Sheet</span>
            </button>
            <button
              type="button"
              onClick={() => setSheetTheme("dark")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                !isLightMode
                  ? "bg-black text-[#00FF87] shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark Sheet</span>
            </button>
          </div>

          {/* Export to PDF / Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.35)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export / Print PDF</span>
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          ══════ THE REAL BRAND GUIDELINE SHEET (MATCHING REFERENCE 02) ══════
          ═════════════════════════════════════════════════════════════════════ */}
      <div
        id="brand-guideline-print-document"
        className={`rounded-3xl border ${borderSubtle} ${bgMain} p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors space-y-12 max-w-[1240px] mx-auto`}
      >
        
        {/* ─────────────────────────────────────────────────────────────
            PAGE 0: BRAND GUIDELINES COVER PAGE (For Presentation & PDF)
            ───────────────────────────────────────────────────────────── */}
        <div className="brand-cover-page p-8 sm:p-14 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-slate-900 via-[#0B1017] to-slate-950 text-white relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-xl">
          {/* Subtle Ambient Shapes */}
          <div
            className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: secondaryColor }}
          />

          {/* Cover Top Info */}
          <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/15 pb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF87] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-300 font-bold">
                OFFICIAL BRAND MANUAL &middot; VER 1.0
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10.5px] font-mono text-slate-400">
                EDITION {new Date().getFullYear()} &middot; CONFIDENTIAL
              </span>
            </div>
          </div>

          {/* Cover Hero Center */}
          <div className="relative z-10 my-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-[#00FF87]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Brand Identity System</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white drop-shadow-sm"
              style={{ fontFamily: headingFont }}
            >
              {brandName}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium tracking-wide">
              {tagline}
            </p>

            <p className="text-xs text-slate-400 max-w-lg leading-relaxed pt-2">
              Comprehensive visual guidelines covering logo lockups, color palette, typography hierarchy,
              iconography, digital application screens, clear space, and background placement rules.
            </p>
          </div>

          {/* Cover Bottom Strip: Color Palette Bar & Agency Credits */}
          <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-white/15">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Brand Core Palette
              </span>
              <div className="flex items-center gap-2">
                {palette.map((c) => (
                  <div key={c.name} className="flex flex-col items-center">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-sm border border-white/20"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name}: ${c.hex}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right text-[11px] font-mono text-slate-400 space-y-0.5">
              <p className="text-slate-200 font-bold">Created by Qllix Creative Agency</p>
              <p>For Internal Teams, Partners &amp; Marketing</p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            01 & 02: HERO LOGO LOCKUP & APP ICON (Side by Side)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch section-break">
          {/* 01. PRIMARY LOGO (7 COLS) */}
          <div className={`lg:col-span-7 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  01. PRIMARY LOGO
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">Master Lockup</span>
              </div>

              {/* Side text description */}
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                The primary brand mark consists of the rounded symbol mark paired with the custom wordmark and
                active tagline. This is the primary representation of the {brandName} brand across all customer touchpoints.
              </p>
            </div>

            {/* Visual Display Center */}
            <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo}
                    alt={brandName}
                    className="h-20 sm:h-24 w-auto object-contain drop-shadow-md"
                  />
                ) : (
                  /* Default Blinko-style dynamic hero symbol */
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg relative"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Sparkles className="w-9 h-9 text-white stroke-[2.5]" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow">
                        <MousePointerClick className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <div className="text-left">
                      <span
                        className="text-4xl sm:text-5xl font-black tracking-tight block text-slate-900 dark:text-white"
                        style={{ fontFamily: headingFont }}
                      >
                        {brandName}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide">
                        Ideas in. <strong style={{ color: primaryColor }}>Action out.</strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Spec Footer */}
            <div className={`pt-4 border-t ${borderSubtle} flex items-center justify-between text-[11px] font-mono ${textMuted} flex-wrap gap-2`}>
              <span>PRIMARY LOCKUP</span>
              <span>SVG / VECTOR &middot; MIN 24PX SCREEN / 0.5&quot; PRINT</span>
            </div>
          </div>

          {/* 02. APP ICON HERO (5 COLS) */}
          <div className={`lg:col-span-5 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  02. APP ICON HERO
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">Squircle 1:1</span>
              </div>
              <p className={`text-xs ${textMuted} mb-4 leading-relaxed`}>
                3D depth representation for App Store, Mobile Home Screen, and Favicons with standard 22.5% corner radius.
              </p>
            </div>

            {/* 3D App Icon Visual */}
            <div className="py-6 flex items-center justify-center relative">
              {/* Floating decorative elements */}
              <div
                className="absolute top-2 left-6 w-3 h-3 rounded-full blur-xs opacity-75"
                style={{ backgroundColor: accentYellow }}
              />
              <div
                className="absolute bottom-4 right-8 w-4 h-4 rounded-full blur-xs opacity-75"
                style={{ backgroundColor: secondaryColor }}
              />

              <div
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-[28px] sm:rounded-[36px] p-1 flex items-center justify-center shadow-[0_20px_45px_rgba(255,90,79,0.35)] transition-transform hover:scale-105 duration-300 relative cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #D4392E 100%)`,
                }}
              >
                <Sparkles className="w-14 h-14 sm:w-18 sm:h-18 text-white drop-shadow-md stroke-[2.2]" />
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow-lg">
                  <MousePointerClick className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Spec Footer */}
            <div className={`pt-4 border-t ${borderSubtle} flex items-center justify-between text-[11px] font-mono ${textMuted}`}>
              <span>APP ICON SPEC</span>
              <span>1024 &times; 1024 PX &middot; 22.5% RADIUS</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            03. LOGO VARIATIONS (Horizontal Lockup, Mark, Wordmark, etc.)
            ───────────────────────────────────────────────────────────── */}
        <div className={`rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 section-break`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
              03. LOGO VARIATIONS &amp; SYSTEM
            </span>
            <span className="text-[10.5px] font-mono text-slate-400">5 Official Formats</span>
          </div>
          <p className={`text-xs ${textMuted} mb-6 max-w-2xl`}>
            Always use the approved logo variations appropriate for the specific medium and space constraints.
            Never recreate, distort, or modify these lockups.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* 1. Primary Lockup */}
            <div className={`p-4 rounded-2xl border ${borderSubtle} bg-white dark:bg-black/40 flex flex-col items-center justify-between min-h-[140px] text-center`}>
              <div className="my-auto flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-sm text-slate-900 dark:text-white" style={{ fontFamily: headingFont }}>
                  {brandName}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mt-2">
                Primary Lockup
              </span>
            </div>

            {/* 2. Icon Mark */}
            <div className={`p-4 rounded-2xl border ${borderSubtle} bg-white dark:bg-black/40 flex flex-col items-center justify-between min-h-[140px] text-center`}>
              <div className="my-auto">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: primaryColor }}>
                  <Sparkles className="w-6 h-6 text-white stroke-[2.5]" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mt-2">
                Icon Mark
              </span>
            </div>

            {/* 3. Wordmark */}
            <div className={`p-4 rounded-2xl border ${borderSubtle} bg-white dark:bg-black/40 flex flex-col items-center justify-between min-h-[140px] text-center`}>
              <div className="my-auto">
                <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: headingFont }}>
                  {brandName}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mt-2">
                Wordmark
              </span>
            </div>

            {/* 4. Monochrome */}
            <div className={`p-4 rounded-2xl border ${borderSubtle} bg-white dark:bg-black/40 flex flex-col items-center justify-between min-h-[140px] text-center`}>
              <div className="my-auto flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-black text-sm text-slate-950 dark:text-white" style={{ fontFamily: headingFont }}>
                  {brandName}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mt-2">
                Monochrome
              </span>
            </div>

            {/* 5. App Icon */}
            <div className={`p-4 rounded-2xl border ${borderSubtle} bg-white dark:bg-black/40 flex flex-col items-center justify-between min-h-[140px] text-center`}>
              <div className="my-auto">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md relative"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, #D4392E)` }}
                >
                  <Sparkles className="w-6 h-6 text-white stroke-[2.5]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black border border-white flex items-center justify-center">
                    <MousePointerClick className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mt-2">
                App Icon
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            04 & 05: COLOR PALETTE & TYPOGRAPHY SYSTEM (Side by Side)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch section-break">
          {/* 04. COLOR PALETTE (6 COLS) */}
          <div className={`lg:col-span-6 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  04. COLOR PALETTE
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">60-30-10 Rule</span>
              </div>
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                Curated color system delivering energetic warmth and high readability across digital and print applications.
              </p>

              {/* Color Swatches Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {palette.map((item) => (
                  <div key={item.name} className="flex flex-col items-center text-center">
                    <div
                      className="w-full aspect-square rounded-2xl shadow-sm border border-black/10 dark:border-white/10 mb-2 transition-transform hover:scale-105 duration-200 cursor-pointer"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white truncate w-full">
                      {item.name}
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-400 font-bold">
                      {item.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec Details Table */}
            <div className={`mt-6 pt-4 border-t ${borderSubtle} space-y-1.5 text-[10.5px] font-mono ${textMuted}`}>
              <div className="flex justify-between">
                <span>Primary Accent:</span>
                <strong className="text-slate-900 dark:text-white">{primaryColor} ({palette[0].rgb})</strong>
              </div>
              <div className="flex justify-between">
                <span>Dark Background / Text:</span>
                <strong className="text-slate-900 dark:text-white">{darkColor}</strong>
              </div>
              <div className="flex justify-between">
                <span>Light Surface Canvas:</span>
                <strong className="text-slate-900 dark:text-white">{lightColor}</strong>
              </div>
            </div>
          </div>

          {/* 05. TYPOGRAPHY SYSTEM (6 COLS) */}
          <div className={`lg:col-span-6 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  05. TYPOGRAPHY SYSTEM
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">Hierarchy &amp; Weights</span>
              </div>
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                Clean modern geometric sans-serif delivering clarity, confidence, and friendly authority.
              </p>

              {/* Side by side typography showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Left: Aa Specimen */}
                <div className="sm:col-span-5 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-white/10 pb-4 sm:pb-0 sm:pr-4">
                  <div
                    className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white leading-none tracking-tight"
                    style={{ fontFamily: headingFont }}
                  >
                    Aa
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {brandKit?.typography?.heading || "Satoshi"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Bold / Medium / Regular
                    </p>
                  </div>
                </div>

                {/* Right: Specimen Hierarchy */}
                <div className="sm:col-span-7 space-y-2">
                  <h3
                    className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-slate-900 dark:text-white"
                    style={{ fontFamily: headingFont }}
                  >
                    Think it. <br />
                    Capture it. <br />
                    <span style={{ color: primaryColor }}>Do it.</span>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: bodyFont }}>
                    Clean, modern, and crafted for modern ambitious creators and digital products.
                  </p>
                </div>
              </div>
            </div>

            {/* Typography Spec Rules */}
            <div className={`mt-6 pt-4 border-t ${borderSubtle} grid grid-cols-3 gap-2 text-center text-[10px] font-mono ${textMuted}`}>
              <div className="p-2 rounded-xl bg-white dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                <span className="block font-bold text-slate-900 dark:text-white">HEADINGS</span>
                <span>Bold &middot; -0.02em</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                <span className="block font-bold text-slate-900 dark:text-white">BODY TEXT</span>
                <span>Regular &middot; 1.6 Line</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                <span className="block font-bold text-slate-900 dark:text-white">TAGS &amp; UI</span>
                <span>Medium &middot; +0.05em</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            06 & 07: ICON SYSTEM & STICKER ELEMENTS (Side by Side)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch section-break">
          {/* 06. ICON SYSTEM (7 COLS) */}
          <div className={`lg:col-span-7 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  06. ICON SYSTEM
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">24&times;24px Grid &middot; 2px Stroke</span>
              </div>
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                Consistent stroke weight, rounded terminal joints, and friendly optical proportions.
              </p>

              {/* 10 Icons Grid */}
              <div className="grid grid-cols-5 gap-3 text-center">
                {[
                  { label: "Capture", icon: Camera, color: primaryColor },
                  { label: "AI Assist", icon: Bot, color: secondaryColor },
                  { label: "Organize", icon: FolderKanban, color: accentLime },
                  { label: "Focus", icon: Target, color: accentYellow },
                  { label: "Tasks", icon: CheckSquare, color: "#A855F7" },
                  { label: "Calendar", icon: Calendar, color: primaryColor },
                  { label: "Search", icon: Search, color: secondaryColor },
                  { label: "Share", icon: Share2, color: accentLime },
                  { label: "Analytics", icon: BarChart3, color: accentYellow },
                  { label: "Settings", icon: Settings, color: "#64748B" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`p-3 rounded-2xl border ${borderSubtle} bg-white dark:bg-black/40 flex flex-col items-center justify-center gap-1.5 transition-transform hover:scale-105 duration-200 cursor-pointer`}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ color: item.color }}>
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[9.5px] font-mono text-slate-600 dark:text-slate-300 font-semibold truncate w-full">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t ${borderSubtle} flex items-center justify-between text-[11px] font-mono ${textMuted}`}>
              <span>STROKE RULE: 2PX UNIFORM</span>
              <span>CORNER RADIUS: 3PX ROUNDED JOINTS</span>
            </div>
          </div>

          {/* 07. STICKER ELEMENTS & BRAND ACCENTS (5 COLS) */}
          <div className={`lg:col-span-5 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  07. STICKER ELEMENTS
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">Marketing Badges</span>
              </div>
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                Expressive pill badges and doodle stickers for campaigns, product callouts, and landing pages.
              </p>

              {/* Stickers showcase */}
              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                <div
                  className="px-4 py-2 rounded-2xl text-xs font-black shadow-md transform -rotate-3 transition-transform hover:rotate-0 cursor-pointer"
                  style={{ backgroundColor: accentLime, color: "#0B1F04" }}
                >
                  Ideas &gt; Action
                </div>

                <div
                  className="px-4 py-2.5 rounded-full text-xs font-black shadow-md transform rotate-2 transition-transform hover:rotate-0 cursor-pointer"
                  style={{ backgroundColor: secondaryColor, color: "#FFFFFF" }}
                >
                  Focus ✨
                </div>

                <div
                  className="px-3.5 py-3 rounded-full text-[11px] font-black text-center shadow-md transform -rotate-6 transition-transform hover:rotate-0 cursor-pointer"
                  style={{ backgroundColor: "#8B5CF6", color: "#FFFFFF" }}
                >
                  Good<br />Flow
                </div>

                <div
                  className="px-5 py-2.5 rounded-2xl text-xs font-black shadow-md transform rotate-3 transition-transform hover:rotate-0 cursor-pointer"
                  style={{ backgroundColor: primaryColor, color: "#FFFFFF" }}
                >
                  Capture Anything
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t ${borderSubtle} flex items-center justify-between text-[11px] font-mono ${textMuted}`}>
              <span>PILL RADIUS: FULL CAPSULE</span>
              <span>DROP SHADOW: SOFT 15% TINT</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            08 & 09: CLEAR SPACE & LOGO PLACEMENT RULES (DARK / LIGHT BG)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch section-break">
          {/* 08. CLEAR SPACE & MINIMUM SIZE (6 COLS) */}
          <div className={`lg:col-span-6 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  08. CLEAR SPACE &amp; MIN SIZE
                </span>
                <span className="text-[10.5px] font-mono text-emerald-600 dark:text-[#00FF87] font-bold">1X Padding Rule</span>
              </div>
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                Maintain clear space equal to <strong>X (half mark height)</strong> on all 4 sides. No text or graphics may encroach within this zone.
              </p>

              {/* Clear Space Visual Diagram */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[#00FF87]/50 bg-emerald-500/[0.04] relative flex items-center justify-center">
                {/* Corner markers */}
                <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-emerald-500">X</span>
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold text-emerald-500">X</span>
                <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-emerald-500">X</span>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-emerald-500">X</span>

                {/* Inner protected logo */}
                <div className="p-4 rounded-xl bg-white dark:bg-black/60 shadow-sm border border-slate-200 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-black text-lg text-slate-900 dark:text-white" style={{ fontFamily: headingFont }}>
                      {brandName}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Protected Boundary</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimum Sizes spec */}
            <div className={`mt-6 pt-4 border-t ${borderSubtle} grid grid-cols-2 gap-4 text-center text-xs font-mono`}>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/30">
                <span className="text-[10px] text-slate-400 block mb-0.5">DIGITAL SCREENS</span>
                <strong className="text-slate-900 dark:text-white text-sm">Min 24px Height</strong>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/30">
                <span className="text-[10px] text-slate-400 block mb-0.5">PRINT COLLATERAL</span>
                <strong className="text-slate-900 dark:text-white text-sm">Min 0.5 in / 12mm</strong>
              </div>
            </div>
          </div>

          {/* 09. LOGO PLACEMENT: DARK BG VS LIGHT BG (6 COLS) */}
          <div className={`lg:col-span-6 rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  09. DARK BG VS LIGHT BG RULES
                </span>
                <span className="text-[10.5px] font-mono text-slate-400">Background Contrast</span>
              </div>
              <p className={`text-xs ${textMuted} mb-6 leading-relaxed`}>
                Specific rules for background usage to ensure optical punch and compliance with accessibility contrast standards.
              </p>

              {/* 3 Background Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Light BG */}
                <div className="p-4 rounded-2xl border border-slate-300 bg-white text-center flex flex-col justify-between min-h-[120px]">
                  <div className="my-auto flex items-center justify-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-black text-xs text-slate-950" style={{ fontFamily: headingFont }}>{brandName}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-emerald-600 block">✓ Light Surfaces</span>
                    <span className="text-[8.5px] text-slate-400">Dark wordmark</span>
                  </div>
                </div>

                {/* Dark BG */}
                <div className="p-4 rounded-2xl border border-white/20 bg-slate-950 text-white text-center flex flex-col justify-between min-h-[120px]">
                  <div className="my-auto flex items-center justify-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-black text-xs text-white" style={{ fontFamily: headingFont }}>{brandName}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-[#00FF87] block">✓ Dark Surfaces</span>
                    <span className="text-[8.5px] text-slate-400">White wordmark</span>
                  </div>
                </div>

                {/* Brand Color BG */}
                <div className="p-4 rounded-2xl text-white text-center flex flex-col justify-between min-h-[120px]" style={{ backgroundColor: primaryColor }}>
                  <div className="my-auto flex items-center justify-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-white" />
                    <span className="font-black text-xs text-white" style={{ fontFamily: headingFont }}>{brandName}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-white block">✓ Colored Tint</span>
                    <span className="text-[8.5px] text-white/80">Monochrome white</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Do's & Don'ts */}
            <div className={`mt-6 pt-4 border-t ${borderSubtle} grid grid-cols-2 gap-2 text-[10.5px] ${textMuted}`}>
              <div className="flex items-center gap-1.5 text-rose-500 font-medium">
                <X className="w-3.5 h-3.5 shrink-0" />
                <span>Never stretch or rotate</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-500 font-medium">
                <X className="w-3.5 h-3.5 shrink-0" />
                <span>Never add drop shadows</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            10. PRODUCT SCREENS: MOBILE APP & DESKTOP DASHBOARD
            ───────────────────────────────────────────────────────────── */}
        <div className={`rounded-3xl border ${borderSubtle} ${bgCard} p-6 sm:p-8 section-break`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
              10. DIGITAL UI APPLICATIONS (MOBILE &amp; DESKTOP)
            </span>
            <span className="text-[10.5px] font-mono text-slate-400">Live Product Design</span>
          </div>
          <p className={`text-xs ${textMuted} mb-6 max-w-2xl`}>
            Real-world digital applications demonstrating how the design system, typography hierarchy,
            and brand colors translate into intuitive mobile and desktop web interfaces.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Mobile App Screens Mockup (5 COLS) */}
            <div className="lg:col-span-5 flex justify-center gap-3">
              {/* Phone 1: Dashboard Home */}
              <div className="w-[170px] sm:w-[190px] rounded-[30px] p-2 bg-slate-900 border-4 border-slate-800 shadow-xl text-slate-800 bg-white">
                <div className="w-16 h-3 rounded-full bg-slate-900 mx-auto mb-2" />
                <div className="p-2 space-y-2 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Good morning, Creator 👋</span>
                  </div>
                  <div className="p-2 rounded-xl text-white font-bold" style={{ backgroundColor: primaryColor }}>
                    + New Note
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold block text-[9px]">YouTube Video Ideas</span>
                      <span className="text-[8px] text-slate-400">3 tasks</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold block text-[9px]">Brand Campaign</span>
                      <span className="text-[8px] text-slate-400">In review</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2: Tasks List */}
              <div className="w-[170px] sm:w-[190px] rounded-[30px] p-2 bg-slate-900 border-4 border-slate-800 shadow-xl text-slate-800 bg-white hidden sm:block">
                <div className="w-16 h-3 rounded-full bg-slate-900 mx-auto mb-2" />
                <div className="p-2 space-y-2 text-[10px]">
                  <span className="text-[9px] font-mono text-slate-400">TODAY</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base">3</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white bg-emerald-500">Completed</span>
                  </div>
                  <div className="space-y-1 text-[8.5px]">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      <span>Edit YouTube video</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      <span>Research references</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Dashboard Mockup (7 COLS) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border-4 border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                {/* Browser Top Bar */}
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mx-auto">
                    app.{brandName.toLowerCase()}.com/dashboard
                  </span>
                </div>

                {/* Dashboard Inner Canvas */}
                <div className="p-4 sm:p-5 bg-white text-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-sm" style={{ fontFamily: headingFont }}>
                        Good morning, Creator 👋
                      </h4>
                      <p className="text-[10px] text-slate-400">Your workspace is 84% completed today</p>
                    </div>
                    <div className="px-3 py-1 rounded-xl text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor }}>
                      + New Project
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-lg font-black block">128</span>
                      <span className="text-[9px] text-slate-400 font-mono">Ideas Saved</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-lg font-black block" style={{ color: primaryColor }}>16</span>
                      <span className="text-[9px] text-slate-400 font-mono">Active Sprints</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-lg font-black block" style={{ color: secondaryColor }}>42</span>
                      <span className="text-[9px] text-slate-400 font-mono">Completed</span>
                    </div>
                  </div>

                  {/* Focus session bar */}
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-300">Deep Focus Timer: <strong>25:00</strong></span>
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold" style={{ backgroundColor: accentLime, color: "#0B1F04" }}>
                      START SESSION &gt;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            11, 12 & 13: STATIONERY, SOCIAL MEDIA & BRAND VALUES
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 section-break">
          {/* 11. BUSINESS CARDS */}
          <div className={`rounded-3xl border ${borderSubtle} ${bgCard} p-6 flex flex-col justify-between`}>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                11. BUSINESS CARDS
              </span>
              <p className={`text-xs ${textMuted} mb-4`}>
                A4 Standard business card (85&times;55mm) with soft touch finish.
              </p>

              {/* Cards Mockup */}
              <div className="space-y-3">
                {/* Front (Light) */}
                <div className="p-4 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-black text-xs">{brandName}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">Front Card</span>
                </div>

                {/* Back (Dark) */}
                <div className="p-4 rounded-xl bg-slate-950 text-white border border-white/10 shadow-sm space-y-1 text-[10px]">
                  <span className="font-bold text-xs block">Alex Morgan</span>
                  <span className="text-slate-400 text-[9px] block">Founder &amp; CEO &middot; {brandName}</span>
                  <p className="text-slate-400 font-mono text-[8.5px] pt-1">hello@{brandName.toLowerCase()}.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* 12. SOCIAL POST TEMPLATE */}
          <div className={`rounded-3xl border ${borderSubtle} ${bgCard} p-6 flex flex-col justify-between`}>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                12. SOCIAL TEMPLATE
              </span>
              <p className={`text-xs ${textMuted} mb-4`}>
                1080&times;1080px square post layout for Instagram &amp; LinkedIn.
              </p>

              {/* Square Post Mockup */}
              <div className="aspect-square rounded-2xl bg-white text-slate-900 p-5 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span className="font-black text-[11px]">{brandName}</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentLime }} />
                </div>

                <div>
                  <h5 className="font-black text-base sm:text-lg leading-tight" style={{ fontFamily: headingFont }}>
                    Your ideas <br />
                    deserve <br />
                    <span style={{ color: primaryColor }}>action.</span>
                  </h5>
                  <p className="text-[9px] text-slate-400 mt-1">Capture. Organize. Get things done.</p>
                </div>

                <div className="text-[8.5px] font-mono text-slate-400 border-t border-slate-100 pt-1.5 flex justify-between">
                  <span>@{brandName.toLowerCase()}</span>
                  <span>Swipe &gt;</span>
                </div>
              </div>
            </div>
          </div>

          {/* 13. BRAND VALUES */}
          <div className={`rounded-3xl border ${borderSubtle} ${bgCard} p-6 flex flex-col justify-between`}>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                13. BRAND VALUES
              </span>
              <p className={`text-xs ${textMuted} mb-4`}>
                4 fundamental pillars guiding brand behavior and design craft.
              </p>

              <div className="space-y-2.5">
                {[
                  { label: "Capture Everything", desc: "Zero friction in recording moments", icon: Camera },
                  { label: "Organize Clearly", desc: "Clarity over clutter at all times", icon: FolderKanban },
                  { label: "Think Smarter", desc: "Empower human speed with AI", icon: Bot },
                  { label: "Take Action Faster", desc: "Momentum beats perfectionism", icon: Zap },
                ].map((val) => {
                  const Icon = val.icon;
                  return (
                    <div key={val.label} className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shrink-0">
                        <Icon className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <strong className="text-xs text-slate-900 dark:text-white block font-bold">{val.label}</strong>
                        <span className="text-[10px] text-slate-400">{val.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SHEET FOOTER: OFFICIAL SEAL & SIGN OFF
            ───────────────────────────────────────────────────────────── */}
        <div className={`pt-6 border-t ${borderSubtle} flex items-center justify-between flex-wrap gap-4 text-xs font-mono ${textMuted}`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00FF87]" />
            <span>AUTHENTIC BRAND IDENTITY GUIDELINE &middot; ALL RIGHTS RESERVED</span>
          </div>
          <div>
            <span>VERIFIED &middot; QLLIX DESIGN SYSTEM ENGINE</span>
          </div>
        </div>

      </div>

      {/* ── Global Print Styles for High-Quality PDF Export ── */}
      <style jsx global>{`
        @media print {
          /* Hide non-print UI elements */
          body * {
            visibility: hidden;
          }
          #brand-guideline-print-document,
          #brand-guideline-print-document * {
            visibility: visible;
          }
          #brand-guideline-print-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            padding: 20mm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: #0f172a !important;
          }
          .no-print {
            display: none !important;
          }
          /* Ensure crisp colors and backgrounds in PDF */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .brand-cover-page {
            page-break-after: always !important;
            min-height: 90vh !important;
          }
          .section-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-top: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
