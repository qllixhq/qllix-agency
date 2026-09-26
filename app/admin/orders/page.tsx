"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { OrderStatus } from "@/lib/cmsStore";
import { Eye, Trash2, ChevronDown, X } from "lucide-react";

const STATUS_OPTIONS: OrderStatus[] = ["new", "confirmed", "in_progress", "waiting", "revision", "completed", "cancelled"];

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  waiting: "Waiting for Client",
  revision: "Revision",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  confirmed: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  in_progress: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  waiting: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  revision: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function AdminOrdersPage() {
  const { cmsData, updateOrderStatus, deleteOrder } = useCms();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "">("");
  const [viewOrder, setViewOrder] = useState<string | null>(null);

  const orders = [...cmsData.orders]
    .filter((o) => !filterStatus || o.status === filterStatus)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const stats = {
    total: cmsData.orders.length,
    new: cmsData.orders.filter((o) => o.status === "new").length,
    inProgress: cmsData.orders.filter((o) => o.status === "in_progress").length,
    completed: cmsData.orders.filter((o) => o.status === "completed").length,
  };

  const selectedOrder = viewOrder ? cmsData.orders.find((o) => o.id === viewOrder) : null;

  return (
    <div>
      <AdminHeader
        title="Orders"
        subtitle={`${stats.new} new · ${stats.total} total`}
      />

      <div className="p-6 lg:p-10 max-w-7xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: stats.total, color: "text-white" },
            { label: "New Orders", value: stats.new, color: "text-blue-400" },
            { label: "In Progress", value: stats.inProgress, color: "text-amber-400" },
            { label: "Completed", value: stats.completed, color: "text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-[#0A0F14] border border-white/[0.07] p-4 text-center">
              <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <select
              className="appearance-none bg-[#0A0F14] border border-white/[0.08] rounded-xl px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:border-[#00FF87]/40"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "")}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
          <span className="text-xs text-slate-500">{orders.length} order{orders.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[#0A0F14] border border-white/[0.07] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-500 text-xs uppercase font-mono">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service · Package</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-slate-400">{o.id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{o.fullName}</div>
                      <div className="text-xs text-slate-500">{o.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white text-xs">{o.serviceName}</div>
                      <div className="text-slate-500 text-xs">{o.packageName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-[#00FF87] font-bold text-sm">
                        ৳{o.amount.toLocaleString()}
                      </div>
                      {o.couponCode && (
                        <div className="text-[10.5px] font-mono text-emerald-400/90 flex items-center gap-1 mt-0.5">
                          <span>🏷️ {o.couponCode}</span>
                          {o.discountAmount ? <span>(-৳{o.discountAmount.toLocaleString()})</span> : null}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">
                      {new Date(o.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className={`appearance-none text-xs font-mono px-3 py-1.5 pr-7 rounded-full border cursor-pointer focus:outline-none ${STATUS_COLORS[o.status]}`}
                        >
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0A0F14] text-white">{STATUS_LABELS[s]}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewOrder(o.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#00FF87] hover:bg-[#00FF87]/10 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { if (confirm("Delete this order?")) deleteOrder(o.id); }} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="py-16 text-center text-slate-500 text-sm">
                No orders yet. Orders placed on the website will appear here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setViewOrder(null)}>
          <div className="relative max-w-lg w-full bg-[#0A0F14] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewOrder(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <div className="text-xs font-mono text-slate-500 mb-4">ORDER #{selectedOrder.id.slice(-8).toUpperCase()}</div>
            <h3 className="text-lg font-black text-white mb-4">{selectedOrder.fullName}</h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Phone", value: selectedOrder.phone },
                { label: "Email", value: selectedOrder.email },
                { label: "Company", value: selectedOrder.company || "—" },
                { label: "Amount", value: `৳${selectedOrder.amount.toLocaleString()}` },
                { label: "Coupon Applied", value: selectedOrder.couponCode ? `${selectedOrder.couponCode} (-৳${(selectedOrder.discountAmount || 0).toLocaleString()})` : "None" },
                { label: "Service", value: selectedOrder.serviceName },
                { label: "Package", value: selectedOrder.packageName },
                { label: "Deadline", value: selectedOrder.preferredDeadline || "—" },
                { label: "Date", value: new Date(selectedOrder.createdAt).toLocaleDateString("en-GB") },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  <div className="text-sm text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Project Details</div>
              <p className="text-sm text-slate-300 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 leading-relaxed">{selectedOrder.projectDetails}</p>
            </div>

            {selectedOrder.referenceUrl && (
              <div className="mb-4">
                <div className="text-xs text-slate-500 mb-1">Reference</div>
                <a href={selectedOrder.referenceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF87] hover:underline break-all">{selectedOrder.referenceUrl}</a>
              </div>
            )}

            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-slate-500">Status:</span>
              <div className="relative">
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                  className={`appearance-none text-xs font-mono px-3 py-1.5 pr-7 rounded-full border cursor-pointer focus:outline-none ${STATUS_COLORS[selectedOrder.status]}`}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0A0F14] text-white">{STATUS_LABELS[s]}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
