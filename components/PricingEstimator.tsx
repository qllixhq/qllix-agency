"use client";

import React, { useState } from "react";
import { 
  BadgeDollarSign, 
  ArrowRight, 
  Calculator, 
  Clock, 
  Check 
} from "lucide-react";
import { PRICING_TIERS, ESTIMATOR_ADDONS } from "@/data/pricingData";

interface PricingEstimatorProps {
  onOpenBooking: (serviceId?: string, estimatedBudget?: number) => void;
}

export default function PricingEstimator({ onOpenBooking }: PricingEstimatorProps) {
  const [activeTab, setActiveTab] = useState<"tiers" | "calculator">("tiers");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "logo-system",
    "full-website",
    "meta-ads"
  ]);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculatedTotal = selectedAddons.reduce((sum, addonId) => {
    const item = ESTIMATOR_ADDONS.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const calculatedDays = selectedAddons.reduce((max, addonId) => {
    const item = ESTIMATOR_ADDONS.find((a) => a.id === addonId);
    return item ? Math.max(max, item.durationDays) : max;
  }, 7);

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#08080C] border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">


          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Predictable Pricing. <em className="text-[#00FF87] not-italic">Zero Guesswork.</em>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Fixed sprint scopes and scalable performance retainers. No surprise invoices, hidden hours, or markup.
          </p>

          {/* Toggle between Fixed Sprints and Interactive Calculator */}
          <div className="mt-8 inline-flex p-1.5 bg-[#0e1017] rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab("tiers")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "tiers"
                  ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Standard Sprint Packages
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Interactive Scope Calculator</span>
            </button>
          </div>
        </div>

        {/* TAB 1: STANDARD SPRINT TIERS */}
        {activeTab === "tiers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                  tier.popular
                    ? "bg-[#0e1017] border-2 border-[#00FF87] shadow-[0_0_30px_rgba(0,255,135,0.2)] scale-[1.02]"
                    : "bg-[#0B0C10] border border-white/10 hover:border-white/20"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#00FF87] text-[#02180C] text-[10px] font-mono font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00FF87] font-bold mb-2">
                    {tier.serviceCategory}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] mb-6">
                    {tier.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      {tier.price}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center justify-between font-mono">
                      <span>{tier.period}</span>
                      <span className="text-[#00FF87]">⏱ {tier.timeline}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      What&apos;s Included:
                    </div>
                    {tier.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#00FF87] shrink-0 mt-0.5" />
                        <span className="leading-snug">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(tier.id)}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] hover:from-[#24FFA0] hover:to-[#00F58D] shadow-[0_0_20px_rgba(0,255,135,0.4)]"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: INTERACTIVE SCOPE ESTIMATOR */}
        {activeTab === "calculator" && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B0C10] border border-white/10 p-8 sm:p-12 animate-in fade-in duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Build Your Custom Project Scope</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Select the exact capabilities your brand requires to see real-time estimated investments and sprint timelines.
              </p>
            </div>

            {/* Addon Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {ESTIMATOR_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#00FF87]/10 border-[#00FF87] shadow-[0_0_20px_rgba(0,255,135,0.2)]"
                        : "bg-[#0e1017] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 uppercase">
                          {addon.category}
                        </span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          isSelected ? "bg-[#00FF87] text-[#02180C] font-bold" : "border border-white/20 text-transparent"
                        }`}>
                          ✓
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug">{addon.name}</h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">~{addon.durationDays} Days</span>
                      <span className="text-[#00FF87] font-bold">৳{(addon.price || 0).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculated Estimate Box */}
            <div className="p-6 rounded-2xl bg-[#0e1017] border border-[#00FF87]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Estimated Total Investment
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00FF87] font-mono">
                  ৳{(calculatedTotal || 0).toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span>Estimated Delivery Window: ~{calculatedDays} Business Days</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking("custom-estimate", calculatedTotal)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00DF81] text-[#02180C] font-extrabold text-sm hover:from-[#24FFA0] hover:to-[#00F58D] transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book With This Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
