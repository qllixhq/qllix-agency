"use client";

import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Layers,
  Palette,
  Layout,
  TrendingUp,
  Zap,
  Lock,
  Share2,
  Package,
  Film,
  Clapperboard,
  Globe,
  Flag,
  Calendar,
  PlayCircle,
  BookOpen
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { AgencyService } from "@/lib/cmsStore";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBudget?: number;
}

// ═══ Category Tabs matching Reference Screenshot 1 ═══
const CATEGORY_TABS = [
  "All",
  "Branding",
  "Logo",
  "Social Media",
  "Packaging",
  "Motion",
  "Video",
  "Marketing",
];

const getCategoryForService = (service: AgencyService): string => {
  const id = (service.id || "").toLowerCase();
  const name = (service.name || "").toLowerCase();
  const cat = (service.category || "").toLowerCase();

  if (id.includes("logo-anim") || name.includes("animation") || cat.includes("motion")) {
    return "Motion";
  }
  if (id.includes("reels") || id.includes("youtube") || id.includes("video") || name.includes("video") || name.includes("reel")) {
    return "Video";
  }
  if (id.includes("logo") || name.includes("logo")) {
    return "Logo";
  }
  if (id.includes("packaging") || id.includes("label") || name.includes("packaging") || name.includes("label")) {
    return "Packaging";
  }
  if (id.includes("social") || name.includes("social") || id.includes("creative") || name.includes("feed")) {
    return "Social Media";
  }
  if (id.includes("marketing") || name.includes("marketing") || cat.includes("marketing")) {
    return "Marketing";
  }
  return "Branding";
};

const getServiceIcon = (service: AgencyService): React.ElementType => {
  const id = (service.id || "").toLowerCase();
  if (id.includes("logo-anim") || id.includes("motion")) return Clapperboard;
  if (id.includes("reels") || id.includes("youtube") || id.includes("video")) return Film;
  if (id.includes("social")) return Share2;
  if (id.includes("packaging")) return Package;
  if (id.includes("marketing")) return TrendingUp;
  if (id.includes("profile") || id.includes("catalogue")) return BookOpen;
  if (id.includes("full-brand") || id.includes("bundle")) return Layers;
  if (id.includes("poster") || id.includes("political")) return Flag;
  if (id.includes("monthly")) return Calendar;
  return Palette;
};

