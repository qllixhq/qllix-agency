"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
  ArrowRight, CheckCircle, Info, Star,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { AgencyService, DEFAULT_CMS_DATA } from "@/lib/cmsStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
};

// Curated 3D Image Bundles for every service with distinct, relevant mockups
export const SERVICE_BUNDLES: Record<string, { left: string; center: string; right: string; badge: string }> = {
  "logo-design": {
    left: "/images/showcase/card_r2_03_golf.png",
    center: "/images/showcase/card_r2_02_yantrik.png",
    right: "/images/showcase/card_r2_04_alpine.png",
    badge: "Vector Master",
  },
  "social-media-design": {
    left: "/images/showcase/card_r1_07_coffee.png",
    center: "/images/showcase/card_r1_05_ter.png",
    right: "/images/showcase/card_r1_03_gummiz.png",
    badge: "Viral Creatives",
  },
  "packaging-label-design": {
    left: "/images/showcase/card_r1_03_gummiz.png",
    center: "/images/showcase/card_r2_06_zinggo.png",
    right: "/images/showcase/card_r1_07_coffee.png",
    badge: "3D Packaging",
  },
  "reels-editing": {
    left: "/images/showcase/card_r1_06_leather.png",
    center: "/images/showcase/card_r2_05_venex.png",
    right: "/images/showcase/card_r2_04_alpine.png",
    badge: "9:16 Vertical Video",
  },
  "logo-animation": {
    left: "/images/showcase/card_r2_04_alpine.png",
    center: "/images/showcase/card_r2_04_alpine.png",
    right: "/images/showcase/card_r2_02_yantrik.png",
    badge: "Kinetic Motion",
  },
  "full-brand-design": {
    left: "/images/showcase/card_r1_05_ter.png",
    center: "/images/showcase/card_r1_04_gridline.png",
    right: "/images/showcase/card_r1_06_leather.png",
    badge: "Complete Identity",
  },
  "digital-marketing": {
    left: "/images/showcase/card_r1_07_coffee.png",
    center: "/images/showcase/card_r1_02_affine.png",
    right: "/images/showcase/card_r2_01_tablet.png",
    badge: "High-ROI Ads",
  },
  "social-media-page-setup": {
    left: "/images/showcase/card_r2_03_golf.png",
    center: "/images/showcase/card_r1_05_ter.png",
    right: "/images/showcase/card_r1_03_gummiz.png",
    badge: "Full Profile Setup",
  },
  "political-poster-banner": {
    left: "/images/showcase/card_r2_04_alpine.png",
    center: "/images/showcase/card_r2_03_golf.png",
    right: "/images/showcase/card_r2_02_yantrik.png",
    badge: "Campaign & Print",
  },
  "monthly-social-creative": {
    left: "/images/showcase/card_r1_07_coffee.png",
    center: "/images/showcase/card_r1_03_gummiz.png",
    right: "/images/showcase/card_r1_01_fitmate.png",
    badge: "Monthly Retainer",
  },
  "youtube-video-editing": {
    left: "/images/showcase/card_r1_02_affine.png",
    center: "/images/showcase/card_r2_01_tablet.png",
    right: "/images/showcase/card_r2_05_venex.png",
    badge: "Thumbnails & 4K Edit",
  },
  "company-profile-catalogue": {
    left: "/images/showcase/card_r1_04_gridline.png",
    center: "/images/showcase/card_r1_06_leather.png",
    right: "/images/showcase/card_r1_02_affine.png",
    badge: "Corporate PDF & Print",
  },
  "stand-banner-x-banner": {
    left: "/images/showcase/card_r2_04_alpine.png",
    center: "/images/showcase/card_r2_06_zinggo.png",
    right: "/images/showcase/card_r2_03_golf.png",
    badge: "Display & Event",
  },
};

interface ServicesOverviewProps {
  onOrderClick?: (serviceId: string) => void;
  onViewPackages?: (serviceId: string) => void;
  onServiceClick?: (serviceId: string) => void;
  hideHeader?: boolean;
}

