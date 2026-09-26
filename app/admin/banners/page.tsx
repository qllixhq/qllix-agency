"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { CmsData, HeroBannerConfig } from "@/lib/cmsStore";
import { Sparkles, Save, CheckCircle2, Eye, ArrowRight, RotateCcw } from "lucide-react";

type PageKey = keyof CmsData["banners"];

export default function AdminBannersPage() {
  const { cmsData, updateBanner } = useCms();
  const [activeTab, setActiveTab] = useState<PageKey>("home");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const banner = cmsData.banners[activeTab];

  const [formState, setFormState] = useState<HeroBannerConfig>(banner);

  // Sync form when tab changes
  const handleTabChange = (key: PageKey) => {
    setActiveTab(key);
    setFormState(cmsData.banners[key]);
    setSavedSuccess(false);
  };

  const handleFieldChange = (field: keyof HeroBannerConfig, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanner(activeTab, formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const pageTabs: { key: PageKey; label: string; route: string }[] = [
    { key: "home", label: "Home Page", route: "/" },
    { key: "projects", label: "Projects Page", route: "/projects" },
    { key: "services", label: "Services Page", route: "/services" },
    { key: "pricing", label: "Pricing Page", route: "/pricing" },
    { key: "contact", label: "Contact Page", route: "/contact" },
    { key: "about", label: "About Page", route: "/about" },
  ];

  return (
    <div>
      <AdminHeader
        title="Hero Banners &amp; Typography"
        subtitle="Manage hero typography, glowing emerald accents, and CTA buttons across all pages"
      />

      <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
          {pageTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#00FF87] text-[#02180C] shadow-[0_0_15px_rgba(0,255,135,0.35)] font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border border-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-70 font-mono">({tab.route})</span>
              </button>
            );
          })}
        </div>

        {/* Notification Toast */}
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-[#00FF87] flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Hero banner for &quot;{activeTab.toUpperCase()}&quot; updated live! Changes are visible on the website immediately.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ═══ EDIT FORM (7 Columns) ═══ */}
          <form onSubmit={handleSave} className="lg:col-span-7 bg-[#020F07] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Editing: <span className="text-[#00FF87] capitalize">{activeTab} Banner</span>
                </h3>
                <p className="text-xs text-slate-400">Configure text and visual styling</p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Save Changes</span>
              </button>
            </div>

            {/* Breadcrumb Pill */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                Breadcrumb Badge Text
              </label>
              <input
                type="text"
                value={formState.breadcrumb}
                onChange={(e) => handleFieldChange("breadcrumb", e.target.value)}
                placeholder="Ex. Projects"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            {/* Line 1 Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                  Headline Line 1 (Main Text)
                </label>
                <input
                  type="text"
                  value={formState.line1Prefix}
                  onChange={(e) => handleFieldChange("line1Prefix", e.target.value)}
                  placeholder="Ex. Designing the "
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FF87]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-emerald-400 font-bold mb-1.5">
                  Line 1 Glowing Accent (Italic)
                </label>
                <input
                  type="text"
                  value={formState.line1Accent}
                  onChange={(e) => handleFieldChange("line1Accent", e.target.value)}
                  placeholder="Ex. Future"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-500/40 text-[#00FF87] text-sm focus:outline-none focus:border-[#00FF87] font-serif italic"
                />
              </div>
            </div>

            {/* Line 2 Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                  Headline Line 2 (Main Text)
                </label>
                <input
                  type="text"
                  value={formState.line2Prefix || ""}
                  onChange={(e) => handleFieldChange("line2Prefix", e.target.value)}
                  placeholder="Ex. of Your "
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FF87]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-emerald-400 font-bold mb-1.5">
                  Line 2 Glowing Accent (Italic)
                </label>
                <input
                  type="text"
                  value={formState.line2Accent || ""}
                  onChange={(e) => handleFieldChange("line2Accent", e.target.value)}
                  placeholder="Ex. Brand."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-500/40 text-[#00FF87] text-sm focus:outline-none focus:border-[#00FF87] font-serif italic"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                Sub-Headline Description
              </label>
              <textarea
                rows={3}
                value={formState.subtitle}
                onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                placeholder="Enter description..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FF87] resize-none leading-relaxed"
              />
            </div>

            {/* CTA Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={formState.ctaText}
                  onChange={(e) => handleFieldChange("ctaText", e.target.value)}
                  placeholder="Ex. Let's Talk"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FF87]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                  CTA Button Link / Anchor
                </label>
                <input
                  type="text"
                  value={formState.ctaHref}
                  onChange={(e) => handleFieldChange("ctaHref", e.target.value)}
                  placeholder="Ex. /contact or #contact-form"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FF87]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-sm transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>Save Live Banner</span>
              </button>
            </div>

          </form>

          {/* ═══ LIVE PREVIEW (5 Columns) ═══ */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#00FF87]" />
                <h4 className="text-xs font-mono uppercase font-bold text-slate-300">
                  Live Banner Preview
                </h4>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Simulated</span>
            </div>

            <div className="rounded-2xl bg-black border border-emerald-500/25 p-6 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center">
              
              {/* Radial glow simulation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#00FF87]/15 blur-[80px] rounded-full pointer-events-none" />

              {/* Logo preview */}
              <img
                src={cmsData.general.logoUrl || "/images/logo.png"}
                alt="Logo"
                className="h-7 w-auto object-contain mb-3 drop-shadow-[0_0_15px_rgba(48,255,151,0.6)]"
              />

              {/* Breadcrumb preview */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] text-slate-300 mb-4">
                <span>Home</span>
                <span className="text-slate-500">›</span>
                <span className="text-[#00FF87] font-semibold">{formState.breadcrumb}</span>
              </div>

              {/* Headline preview */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3 font-serif">
                <span>{formState.line1Prefix}</span>
                <em className="italic font-normal text-[#00FF87] drop-shadow-[0_0_20px_rgba(0,255,135,0.7)] font-serif">
                  {formState.line1Accent}
                </em>
                {(formState.line2Prefix || formState.line2Accent) && (
                  <>
                    <br />
                    <span>{formState.line2Prefix}</span>
                    <em className="italic font-normal text-[#00FF87] drop-shadow-[0_0_20px_rgba(0,255,135,0.7)] font-serif">
                      {formState.line2Accent}
                    </em>
                  </>
                )}
              </h2>

              {/* Subtitle preview */}
              <p className="text-[11px] text-slate-300/90 leading-relaxed mb-5 max-w-sm">
                {formState.subtitle}
              </p>

              {/* CTA Preview */}
              <div className="cta-animated-border px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-[0_4px_15px_rgba(0,255,135,0.3)]">
                <span className="font-sans font-black text-[#021A0C] text-xs">
                  {formState.ctaText}
                </span>
                <div className="w-5 h-5 rounded-full bg-[#012211] text-[#00FF87] flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-1">
              <div className="text-white font-semibold">Pro-tip for Typography:</div>
              <p>Keep the main text in standard font and place your high-impact action keywords into the <span className="text-[#00FF87]">Glowing Accent</span> fields for the signature Playfair italic aesthetic.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
