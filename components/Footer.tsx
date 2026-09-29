"use client";

import React, { useState, useRef } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Check,
  Sparkles,
  Send,
  Calculator,
  Facebook,
  Instagram,
  Linkedin,
  Dribbble,
  Twitter,
  Youtube,
  MessageCircle,
  Globe,
} from "lucide-react";
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
  const socialLinks = cmsData.general.socialLinks || {};
  const whatsappHref = socialLinks.whatsapp
    ? socialLinks.whatsapp.startsWith("http")
      ? socialLinks.whatsapp
      : `https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`
    : "#";

  const socialProfileLinks = [
    { label: "Instagram", href: socialLinks.instagram || "https://instagram.com", color: "hover:text-[#E1306C]", Icon: Instagram },
    { label: "Facebook", href: socialLinks.facebook || "https://facebook.com", color: "hover:text-[#1877F2]", Icon: Facebook },
    { label: "LinkedIn", href: socialLinks.linkedin || "https://linkedin.com", color: "hover:text-[#0A66C2]", Icon: Linkedin },
    { label: "Dribbble", href: socialLinks.dribbble || "https://dribbble.com", color: "hover:text-[#EA4C89]", Icon: Dribbble },
    { label: "Behance", href: socialLinks.behance || "https://behance.net", color: "hover:text-[#1769FF]", Icon: Globe },
    { label: "X / Twitter", href: socialLinks.twitter || "https://x.com", color: "hover:text-[#00FF87]", Icon: Twitter },
    { label: "YouTube", href: socialLinks.youtube || "https://youtube.com", color: "hover:text-[#FF0000]", Icon: Youtube },
    { label: "WhatsApp", href: whatsappHref, color: "hover:text-[#25D366]", Icon: MessageCircle },
  ];

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
              {socialProfileLinks.map(({ label, href, color, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`transition-colors flex items-center gap-1.5 group ${color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              ))}
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
            <div className="flex items-center gap-2.5 pl-2">
              {[
                { href: socialLinks.dribbble || "https://dribbble.com", title: "Dribbble", className: "text-white hover:text-[#EA4C89]", Icon: Dribbble },
                { href: socialLinks.behance || "https://behance.net", title: "Behance", className: "text-white hover:text-[#1769FF]", Icon: Globe },
                { href: socialLinks.twitter || "https://x.com", title: "Twitter / X", className: "text-white hover:text-[#00FF87]", Icon: Twitter },
                { href: socialLinks.instagram || "https://instagram.com", title: "Instagram", className: "text-white hover:text-[#E1306C]", Icon: Instagram },
                { href: socialLinks.linkedin || "https://linkedin.com", title: "LinkedIn", className: "text-white hover:text-[#0A66C2]", Icon: Linkedin },
                { href: socialLinks.facebook || "https://facebook.com", title: "Facebook", className: "text-white hover:text-[#1877F2]", Icon: Facebook },
                { href: socialLinks.youtube || "https://youtube.com", title: "YouTube", className: "text-white hover:text-[#FF0000]", Icon: Youtube },
                { href: whatsappHref, title: "WhatsApp", className: "text-white hover:text-[#25D366]", Icon: MessageCircle },
              ].map(({ href, title, className, Icon }) => (
                <a key={title} href={href} target="_blank" rel="noreferrer" className={`${className} transition-colors`} title={title}>
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
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
