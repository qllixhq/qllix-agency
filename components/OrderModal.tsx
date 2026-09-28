"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, Loader2, CheckCircle2,
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
  ChevronDown, Check, Tag, AlertCircle,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { AgencyService, ServicePackage, DEFAULT_CMS_DATA } from "@/lib/cmsStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Share2, Package, Film, Clapperboard,
  Palette, TrendingUp, Globe, Flag, Calendar, PlayCircle,
  BookOpen, Layers,
};

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialPackageId?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  serviceId: string;
  packageId: string;
  projectDetails: string;
  referenceUrl: string;
  preferredDeadline: string;
}

interface AppliedCoupon {
  code: string;
  discountPercent: number;
}

export default function OrderModal({ isOpen, onClose, initialServiceId, initialPackageId }: OrderModalProps) {
  const { cmsData, addOrder, getPackagesForService } = useCms();
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Coupon state (Namecheap style)
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);

  const rawServices = Array.isArray(cmsData?.agencyServices) && cmsData.agencyServices.length > 0
    ? cmsData.agencyServices
    : DEFAULT_CMS_DATA.agencyServices;

  const activeServices = rawServices
    .filter((s) => s && s.active)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    serviceId: initialServiceId || activeServices[0]?.id || "",
    packageId: initialPackageId || "",
    projectDetails: "",
    referenceUrl: "",
    preferredDeadline: "",
  });

  // Sync initial values when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setErrors({});
      setCouponInput("");
      setAppliedCoupon(null);
      setCouponError(null);
      setCouponSuccess(null);

      const svcId = initialServiceId || activeServices[0]?.id || "";
      const pkgs = getPackagesForService(svcId);
      setForm((prev) => ({
        ...prev,
        serviceId: svcId,
        packageId: initialPackageId || pkgs[0]?.id || "",
      }));
    }
  }, [isOpen, initialServiceId, initialPackageId]);

  // When serviceId changes, update available packages
  const availablePackages = form.serviceId && getPackagesForService
    ? (getPackagesForService(form.serviceId) || [])
    : [];

  // Auto-select first package if none selected
  useEffect(() => {
    if (availablePackages.length > 0 && !form.packageId) {
      setForm((prev) => ({ ...prev, packageId: availablePackages[0].id }));
    }
  }, [form.serviceId, availablePackages]);

  const selectedService = activeServices.find((s) => s.id === form.serviceId);
  const selectedPackage = availablePackages.find((p) => p.id === form.packageId);

  // Price calculations
  const basePrice = typeof selectedPackage?.discountPrice === "number" && !isNaN(selectedPackage.discountPrice)
    ? selectedPackage.discountPrice
    : (typeof selectedPackage?.price === "number" && !isNaN(selectedPackage.price) ? selectedPackage.price : (Number(selectedPackage?.price) || 0));

  const couponDiscountAmount = appliedCoupon
    ? Math.round(basePrice * (appliedCoupon.discountPercent / 100))
    : 0;

  const finalPayableAmount = Math.max(0, basePrice - couponDiscountAmount);

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      setCouponSuccess(null);
      return;
    }

    setIsCheckingCoupon(true);
    setCouponError(null);
    setCouponSuccess(null);

    setTimeout(() => {
      setIsCheckingCoupon(false);
      // Search in CMS campaigns for active matching campaign
      const matchingCampaign = cmsData.campaigns?.find(
        (c) => c.active && c.code && c.code.trim().toUpperCase() === code
      );

      if (matchingCampaign && matchingCampaign.discountPercent && matchingCampaign.discountPercent > 0) {
        setAppliedCoupon({
          code: matchingCampaign.code || code,
          discountPercent: matchingCampaign.discountPercent,
        });
        setCouponSuccess(`Promo code "${matchingCampaign.code || code}" applied! ${matchingCampaign.discountPercent}% OFF activated.`);
        setCouponError(null);
        return;
      }

      // Default backup campaign fallback if QLLIX25 is entered
      if (code === "QLLIX25" || code === "WELCOME10") {
        const pct = code === "QLLIX25" ? 25 : 10;
        setAppliedCoupon({
          code,
          discountPercent: pct,
        });
        setCouponSuccess(`Promo code "${code}" applied! ${pct}% OFF activated.`);
        setCouponError(null);
        return;
      }

      // Invalid code
      setCouponError(`Coupon code "${code}" is invalid or expired. Try "QLLIX25"`);
      setAppliedCoupon(null);
      setCouponSuccess(null);
    }, 350);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponSuccess(null);
    setCouponError(null);
  };

  const update = (field: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.serviceId) newErrors.serviceId = "Please select a service";
    if (!form.packageId) newErrors.packageId = "Please select a package";
    if (!form.projectDetails.trim())
      newErrors.projectDetails = "Please describe your project (min. 20 characters)";
    else if (form.projectDetails.trim().length < 20)
      newErrors.projectDetails = "Please describe your project (min. 20 characters)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    addOrder({
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      company: form.company || undefined,
      serviceId: form.serviceId,
      serviceName: selectedService?.name || form.serviceId,
      packageId: form.packageId,
      packageName: selectedPackage?.name || form.packageId,
      amount: finalPayableAmount,
      projectDetails: form.projectDetails,
      referenceUrl: form.referenceUrl || undefined,
      preferredDeadline: form.preferredDeadline || undefined,
      couponCode: appliedCoupon?.code || undefined,
      discountAmount: couponDiscountAmount > 0 ? couponDiscountAmount : undefined,
      originalAmount: basePrice,
    });

    setIsSubmitting(false);
    setStep("success");
  };

  const ServiceIcon = selectedService ? (ICON_MAP[selectedService.icon] || Sparkles) : Sparkles;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200/90 rounded-t-3xl sm:rounded-3xl shadow-2xl text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {step === "form" ? (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-semibold mb-3 shadow-sm">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Place Your Order
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Start Your Project</h2>
                  <p className="text-sm text-slate-600 mt-1">Fill in the details below. We'll confirm within 2 hours.</p>
                </div>

                {/* Selected package preview */}
                {selectedPackage && selectedService && (
                  <div className="mb-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-900 truncate">
                        {selectedService.name} — {selectedPackage.name}
                      </div>
                      <div className="text-xs text-slate-600 flex items-baseline gap-2 flex-wrap mt-0.5">
                        <span className="font-bold text-slate-950 text-sm">
                          ৳{finalPayableAmount.toLocaleString()}{selectedPackage.isMonthly ? "/month" : ""}
                        </span>
                        {appliedCoupon && (
                          <span className="text-slate-400 line-through text-xs">
                            ৳{basePrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-slate-400">· {selectedPackage.deliveryDays || 3} days delivery</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Namecheap-Style Promo / Coupon Code Box */}
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Have a Promo / Coupon Code?</span>
                    </div>
                    {appliedCoupon && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        {appliedCoupon.discountPercent}% OFF ACTIVE
                      </span>
                    )}
                  </div>

                  {!appliedCoupon ? (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleApplyCoupon();
                            }
                          }}
                          placeholder="Enter coupon code (e.g. QLLIX25)"
                          className="w-full uppercase font-mono tracking-wider bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        disabled={isCheckingCoupon || !couponInput.trim()}
                        className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-black tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-sm"
                      >
                        {isCheckingCoupon ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Apply"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-300/80 rounded-xl px-3.5 py-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span>Coupon <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-emerald-800">{appliedCoupon.code}</span> Applied!</span>
                          <div className="text-[11px] font-normal text-emerald-700">You save ৳{couponDiscountAmount.toLocaleString()} ({appliedCoupon.discountPercent}% discount)</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponError}</span>
                    </div>
                  )}
                  {couponSuccess && !couponError && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>{couponSuccess}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.fullName}>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        className={inputCls(!!errors.fullName)}
                      />
                    </Field>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputCls(!!errors.phone)}
                      />
                    </Field>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email *" error={errors.email}>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputCls(!!errors.email)}
                      />
                    </Field>
                    <Field label="Company Name">
                      <input
                        type="text"
                        placeholder="Optional"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        className={inputCls(false)}
                      />
                    </Field>
                  </div>

                  {/* Service & Package */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Select Service *" error={errors.serviceId}>
                      <div className="relative">
                        <select
                          value={form.serviceId}
                          onChange={(e) => { update("serviceId", e.target.value); update("packageId", ""); }}
                          className={selectCls(!!errors.serviceId)}
                        >
                          <option value="">Choose service...</option>
                          {activeServices.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </Field>
                    <Field label="Select Package *" error={errors.packageId}>
                      <div className="relative">
                        <select
                          value={form.packageId}
                          onChange={(e) => update("packageId", e.target.value)}
                          className={selectCls(!!errors.packageId)}
                          disabled={availablePackages.length === 0}
                        >
                          <option value="">Choose package...</option>
                          {availablePackages.map((p) => {
                            const pPrice = typeof p.discountPrice === "number" && !isNaN(p.discountPrice)
                              ? p.discountPrice
                              : (typeof p.price === "number" && !isNaN(p.price) ? p.price : (Number(p.price) || 0));
                            return (
                              <option key={p.id} value={p.id}>
                                {p.name} — ৳{pPrice.toLocaleString()}{p.isMonthly ? "/mo" : ""}
                              </option>
                            );
                          })}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </Field>
                  </div>

                  {/* Project Details */}
                  <Field label="Project Details *" error={errors.projectDetails}>
                    <textarea
                      rows={4}
                      placeholder="Describe your project goals, references, style preference, and key details..."
                      value={form.projectDetails}
                      onChange={(e) => update("projectDetails", e.target.value)}
                      className={`${inputCls(!!errors.projectDetails)} resize-none`}
                    />
                  </Field>

                  {/* Row last */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Reference URL / Drive Link">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={form.referenceUrl}
                        onChange={(e) => update("referenceUrl", e.target.value)}
                        className={inputCls(false)}
                      />
                    </Field>
                    <Field label="Preferred Deadline">
                      <input
                        type="date"
                        value={form.preferredDeadline}
                        onChange={(e) => update("preferredDeadline", e.target.value)}
                        className={inputCls(false)}
                      />
                    </Field>
                  </div>
                </div>

                {/* Price Summary Breakdown */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Package Price ({selectedPackage?.name || "Standard"})</span>
                    <span className="font-semibold text-slate-900 font-mono">৳{basePrice.toLocaleString()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-emerald-700 font-semibold">
                      <span>Promo Discount ({appliedCoupon.code} · {appliedCoupon.discountPercent}%)</span>
                      <span className="font-mono">-৳{couponDiscountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-200/90 pt-2 flex items-center justify-between text-sm font-black text-slate-950">
                    <span>Total Payable</span>
                    <span className="text-[#00875A] font-mono text-base">
                      ৳{finalPayableAmount.toLocaleString()} {selectedPackage?.isMonthly ? "/month" : ""}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full py-4 rounded-xl bg-emerald-600 text-white font-black text-sm hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 group cursor-pointer active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Order...
                    </>
                  ) : (
                    <>
                      Confirm & Submit Order
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  We'll confirm your order via WhatsApp or email within 2 hours.
                </p>
              </form>
            ) : (
              <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mb-6 shadow-sm"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Order Received!</h3>
                <p className="text-slate-600 text-sm max-w-sm leading-relaxed mb-4">
                  Thank you, <strong className="text-slate-900">{form.fullName}</strong>! We've received your order for{" "}
                  <strong className="text-emerald-700">{selectedService?.name} — {selectedPackage?.name}</strong>.
                  Our creative team will reach out to you within 2 hours.
                </p>
                <div className="mb-8 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2.5 flex-wrap justify-center">
                  <span>Payable Amount: <strong className="text-slate-950 font-mono text-sm">৳{finalPayableAmount.toLocaleString()}</strong></span>
                  {appliedCoupon && (
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                      Coupon {appliedCoupon.code} Applied (-৳{couponDiscountAmount.toLocaleString()})
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all cursor-pointer shadow-sm"
                >
                  Return to Website
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-700">{label}</label>
      {children}
      {error && <span className="text-xs text-rose-600 font-semibold">{error}</span>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full bg-slate-50 border ${hasError ? "border-rose-400 ring-1 ring-rose-400" : "border-slate-200"} rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all`;
}

function selectCls(hasError: boolean) {
  return `w-full appearance-none bg-slate-50 border ${hasError ? "border-rose-400 ring-1 ring-rose-400" : "border-slate-200"} rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all pr-10 cursor-pointer`;
}
