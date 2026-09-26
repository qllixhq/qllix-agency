"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Sparkles, DollarSign, Send, CheckCircle2,
  Copy, Check, Share2, HelpCircle, ArrowRight,
  Calculator, UserCheck, ShieldCheck, Wallet
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { AffiliateLead, AffiliatePartner } from "@/lib/cmsStore";

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "lead" | "partner" | "calculator" | "rules";
}

export default function AffiliateModal({
  isOpen,
  onClose,
  defaultTab = "lead",
}: AffiliateModalProps) {
  const { cmsData, addAffiliateLead, addAffiliatePartner } = useCms();
  const config = cmsData.affiliateConfig || {
    enabled: true,
    minProjectAmount: 20000,
    commissionPercent: 20,
    badge: "AFFILIATE & PARTNER PROGRAM",
    title: "Refer Projects & Earn Flat 20% Commission",
    subtitle: "২০,০০০ টাকার উপরের যেকোনো ব্র্যান্ডিং, ডিজাইন বা ভিডিও প্রজেক্ট রেফার করলেই প্রতিটি সাকসেসফুল ডিলে সাথে সাথে পান ফ্ল্যাট ২০% ক্যাশ কমিশন (৳৪,০০০+ ক্যাশ পে-আউট)!",
    ctaText: "Become an Affiliate Partner",
    secondaryCtaText: "Submit a Client Lead",
    payoutTerms: "Instant payout via bKash, Nagad, or Bank Transfer upon client deal confirmation and advance payment.",
  };

  const [activeTab, setActiveTab] = useState<"lead" | "partner" | "calculator" | "rules">(defaultTab);

  // ── Form States: Submit Lead ──
  const [leadForm, setLeadForm] = useState({
    referrerName: "",
    referrerPhone: "",
    referrerCode: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    serviceCategory: "Branding & Identity",
    projectBudget: 25000,
    projectDetails: "",
  });
  const [leadSubmitted, setLeadSubmitted] = useState<AffiliateLead | null>(null);

  // ── Form States: Become Partner ──
  const [partnerForm, setPartnerForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    payoutMethod: "bkash" as "bkash" | "nagad" | "rocket" | "bank",
    payoutNumber: "",
    profession: "",
  });
  const [partnerRegistered, setPartnerRegistered] = useState<AffiliatePartner | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // ── Calculator State ──
  const [calcBudget, setCalcBudget] = useState(30000);

  if (!isOpen) return null;

  // Handle Lead Submit
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.referrerName || !leadForm.referrerPhone || !leadForm.clientName || !leadForm.clientPhone) {
      alert("Please fill in the required fields (Your Name, Your WhatsApp, Client Name, Client Phone).");
      return;
    }

    const budget = Number(leadForm.projectBudget) || config.minProjectAmount;
    const commission = Math.round((budget * config.commissionPercent) / 100);

    const newLead: AffiliateLead = {
      id: `lead-${Date.now()}`,
      referrerName: leadForm.referrerName.trim(),
      referrerPhone: leadForm.referrerPhone.trim(),
      referrerCode: leadForm.referrerCode.trim() || undefined,
      clientName: leadForm.clientName.trim(),
      clientPhone: leadForm.clientPhone.trim(),
      clientEmail: leadForm.clientEmail.trim() || undefined,
      serviceCategory: leadForm.serviceCategory,
      projectBudget: budget,
      commissionEarned: commission,
      projectDetails: leadForm.projectDetails.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    addAffiliateLead(newLead);
    setLeadSubmitted(newLead);
  };

  // Handle Partner Registration Submit
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.fullName || !partnerForm.phone || !partnerForm.payoutNumber) {
      alert("Please enter your name, WhatsApp number, and payout number.");
      return;
    }

    const refCode = `QLX-REF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPartner: AffiliatePartner = {
      id: `aff-${Date.now()}`,
      fullName: partnerForm.fullName.trim(),
      phone: partnerForm.phone.trim(),
      email: partnerForm.email.trim(),
      payoutMethod: partnerForm.payoutMethod,
      payoutNumber: partnerForm.payoutNumber.trim(),
      referralCode: refCode,
      profession: partnerForm.profession.trim() || "Creative Partner",
      status: "active",
      createdAt: new Date().toISOString(),
    };

    addAffiliatePartner(newPartner);
    setPartnerRegistered(newPartner);
  };

  const copyReferralLink = (code: string) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}?ref=${code}` : `https://qllix-agency.vercel.app?ref=${code}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const calculatedReward = Math.round((calcBudget * config.commissionPercent) / 100);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-2xl w-full bg-[#090E16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto text-white flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="relative p-6 sm:p-7 border-b border-white/10 bg-gradient-to-r from-emerald-950/40 via-[#0A101C] to-slate-900/60">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-[11px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Earn Flat 20% Commission</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mt-3 tracking-tight">
              Qllix Partner &amp; Affiliate Network
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              যেকোনো <strong>৳২০,০০০+</strong> বাজেটের প্রজেক্ট রেফার করলেই প্রতিটি ডিল কনফার্মেশনে সাথে সাথে পান <strong>২০% ক্যাশ কমিশন</strong> (৳৪,০০০+)।
            </p>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mt-5 overflow-x-auto no-scrollbar pt-1">
              <TabBtn
                active={activeTab === "lead"}
                onClick={() => setActiveTab("lead")}
                icon={<Send className="w-3.5 h-3.5" />}
                label="Submit Client Lead"
              />
              <TabBtn
                active={activeTab === "partner"}
                onClick={() => setActiveTab("partner")}
                icon={<UserCheck className="w-3.5 h-3.5" />}
                label="Join as Partner"
              />
              <TabBtn
                active={activeTab === "calculator"}
                onClick={() => setActiveTab("calculator")}
                icon={<Calculator className="w-3.5 h-3.5" />}
                label="Income Calculator"
              />
              <TabBtn
                active={activeTab === "rules"}
                onClick={() => setActiveTab("rules")}
                icon={<HelpCircle className="w-3.5 h-3.5" />}
                label="Rules &amp; FAQ"
              />
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">

            {/* ══════════════ TAB 1: SUBMIT LEAD ══════════════ */}
            {activeTab === "lead" && (
              <div>
                {leadSubmitted ? (
                  <div className="py-8 px-4 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-[#00FF87] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h4 className="text-2xl font-black text-white">
                      Lead Submitted Successfully!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      ধন্যবাদ <strong>{leadSubmitted.referrerName}</strong>! আপনার রেফারেল ক্লায়েন্ট <strong>{leadSubmitted.clientName}</strong> এর প্রজেক্ট ডাটা সেভ হয়েছে। আমাদের টিম ক্লায়েন্টের সাথে যোগাযোগ করে ডিল ক্লোজ করার সাথে সাথেই আপনার <strong>৳{leadSubmitted.commissionEarned.toLocaleString()}</strong> কমিশন বিকাশ/নগদে ট্রান্সফার করা হবে।
                    </p>

                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-sm mx-auto text-left text-xs font-mono space-y-1.5">
                      <div className="text-slate-400 flex justify-between">
                        <span>Lead Tracking ID:</span>
                        <strong className="text-white">{leadSubmitted.id}</strong>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>Project Budget:</span>
                        <strong className="text-emerald-400">৳{leadSubmitted.projectBudget.toLocaleString()}</strong>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>Your 20% Reward:</span>
                        <strong className="text-[#00FF87] font-bold">৳{leadSubmitted.commissionEarned.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/8801948888000?text=${encodeURIComponent(`Hi Qllix Team, I just submitted a referral lead for ${leadSubmitted.clientName} (Budget: ৳${leadSubmitted.projectBudget}). My Lead ID is ${leadSubmitted.id}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-[#00FF87] text-[#02180C] text-xs font-black hover:bg-[#00e87a] flex items-center gap-2 shadow-lg"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Notify Us on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          setLeadSubmitted(null);
                          setLeadForm({
                            referrerName: "",
                            referrerPhone: "",
                            referrerCode: "",
                            clientName: "",
                            clientPhone: "",
                            clientEmail: "",
                            serviceCategory: "Branding & Identity",
                            projectBudget: 25000,
                            projectDetails: "",
                          });
                        }}
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
                      <div className="text-xs text-emerald-200">
                        <span className="font-bold text-[#00FF87]">20% Commission Active:</span> Minimum project budget is ৳{config.minProjectAmount.toLocaleString()}.
                      </div>
                      <div className="text-xs font-mono font-bold text-[#00FF87] bg-black/40 px-2.5 py-1 rounded-lg">
                        Earn ৳{(Number(leadForm.projectBudget || 20000) * 0.2).toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Referrer Info */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Your Name (রেফারার নাম) *
                        </label>
                        <input
                          required
                          className={inp}
                          value={leadForm.referrerName}
                          onChange={(e) => setLeadForm({ ...leadForm, referrerName: e.target.value })}
                          placeholder="e.g. Tanvir Ahmed"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Your WhatsApp / Phone (টাকা পাওয়ার নম্বর) *
                        </label>
                        <input
                          required
                          className={inp}
                          value={leadForm.referrerPhone}
                          onChange={(e) => setLeadForm({ ...leadForm, referrerPhone: e.target.value })}
                          placeholder="017XXXXXXXX"
                        />
                      </div>

                      {/* Client Info */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Client Name or Brand Name (ক্লায়েন্টের নাম) *
                        </label>
                        <input
                          required
                          className={inp}
                          value={leadForm.clientName}
                          onChange={(e) => setLeadForm({ ...leadForm, clientName: e.target.value })}
                          placeholder="e.g. Apex Foods / Rahman Bhai"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Client WhatsApp / Phone (ক্লায়েন্টের নম্বর) *
                        </label>
                        <input
                          required
                          className={inp}
                          value={leadForm.clientPhone}
                          onChange={(e) => setLeadForm({ ...leadForm, clientPhone: e.target.value })}
                          placeholder="018XXXXXXXX"
                        />
                      </div>

                      {/* Service Category */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Service Needed (কাজের ধরন)
                        </label>
                        <select
                          className={inp}
                          value={leadForm.serviceCategory}
                          onChange={(e) => setLeadForm({ ...leadForm, serviceCategory: e.target.value })}
                        >
                          <option>Branding &amp; Logo Identity</option>
                          <option>Packaging &amp; Label Design</option>
                          <option>Video Production &amp; Cinematic Motion</option>
                          <option>Social Media Monthly Creative Retainer</option>
                          <option>Full Agency Digital Suite</option>
                          <option>Custom Creative Project</option>
                        </select>
                      </div>

                      {/* Estimated Budget */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Estimated Budget (৳২০,০০০ বা তার বেশি) *
                        </label>
                        <input
                          type="number"
                          min={config.minProjectAmount}
                          step={1000}
                          required
                          className={inp}
                          value={leadForm.projectBudget}
                          onChange={(e) => setLeadForm({ ...leadForm, projectBudget: +e.target.value })}
                          placeholder="20000"
                        />
                      </div>

                      {/* Details */}
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Project Brief / Client Requirement (সংক্ষিপ্ত বিবরণ)
                        </label>
                        <textarea
                          rows={2}
                          className={`${inp} resize-none`}
                          value={leadForm.projectDetails}
                          onChange={(e) => setLeadForm({ ...leadForm, projectDetails: e.target.value })}
                          placeholder="ক্লায়েন্টের কী কী কাজ প্রয়োজন বা কোনো স্পেসিফিক টাইমলাইন থাকলে লিখুন..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#00FF87] hover:bg-[#00e87a] text-[#02180C] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Lead &amp; Lock 20% Commission</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ══════════════ TAB 2: JOIN AS PARTNER ══════════════ */}
            {activeTab === "partner" && (
              <div>
                {partnerRegistered ? (
                  <div className="py-6 px-3 space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-9 h-9" />
                    </div>
                    <h4 className="text-2xl font-black text-white">
                      Welcome, Official Qllix Partner!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                      আপনার পার্টনার একাউন্ট ভেরিফাইড হয়েছে। এখন থেকে আপনার শেয়ার করা রেফারেল লিংকের মাধ্যমে আসা প্রতিটি ৳২০,০০০+ প্রজেক্টে সাথে সাথে পাবেন <strong>২০% ক্যাশ রিওয়ার্ড</strong>।
                    </p>

                    {/* Partner Pass Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-[#00FF87]/40 max-w-md mx-auto text-left relative overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#00FF87]">Qllix Partner Pass</div>
                          <div className="text-base font-bold text-white">{partnerRegistered.fullName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-mono text-slate-400">Payout Via</div>
                          <div className="text-xs font-mono uppercase font-bold text-emerald-300">
                            {partnerRegistered.payoutMethod}: {partnerRegistered.payoutNumber}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="text-slate-400">Your Referral Code:</div>
                        <div className="text-lg font-black text-[#00FF87] tracking-wider">
                          {partnerRegistered.referralCode}
                        </div>
                      </div>

                      {/* 1-Click Copy Link */}
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                        <input
                          readOnly
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
                          value={typeof window !== "undefined" ? `${window.location.origin}?ref=${partnerRegistered.referralCode}` : `https://qllix-agency.vercel.app?ref=${partnerRegistered.referralCode}`}
                        />
                        <button
                          onClick={() => copyReferralLink(partnerRegistered.referralCode)}
                          className="px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#00e87a] text-[#02180C] text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePartnerSubmit} className="space-y-4">
                    <p className="text-xs text-slate-300">
                      ফ্রিল্যান্সার, মার্কেটার, কনটেন্ট ক্রিয়েটর কিংবা যেকোনো প্রফেশনাল — আমাদের ক্লায়েন্ট রেফার করে আপনি প্রতি মাসে ৳২০,০০০ থেকে ৳১,০০,০০০+ পর্যন্ত আয় করতে পারেন।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Full Name *
                        </label>
                        <input
                          required
                          className={inp}
                          value={partnerForm.fullName}
                          onChange={(e) => setPartnerForm({ ...partnerForm, fullName: e.target.value })}
                          placeholder="e.g. Asif Mahmud"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          required
                          className={inp}
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                          placeholder="017XXXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className={inp}
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                          placeholder="asif@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Profession / Background
                        </label>
                        <input
                          className={inp}
                          value={partnerForm.profession}
                          onChange={(e) => setPartnerForm({ ...partnerForm, profession: e.target.value })}
                          placeholder="Freelancer / Marketer / Student / Agency"
                        />
                      </div>

                      {/* Payout Method */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Payout Method (টাকা কীভাবে নিতে চান) *
                        </label>
                        <select
                          className={inp}
                          value={partnerForm.payoutMethod}
                          onChange={(e) => setPartnerForm({ ...partnerForm, payoutMethod: e.target.value as any })}
                        >
                          <option value="bkash">bKash Personal</option>
                          <option value="nagad">Nagad Personal</option>
                          <option value="rocket">Rocket</option>
                          <option value="bank">Bank Transfer</option>
                        </select>
                      </div>

                      {/* Payout Number */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Payout Number / Account Info *
                        </label>
                        <input
                          required
                          className={inp}
                          value={partnerForm.payoutNumber}
                          onChange={(e) => setPartnerForm({ ...partnerForm, payoutNumber: e.target.value })}
                          placeholder="01XXXXXXXXX or Bank A/C details"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#00FF87] hover:bg-[#00e87a] text-[#02180C] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer mt-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Register as Official Partner &amp; Get Referral Code</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ══════════════ TAB 3: EARNINGS CALCULATOR ══════════════ */}
            {activeTab === "calculator" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                      Client Project Budget
                    </span>
                    <span className="text-2xl font-extrabold text-white font-mono">
                      ৳{calcBudget.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={20000}
                    max={200000}
                    step={5000}
                    value={calcBudget}
                    onChange={(e) => setCalcBudget(+e.target.value)}
                    className="w-full accent-[#00FF87] cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Min: ৳20,000</span>
                    <span>Mid: ৳1,00,000</span>
                    <span>Max: ৳2,00,000+</span>
                  </div>
                </div>

                {/* Big Reward Display */}
                <div className="p-6 rounded-2xl bg-[#00FF87]/10 border border-[#00FF87]/30 text-center space-y-1">
                  <div className="text-xs font-mono uppercase text-emerald-300 font-bold tracking-wider">
                    Your Instant 20% Cash Commission
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-[#00FF87] font-mono tracking-tight">
                    ৳{calculatedReward.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-300 pt-2 flex items-center justify-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#00FF87]" />
                    <span>প্রজেক্ট কনফার্মেশন ও ৫০% অ্যাডভান্স পে হলেই পুরো ২০% ট্রান্সফার!</span>
                  </div>
                </div>

                {/* Fixed Milestone Benchmarks */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div 
                    onClick={() => setCalcBudget(20000)}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center cursor-pointer transition-all"
                  >
                    <div className="text-[10px] font-mono text-slate-400">৳20,000 Deal</div>
                    <div className="text-sm font-bold text-[#00FF87]">৳4,000</div>
                  </div>
                  <div 
                    onClick={() => setCalcBudget(50000)}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center cursor-pointer transition-all"
                  >
                    <div className="text-[10px] font-mono text-slate-400">৳50,000 Deal</div>
                    <div className="text-sm font-bold text-[#00FF87]">৳10,000</div>
                  </div>
                  <div 
                    onClick={() => setCalcBudget(100000)}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center cursor-pointer transition-all"
                  >
                    <div className="text-[10px] font-mono text-slate-400">৳1,00,000 Deal</div>
                    <div className="text-sm font-bold text-[#00FF87]">৳20,000</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("lead")}
                    className="w-full py-3.5 rounded-xl bg-[#00FF87] hover:bg-[#00e87a] text-[#02180C] font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>I Have a Client — Submit Lead Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ══════════════ TAB 4: RULES & FAQ ══════════════ */}
            {activeTab === "rules" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                    ১. কোন কোন প্রজেক্টে ২০% কমিশন দেওয়া হবে?
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    ক্লায়েন্টের যেকোনো ব্র্যান্ডিং, লোগো ডিজাইন, প্যাকেজিং, মোশন/ভিডিও এডিটিং বা সোশ্যাল মিডিয়া সার্ভিসের টোটাল প্রজেক্ট ভ্যালু <strong>৳২০,০০০ বা তার বেশি</strong> হলেই আপনি ফ্ল্যাট ২০% ক্যাশ কমিশন পাবেন।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                    ২. কমিশন পাওয়ার প্রক্রিয়া কী?
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    আপনি ক্লায়েন্টের ইনফো আমাদের সাবমিট করবেন অথবা ক্লায়েন্ট আপনার রেফারেল কোড জানাবে। আমাদের টিম ক্লায়েন্টের সাথে ডিল ফাইনাল করে ক্লায়েন্ট যখন ৫০% অ্যাডভান্স পে করবে, সাথে সাথেই আপনার নির্ধারিত কমিশন পাঠিয়ে দেওয়া হবে।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                    ৩. টাকা কীভাবে এবং কোন মাধ্যমে দেওয়া হয়?
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    আপনার সুবিধামতো বিকাশ (bKash), নগদ (Nagad), রকেট বা যেকোনো ব্যাংক একাউন্টে ডিরেক্ট ট্রান্সফার করা হবে।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                    ৪. কোনো লিমিটেশন আছে কি?
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    না! কোনো আর্নিং লিমিট নেই। আপনি যত খুশি ক্লায়েন্ট রেফার করতে পারবেন এবং প্রতি ক্লায়েন্টেই ফ্ল্যাট ২০% কমিশন পাবেন।
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("partner")}
                    className="w-full py-3.5 rounded-xl bg-[#00FF87] hover:bg-[#00e87a] text-[#02180C] font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Register as Partner Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
        active
          ? "bg-[#00FF87] text-[#02180C] shadow-md shadow-emerald-500/20"
          : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const inp =
  "w-full bg-[#121822] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF87]/50 transition-all";
