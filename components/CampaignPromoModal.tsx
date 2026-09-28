"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function CampaignPromoModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { cmsData } = useCms();
  const [isOpen, setIsOpen] = useState(false);

  // Never render promo modal inside admin dashboard
  if (!pathname || pathname.startsWith("/admin")) return null;

  const activeCampaign = cmsData.campaigns?.find(
    (c) => c.active && (c.displayType === "popup_modal" || c.displayType === "both")
  );

  useEffect(() => {
    if (!activeCampaign) return;

    try {
      const dismissed = sessionStorage.getItem(`qllix_camp_dismissed_${activeCampaign.id}`);
      if (dismissed === "true") return;

      // Show after 4.5 seconds of site exploration
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4500);

      return () => clearTimeout(timer);
    } catch (e) {
      console.warn(e);
    }
  }, [activeCampaign]);

  if (!activeCampaign || !isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(`qllix_camp_dismissed_${activeCampaign.id}`, "true");
    } catch (e) {
      console.warn(e);
    }
  };

  const handleClaimOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    const discount = activeCampaign.discountPercent || 25;

    // 1. Store active offer in session storage for auto-discounting
    try {
      sessionStorage.setItem(
        "qllix_active_offer",
        JSON.stringify({
          id: activeCampaign.id,
          discount: discount,
          code: activeCampaign.code || "QLLIX25",
          badge: activeCampaign.badge || "Special Offer",
        })
      );
      // Trigger instant event for components on current page
      window.dispatchEvent(
        new CustomEvent("qllix-offer-applied", {
          detail: { discount, id: activeCampaign.id, code: activeCampaign.code },
        })
      );
    } catch (err) {
      console.warn(err);
    }

    handleClose();

    // 2. Smoothly direct user to pricing section/page
    if (pathname === "/") {
      const pricingEl = document.getElementById("pricing");
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    router.push(`/pricing?discount=${discount}&offer=${activeCampaign.id}`);
  };

  const bannerImg =
    activeCampaign.imageUrl && activeCampaign.imageUrl.trim() !== ""
      ? activeCampaign.imageUrl
      : "/images/campaign-banner.jpg";

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modern Card (Compact width, 1:1 Square Image System, Zero Title) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.38)] transition-all">
        {/* Floating Round 'X' Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white shadow-lg border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          title="Close Offer"
          aria-label="Close Offer"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* 1:1 Aspect Ratio Square Banner Graphic */}
        <div className="relative w-full aspect-square bg-[#050C08] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bannerImg}
            alt="Promotional Offer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/campaign-banner.jpg";
            }}
          />
        </div>

        {/* Action Area: ONLY Button and 'Maybe Later' underneath (No title as requested) */}
        <div className="p-4 sm:p-5 bg-white space-y-2.5">
          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleClaimOffer}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-sm tracking-wide shadow-[0_4px_22px_rgba(0,255,135,0.45)] flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>{activeCampaign.ctaText || `Claim ${activeCampaign.discountPercent || 25}% Off`}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Maybe Later link */}
          <button
            type="button"
            onClick={handleClose}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-700 transition-colors py-1 cursor-pointer font-medium"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
