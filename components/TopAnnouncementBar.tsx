"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, X, Tag } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function TopAnnouncementBar() {
  const pathname = usePathname();
  const { cmsData } = useCms();
  const [isDismissed, setIsDismissed] = useState(false);

  // Never render promo announcements inside admin dashboard
  if (!pathname || pathname.startsWith("/admin")) return null;

  // Find first active campaign targeting announcement bar or both
  const activeCampaign = cmsData.campaigns?.find(
    (c) => c.active && (c.displayType === "announcement_bar" || c.displayType === "both")
  );

  if (!activeCampaign || isDismissed) return null;

  return (
    <aside
      aria-label="Promotional Announcement"
      className="relative z-50 bg-[#02180C] text-white border-b border-[#00FF87]/30 shadow-[0_2px_15px_rgba(0,255,135,0.15)] overflow-hidden transition-all"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-full bg-[#00FF87]/10 blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-2 flex items-center justify-between gap-3 text-xs">
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
          {/* Badge */}
          <span className="px-2.5 py-0.5 rounded-full bg-[#00FF87] text-[#02180C] font-black text-[10px] font-mono tracking-wider uppercase flex items-center gap-1 shadow-xs shrink-0">
            <Sparkles className="w-3 h-3 fill-[#02180C]" />
            <span>{activeCampaign.badge || "Special Offer"}</span>
          </span>

          {/* Campaign Title */}
          <span className="font-semibold text-slate-200 line-clamp-1">
            {activeCampaign.title}
          </span>

          {/* Code */}
          {activeCampaign.code && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border border-[#00FF87]/40 text-[#00FF87] font-mono font-bold text-[11px] shrink-0">
              <Tag className="w-2.5 h-2.5" />
              <span>{activeCampaign.code}</span>
            </span>
          )}

          {/* Action Link */}
          <Link
            href={activeCampaign.ctaLink || "/pricing"}
            className="inline-flex items-center gap-1 font-bold text-[#00FF87] hover:underline underline-offset-4 decoration-[#00FF87] shrink-0 ml-1"
          >
            <span>{activeCampaign.ctaText || "Claim Now"}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
