"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wrench, Package, ShoppingBag,
  Layers, Star, HelpCircle, Home, Settings, X,
  ChevronRight, Inbox, Users, Megaphone, Sparkles, DollarSign, Wand2,
} from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/campaigns", label: "Campaigns & Offers", icon: Megaphone },
  { href: "/admin/brand-kit", label: "Brand Kit Generator", icon: Wand2 },
  { href: "/admin/affiliates", label: "Affiliates & 20% Referrals", icon: DollarSign },
  { href: "/admin/showcase", label: "Hero Showcase", icon: Sparkles },
  { href: "/admin/services", label: "Services & Packages", icon: Wrench },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/portfolio", label: "Portfolio", icon: Layers },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/banners", label: "Banners", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  onClose?: () => void;
  onLogout?: () => void;
}

export default function AdminSidebar({ onClose, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const { isDark } = useAdminTheme();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== "/admin";
  };

  return (
    <aside className={`flex flex-col h-full transition-colors duration-200 ${
      isDark
        ? "bg-[#050A0F] border-r border-white/[0.06] text-slate-300"
        : "bg-white border-r border-slate-200 text-slate-700 shadow-sm"
    }`}>
      {/* Logo */}
      <div className={`flex items-center justify-between px-5 py-5 border-b ${
        isDark ? "border-white/[0.06]" : "border-slate-200"
      }`}>
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Qllix" className="h-7 w-auto object-contain" />
          <span className={`text-xs font-mono font-semibold transition-colors ${
            isDark ? "text-slate-500 group-hover:text-slate-300" : "text-slate-400 group-hover:text-slate-700"
          }`}>
            Admin
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className={`lg:hidden p-1 rounded-lg transition-colors ${
              isDark ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? isDark
                    ? "bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/20 font-semibold"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold"
                  : isDark
                  ? "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                active
                  ? isDark ? "text-[#00FF87]" : "text-emerald-600"
                  : isDark ? "text-slate-500 group-hover:text-slate-300" : "text-slate-400 group-hover:text-slate-700"
              }`} />
              <span className="flex-1">{item.label}</span>
              {active && (
                <ChevronRight className={`w-3.5 h-3.5 ${isDark ? "text-[#00FF87]/60" : "text-emerald-500"}`} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t space-y-2 ${isDark ? "border-white/[0.06]" : "border-slate-200"}`}>
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-2 text-xs transition-colors ${
            isDark ? "text-slate-500 hover:text-[#00FF87]" : "text-slate-500 hover:text-emerald-600"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
          View Live Site
        </Link>
        {onLogout && (
          <button
            onClick={onLogout}
            className={`flex items-center gap-2 text-xs transition-colors cursor-pointer ${
              isDark ? "text-slate-600 hover:text-red-400" : "text-slate-400 hover:text-red-600"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