function ServiceCard({
  service,
  startingPrice,
  isMonthly,
  index,
  onOrderClick,
  onViewPackages,
  onServiceClick,
}: {
  service: AgencyService;
  startingPrice: number | null;
  isMonthly: boolean;
  index: number;
  onOrderClick?: (id: string) => void;
  onViewPackages?: (id: string) => void;
  onServiceClick?: (id: string) => void;
}) {
  const bundle = SERVICE_BUNDLES[service.id] || {
    left: "/images/showcase/card_r1_07_coffee.png",
    center: "/images/showcase/card_r1_01_fitmate.png",
    right: "/images/showcase/card_r1_03_gummiz.png",
    badge: "Design Stack",
  };

  const centerImg = service.cardMockupCenter || bundle.center;
  const finalPrice = typeof startingPrice === "number" && !isNaN(startingPrice) && startingPrice > 0 ? startingPrice : 1500;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group relative bg-white border border-slate-200 hover:border-[#00875A]/50 rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(0,135,90,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
      onClick={() => {
        if (onServiceClick) {
          onServiceClick(service.id);
        } else if (onViewPackages) {
          onViewPackages(service.id);
        }
      }}
    >
      {/* ═══ TOP THUMBNAIL IMAGE (5:4 Ratio) ═══ */}
      <div className="relative w-full aspect-[5/4] overflow-hidden bg-slate-100">
        <img
          src={centerImg}
          alt={service.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
          loading="lazy"
        />
        
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* ═══ CARD BODY: TITLE & PRICE ═══ */}
      <div className="p-4 sm:p-5 bg-white flex flex-col justify-between flex-1">
        {/* Service Title */}
        <div className="mb-3">
          <h3 className="text-base sm:text-[18px] font-bold text-[#0B132B] tracking-tight group-hover:text-[#00875A] transition-colors leading-snug">
            {service.name}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[9.5px] text-slate-400 font-semibold tracking-wider uppercase block leading-none mb-0.5">
              Starting from
            </span>
            <span className="text-lg sm:text-[20px] font-black text-[#00875A] tracking-tight">
              {service.cardPriceText ? service.cardPriceText : `৳${finalPrice.toLocaleString()}${isMonthly ? "/mo" : ""}`}
            </span>
          </div>

          {/* Pill Action Button with Arrow */}
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#EAF8F1] text-[#00875A] group-hover:bg-[#00875A] group-hover:text-white text-[11px] font-bold transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105">
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesOverview({
  onOrderClick,
  onViewPackages,
  onServiceClick,
  hideHeader = false,
}: ServicesOverviewProps) {
  const { cmsData, getStartingPrice, getPackagesForService } = useCms();
 
  const rawServices = Array.isArray(cmsData?.agencyServices) && cmsData.agencyServices.length > 0
    ? cmsData.agencyServices
    : DEFAULT_CMS_DATA.agencyServices;

  const activeServices = [...rawServices]
    .filter((s) => s && s.active)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(activeServices.map((s) => s.category).filter(Boolean)))];

  const filteredServices = selectedCategory === "All"
    ? activeServices
    : activeServices.filter((s) => s.category === selectedCategory);

  const sectionsList = Array.isArray(cmsData?.homeSections) ? cmsData.homeSections : DEFAULT_CMS_DATA.homeSections;
  const section = sectionsList.find((s) => s.id === "services");
  if (section && !section.enabled) return null;

  return (
    <section className={`relative bg-white ${hideHeader ? "pt-2 sm:pt-4 pb-28 sm:pb-36" : "pt-8 sm:pt-12 pb-32 sm:pb-40"}`} id="services">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center ${hideHeader ? "mb-6 sm:mb-8" : "mb-12"}`}
        >
          {!hideHeader && (
            <>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
                {section?.title || "Specialized Creative Services"}
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
                {section?.subtitle || "High-impact graphic design, motion, and digital creative solutions crafted to elevate your brand."}
              </p>
            </>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
                {cat === "All" && (
                  <span className="ml-1.5 text-xs opacity-75">({activeServices.length})</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid (Responsive 4-Column Layout on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredServices.map((service, index) => {
            const pkgs = getPackagesForService ? (getPackagesForService(service.id) || []) : [];
            const isMonthly = Array.isArray(pkgs) && pkgs.some((p) => p && p.isMonthly);
            const startingPrice = getStartingPrice ? getStartingPrice(service.id) : null;

            return (
              <ServiceCard
                key={service.id}
                service={service}
                startingPrice={startingPrice}
                isMonthly={isMonthly}
                index={index}
                onOrderClick={onOrderClick}
                onViewPackages={onViewPackages}
                onServiceClick={onServiceClick}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
