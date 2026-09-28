"use client";

import React, { useState, useRef } from "react";
import { ArrowUp, ArrowUpRight, ArrowRight, Check, Sparkles, Send, Calculator, DollarSign, Wallet } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { triggerSecretAdminModal } from "@/components/SecretAdminModal";
import AffiliateModal from "@/components/AffiliateModal";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const { cmsData } = useCms();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Affiliate Modal State
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);
  const [affiliateTab, setAffiliateTab] = useState<"lead" | "partner" | "calculator" | "rules">("partner");
  const orbitImages = cmsData.footerOrbitImages || [];

  const openAffiliate = (tab: "lead" | "partner" | "calculator" | "rules" = "partner") => {
    setAffiliateTab(tab);
    setIsAffiliateOpen(true);
  };

  // Hidden 3-Click (Triple Click) Secret Gateway Trigger
  const handleSecretTrigger = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        triggerSecretAdminModal();
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        return 0;
      }
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1200);
      return next;
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#07090E] pt-14 pb-32 border-t border-white/[0.08] text-slate-400 text-xs overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ══════════════════════════════════════════════════════════
            1. TOP HERO CARD (SquareUI Style with Slow Orbital Radar)
            ══════════════════════════════════════════════════════════ */}
        <div className="relative w-full rounded-[30px] sm:rounded-[36px] bg-gradient-to-b from-[#101524]/90 to-[#0A0E18]/95 border border-white/[0.1] p-8 sm:p-12 lg:p-14 overflow-hidden mb-16 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          
          {/* Subtle Accent Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
            
            {/* Left Column: Copy & CTA Button for Affiliate & Referral Marketing */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono uppercase tracking-wider text-[#00FF87] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#00FF87]" />
                <span>{cmsData.affiliateConfig?.badge || "Affiliate & Partner Program"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
                {cmsData.affiliateConfig?.title || "Refer Projects & Earn Flat 20% Commission"}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-lg">
                {cmsData.affiliateConfig?.subtitle || "২০,০০০ টাকার উপরের যেকোনো ব্র্যান্ডিং, ডিজাইন বা ভিডিও প্রজেক্ট রেফার করলেই প্রতিটি সাকসেসফুল ডিলে সাথে সাথে পান ফ্ল্যাট ২০% ক্যাশ কমিশন (৳৪,০০০+ ক্যাশ পে-আউট)!"}
              </p>

              {/* Commission Earnings Tiers Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                <button 
                  type="button"
                  onClick={() => openAffiliate("calculator")} 
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                  title="Click to calculate"
                >
                  <span className="text-slate-400">৳20,000 Deal</span>
                  <span className="text-[#00FF87] font-bold">&rarr; ৳4,000 Reward</span>
                </button>
                <button 
                  type="button"
                  onClick={() => openAffiliate("calculator")} 
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                  title="Click to calculate"
                >
                  <span className="text-slate-400">৳50,000 Deal</span>
                  <span className="text-[#00FF87] font-bold">&rarr; ৳10,000 Reward</span>
                </button>
                <button 
                  type="button"
                  onClick={() => openAffiliate("calculator")} 
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                  title="Click to calculate"
                >
                  <span className="text-slate-400">৳1,00,000 Deal</span>
                  <span className="text-[#00FF87] font-bold">&rarr; ৳20,000 Reward</span>
                </button>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openAffiliate("partner")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#00FF87] text-[#02180C] hover:bg-[#00e87a] text-xs sm:text-sm font-black shadow-[0_10px_30px_rgba(0,255,135,0.35)] active:scale-95 transition-all group cursor-pointer"
                >
                  <span>Become an Affiliate</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={() => openAffiliate("lead")}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/15 backdrop-blur-md transition-all cursor-pointer"
                >
                  <span>Submit Client Lead</span>
                  <Send className="w-3.5 h-3.5 text-[#00FF87]" />
                </button>

                <button
                  type="button"
                  onClick={() => openAffiliate("calculator")}
                  className="text-xs text-slate-400 hover:text-[#00FF87] flex items-center gap-1.5 transition-colors cursor-pointer ml-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculator &amp; Rules</span>
                </button>
              </div>
            </div>

            {/* Right Column: Orbital Radar Animation with Rotating Circles & Avatars */}
            <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[360px] lg:h-[390px] flex items-center justify-center select-none overflow-visible">
              
              {/* Center Ambient Radar Glow */}
              <div className="absolute w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

              {/* ─── Center Geometric Wireframe Cube Icon ─── */}
              <div className="relative z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#090D16]/90 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_35px_rgba(0,255,135,0.35)] ring-1 ring-white/10">
                <svg 
                  className="w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[1.7]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m21.12 6.4-6.05-3.5a2 2 0 0 0-2.14 0L6.88 6.4a2 2 0 0 0-1 1.73v7a2 2 0 0 0 1 1.73l6.05 3.5a2 2 0 0 0 2.14 0l6.05-3.5a2 2 0 0 0 1-1.73v-7a2 2 0 0 0-1-1.73Z"/>
                  <path d="M12 22v-9.5"/>
                  <path d="m3.29 7 8.71 5 8.71-5"/>
                </svg>
              </div>

              {/* ─── Orbit Ring 1 (Inner, 160px diameter) - Clockwise 45s ─── */}
              <div className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-white/25 pointer-events-none animate-orbit-medium">
                {/* Avatar 1: Bottom-Left on Ring 1 */}
                {orbitImages[0] && (
                  <div className="absolute bottom-2 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-[#0A0E18] border border-emerald-400/80 shadow-[0_0_12px_rgba(0,255,135,0.5)] overflow-hidden">
                    <img src={orbitImages[0]} alt="Qllix network member" className="w-full h-full object-cover rounded-full animate-counter-medium" />
                  </div>
                )}
              </div>

              {/* ─── Orbit Ring 2 (Middle, 260px diameter) - Counter-Clockwise 80s ─── */}
              <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-white/18 pointer-events-none animate-orbit-slow-reverse">
                {/* Avatar 2: Top-Right on Ring 2 */}
                {orbitImages[1] && (
                  <div className="absolute top-4 right-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-[#0A0E18] border border-sky-400/80 shadow-[0_0_12px_rgba(56,189,248,0.5)] overflow-hidden">
                    <img src={orbitImages[1]} alt="Qllix network member" className="w-full h-full object-cover rounded-full animate-counter-slow-reverse" />
                  </div>
                )}

                {/* Avatar 3: Bottom-Right on Ring 2 */}
                {orbitImages[2] && (
                  <div className="absolute bottom-6 right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-[#0A0E18] border border-emerald-400/80 shadow-[0_0_12px_rgba(0,255,135,0.5)] overflow-hidden">
                    <img src={orbitImages[2]} alt="Qllix network member" className="w-full h-full object-cover rounded-full animate-counter-slow-reverse" />
                  </div>
                )}
              </div>

              {/* ─── Orbit Ring 3 (Outer, 370px diameter) - Clockwise 65s ─── */}
              <div className="absolute w-[370px] h-[370px] rounded-full border border-dashed border-white/12 pointer-events-none animate-orbit-slow">
                {/* Avatar 4: Top-Left on Ring 3 */}
                {orbitImages[3] && (
                  <div className="absolute top-6 left-12 w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-[#0A0E18] border border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.5)] overflow-hidden">
                    <img src={orbitImages[3]} alt="Qllix network member" className="w-full h-full object-cover rounded-full animate-counter-slow" />
                  </div>
                )}

                {/* Avatar 5: Right on Ring 3 */}
                {orbitImages[4] && (
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-[#0A0E18] border border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.5)] overflow-hidden">
                    <img src={orbitImages[4]} alt="Qllix network member" className="w-full h-full object-cover rounded-full animate-counter-slow" />
                  </div>
                )}

                {/* Avatar 6: Bottom on Ring 3 */}
                {orbitImages[5] && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-[#0A0E18] border border-emerald-400/80 shadow-[0_0_12px_rgba(0,255,135,0.5)] overflow-hidden">
                    <img src={orbitImages[5]} alt="Qllix network member" className="w-full h-full object-cover rounded-full animate-counter-slow" />
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. BOTTOM LINKS & NEWSLETTER ROW
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-8 pb-12 border-b border-white/[0.08]">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
            <div 
              onClick={handleSecretTrigger}
              className="inline-flex items-center gap-3 cursor-default select-none transition-transform active:scale-98"
            >
              <img
                src={cmsData.general.footerLogoUrl || cmsData.general.logoUrl || "/images/logo.png"}
                alt="QLLIX Logo"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,255,135,0.4)]"
              />
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The most powerful creative partner &amp; design system for high-growth ambitious brands, startups, and modern creators.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="/pricing" className="hover:text-white transition-colors block">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Services</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Projects</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Team</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Socials</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Behance</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Dribbble</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/Qllix/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801911994532" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors flex items-center gap-1 group">
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-3 lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Receive creative drops, project case studies, exclusive discounts and agency insights.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-md">
              <div className="relative flex items-center rounded-full bg-white/[0.05] border border-white/10 focus-within:border-[#00FF87]/60 focus-within:ring-1 focus-within:ring-[#00FF87]/30 transition-all p-1.5 pl-4 backdrop-blur-md">
                <span className="text-slate-500 text-xs font-mono mr-2">@</span>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="bg-transparent border-none text-white placeholder-slate-500 text-xs focus:outline-none w-full pr-2"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-white text-black hover:bg-[#00FF87] hover:text-[#02180C] flex items-center justify-center shrink-0 transition-all active:scale-90"
                  aria-label="Subscribe"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#00FF87] mt-2 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Subscribed! Thank you for joining our list.</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            3. BOTTOM LEGAL & ATTRIBUTION BAR
            ══════════════════════════════════════════════════════════ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-slate-500 font-mono">
          <div
            onClick={handleSecretTrigger}
            className="cursor-default select-none transition-colors active:text-slate-300"
          >
            &copy; {new Date().getFullYear()} Qllix Creative Agency &middot; All rights reserved
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Branding, design &amp; digital growth by Qllix</span>
            <div className="flex items-center gap-2.5 pl-2 text-slate-400">
              <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Dribbble">
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12zm8.794 10.375c.071.498.11 1.006.11 1.523 0 1.258-.234 2.457-.655 3.565-.632-.236-2.261-.832-4.498-.832-.32 0-.649.012-.984.037a19.78 19.78 0 01-.194-1.254c2.617-.798 5.166-2.03 6.221-3.039zm-1.89-4.22c.983 1.05 1.636 2.375 1.839 3.834-.847.809-3.235 1.954-5.748 2.709-.766-1.574-1.666-3.117-2.67-4.57 2.463-.935 4.887-1.583 6.579-1.973zm-8.802-.857c.606 0 1.198.053 1.774.152.96 1.408 1.825 2.906 2.569 4.437-1.895.637-4.256 1.139-6.904 1.488.756-3.486 1.576-5.498 2.561-6.077zm-6.004 8.799a10.028 10.028 0 011.02-4.521c2.477-.333 4.708-.809 6.516-1.42.164.331.32.668.468 1.009-2.019 1.492-4.455 3.829-5.918 6.689-.838-.475-1.565-1.077-2.086-1.757zm4.27 4.148c1.378-2.611 3.655-4.814 5.565-6.237.166.862.293 1.745.381 2.645-3.328 1.15-5.32 2.92-5.946 3.592zm5.73 2.12c-.417.072-.843.111-1.278.111-2.457 0-4.664-.906-6.353-2.404.535-.589 2.345-2.148 5.438-3.228.455 2.012 1.258 3.856 2.193 5.521z"/>
                </svg>
              </a>
              <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Behance">
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.108 1.189.098 1.544h-7.854c.05 2.062 1.15 3.325 3.125 3.325 1.583 0 2.521-.734 2.875-1.7l1.58.7zM18.7 12.3c-.05-1.521-.854-2.479-2.325-2.479-1.42 0-2.316.928-2.484 2.479h4.809zM0 4h6.818C9.52 4 11 5.253 11 7.25c0 1.229-.537 2.179-1.503 2.684C10.74 10.457 11.5 11.66 11.5 13.2 11.5 15.589 9.61 17 6.953 17H0V4zm3.02 5.093h3.424c1.168 0 1.956-.514 1.956-1.547 0-1.002-.788-1.546-1.956-1.546H3.02v3.093zm0 5.814h3.692c1.328 0 2.19-.594 2.19-1.758 0-1.196-.862-1.79-2.19-1.79H3.02v3.548z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Twitter / X">
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:border-[#00FF87]/50 hover:text-[#00FF87]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Top
          </button>
        </div>

      </div>

      {/* Affiliate & Referral Modal */}
      <AffiliateModal
        isOpen={isAffiliateOpen}
        onClose={() => setIsAffiliateOpen(false)}
        defaultTab={affiliateTab}
      />
    </footer>
  );
}
