"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { 
  AffiliateLead, AffiliatePartner, AffiliateProgramConfig 
} from "@/lib/cmsStore";
import { 
  DollarSign, Users, Send, CheckCircle2, Clock, 
  Trash2, Settings, ExternalLink, MessageCircle, 
  Check, X, Sparkles, Filter, ChevronDown, Plus 
} from "lucide-react";

export default function AdminAffiliatesPage() {
  const { 
    cmsData, 
    updateAffiliateConfig, 
    updateAffiliateLead, 
    deleteAffiliateLead,
    updateAffiliatePartner,
    deleteAffiliatePartner,
    addAffiliatePartner,
  } = useCms();

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

  const leads = cmsData.affiliateLeads || [];
  const partners = cmsData.affiliatePartners || [];

  const [activeTab, setActiveTab] = useState<"leads" | "partners" | "settings">("leads");
  const [leadFilter, setLeadFilter] = useState<string>("all");

  // Settings Edit State
  const [settingsForm, setSettingsForm] = useState<AffiliateProgramConfig>(config);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // New Partner Modal
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [newPartner, setNewPartner] = useState({
    fullName: "",
    phone: "",
    email: "",
    payoutMethod: "bkash" as const,
    payoutNumber: "",
    profession: "",
  });

  // Calculate Metrics
  const totalLeads = leads.length;
  const dealsClosed = leads.filter((l) => l.status === "deal_closed" || l.status === "commission_paid").length;
  const totalPaidCommission = leads
    .filter((l) => l.status === "commission_paid")
    .reduce((acc, curr) => acc + (curr.commissionEarned || 0), 0);
  const pendingLeads = leads.filter((l) => l.status === "new" || l.status === "contacted").length;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAffiliateConfig(settingsForm);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.fullName || !newPartner.phone) return;
    const item: AffiliatePartner = {
      id: `aff-${Date.now()}`,
      fullName: newPartner.fullName.trim(),
      phone: newPartner.phone.trim(),
      email: newPartner.email.trim(),
      payoutMethod: newPartner.payoutMethod,
      payoutNumber: newPartner.payoutNumber.trim(),
      referralCode: `QLX-REF-${Math.floor(1000 + Math.random() * 9000)}`,
      profession: newPartner.profession.trim() || "Creative Partner",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    addAffiliatePartner(item);
    setShowAddPartner(false);
    setNewPartner({ fullName: "", phone: "", email: "", payoutMethod: "bkash", payoutNumber: "", profession: "" });
  };

  const filteredLeads = leadFilter === "all" 
    ? leads 
    : leads.filter((l) => l.status === leadFilter);

  return (
    <div>
      <AdminHeader
        title="Affiliates & 20% Referrals"
        subtitle={`${partners.length} partners · ${leads.length} client leads · ৳${totalPaidCommission.toLocaleString()} paid out`}
        action={{
          label: "Program Settings",
          onClick: () => setActiveTab("settings"),
          icon: <Settings className="w-4 h-4" />,
        }}
      />

      <div className="p-6 lg:p-10 max-w-7xl space-y-6">

        {/* ═══ STATS KPI CARDS ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0A0F14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-slate-400">Total Partners</div>
            <div className="text-2xl font-black text-white">{partners.length}</div>
            <div className="text-[11px] text-emerald-400 font-mono">Active affiliates</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0F14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-slate-400">Client Leads</div>
            <div className="text-2xl font-black text-white">{totalLeads}</div>
            <div className="text-[11px] text-amber-400 font-mono">{pendingLeads} awaiting closure</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0F14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-slate-400">Deals Closed</div>
            <div className="text-2xl font-black text-emerald-400">{dealsClosed}</div>
            <div className="text-[11px] text-slate-400 font-mono">Projects confirmed</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0F14] border border-emerald-500/30 bg-emerald-950/10 space-y-1">
            <div className="text-xs font-mono text-[#00FF87]">Commissions Paid (20%)</div>
            <div className="text-2xl font-black text-[#00FF87] font-mono">৳{totalPaidCommission.toLocaleString()}</div>
            <div className="text-[11px] text-slate-300 font-mono">Instant bKash/Bank</div>
          </div>
        </div>

        {/* ═══ TABS ═══ */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "leads"
                  ? "bg-[#00FF87] text-[#02180C] shadow-md shadow-emerald-500/20"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Referral Client Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "partners"
                  ? "bg-[#00FF87] text-[#02180C] shadow-md shadow-emerald-500/20"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Affiliate Partners ({partners.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "settings"
                  ? "bg-[#00FF87] text-[#02180C] shadow-md shadow-emerald-500/20"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Rules &amp; Banner Settings
            </button>
          </div>

          {activeTab === "partners" && (
            <button
              onClick={() => setShowAddPartner(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Add Partner</span>
            </button>
          )}

          {activeTab === "leads" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              <select
                className="bg-[#121822] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                value={leadFilter}
                onChange={(e) => setLeadFilter(e.target.value)}
              >
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="deal_closed">Deal Closed</option>
                <option value="commission_paid">Commission Paid</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>

        {/* ══════════════ TAB 1: REFERRAL LEADS TABLE ══════════════ */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {filteredLeads.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-[#0A0F14] rounded-2xl border border-white/5">
                No referral leads found in this filter.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0F14]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10.5px] bg-white/[0.02]">
                      <th className="p-4">Referrer (Partner)</th>
                      <th className="p-4">Client / Brand</th>
                      <th className="p-4">Service &amp; Budget</th>
                      <th className="p-4">20% Commission</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Payout TrxID</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* Referrer */}
                        <td className="p-4">
                          <div className="font-bold text-white">{lead.referrerName}</div>
                          <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{lead.referrerPhone}</span>
                            <a
                              href={`https://wa.me/${lead.referrerPhone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </a>
                          </div>
                          {lead.referrerCode && (
                            <span className="text-[10px] font-mono text-[#00FF87]">{lead.referrerCode}</span>
                          )}
                        </td>

                        {/* Client */}
                        <td className="p-4">
                          <div className="font-bold text-white">{lead.clientName}</div>
                          <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{lead.clientPhone}</span>
                            <a
                              href={`https://wa.me/${lead.clientPhone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </a>
                          </div>
                          {lead.clientEmail && <div className="text-[10px] text-slate-500">{lead.clientEmail}</div>}
                        </td>

                        {/* Service & Budget */}
                        <td className="p-4">
                          <div className="font-medium text-slate-200">{lead.serviceCategory}</div>
                          <div className="text-slate-400 font-mono mt-0.5">
                            Budget: <strong className="text-white">৳{(lead.projectBudget || 0).toLocaleString()}</strong>
                          </div>
                          {lead.projectDetails && (
                            <div className="text-[10.5px] text-slate-500 mt-1 line-clamp-1 max-w-xs" title={lead.projectDetails}>
                              {lead.projectDetails}
                            </div>
                          )}
                        </td>

                        {/* Commission */}
                        <td className="p-4">
                          <div className="text-sm font-bold font-mono text-[#00FF87]">
                            ৳{(lead.commissionEarned || 0).toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">20% Flat</div>
                        </td>

                        {/* Status dropdown */}
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateAffiliateLead(lead.id, { status: e.target.value as any })}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                              lead.status === "commission_paid"
                                ? "bg-emerald-500/15 border-emerald-500/40 text-[#00FF87]"
                                : lead.status === "deal_closed"
                                ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                                : lead.status === "contacted"
                                ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                                : lead.status === "rejected"
                                ? "bg-red-500/15 border-red-500/40 text-red-400"
                                : "bg-white/5 border-white/10 text-slate-300"
                            }`}
                          >
                            <option value="new" className="bg-[#121822]">New Lead</option>
                            <option value="contacted" className="bg-[#121822]">Contacted</option>
                            <option value="deal_closed" className="bg-[#121822]">Deal Closed</option>
                            <option value="commission_paid" className="bg-[#121822]">Commission Paid (20%)</option>
                            <option value="rejected" className="bg-[#121822]">Rejected</option>
                          </select>
                        </td>

                        {/* Payout TrxID */}
                        <td className="p-4">
                          <input
                            type="text"
                            placeholder="bKash TrxID..."
                            value={lead.payoutTrxId || ""}
                            onChange={(e) => updateAffiliateLead(lead.id, { payoutTrxId: e.target.value })}
                            className="bg-[#121822] border border-white/10 rounded px-2 py-1 text-[11px] font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/40 w-28"
                          />
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => { if (confirm("Delete this lead?")) deleteAffiliateLead(lead.id); }}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 2: PARTNERS TABLE ══════════════ */}
        {activeTab === "partners" && (
          <div className="space-y-4">
            {partners.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-[#0A0F14] rounded-2xl border border-white/5">
                No affiliate partners registered yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0F14]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10.5px] bg-white/[0.02]">
                      <th className="p-4">Partner Name</th>
                      <th className="p-4">Contact (WhatsApp)</th>
                      <th className="p-4">Payout Account</th>
                      <th className="p-4">Referral Code</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {partners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{partner.fullName}</div>
                          <div className="text-[11px] text-slate-400">{partner.profession}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-200 flex items-center gap-1.5">
                            <span>{partner.phone}</span>
                            <a
                              href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          {partner.email && <div className="text-[10px] text-slate-500">{partner.email}</div>}
                        </td>
                        <td className="p-4">
                          <div className="font-mono uppercase font-bold text-emerald-300 text-xs">
                            {partner.payoutMethod}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px]">{partner.payoutNumber}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[#00FF87] font-mono font-bold text-xs">
                            {partner.referralCode}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => updateAffiliatePartner(partner.id, {
                              status: partner.status === "active" ? "paused" : "active"
                            })}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                              partner.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {partner.status === "active" ? "Active" : "Paused"}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => { if (confirm("Delete this partner?")) deleteAffiliatePartner(partner.id); }}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete Partner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 3: PROGRAM SETTINGS ══════════════ */}
        {activeTab === "settings" && (
          <div className="p-6 rounded-2xl bg-[#0A0F14] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="text-base font-bold text-white">Program Configuration</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Set minimum project threshold (default ৳20,000) and commission percentage (default 20%).
                </p>
              </div>
              {savedSettingsNotice && (
                <span className="text-xs text-[#00FF87] font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Settings Saved!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Minimum Project Amount (BDT) *
                </label>
                <input
                  type="number"
                  required
                  className={inp}
                  value={settingsForm.minProjectAmount}
                  onChange={(e) => setSettingsForm({ ...settingsForm, minProjectAmount: +e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Commission Percentage (%) *
                </label>
                <input
                  type="number"
                  required
                  className={inp}
                  value={settingsForm.commissionPercent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, commissionPercent: +e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Banner Badge
                </label>
                <input
                  className={inp}
                  value={settingsForm.badge}
                  onChange={(e) => setSettingsForm({ ...settingsForm, badge: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Banner Heading Title
                </label>
                <input
                  className={inp}
                  value={settingsForm.title}
                  onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Banner Subtitle / Value Proposition
                </label>
                <textarea
                  rows={2}
                  className={`${inp} resize-none`}
                  value={settingsForm.subtitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, subtitle: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Payout Terms &amp; Conditions
                </label>
                <textarea
                  rows={2}
                  className={`${inp} resize-none`}
                  value={settingsForm.payoutTerms}
                  onChange={(e) => setSettingsForm({ ...settingsForm, payoutTerms: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00e87a] text-[#02180C] font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Program Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Add Partner Manually */}
        {showAddPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="max-w-md w-full rounded-2xl bg-[#0A0F14] border border-white/15 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Add Affiliate Partner</h4>
                <button onClick={() => setShowAddPartner(false)}>
                  <X className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
              </div>

              <form onSubmit={handleCreatePartner} className="space-y-3">
                <input
                  required
                  className={inp}
                  placeholder="Full Name"
                  value={newPartner.fullName}
                  onChange={(e) => setNewPartner({ ...newPartner, fullName: e.target.value })}
                />
                <input
                  required
                  className={inp}
                  placeholder="WhatsApp / Phone"
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                />
                <input
                  className={inp}
                  placeholder="Email"
                  value={newPartner.email}
                  onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                />
                <input
                  className={inp}
                  placeholder="Profession / Role"
                  value={newPartner.profession}
                  onChange={(e) => setNewPartner({ ...newPartner, profession: e.target.value })}
                />
                <select
                  className={inp}
                  value={newPartner.payoutMethod}
                  onChange={(e) => setNewPartner({ ...newPartner, payoutMethod: e.target.value as any })}
                >
                  <option value="bkash">bKash Personal</option>
                  <option value="nagad">Nagad Personal</option>
                  <option value="rocket">Rocket</option>
                  <option value="bank">Bank Transfer</option>
                </select>
                <input
                  required
                  className={inp}
                  placeholder="Payout Number / A/C"
                  value={newPartner.payoutNumber}
                  onChange={(e) => setNewPartner({ ...newPartner, payoutNumber: e.target.value })}
                />

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#00FF87] text-[#02180C] font-black text-xs hover:bg-[#00e87a]"
                  >
                    Create Partner
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddPartner(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs hover:bg-white/15"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const inp =
  "w-full bg-[#121822] border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF87]/50 transition-all";
