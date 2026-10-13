"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, Sun, Moon, Cloud, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { useCms } from "@/context/CmsContext";

interface AdminHeaderAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  action?: AdminHeaderAction;
}

export default function AdminHeader({ title, subtitle, actionButton, action }: AdminHeaderProps) {
  const { isDark, toggleTheme } = useAdminTheme();
  const { isSyncing, cloudSyncInfo, refreshLiveContent } = useCms();
  const [manualRefreshing, setManualRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setManualRefreshing(true);
    await refreshLiveContent();
    setTimeout(() => setManualRefreshing(false), 600);
  };

  return (
    <header className={`px-6 lg:px-10 py-5 border-b backdrop-blur-md sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200 ${
      isDark
        ? "border-white/[0.06] bg-[#050A0F]/95 text-white"
        : "border-slate-200 bg-white/95 text-slate-900 shadow-xs"
    }`}>
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
            isDark
              ? "bg-emerald-neon/10 border border-emerald-neon/25 text-emerald-neon"
              : "bg-emerald-50 border border-emerald-200 text-emerald-700"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-neon animate-ping" />
            LIVE CMS
          </div>

          {/* Cloud Sync Status Badge */}
          {cloudSyncInfo.isCloudConnected ? (
            <Link
              href="/admin/settings?tab=cloudSync"
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-all border ${
                isDark
                  ? "bg-emerald-neon/10 border-emerald-neon/30 text-emerald-neon hover:border-emerald-neon/60"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
              }`}
              title="Cloud database connected: All edits save live on Vercel"
            >
              <Cloud className="w-3 h-3 text-emerald-neon" />
              <span className="hidden md:inline">Vercel Cloud:</span>
              <span className="uppercase">{cloudSyncInfo.provider}</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            </Link>
          ) : (
            <Link
              href="/admin/settings?tab=cloudSync"
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-all border ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-slate-400 hover:border-white/20"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
              title="Click to connect Vercel KV or Supabase for multi-device live sync on Vercel"
            >
              <AlertCircle className="w-3 h-3 text-slate-500" />
              <span>Local Storage</span>
              <span className="underline decoration-dotted text-[9px]">(Connect Vercel KV)</span>
            </Link>
          )}

          {/* Sync indicator */}
          {isSyncing && (
            <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-neon animate-pulse">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              <span>Saving live...</span>
            </div>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Re-sync button */}
        <button
          onClick={handleManualRefresh}
          disabled={manualRefreshing || isSyncing}
          type="button"
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isDark
              ? "bg-black/50 border-white/10 text-slate-300 hover:text-white hover:border-emerald-neon/40"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300"
          }`}
          title="Fetch latest data from live database"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${manualRefreshing ? "animate-spin text-emerald-neon" : ""}`} />
          <span className="hidden lg:inline">Fetch Live</span>
        </button>

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          type="button"
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isDark
              ? "bg-black/50 border-white/10 text-slate-300 hover:text-white hover:border-emerald-neon/40"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300"
          }`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-emerald-neon" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {actionButton}

        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-neon text-[#0F172A] hover:bg-[#00D970] transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            {action.icon}
            {action.label}
          </button>
        )}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
            isDark
              ? "text-white bg-white/5 border-white/10 hover:bg-white/10"
              : "text-slate-800 bg-slate-100 border-slate-200 hover:bg-slate-200"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-neon" />
          <span>Preview Site</span>
        </a>
      </div>
    </header>
  );
}
