"use client";

import React from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  Sparkles, Layers, Wrench, Package, ShoppingBag,
  Star, HelpCircle, Home, ArrowRight,
  AlertCircle, Users, Megaphone,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { cmsData } = useCms();
  const { isDark } = useAdminTheme();

  const totalServices = cmsData.agencyServices.length;
  const activeServices = cmsData.agencyServices.filter((s) => s.active).length;
  const totalPackages = cmsData.packages.length;
  const totalOrders = cmsData.orders.length;
  const newOrders = cmsData.orders.filter((o) => o.status === "new").length;
  const totalPortfolio = cmsData.portfolioItems.length;
  const totalTestimonials = cmsData.agencyTestimonials.length;
  const totalFAQs = cmsData.agencyFaqs.length;
  const totalInquiries = cmsData.inquiries.length;
  const newInquiries = cmsData.inquiries.filter((i) => i.status === "new").length;
  const totalTeam = cmsData.teamMembers.length;
  const activeTeam = cmsData.teamMembers.filter((m) => m.active).length;
  const totalCampaigns = cmsData.campaigns?.length || 0;
  const activeCampaigns = cmsData.campaigns?.filter((c) => c.active).length || 0;
  const totalShowcase = (cmsData.showcase?.row1?.length || 0) + (cmsData.showcase?.row2?.length || 0);

  const stats = [
    { label: "Campaigns & Offers", value: `${activeCampaigns}/${totalCampaigns}`, note: "active / total ads", icon: Megaphone, href: "/admin/campaigns", color: "text-rose-500", bg: isDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-200", badge: activeCampaigns > 0 ? "LIVE" : undefined },
    { label: "Hero Showcase", value: totalShowcase, note: "marquee cards", icon: Sparkles, href: "/admin/showcase", color: "text-[#00FF87]", bg: isDark ? "bg-[#00FF87]/10 border-[#00FF87]/20" : "bg-emerald-50 border-emerald-200" },
    { label: "Services", value: `${activeServices}/${totalServices}`, note: "active/total", icon: Wrench, href: "/admin/services", color: "text-emerald-500", bg: isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200" },
    { label: "Packages", value: totalPackages, note: `across ${totalServices} services`, icon: Package, href: "/admin/packages", color: "text-cyan-500", bg: isDark ? "bg-cyan-500/10 border-cyan-500/20" : "bg-cyan-50 border-cyan-200" },
    { label: "Orders", value: totalOrders, note: `${newOrders} new`, icon: ShoppingBag, href: "/admin/orders", color: "text-amber-500", bg: isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200", badge: newOrders > 0 ? `${newOrders} new` : undefined },
    { label: "Team Members", value: `${activeTeam}/${totalTeam}`, note: "active members", icon: Users, href: "/admin/team", color: "text-teal-500", bg: isDark ? "bg-teal-500/10 border-teal-500/20" : "bg-teal-50 border-teal-200" },
    { label: "Portfolio", value: totalPortfolio, note: "design projects", icon: Layers, href: "/admin/portfolio", color: "text-purple-500", bg: isDark ? "bg-purple-500/10 border-purple-500/20" : "bg-purple-50 border-purple-200" },
    { label: "Testimonials", value: totalTestimonials, note: "client reviews", icon: Star, href: "/admin/testimonials", color: "text-pink-500", bg: isDark ? "bg-pink-500/10 border-pink-500/20" : "bg-pink-50 border-pink-200" },
    { label: "FAQ Items", value: totalFAQs, note: "questions answered", icon: HelpCircle, href: "/admin/faq", color: "text-orange-500", bg: isDark ? "bg-orange-500/10 border-orange-500/20" : "bg-orange-50 border-orange-200" },
    { label: "Inquiries", value: totalInquiries, note: `${newInquiries} new`, icon: AlertCircle, href: "/admin/inquiries", color: "text-slate-500", bg: isDark ? "bg-slate-500/10 border-slate-500/20" : "bg-slate-100 border-slate-200", badge: newInquiries > 0 ? newInquiries : undefined },
    { label: "Homepage Sections", value: cmsData.homeSections.filter((s) => s.enabled).length, note: "sections enabled", icon: Home, href: "/admin/homepage", color: "text-indigo-500", bg: isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-200" },
  ];

  const recentOrders = [...cmsData.orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const STATUS_COLORS: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    confirmed: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    in_progress: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    waiting: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    revision: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back to Qllix Admin. Complete overview of site content, orders & campaigns."
      />

      <div className="p-6 lg:p-10 max-w-7xl space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.href}
                href={stat.href}
                className={`group relative rounded-2xl border p-5 transition-all hover:shadow-lg ${
                  isDark
                    ? "bg-[#0A0F14] border-white/[0.07] hover:border-white/20"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {stat.badge && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-black flex items-center justify-center shadow-md">
                    {stat.badge}
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-2xl font-black ${stat.color} mb-0.5 font-mono`}>{stat.value}</div>
                <div className={`text-sm font-semibold mb-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.note}</div>
                <ArrowRight className={`absolute bottom-4 right-4 w-4 h-4 transition-colors ${
                  isDark ? "text-slate-700 group-hover:text-slate-400" : "text-slate-300 group-hover:text-slate-600"
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark
            ? "bg-[#0A0F14] border-white/[0.07]"
            : "bg-white border-slate-200 shadow-sm"
        }`}>
          <div className={`flex items-center justify-between p-5 border-b ${
            isDark ? "border-white/[0.06]" : "border-slate-200"
          }`}>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#00FF87]" />
              <span className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>Recent Orders</span>
            </div>
            <Link
              href="/admin/orders"
              className={`text-xs flex items-center gap-1 transition-colors ${
                isDark ? "text-slate-400 hover:text-[#00FF87]" : "text-slate-500 hover:text-emerald-600"
              }`}
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentOrders.length > 0 ? (
            <div className={`divide-y ${isDark ? "divide-white/[0.04]" : "divide-slate-100"}`}>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className={`flex items-center gap-4 p-4 transition-colors ${
                    isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm truncate ${isDark ? "text-white" : "text-slate-900"}`}>{order.fullName}</div>
                    <div className="text-xs text-slate-500 truncate">{order.serviceName} — {order.packageName}</div>
                  </div>
                  <div className="text-sm font-mono text-[#00FF87] shrink-0 font-bold">৳{order.amount.toLocaleString()}</div>
                  <div className={`text-[10px] font-mono px-2 py-1 rounded-full border shrink-0 ${STATUS_COLORS[order.status] || ""}`}>
                    {order.status.replace("_", " ")}
                  </div>
                  <div className="text-xs text-slate-500 shrink-0">{new Date(order.createdAt).toLocaleDateString("en-GB")}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No orders yet. Orders placed on the website will appear here.
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/campaigns"
            className={`group flex items-center gap-3 p-4 rounded-xl border transition-all ${
              isDark
                ? "bg-[#0A0F14] border-white/[0.07] hover:border-[#00FF87]/30"
                : "bg-white border-slate-200 hover:border-emerald-300 shadow-sm"
            }`}
          >
            <Megaphone className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <div className={`text-sm font-bold transition-colors ${
                isDark ? "text-white group-hover:text-[#00FF87]" : "text-slate-900 group-hover:text-emerald-700"
              }`}>
                Launch Campaign &amp; Ads
              </div>
              <div className="text-xs text-slate-500">Create promo announcement bars &amp; offer popups</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00FF87] ml-auto transition-colors" />
          </Link>

          <Link
            href="/admin/settings"
            className={`group flex items-center gap-3 p-4 rounded-xl border transition-all ${
              isDark
                ? "bg-[#0A0F14] border-white/[0.07] hover:border-[#00FF87]/30"
                : "bg-white border-slate-200 hover:border-emerald-300 shadow-sm"
            }`}
          >
            <Sparkles className="w-5 h-5 text-cyan-500 shrink-0" />
            <div>
              <div className={`text-sm font-bold transition-colors ${
                isDark ? "text-white group-hover:text-[#00FF87]" : "text-slate-900 group-hover:text-emerald-700"
              }`}>
                Global Brand &amp; Colors
              </div>
              <div className="text-xs text-slate-500">Header &amp; footer logo, favicon, fonts, loading bar</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00FF87] ml-auto transition-colors" />
          </Link>

          <Link
            href="/admin/packages"
            className={`group flex items-center gap-3 p-4 rounded-xl border transition-all ${
              isDark
                ? "bg-[#0A0F14] border-white/[0.07] hover:border-[#00FF87]/30"
                : "bg-white border-slate-200 hover:border-emerald-300 shadow-sm"
            }`}
          >
            <Package className="w-5 h-5 text-purple-500 shrink-0" />
            <div>
              <div className={`text-sm font-bold transition-colors ${
                isDark ? "text-white group-hover:text-[#00FF87]" : "text-slate-900 group-hover:text-emerald-700"
              }`}>
                Manage Packages &amp; Pricing
              </div>
              <div className="text-xs text-slate-500">Adjust service packages, prices &amp; features</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00FF87] ml-auto transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
