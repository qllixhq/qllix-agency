"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { InquiryLead } from "@/lib/cmsStore";
import {
  Inbox,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Filter
} from "lucide-react";

export default function AdminInquiriesPage() {
  const { cmsData, updateInquiryStatus, deleteInquiry } = useCms();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryLead | null>(null);

  const filtered = cmsData.inquiries.filter((inq) => {
    if (filterStatus === "all") return true;
    return inq.status === filterStatus;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete lead from ${name}?`)) {
      deleteInquiry(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const getStatusBadge = (status: InquiryLead["status"]) => {
    switch (status) {
      case "new":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "reviewing":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "contacted":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "closed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    }
  };

  return (
    <div>
      <AdminHeader
        title="Client Inquiries &amp; Leads"
        subtitle="Manage and respond to high-intent booking requests and contact form submissions"
      />

      <div className="p-6 lg:p-10 space-y-6 max-w-7xl">
        
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#020F07] border border-white/10 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono uppercase text-slate-400 font-bold">Filter By Status:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {["all", "new", "reviewing", "contacted", "closed"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase font-mono transition-colors ${
                  filterStatus === st
                    ? "bg-[#00FF87] text-[#02180C] font-bold shadow-[0_0_12px_rgba(0,255,135,0.3)]"
                    : "text-slate-400 hover:text-white bg-white/5"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries List & Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ═══ LEADS LIST (7 Columns) ═══ */}
          <div className="lg:col-span-7 space-y-3">
            {filtered.length === 0 ? (
              <div className="rounded-2xl bg-[#020F07] border border-white/10 p-12 text-center text-slate-400 text-xs">
                <Inbox className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p>No leads found under status &quot;{filterStatus}&quot;.</p>
              </div>
            ) : (
              filtered.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#031A0D] border-[#00FF87] shadow-[0_0_20px_rgba(0,255,135,0.15)]"
                        : "bg-[#020F07] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{inq.fullName}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-bold border ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {inq.status}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-xs text-[#00FF87] font-semibold mb-1">
                      {inq.service || "General Inquiry"}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {inq.details || "No additional message provided."}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-white/5">
                      <span>Budget: <strong className="text-slate-300 font-sans">{inq.budget || "N/A"}</strong></span>
                      <span>Email: {inq.email}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ═══ LEAD DETAIL PANEL (5 Columns) ═══ */}
          <div className="lg:col-span-5 bg-[#020F07] border border-white/10 rounded-2xl p-6 sticky top-24 space-y-6">
            {selectedInquiry ? (
              <>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">{selectedInquiry.fullName}</h3>
                    <p className="text-xs font-mono text-slate-400">
                      Received {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.fullName)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Switcher */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                    Update Pipeline Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["new", "reviewing", "contacted", "closed"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          updateInquiryStatus(selectedInquiry.id, st);
                          setSelectedInquiry({ ...selectedInquiry, status: st });
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                          selectedInquiry.status === st
                            ? "bg-[#00FF87] text-[#02180C] shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                            : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="block text-slate-500 font-mono text-[10px] uppercase mb-0.5">
                      Selected Service
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {selectedInquiry.service || "General Inquiry"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="block text-slate-500 font-mono text-[10px] uppercase mb-0.5">
                      Budget Scope
                    </span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">
                      {selectedInquiry.budget || "Unspecified"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="block text-slate-500 font-mono text-[10px] uppercase mb-0.5">
                      Project Notes / Specifications
                    </span>
                    <p className="text-slate-300 leading-relaxed mt-1">
                      {selectedInquiry.details || "No custom message provided."}
                    </p>
                  </div>
                </div>

                {/* Direct Action Contacts */}
                <div className="space-y-2 pt-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Qllix%20Partnership%20Follow-Up`}
                    className="w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Mail className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Email to Client</span>
                  </a>

                  {selectedInquiry.whatsappNumber && (
                    <a
                      href={`https://wa.me/${(selectedInquiry.whatsappCountryCode || "").replace(
                        "+",
                        ""
                      )}${selectedInquiry.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                        selectedInquiry.fullName
                      )},%20this%20is%20Qllix%20Creative%20Agency.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-[#00FF87] border border-emerald-500/40 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Select a lead from the left to view details and contact options.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
