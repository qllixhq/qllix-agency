"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
  CheckCircle, ArrowRight, Clock, RefreshCw, Star, Zap,
  HelpCircle, ChevronDown, Check,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { AgencyService, ServicePackage, DEFAULT_CMS_DATA } from "@/lib/cmsStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
};

// Default deliverables mapping for rich presentation
const SERVICE_DELIVERABLES: Record<string, string[]> = {
  "logo-design": [
    "High-resolution vector files (AI, EPS, SVG, PDF)",
    "Transparent PNGs in color, black & white",
    "Comprehensive Brand Style Guide & Color Palette",
    "Font pairing recommendations & typography rules",
    "Favicon & App icon package",
    "Full commercial ownership & copyright transfer",
  ],
  "social-media-design": [
    "Pixel-perfect post & carousel templates",
    "Optimized dimensions for Instagram, Facebook, LinkedIn",
    "Editable Canva / Figma or PSD source files",
    "Visual aesthetic guideline for future posts",
    "Custom iconography & branding elements",
    "High-converting visual hierarchy & call-to-actions",
  ],
  "packaging-label": [
    "3D photorealistic product packaging mockup",
    "Print-ready dielines (AI, EPS, CMYK 300 DPI)",
    "Front, back & side label graphics",
    "Barcode, nutritional table & certification layouts",
    "Unlimited print vendor coordination guidance",
  ],
  "reels-editing": [
    "High-retention dynamic video editing (9:16 vertical)",
    "Animated captions & subtitles with custom typography",
    "Sound design, trend-aligned music & audio mastering",
    "Engaging pattern interrupts, zooms & motion graphics",
    "Color grading & exposure normalization",
    "Delivered in Full HD 1080x1920 MP4",
  ],
  "logo-animation": [
    "Custom 2D/3D kinetic logo motion intro & outro",
    "Transparent alpha channel (ProRes 4444 / WebM)",
    "Sound effects & custom audio intro integration",
    "Lottie / JSON file for blazing-fast web integration",
    "4K UHD & 1080p master export files",
  ],
  "full-brand-identity": [
    "Primary logo, secondary marks & brand seal",
    "Full brand guideline book (30+ pages PDF)",
    "Stationery suite: Business cards, letterheads, envelopes",
    "Social media kit & presentation deck template",
    "Custom brand pattern, illustrations & iconography",
    "Full copyright transfer & lifetime archive backup",
  ],
  "monthly-social-creative": [
    "Scheduled monthly content deliverables",
    "Dedicated senior art director & designer",
    "Roll-over revisions & priority 24-48h turnaround",
    "Cohesive visual strategy across all channels",
    "Monthly strategy sync & performance review",
  ],
  "company-profile-catalogue": [
    "Custom multi-page layout design (4 to 32+ pages)",
    "Print-ready CMYK PDF with crop marks & bleed",
    "Interactive digital web PDF with clickable links",
    "High-res realistic 3D booklet & catalogue mockups",
    "Custom infographics, charts & corporate data visualization",
    "Fully layered source files (Adobe InDesign / Illustrator)",
  ],
  "stand-banner-x-banner": [
    "High-impact roll-up stand banner & X-banner graphics",
    "Full-scale commercial print files (300 DPI CMYK TIFF & PDF)",
    "Standard & custom dimensions (e.g., 33x80\", 30x70\", 24x60\")",
    "Photorealistic 3D display mockups for event presentation",
    "High-contrast, distant-readable typography & brand messaging",
    "Vector source files (AI, EPS, PSD) ready for production",
  ],
};

interface ServiceDetailModalProps {
  serviceId: string | null;
  onClose: () => void;
  onOrderPackage: (serviceId: string, packageId: string) => void;
}