export default function BookingModal({
  isOpen,
  onClose,
  initialService,
  initialBudget
}: BookingModalProps) {
  const { cmsData, addInquiry, getStartingPrice } = useCms();
  const [step, setStep] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const activeServices = cmsData.agencyServices
    .filter((s) => s.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : [activeServices[0]?.id || "logo-design"]
  );
  const [budgetRange, setBudgetRange] = useState<string>(
    typeof initialBudget === "number" ? `৳${initialBudget.toLocaleString()}` : (initialBudget ? `৳${initialBudget}` : "৳15,000 – ৳35,000")
  );
  const [timeline, setTimeline] = useState<string>("Within 2–4 Weeks");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectBrief: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== serviceId));
      }
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const displayedServices = activeCategory === "All"
    ? activeServices
    : activeServices.filter((s) => getCategoryForService(s) === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceNames = selectedServices.map((id) => {
      const s = activeServices.find((item) => item.id === id);
      return s ? s.name : id;
    });
    addInquiry({
      fullName: formData.fullName,
      email: formData.email,
      service: serviceNames.join(", "),
      budget: budgetRange,
      details: `Company: ${formData.company || "N/A"} | Timeline: ${timeline} | Brief: ${formData.projectBrief || "None"}`
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
        
        {/* Top subtle emerald accent indicator */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="relative z-10 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                  Project Discovery
                </span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-[11px] font-medium text-slate-400">Step {step} of 3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {step === 1 && "Which services do you need?"}
                {step === 2 && "Timeline & Budget"}
                {step === 3 && "Tell us about your project"}
                {submitted && "Inquiry Received!"}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          {!submitted && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { num: 1, label: "Services" },
                { num: 2, label: "Budget & Scope" },
                { num: 3, label: "Contact" }
              ].map((s) => (
                <div key={s.num} className="space-y-1">
                  <div className="h-1 rounded-full overflow-hidden bg-slate-100">
                    <div
                      className={`h-full transition-all duration-300 ${
                        step >= s.num
                          ? "bg-emerald-500"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] font-medium uppercase tracking-wider block ${
                    step === s.num ? "text-emerald-600 font-semibold" : step > s.num ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        {!submitted ? (
          <div className="relative z-10">
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Select services:
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    {selectedServices.length} selected
                  </span>
                </div>

                {/* ═══ CATEGORY FILTER TABS ═══ */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {CATEGORY_TABS.map((tab) => {
                    const isTabActive = activeCategory === tab;
                    const count = tab === "All"
                      ? activeServices.length
                      : activeServices.filter((s) => getCategoryForService(s) === tab).length;

                    if (tab !== "All" && count === 0) return null;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveCategory(tab)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          isTabActive
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 border border-slate-200/60"
                        }`}
                      >
                        <span>{tab}</span>
                        <span className={`text-[10px] px-1 rounded-full ${
                          isTabActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ═══ DYNAMIC SERVICES LIST (Ultra-clean, No Subtitles) ═══ */}
                <div className="space-y-2 max-h-[340px] sm:max-h-[370px] overflow-y-auto pr-1">
                  {displayedServices.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    const Icon = getServiceIcon(srv);
                    const startingPrice = getStartingPrice(srv.id);
                    const categoryTag = getCategoryForService(srv);

                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isSelected
                            ? "bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20"
                            : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                            isSelected 
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                              : "bg-slate-100 border-slate-200 text-slate-500 group-hover:text-slate-800"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs sm:text-sm font-semibold tracking-tight ${
                              isSelected ? "text-slate-900 font-bold" : "text-slate-800"
                            }`}>
                              {srv.name}
                            </span>

                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                              isSelected 
                                ? "bg-emerald-100/70 border-emerald-200 text-emerald-800" 
                                : "bg-slate-100 border-slate-200/70 text-slate-500"
                            }`}>
                              {categoryTag}
                            </span>

                            {(srv.cardPriceText || startingPrice) && (
                              <span className="text-[11px] font-semibold text-emerald-600">
                                {srv.cardPriceText ? srv.cardPriceText : `From ৳${(typeof startingPrice === "number" ? startingPrice : 1500).toLocaleString()}`}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ml-2 ${
                          isSelected 
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-sm" 
                            : "border-slate-300 bg-white group-hover:border-slate-400"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"} chosen
                  </span>
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Budget</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: BUDGET & TIMELINE */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Target Investment Range
                    </label>
                    <span className="text-[11px] text-emerald-600 font-medium">Transparent Pricing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { range: "৳5,000 – ৳15,000", tag: "Sprint" },
                      { range: "৳15,000 – ৳35,000", tag: "Most Popular" },
                      { range: "৳35,000 – ৳75,000", tag: "Scale-Up" },
                      { range: "৳75,000+", tag: "Enterprise" }
                    ].map((b) => (
                      <button
                        key={b.range}
                        type="button"
                        onClick={() => setBudgetRange(b.range)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          budgetRange === b.range
                            ? "bg-emerald-50/70 text-slate-900 border-emerald-500 ring-1 ring-emerald-500/20 shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">{b.tag}</span>
                        <span className="text-xs sm:text-sm font-bold mt-1 text-slate-900">{b.range}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-2">
                    Target Launch Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { time: "1–2 Weeks", desc: "Urgent" },
                      { time: "2–4 Weeks", desc: "Standard" },
                      { time: "1–2 Months", desc: "Deep Discovery" }
                    ].map((t) => (
                      <button
                        key={t.time}
                        type="button"
                        onClick={() => setTimeline(t.time)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          timeline === t.time
                            ? "bg-emerald-50/70 text-slate-900 border-emerald-500 ring-1 ring-emerald-500/20 shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">{t.time}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Details</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT DETAILS & SUBMIT */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alexander Wright"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Company / Brand (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://yourbrand.com"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Project Brief (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="What are your main goals and expectations?"
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Trust Guarantee Badges */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Response in 12h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>NDA Protected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct Senior Team</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* SUBMITTED CONFIRMATION */
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h4 className="text-2xl font-bold text-slate-900 tracking-tight">Inquiry Sent!</h4>
            
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.fullName || "Partner"}</strong>. We will review your brief and contact you at <strong className="text-emerald-700">{formData.email}</strong> within 12 hours.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs text-slate-600 space-y-1.5 mt-3">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Budget:</span>
                <span className="text-emerald-700 font-semibold">{budgetRange}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Timeline:</span>
                <span className="text-slate-900 font-medium">{timeline}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Confidentiality:</span>
                <span className="text-emerald-700 font-medium">100% Secure &amp; NDA Bound</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
