"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Check, Star, ArrowRight, Sparkles, Zap, RefreshCw } from "lucide-react";
import { useCms } from "@/context/CmsContext";

interface MonthlyCreativeSectionProps {
  onOrderClick?: (serviceId: string, packageId: string) => void;
}

export default function MonthlyCreativeSection({ onOrderClick }: MonthlyCreativeSectionProps) {
  const { cmsData, getPackagesForService } = useCms();

  const section = cmsData.homeSections.find((s) => s.id === "monthly_creative");
  if (section && !section.enabled) return null;

  const monthlyService = cmsData.agencyServices.find((s) => s.id === "monthly-social-creative" && s.active);
  if (!monthlyService) return null;

  const packages = getPackagesForService("monthly-social-creative");
  if (packages.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70 border-y border-slate-200/60 overflow-hidden" id="monthly-creative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            {section?.title || "Monthly Creative Subscription"}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            {section?.subtitle || "Never run out of fresh content — our design team handles your social media visuals every single month."}
          </p>

          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {["No Contract Lock-in", "Pause or Cancel Anytime", "Daily/Weekly Turnaround", "Brand Guidelines Maintained"].map((v) => (
              <div key={v} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                {v}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, index) => {
            const isPopular = pkg.isPopular || (packages.length === 3 && index === 1);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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

                  {/* Price Row */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isPopular ? "text-white" : "text-slate-950"}`}>
                        ৳{(typeof pkg.price === "number" ? pkg.price : Number(pkg.price) || 0).toLocaleString()}
                      </span>
                      <span className={`text-sm font-semibold ${isPopular ? "text-slate-400" : "text-slate-500"}`}>
                        /month
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs font-medium">
                      <Zap className={`w-3.5 h-3.5 ${isPopular ? "text-[#00FF87]" : "text-[#00875A]"}`} />
                      <span className={isPopular ? "text-slate-300" : "text-slate-500"}>
                        Turnaround: {pkg.deliveryDays} business days per design request
                      </span>
                    </div>
                  </div>

                  {/* CTA Button (Positioned above features, matching reference image) */}
                  <button
                    onClick={() => onOrderClick?.(monthlyService.id, pkg.id)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer mb-7 active:scale-98 ${
                      isPopular
                        ? "bg-[#00FF87] text-[#02180C] hover:bg-[#00e87a] shadow-[0_4px_25px_rgba(0,255,135,0.4)]"
                        : "bg-[#00875A] text-white hover:bg-[#00704a] shadow-[0_4px_15px_rgba(0,135,90,0.25)]"
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Features List with Checkmarks (Matching reference image) */}
                  <ul className="space-y-3.5 pb-2">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 stroke-[3] ${isPopular ? "text-[#00FF87]" : "text-[#00875A]"}`} />
                        <span className={`leading-snug ${isPopular ? "text-slate-200" : "text-slate-700"}`}>
                          {typeof feat === "string" ? feat : (feat as { text: string }).text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
