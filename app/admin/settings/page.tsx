"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { useCms } from "@/context/CmsContext";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  Settings,
  Save,
  CheckCircle2,
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Palette,
  Image as ImageIcon,
  Sliders,
  Type,
  Eye,
  Play,
  Share2,
  Cloud,
  Database,
  RefreshCw,
  AlertCircle,
  Server,
  ExternalLink,
} from "lucide-react";

const HEADING_FONT_OPTIONS = [
  { label: "Playfair Display (Luxury Editorial Serif)", value: "Playfair Display" },
  { label: "Outfit (Modern Tech Geometric)", value: "Outfit" },
  { label: "Inter (Crisp Clean Sans)", value: "Inter" },
  { label: "Syne (Avant-Garde & Bold)", value: "Syne" },
  { label: "Plus Jakarta Sans (Contemporary Agency)", value: "Plus Jakarta Sans" },
  { label: "Montserrat (Clean Architecture)", value: "Montserrat" },
];

const BODY_FONT_OPTIONS = [
  { label: "Inter (Universal Legibility)", value: "Inter" },
  { label: "Outfit (Modern Geometric)", value: "Outfit" },
  { label: "Plus Jakarta Sans (Contemporary Sans)", value: "Plus Jakarta Sans" },
];

const COLOR_PRESETS = [
  { label: "Cyber Emerald (Default)", primary: "#00FF87", secondary: "#02180C" },
  { label: "Electric Cyan", primary: "#00E5FF", secondary: "#021526" },
  { label: "Sunset Amber", primary: "#FFB800", secondary: "#1A0F00" },
  { label: "Neon Violet", primary: "#A855F7", secondary: "#140526" },
  { label: "Matrix Lime", primary: "#84CC16", secondary: "#0A1F02" },
  { label: "Hyper Rose", primary: "#F43F5E", secondary: "#1C0208" },
];

type SettingsTab = "branding" | "visuals" | "loadingBar" | "security" | "cloudSync" | "backup";