export default function ServiceDetailModal({
  serviceId,
  onClose,
  onOrderPackage,
}: ServiceDetailModalProps) {
  const { cmsData, getPackagesForService } = useCms();
  const [activeTab, setActiveTab] = useState<"packages" | "overview" | "faqs">("packages");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [appliedOffer, setAppliedOffer] = useState<{ discount: number; code?: string } | null>(null);

  useEffect(() => {
    if (serviceId) {
      setActiveTab("packages");
      setOpenFaqId(null);
      try {
        if (typeof window !== "undefined") {
          const saved = sessionStorage.getItem("qllix_active_offer");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.discount) {
              setAppliedOffer(parsed);
            }
          }
        }
      } catch {}
    }
  }, [serviceId]);

  const rawServices = Array.isArray(cmsData?.agencyServices) && cmsData.agencyServices.length > 0
    ? cmsData.agencyServices
    : DEFAULT_CMS_DATA.agencyServices;

  const service = serviceId ? rawServices.find((s) => s.id === serviceId) : null;

  if (!serviceId || !service) return null;

  const packages = getPackagesForService ? (getPackagesForService(service.id) || []) : [];
  const Icon = ICON_MAP[service.icon] || Sparkles;

  // Filter relevant FAQs for this service or general
  const rawFaqs = Array.isArray(cmsData?.agencyFaqs) ? cmsData.agencyFaqs : DEFAULT_CMS_DATA.agencyFaqs;
  const relevantFaqs = rawFaqs
    .filter((f) => f && f.active)
    .slice(0, 4);

  const deliverables = SERVICE_DELIVERABLES[service.id] || [
    "Custom high-resolution deliverable files",
    "Full commercial rights & ownership",
    "Dedicated designer & revision support",
    "Web & print-optimized exports",
    "Fast priority turnaround",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-slate-200/90 rounded-3xl shadow-2xl text-slate-900 overflow-hidden z-10 my-auto"
        >
          {/* Top Bar / Header */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-emerald-50/60 via-slate-50 to-white border-b border-slate-100 shrink-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 sm:gap-5 pr-12">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                    {service.category}
                  </span>
                  {service.featured && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      ★ Featured Service
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {service.name}
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200/60">
              <button
                onClick={() => setActiveTab("packages")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "packages"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Packages & Pricing ({packages.length})
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                What We Provide
              </button>
              <button
                onClick={() => setActiveTab("faqs")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "faqs"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Service FAQs
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* TAB 1: PACKAGES & PRICING */}
            {activeTab === "packages" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Choose Your Package</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Select the package that fits your project goals. All packages include source files & full revision cycles.</p>
                </div>

                {packages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {packages.map((pkg) => {
                      const regularPrice = typeof pkg?.price === "number" && !isNaN(pkg.price) ? pkg.price : (Number(pkg?.price) || 0);
                      const hasOffer = !!appliedOffer && typeof appliedOffer.discount === "number" && appliedOffer.discount > 0;
                      const discountVal = typeof pkg?.discountPrice === "number" && !isNaN(pkg.discountPrice) ? pkg.discountPrice : undefined;
                      const finalPrice = hasOffer
                        ? Math.round(regularPrice * (1 - appliedOffer.discount / 100))
                        : (discountVal ?? regularPrice);
                      const isPopular = Boolean(pkg.isPopular);

                      return (
                        <div
                          key={pkg.id}
                          className={`relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 border ${
                            isPopular
                              ? "bg-gradient-to-b from-emerald-50/50 to-white border-2 border-emerald-500 shadow-lg shadow-emerald-500/10"
                              : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                          }`}
                        >
                          {isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {pkg.badge || "Most Popular"}
                            </div>
                          )}

                          <div>
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                              {pkg.name}
                            </div>
                            <div className="flex items-baseline gap-1.5 mb-3 flex-wrap">
                              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                                ৳{(finalPrice || 0).toLocaleString()}
                              </span>
                              {pkg.isMonthly && <span className="text-xs text-slate-500">/mo</span>}
                              {(hasOffer || discountVal) && (
                                <span className="text-xs text-slate-400 line-through">
                                  ৳{(regularPrice || 0).toLocaleString()}
                                </span>
                              )}
                              {hasOffer && (
                                <span className="text-[10px] font-bold text-[#00875A] bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                                  {appliedOffer.discount}% OFF
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                              {pkg.shortDesc}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 mb-4 border-b border-slate-100">
                              <span className="flex items-center gap-1 font-medium">
                                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                                {pkg.deliveryDays || 3}d delivery
                              </span>
                              <span>•</span>
                              <span className="font-medium">
                                {typeof pkg.revisions === "number" ? `${pkg.revisions} revisions` : `${pkg.revisions || "Unlimited"} rev`}
                              </span>
                            </div>

                            <ul className="space-y-2 mb-6">
                              {(Array.isArray(pkg.features) ? pkg.features : []).map((feat, fi) => (
                                <li key={fi} className="flex items-start gap-2 text-xs text-slate-700">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{typeof feat === "string" ? feat : (feat as { text: string })?.text || String(feat)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button
                            onClick={() => {
                              onClose();
                              onOrderPackage(service.id, pkg.id);
                            }}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              isPopular
                                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                                : "bg-slate-900 text-white hover:bg-black shadow-sm"
                            }`}
                          >
                            <span>Order This Package</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                    <p className="text-sm font-medium">Standard packages coming soon or custom quoted.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onOrderPackage(service.id, "custom");
                      }}
                      className="mt-3 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all cursor-pointer"
                    >
                      Request Custom Project Quote
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WHAT WE PROVIDE & DELIVERABLES */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Comprehensive Deliverables</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Everything you will receive upon project completion.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Service Overview</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.longDesc || service.shortDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3 hover:border-emerald-300 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Need a bespoke package?</h5>
                    <p className="text-xs text-slate-600 mt-0.5">We can tailor deliverables specifically for your brand timeline.</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOrderPackage(service.id, packages[0]?.id || "");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shrink-0 cursor-pointer shadow-sm"
                  >
                    Discuss Custom Project
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: SERVICE FAQS */}
            {activeTab === "faqs" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Questions & Answers</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Common questions regarding this service.</p>
                </div>

                <div className="space-y-3">
                  {relevantFaqs.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-emerald-600" : ""}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
