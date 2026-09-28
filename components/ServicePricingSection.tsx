"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
  Check, Star, Zap, ArrowRight, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { AgencyService, ServicePackage, DEFAULT_CMS_DATA } from "@/lib/cmsStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
};

interface ServicePricingSectionProps {
  onOrderClick?: (serviceId: string, packageId: string) => void;
  hideHeader?: boolean;
  selectedServiceId?: string;
}

function PackageCard({
  pkg,
  service,
  onOrderClick,
  index,
  totalCards = 3,
}: {
  pkg: ServicePackage;
  service: AgencyService;
  onOrderClick?: (serviceId: string, packageId: string) => void;
  index: number;
  totalCards?: number;
}) {
  // Center card is highlighted as popular if isPopular is set, or if 3 cards and index === 1
  const isPopular = pkg.isPopular || (totalCards === 3 && index === 1);

  const regularPrice = typeof pkg?.price === "number" && !isNaN(pkg.price) ? pkg.price : (Number(pkg?.price) || 0);
  const discountVal = typeof pkg?.discountPrice === "number" && !isNaN(pkg.discountPrice) ? pkg.discountPrice : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 transition-all duration-300 ${
        isPopular
          ? "bg-[#0B132B] text-white border-2 border-[#00FF87]/40 shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:-translate-y-2"
          : "bg-white text-slate-900 border border-slate-200/90 hover:border-slate-300 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      <div>
        {/* Top Row: Plan Name & Most Popular Pill */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isPopular ? "text-white" : "text-slate-800"}`}>
            {pkg.name}
          </h3>
          {isPopular && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 border border-[#00FF87]/50 text-[#00FF87] shadow-sm">
              {pkg.badge || "Most Popular"}
            </span>
          )}
        </div>

        {/* Price Row: Regular Price vs Base Package Discount */}
        <div className="mb-5">
          {discountVal ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isPopular ? "text-white" : "text-slate-950"}`}>
                ৳{discountVal.toLocaleString()}
              </span>
              <span className={`text-sm font-semibold ${isPopular ? "text-slate-400" : "text-slate-500"}`}>
                {pkg.isMonthly ? "/month" : "/project"}
              </span>
              <span className="text-slate-400 line-through text-sm">
                ৳{regularPrice.toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isPopular ? "text-white" : "text-slate-950"}`}>
                ৳{regularPrice.toLocaleString()}
              </span>
              <span className={`text-sm font-semibold ${isPopular ? "text-slate-400" : "text-slate-500"}`}>
                {pkg.isMonthly ? "/month" : "/project"}
              </span>
            </div>
          )}

          {/* Delivery and revisions sub-note */}
          <div className="flex items-center gap-3 mt-2 text-xs font-medium">
            <span className={`flex items-center gap-1 ${isPopular ? "text-slate-300" : "text-slate-500"}`}>
              <Zap className={`w-3.5 h-3.5 ${isPopular ? "text-[#00FF87]" : "text-[#00875A]"}`} />
              {pkg.deliveryDays || 3} {pkg.isMonthly ? "day delivery" : `day${(pkg.deliveryDays || 3) > 1 ? "s" : ""} delivery`}
            </span>
            <span className={isPopular ? "text-slate-600" : "text-slate-300"}>·</span>
            <span className={isPopular ? "text-slate-300" : "text-slate-500"}>{pkg.revisions || "Unlimited"} revisions</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onOrderClick?.(service?.id || "", pkg.id)}
          className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer mb-7 active:scale-98 ${
            isPopular
              ? "bg-[#00FF87] text-[#02180C] hover:bg-[#00e87a] shadow-[0_4px_25px_rgba(0,255,135,0.4)]"
              : "bg-[#00875A] text-white hover:bg-[#00704a] shadow-[0_4px_15px_rgba(0,135,90,0.25)]"
          }`}
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Features List with Checkmarks */}
        <ul className="space-y-3.5 pb-2">
          {(Array.isArray(pkg.features) ? pkg.features : []).map((feat, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Check className={`w-4 h-4 shrink-0 mt-0.5 stroke-[3] ${isPopular ? "text-[#00FF87]" : "text-[#00875A]"}`} />
              <span className={`leading-snug ${isPopular ? "text-slate-200" : "text-slate-700"}`}>
                {typeof feat === "string" ? feat : (feat as { text: string })?.text || String(feat)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ServicePricingSection({ onOrderClick, hideHeader = false, selectedServiceId }: ServicePricingSectionProps) {
  const { cmsData, getPackagesForService } = useCms();

  const rawServices = Array.isArray(cmsData?.agencyServices) && cmsData.agencyServices.length > 0
    ? cmsData.agencyServices
    : DEFAULT_CMS_DATA.agencyServices;

  const activeServices = [...rawServices]
    .filter((s) => s && s.active)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const [activeServiceId, setActiveServiceId] = useState<string>(
    selectedServiceId || activeServices[0]?.id || DEFAULT_CMS_DATA.agencyServices[0]?.id || "logo-design"
  );

  useEffect(() => {
    if (selectedServiceId && activeServices.some((s) => s.id === selectedServiceId)) {
      setActiveServiceId(selectedServiceId);
    }
  }, [selectedServiceId, activeServices]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (!tabsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [activeServices.length]);

  const scrollTabs = (direction: "left" | "right") => {
    if (!tabsRef.current) return;
    const amount = direction === "left" ? -260 : 260;
    tabsRef.current.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(checkScrollButtons, 300);
  };

  const activeService = (activeServices.find((s) => s.id === activeServiceId) || activeServices[0]) || DEFAULT_CMS_DATA.agencyServices[0];
  const packages = activeService ? (getPackagesForService?.(activeService.id) || []) : [];

  const sectionsList = Array.isArray(cmsData?.homeSections) ? cmsData.homeSections : DEFAULT_CMS_DATA.homeSections;
  const section = sectionsList.find((s) => s.id === "pricing");
  if (section && !section.enabled) return null;

  return (
    <section className={`relative bg-white ${hideHeader ? "pt-6 sm:pt-8 pb-20" : "pt-12 sm:pt-16 pb-24 md:pb-28"}`} id="pricing">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center ${hideHeader ? "mb-6" : "mb-12"}`}
        >
          {!hideHeader && (
            <>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
                {section?.title || "Simple, Transparent Pricing"}
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
                {section?.subtitle || "Choose the package that fits your goals and budget. No hidden fees."}
              </p>
            </>
          )}

          {/* Service Tab Switcher (Scrollable with Navigation Controls) */}
          <div className={`relative max-w-5xl mx-auto ${hideHeader ? "mt-2" : "mt-8"}`}>
            {/* Left Chevron Button */}
            {canScrollLeft && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center">
                <button
                  type="button"
                  onClick={() => scrollTabs("left")}
                  aria-label="Scroll left"
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-md border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm -ml-2 sm:-ml-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Left Fade Gradient */}
            {canScrollLeft && (
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10 rounded-l-full" />
            )}

            {/* Tabs List */}
            <div
              ref={tabsRef}
              onScroll={checkScrollButtons}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-2 px-3 sm:px-6 max-w-full"
            >
              {activeServices.map((service) => {
                const isActive = service.id === activeServiceId;
                const Icon = ICON_MAP[service.icon] || Sparkles;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={(e) => {
                      setActiveServiceId(service.id);
                      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                      setTimeout(checkScrollButtons, 300);
                    }}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 select-none ${
                      isActive
                        ? "bg-[#0B132B] text-white shadow-md shadow-slate-900/15 border border-[#00FF87]/40 ring-1 ring-[#00FF87]/30 scale-[1.02]"
                        : "bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse shrink-0" />
                    )}
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isActive ? "text-[#00FF87]" : "text-slate-400 group-hover:text-slate-700"}`} />
                    <span>{service.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Fade Gradient */}
            {canScrollRight && (
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 rounded-r-full" />
            )}

            {/* Right Chevron Button */}
            {canScrollRight && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center">
                <button
                  type="button"
                  onClick={() => scrollTabs("right")}
                  aria-label="Scroll right"
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-md border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm -mr-2 sm:-mr-3"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {/* Subtle transparent pricing & coupon note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1 text-[#00875A] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </span>
            <span>·</span>
            <span>Have a coupon code? Apply it at checkout for instant discount.</span>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        {packages.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            >
              {packages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  service={activeService}
                  onOrderClick={onOrderClick}
                  index={index}
                  totalCards={packages.length}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            <p className="text-sm">No packages currently listed for this service.</p>
          </div>
        )}

        {/* Money back / Guarantee banner */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-8">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            100% Commercial Rights Included
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Full Source Files (AI, PSD, EPS)
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Dedicated Revision Cycles
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            On-Time Delivery Guarantee
          </span>
        </div>
      </div>
    </section>
  );
}