export default function AdminSettingsPage() {
  const { cmsData, updateGeneral, resetToDefaults, exportDataJson, importDataJson, cloudSyncInfo, isSyncing, refreshLiveContent } = useCms();
  const { isDark } = useAdminTheme();

  const [activeTab, setActiveTab] = useState<SettingsTab>("branding");

  // Read URL query parameter for direct tab linking (e.g. from header)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as SettingsTab | null;
      if (tabParam && ["branding", "visuals", "loadingBar", "security", "cloudSync", "backup"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const [cloudTesting, setCloudTesting] = useState(false);
  const [cloudTestResult, setCloudTestResult] = useState<string | null>(null);

  // Form state initialized with cmsData.general
  const [generalForm, setGeneralForm] = useState({
    agencyName: cmsData.general.agencyName || "Qllix",
    tagline: cmsData.general.tagline || "Designing the Future of Your Brand",
    logoUrl: cmsData.general.logoUrl || "/images/logo.png",
    footerLogoUrl: cmsData.general.footerLogoUrl || "/images/logo.png",
    faviconUrl: cmsData.general.faviconUrl || "/favicon.ico",
    contactEmail: cmsData.general.contactEmail || "hello@qllix.com",
    adminPasscode: cmsData.general.adminPasscode || "admin2026",
    primaryColor: cmsData.general.primaryColor || "#00FF87",
    secondaryColor: cmsData.general.secondaryColor || "#02180C",
    headingFont: cmsData.general.headingFont || "Playfair Display",
    bodyFont: cmsData.general.bodyFont || "Inter",
    loadingBar: {
      enabled: cmsData.general.loadingBar?.enabled ?? true,
      color: cmsData.general.loadingBar?.color || "#00FF87",
      height: cmsData.general.loadingBar?.height || 3,
    },
    socialLinks: {
      facebook: cmsData.general.socialLinks?.facebook || "",
      instagram: cmsData.general.socialLinks?.instagram || "",
      linkedin: cmsData.general.socialLinks?.linkedin || "",
      behance: cmsData.general.socialLinks?.behance || "",
      dribbble: cmsData.general.socialLinks?.dribbble || "",
      twitter: cmsData.general.socialLinks?.twitter || "",
      youtube: cmsData.general.socialLinks?.youtube || "",
      whatsapp: cmsData.general.socialLinks?.whatsapp || "",
    },
  });

  const [newPasscode, setNewPasscode] = useState(cmsData.general.adminPasscode || "admin2026");
  const [importJsonText, setImportJsonText] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [simulatingLoader, setSimulatingLoader] = useState(false);

  const handleSaveGeneral = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateGeneral(generalForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) return;
    updateGeneral({ adminPasscode: newPasscode.trim() });
    setPasscodeSuccess(true);
    setTimeout(() => setPasscodeSuccess(false), 3000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qllix-cms-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJson(importJsonText);
    if (ok) {
      setImportStatus("Successfully restored all content from backup!");
      setImportJsonText("");
      setTimeout(() => setImportStatus(null), 4000);
    } else {
      setImportStatus("Error: Invalid JSON backup format.");
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all CMS content to factory defaults? Any custom modifications will be reverted.")) {
      resetToDefaults();
      alert("All site content has been reset to defaults.");
    }
  };

  const handleSimulateLoader = () => {
    setSimulatingLoader(true);
    setTimeout(() => setSimulatingLoader(false), 2000);
  };

  return (
    <div>
      <AdminHeader
        title="Settings &amp; Global Branding"
        subtitle="Manage brand logos, favicon, primary/secondary colors, fonts, loading bar &amp; system security"
        actionButton={
          <button
            onClick={() => handleSaveGeneral()}
            type="button"
            className="px-5 py-2 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Save className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Save All Settings</span>
          </button>
        }
      />

      <div className="p-6 lg:p-10 space-y-8 max-w-5xl">
        {/* Toast Notification */}
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-[#00FF87] flex items-center gap-2 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>All global branding &amp; system settings saved successfully!</span>
          </div>
        )}

        {/* ═══ TAB NAVIGATION ═══ */}
        <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl border ${
          isDark ? "bg-[#0A0F14] border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab("branding")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "branding"
                ? "bg-[#00FF87] text-[#02180C] shadow-md"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Logos &amp; Brand Assets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("visuals")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "visuals"
                ? "bg-[#00FF87] text-[#02180C] shadow-md"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colors &amp; Typography</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("loadingBar")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "loadingBar"
                ? "bg-[#00FF87] text-[#02180C] shadow-md"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Top Loading Bar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-[#00FF87] text-[#02180C] shadow-md"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Security Passcode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cloudSync")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "cloudSync"
                ? "bg-[#00FF87] text-[#02180C] shadow-md"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-[#00FF87]" />
            <span>Vercel Live Sync</span>
            {cloudSyncInfo.isCloudConnected && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("backup")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "backup"
                ? "bg-[#00FF87] text-[#02180C] shadow-md"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>System Backup</span>
          </button>
        </div>

        {/* ═══ TAB 1: LOGOS & BRAND ASSETS ═══ */}
        {activeTab === "branding" && (
          <div className="space-y-6">
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                    Brand Identity &amp; Logo Assets
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload official logos, footer variants, and browser favicon
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-500 font-semibold">Live Reactive</span>
              </div>

              {/* Main Header Logo */}
              <div className="space-y-3">
                <MediaUploader
                  label="Main Header Logo *"
                  value={generalForm.logoUrl}
                  onChange={(val) => setGeneralForm({ ...generalForm, logoUrl: val })}
                  acceptVideo={false}
                  recommendedDimensions="300 × 75 px (Transparent PNG / SVG)"
                  helpText="Displayed in the site header and hero navbar across all pages"
                />

                {/* Live Preview Box */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark ? "bg-black/60 border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="text-xs text-slate-400 font-mono">Header Preview (Dark Background):</div>
                  <div className="p-3 rounded-xl bg-black flex items-center justify-center border border-white/10 min-w-[200px]">
                    <img
                      src={generalForm.logoUrl || "/images/logo.png"}
                      alt="Main Logo"
                      className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,255,135,0.3)]"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Logo */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <MediaUploader
                  label="Footer Logo (Optional Variant)"
                  value={generalForm.footerLogoUrl || generalForm.logoUrl}
                  onChange={(val) => setGeneralForm({ ...generalForm, footerLogoUrl: val })}
                  acceptVideo={false}
                  recommendedDimensions="300 × 75 px (Transparent PNG / SVG)"
                  helpText="Displayed on dark backgrounds in the website footer"
                />

                {/* Live Footer Preview Box */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark ? "bg-black/60 border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="text-xs text-slate-400 font-mono">Footer Preview (Deep Slate):</div>
                  <div className="p-3 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 min-w-[200px]">
                    <img
                      src={generalForm.footerLogoUrl || generalForm.logoUrl || "/images/logo.png"}
                      alt="Footer Logo"
                      className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,200,83,0.3)]"
                    />
                  </div>
                </div>
              </div>

              {/* Browser Favicon */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <MediaUploader
                  label="Browser Favicon Icon"
                  value={generalForm.faviconUrl || "/favicon.ico"}
                  onChange={(val) => setGeneralForm({ ...generalForm, faviconUrl: val })}
                  acceptVideo={false}
                  recommendedDimensions="32 × 32 px or 64 × 64 px (ICO / PNG)"
                  helpText="Displayed on browser tabs and bookmarks bar"
                />

                {/* Mock Browser Tab Preview */}
                <div className={`p-4 rounded-2xl border ${
                  isDark ? "bg-black/60 border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="text-xs text-slate-400 font-mono mb-2">Browser Tab Simulation:</div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-t-xl bg-slate-900 border-t border-x border-slate-700 text-xs text-slate-200 shadow-md">
                    <img
                      src={generalForm.faviconUrl || generalForm.logoUrl || "/favicon.ico"}
                      alt="Favicon"
                      className="w-4 h-4 object-contain rounded-sm"
                    />
                    <span className="font-medium text-[11px] truncate max-w-[140px]">
                      {generalForm.agencyName} | {generalForm.tagline}
                    </span>
                    <span className="text-slate-500 text-[10px] ml-1">✕</span>
                  </div>
                </div>
              </div>

              {/* Agency Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">
                    Agency Name *
                  </label>
                  <input
                    type="text"
                    value={generalForm.agencyName}
                    onChange={(e) => setGeneralForm({ ...generalForm, agencyName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] ${
                      isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">
                    Tagline / Sub-Headline
                  </label>
                  <input
                    type="text"
                    value={generalForm.tagline}
                    onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] ${
                      isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={generalForm.contactEmail}
                    onChange={(e) => setGeneralForm({ ...generalForm, contactEmail: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] ${
                      isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">
                    WhatsApp Hotline
                  </label>
                  <input
                    type="text"
                    value={generalForm.socialLinks.whatsapp}
                    onChange={(e) => setGeneralForm({
                      ...generalForm,
                      socialLinks: { ...generalForm.socialLinks, whatsapp: e.target.value }
                    })}
                    placeholder="+8801XXXXXXXXX"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] ${
                      isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div className="pt-5 border-t border-white/10">
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Footer Social Links</h4>
                  <p className="mt-1 text-xs text-slate-400">Add or update all public social channels used in your footer and branding.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                  {[
                    { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/yourname" },
                    { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/yourpage" },
                    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/yourbrand" },
                    { key: "behance", label: "Behance URL", placeholder: "https://behance.net/yourname" },
                    { key: "dribbble", label: "Dribbble URL", placeholder: "https://dribbble.com/yourname" },
                    { key: "twitter", label: "X / Twitter URL", placeholder: "https://x.com/yourname" },
                    { key: "youtube", label: "YouTube URL", placeholder: "https://youtube.com/@yourchannel" },
                    { key: "whatsapp", label: "WhatsApp URL", placeholder: "https://wa.me/8801XXXXXXXXX" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">{label}</label>
                      <input
                        type="url"
                        value={generalForm.socialLinks[key as keyof typeof generalForm.socialLinks] || ""}
                        onChange={(e) => setGeneralForm({
                          ...generalForm,
                          socialLinks: {
                            ...generalForm.socialLinks,
                            [key]: e.target.value,
                          },
                        })}
                        placeholder={placeholder}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] ${isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB 2: COLORS & TYPOGRAPHY ═══ */}
        {activeTab === "visuals" && (
          <div className="space-y-6">
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                    Color Palettes &amp; Typography
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live customization of primary brand accents and typography
                  </p>
                </div>
                <Palette className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                  Curated Brand Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGeneralForm({
                        ...generalForm,
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary,
                      })}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        generalForm.primaryColor === preset.primary
                          ? "border-[#00FF87] bg-emerald-500/10 shadow-sm"
                          : isDark
                          ? "border-white/10 bg-black/40 hover:border-white/20"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full shrink-0 border border-white/20 shadow-xs"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>{preset.label}</div>
                        <div className="text-[10px] font-mono text-slate-400">{preset.primary}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                    Primary Brand Color (Accents, Buttons, Highlights)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={generalForm.primaryColor}
                      onChange={(e) => setGeneralForm({ ...generalForm, primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={generalForm.primaryColor}
                      onChange={(e) => setGeneralForm({ ...generalForm, primaryColor: e.target.value })}
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:border-[#00FF87] ${
                        isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                    Secondary Color (Deep Contrast)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={generalForm.secondaryColor}
                      onChange={(e) => setGeneralForm({ ...generalForm, secondaryColor: e.target.value })}
                      className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={generalForm.secondaryColor}
                      onChange={(e) => setGeneralForm({ ...generalForm, secondaryColor: e.target.value })}
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:border-[#00FF87] ${
                        isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Typography Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Heading Typography Font</span>
                  </label>
                  <select
                    value={generalForm.headingFont}
                    onChange={(e) => setGeneralForm({ ...generalForm, headingFont: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#00FF87] ${
                      isDark ? "bg-black/80 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  >
                    {HEADING_FONT_OPTIONS.map((font, idx) => (
                      <option key={idx} value={font.value} className="bg-slate-950 text-white">
                        {font.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Applied to page titles, hero titles &amp; headlines</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Body &amp; Paragraph Font</span>
                  </label>
                  <select
                    value={generalForm.bodyFont}
                    onChange={(e) => setGeneralForm({ ...generalForm, bodyFont: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#00FF87] ${
                      isDark ? "bg-black/80 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  >
                    {BODY_FONT_OPTIONS.map((font, idx) => (
                      <option key={idx} value={font.value} className="bg-slate-950 text-white">
                        {font.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Applied to descriptions, menus &amp; paragraph text</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB 3: TOP LOADING BAR ═══ */}
        {activeTab === "loadingBar" && (
          <div className="space-y-6">
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                    Top Page Loading Bar
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sleek progress bar shown at the very top of browser during navigation
                  </p>
                </div>

                {/* Enable / Disable Toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <span className={`text-xs font-bold ${generalForm.loadingBar.enabled ? "text-[#00FF87]" : "text-slate-400"}`}>
                    {generalForm.loadingBar.enabled ? "Enabled" : "Disabled"}
                  </span>
                  <div
                    onClick={() => setGeneralForm({
                      ...generalForm,
                      loadingBar: { ...generalForm.loadingBar, enabled: !generalForm.loadingBar.enabled },
                    })}
                    className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                      generalForm.loadingBar.enabled ? "bg-[#00FF87] justify-end" : "bg-slate-700 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-black shadow-md" />
                  </div>
                </label>
              </div>

              {/* Bar Color & Height Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                    Loading Bar Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={generalForm.loadingBar.color}
                      onChange={(e) => setGeneralForm({
                        ...generalForm,
                        loadingBar: { ...generalForm.loadingBar, color: e.target.value },
                      })}
                      className="w-11 h-11 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={generalForm.loadingBar.color}
                      onChange={(e) => setGeneralForm({
                        ...generalForm,
                        loadingBar: { ...generalForm.loadingBar, color: e.target.value },
                      })}
                      className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:border-[#00FF87] ${
                        isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                      Bar Height
                    </label>
                    <span className="text-xs font-mono font-bold text-emerald-500">
                      {generalForm.loadingBar.height}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={6}
                    step={1}
                    value={generalForm.loadingBar.height}
                    onChange={(e) => setGeneralForm({
                      ...generalForm,
                      loadingBar: { ...generalForm.loadingBar, height: parseInt(e.target.value, 10) },
                    })}
                    className="w-full h-2 rounded-lg bg-slate-700 accent-[#00FF87] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>2px (Subtle)</span>
                    <span>4px (Standard)</span>
                    <span>6px (Prominent)</span>
                  </div>
                </div>
              </div>

              {/* Simulation Sandbox Box */}
              <div className={`p-6 rounded-2xl border space-y-3 relative overflow-hidden ${
                isDark ? "bg-black/80 border-white/10" : "bg-slate-100 border-slate-200"
              }`}>
                {/* Simulated Bar */}
                {simulatingLoader && (
                  <div
                    className="absolute top-0 left-0 right-0 animate-pulse transition-all"
                    style={{
                      height: `${generalForm.loadingBar.height}px`,
                      backgroundColor: generalForm.loadingBar.color,
                      boxShadow: `0 0 12px ${generalForm.loadingBar.color}`,
                    }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Live Loading Simulator</h4>
                    <p className="text-[11px] text-slate-400">Click button below to test top progress animation</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateLoader}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Simulate Page Load</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB 4: SECURITY PASSCODE ═══ */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <form onSubmit={handleUpdatePasscode} className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                    Admin Master Passcode
                  </h3>
                  <p className="text-xs text-slate-400">
                    Required to unlock the admin dashboard via the secret 3-click trigger
                  </p>
                </div>
                <KeyRound className="w-5 h-5 text-[#00FF87]" />
              </div>

              {passcodeSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-[#00FF87] flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Passcode updated successfully! Remember to store it safely.</span>
                </div>
              )}

              <div className="max-w-md space-y-3">
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                  New Master Code / PIN
                </label>
                <input
                  type="text"
                  required
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Enter secret code (e.g. admin2026)"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-mono tracking-widest focus:outline-none focus:border-[#00FF87] ${
                    isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                />
                <p className="text-[11px] text-slate-400">
                  Tip: Use an easy-to-remember alphanumeric PIN or code.
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Update Passcode</span>
              </button>
            </form>
          </div>
        )}

        {/* ═══ TAB 5: SYSTEM BACKUP & RESTORE ═══ */}
        {activeTab === "backup" && (
          <div className="space-y-6">
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="border-b pb-4">
                <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                  System Backup &amp; Disaster Recovery
                </h3>
                <p className="text-xs text-slate-400">
                  Export complete site content to JSON file or restore from a backup
                </p>
              </div>

              {importStatus && (
                <div className="p-4 rounded-xl bg-blue-500/15 border border-blue-500/40 text-blue-400 text-xs font-semibold">
                  {importStatus}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Download Backup */}
                <div className={`p-6 rounded-2xl border space-y-3 flex flex-col justify-between ${
                  isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Export Full Backup</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Download all services, packages, team members, portfolio, campaigns &amp; settings as a single .json file.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Factory Reset */}
                <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-rose-400">Factory Reset</h4>
                    <p className="text-xs text-rose-300/80 mt-1">
                      Revert all site content, services, packages, and branding back to default factory state.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Content</span>
                  </button>
                </div>
              </div>

              {/* Restore JSON */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                  Restore Content from JSON Paste
                </label>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste your backup JSON content here..."
                  className={`w-full p-3.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-[#00FF87] ${
                    isDark ? "bg-black/60 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!importJsonText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore from JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB 6: VERCEL LIVE CLOUD SYNC & DATABASE ═══ */}
        {activeTab === "cloudSync" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Live Connection Status Card */}
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-[#00FF87]" />
                    <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                      Vercel Live Multi-Device Synchronization
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Keep your website content, services, packages &amp; orders 100% live on Vercel across all devices and visitors.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    cloudSyncInfo.isCloudConnected
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                      : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${cloudSyncInfo.isCloudConnected ? "bg-[#00FF87] animate-ping" : "bg-amber-400"}`} />
                    {cloudSyncInfo.isCloudConnected ? "CLOUD CONNECTED" : "LOCAL CACHE ONLY"}
                  </span>
                </div>
              </div>

              {/* Status Details */}
              <div className={`p-4 rounded-2xl border ${
                isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"
              } space-y-2`}>
                <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                  <span className="text-slate-400 font-mono">Active Storage Engine:</span>
                  <span className="font-mono font-bold text-[#00FF87] uppercase">{cloudSyncInfo.provider}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                  <span className="text-slate-400 font-mono">Engine Status:</span>
                  <span className="text-slate-300 font-mono">{cloudSyncInfo.statusMessage}</span>
                </div>
                {cloudSyncInfo.lastSyncedAt && (
                  <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                    <span className="text-slate-400 font-mono">Last Synchronized:</span>
                    <span className="text-slate-300 font-mono">{cloudSyncInfo.lastSyncedAt}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    setCloudTesting(true);
                    setCloudTestResult(null);
                    try {
                      const res = await fetch("/api/admin/content?status=true", { cache: "no-store" });
                      const json = await res.json();
                      if (json.success) {
                        setCloudTestResult(`API Healthy. Engine: ${json.provider.toUpperCase()} (${json.isCloudConnected ? "Cloud Active" : "Local/Memory"})`);
                      } else {
                        setCloudTestResult("API Error: " + (json.error || "Unknown"));
                      }
                    } catch (e: any) {
                      setCloudTestResult("Network connection failed: " + e.message);
                    } finally {
                      setCloudTesting(false);
                    }
                  }}
                  disabled={cloudTesting}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${cloudTesting ? "animate-spin text-[#00FF87]" : ""}`} />
                  <span>Test Serverless Route</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await refreshLiveContent();
                    alert("Latest content pulled successfully from backend!");
                  }}
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 hover:bg-cyan-500/25 text-cyan-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Fetch Fresh Cloud Data</span>
                </button>
              </div>

              {cloudTestResult && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  {cloudTestResult}
                </div>
              )}
            </div>

            {/* Vercel Cloud Integration Guide */}
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="border-b pb-4">
                <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                  Vercel-এ লাইভ আপডেট চালু করার গাইড (How to enable Live Updates on Vercel)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Vercel Serverless মেমোরি প্রতি কয়েক মিনিট পর পর রিসেট হয়। তাই এডমিন প্যানেলের এডিটগুলো সারা পৃথিবীর সব ভিজিটরের কাছে সাথে সাথে লাইভ করতে নিচের যেকোনো ১টি ফ্রি ক্লাউড স্টোরেজ ১ ক্লিকে যুক্ত করুন:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Method 1: Vercel KV / Upstash (Recommended) */}
                <div className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${
                  isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30">
                      পদ্ধতি ১ (সবচেয়ে সহজ - ১ ক্লিক)
                    </div>
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      Vercel KV (Upstash Redis)
                    </h4>
                    <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside leading-relaxed">
                      <li>আপনার <strong>Vercel Dashboard</strong> এ যান এবং প্রজেক্টটি ওপেন করুন।</li>
                      <li>উপরে <strong>Storage</strong> ট্যাবে ক্লিক করুন।</li>
                      <li><strong>Create Database</strong> থেকে <strong>KV</strong> সিলেক্ট করুন।</li>
                      <li><strong>Connect to Project</strong> দিন। Vercel নিজে থেকেই <code className="text-[#00FF87]">KV_REST_API_URL</code> এবং <code className="text-[#00FF87]">KV_REST_API_TOKEN</code> এনভায়রনমেন্ট ভেরিয়েবল সেট করে দিবে!</li>
                      <li>প্রজেক্টটি একবার <strong>Redeploy</strong> দিন। ব্যস, সাথে সাথে রিয়েল-টাইম ক্লাউড সিঙ্ক চালু হয়ে যাবে!</li>
                    </ol>
                  </div>

                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,135,0.25)]"
                  >
                    <span>Vercel Dashboard ওপেন করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Method 2: Supabase */}
                <div className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${
                  isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      পদ্ধতি ২ (Supabase Database)
                    </div>
                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      Supabase PostgreSQL
                    </h4>
                    <p className="text-xs text-slate-400">
                      Supabase SQL Editor এ নিচের ছোট্ট টেবিলটি তৈরি করুন:
                    </p>
                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto select-all">
                      {`CREATE TABLE IF NOT EXISTS qllix_cms (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
                    </div>
                    <p className="text-xs text-slate-400">
                      এরপর Vercel Project Settings &gt; Environment Variables এ <code className="text-indigo-300">SUPABASE_URL</code> ও <code className="text-indigo-300">SUPABASE_ANON_KEY</code> বসিয়ে Redeploy দিন!
                    </p>
                  </div>

                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Supabase Dashboard ওপেন করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
