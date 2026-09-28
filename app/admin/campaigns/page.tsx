"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { useCms } from "@/context/CmsContext";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { CampaignOffer } from "@/lib/cmsStore";
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Tag,
  ExternalLink,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  Copy,
  Check,
  Dices,
  Clock,
  ArrowRight,
  Smartphone,
  Monitor,
  LayoutTemplate,
  Gift,
  Flame,
  Percent,
  CheckCheck,
  HelpCircle,
  ImageIcon,
  Upload,
} from "lucide-react";

// ── Smart Preset Templates ──
const CAMPAIGN_PRESETS = [
  {
    name: "⚡ Flash Sale 30%",
    title: "⚡ Flash Sale: 30% Off All Creative Design & Web Builds",
    subtitle: "High-impact creative sprint for brands looking to scale fast. Limited spots!",
    badge: "FLASH SALE",
    code: "FLASH30",
    discountPercent: 30,
    ctaText: "Claim 30% Off Now",
    ctaLink: "/pricing",
    imageUrl: "/images/campaign-banner.jpg",
    displayType: "both" as const,
  },
  {
    name: "🎁 Seasonal 25%",
    title: "Seasonal Creative Sprint: Enjoy 25% Off Web & Branding",
    subtitle: "Upgrade your brand identity and digital presence with bespoke design packages.",
    badge: "LIMITED TIME",
    code: "QLLIX25",
    discountPercent: 25,
    ctaText: "Get 25% Discount",
    ctaLink: "/pricing",
    imageUrl: "/images/campaign-banner.jpg",
    displayType: "both" as const,
  },
  {
    name: "🚀 Early Bird 15%",
    title: "🚀 Early Bird Offer: Flat 15% Off Your Next Brand Overhaul",
    subtitle: "Book your quarterly creative sprint in advance and lock in discounted rates.",
    badge: "EARLY BIRD",
    code: "EARLY15",
    discountPercent: 15,
    ctaText: "Start With 15% Off",
    ctaLink: "/pricing",
    imageUrl: "/images/campaign-banner-square.jpg",
    displayType: "both" as const,
  },
  {
    name: "🔥 Free Audit + 10%",
    title: "Free 30-Min Creative Audit + 10% Off Your First Project",
    subtitle: "Let our design experts review your visual strategy with zero obligations.",
    badge: "FREE AUDIT",
    code: "AUDIT10",
    discountPercent: 10,
    ctaText: "Book Free Audit",
    ctaLink: "/contact",
    imageUrl: "/images/campaign-banner.jpg",
    displayType: "popup_modal" as const,
  },
];

const BADGE_PRESETS = ["SPECIAL OFFER", "LIMITED TIME", "FLASH SALE", "25% OFF", "EXCLUSIVE", "MEGA DEAL"];
const DISCOUNT_PRESETS = [10, 15, 20, 25, 30, 50];
const CTA_PRESETS = ["Claim 25% Off Now", "Get 25% Discount", "Claim Offer", "Book Free Audit", "Start Project"];
const LINK_PRESETS = [
  { label: "Pricing Page", url: "/pricing" },
  { label: "Contact / Booking", url: "/contact" },
  { label: "All Services", url: "/services" },
  { label: "Order Form", url: "#order" },
];

function CampaignsPageSimplified() {
  const { cmsData, addCampaign, updateCampaign, deleteCampaign, toggleCampaignActive } = useCms();
  const { isDark } = useAdminTheme();
  const [editingCampaign, setEditingCampaign] = useState<CampaignOffer | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const campaigns = cmsData.campaigns || [];

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  };

  const closeEditor = () => setEditingCampaign(null);

  const openNew = () => {
    setIsNew(true);
    setEditingCampaign({
      id: `camp-${Date.now()}`,
      title: "New offer",
      subtitle: "",
      badge: "SPECIAL OFFER",
      description: "",
      ctaText: "Learn more",
      ctaLink: "/pricing",
      imageUrl: "",
      displayType: "both",
      active: true,
    });
  };

  const openEdit = (campaign: CampaignOffer) => {
    setIsNew(false);
    // Existing data, including legacy campaign settings, stays intact when this campaign is saved.
    setEditingCampaign({ ...campaign });
  };

  const saveCampaign = () => {
    if (!editingCampaign || !editingCampaign.title.trim()) {
      alert("Please add an offer title.");
      return;
    }

    if (isNew) {
      addCampaign(editingCampaign);
      showToast("Campaign created.");
    } else {
      updateCampaign(editingCampaign.id, editingCampaign);
      showToast("Campaign updated.");
    }
    closeEditor();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingCampaign) return;
    if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
      alert("Please choose an image under 8 MB.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setEditingCampaign((current) => current ? { ...current, imageUrl: reader.result as string } : current);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert("The image could not be uploaded. Please try another file.");
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeEditor();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const fieldClass = `w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#00FF87] ${
    isDark ? "border-white/10 bg-black/50 text-white" : "border-slate-300 bg-white text-slate-900"
  }`;

  return (
    <div>
      <AdminHeader
        title="Campaigns"
        subtitle="Create and manage website offers."
        actionButton={
          <button
            type="button"
            onClick={openNew}
            className="flex items-center gap-2 rounded-xl bg-[#00FF87] px-5 py-2.5 text-xs font-black text-[#02180C] shadow-[0_0_20px_rgba(0,255,135,0.3)] transition hover:bg-[#00DF81] active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            Create campaign
          </button>
        }
      />

      <div className="max-w-6xl space-y-6 p-6 lg:p-10">
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-3 text-xs font-semibold text-emerald-600 dark:text-[#00FF87]">
            <CheckCircle2 className="h-4 w-4" />
            {toastMessage}
          </div>
        )}

        {campaigns.length === 0 ? (
          <div className={`rounded-3xl border p-12 text-center ${isDark ? "border-white/10 bg-[#020F07]" : "border-slate-200 bg-white"}`}>
            <Megaphone className="mx-auto mb-3 h-10 w-10 text-slate-500" />
            <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>No campaigns yet</h2>
            <button type="button" onClick={openNew} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00FF87] px-4 py-2.5 text-xs font-black text-[#02180C]">
              <Plus className="h-4 w-4" />
              Create campaign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {campaigns.map((campaign) => (
              <article
                key={campaign.id}
                className={`overflow-hidden rounded-3xl border transition ${
                  campaign.active
                    ? isDark
                      ? "border-emerald-500/35 bg-[#020F07]"
                      : "border-emerald-300 bg-white"
                    : isDark
                    ? "border-white/10 bg-[#080D12] opacity-70"
                    : "border-slate-200 bg-slate-50 opacity-80"
                }`}
              >
                {campaign.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={campaign.imageUrl} alt="" className="h-32 w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className={`text-xs font-bold ${campaign.active ? "text-emerald-600 dark:text-[#00FF87]" : "text-slate-500"}`}>
                      {campaign.active ? "Active" : "Inactive"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleCampaignActive(campaign.id)}
                      className={`h-6 w-11 rounded-full p-1 transition ${campaign.active ? "bg-[#00FF87]" : "bg-slate-300 dark:bg-slate-700"}`}
                      aria-label={campaign.active ? "Deactivate campaign" : "Activate campaign"}
                    >
                      <span className={`block h-4 w-4 rounded-full bg-slate-950 transition-transform ${campaign.active ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                  <h2 className={`text-lg font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{campaign.title}</h2>
                  {campaign.subtitle && <p className="mt-1.5 line-clamp-2 text-sm text-slate-400">{campaign.subtitle}</p>}
                  <p className="mt-4 truncate text-xs font-semibold text-emerald-600 dark:text-[#00FF87]">{campaign.ctaText} · {campaign.ctaLink}</p>
                  <div className={`mt-5 flex justify-end gap-2 border-t pt-4 ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <button type="button" onClick={() => openEdit(campaign)} className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 px-3 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500/10 dark:text-[#00FF87]">
                      <Edit2 className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete \"${campaign.title}\"?`)) {
                          deleteCampaign(campaign.id);
                          showToast("Campaign deleted.");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/25 px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className={`my-auto w-full max-w-4xl overflow-hidden rounded-[28px] border shadow-2xl ${isDark ? "border-emerald-500/30 bg-[#031008] text-white" : "border-slate-200 bg-white text-slate-900"}`}>
            <div className={`flex items-center justify-between border-b px-5 py-4 sm:px-6 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <h2 className="text-lg font-bold">{isNew ? "New campaign" : "Edit campaign"}</h2>
              <button type="button" onClick={closeEditor} className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Close editor">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.05fr_.95fr]">
              <div className={`space-y-4 p-5 sm:p-6 ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold">Offer title</span>
                  <input value={editingCampaign.title} onChange={(event) => setEditingCampaign({ ...editingCampaign, title: event.target.value })} className={fieldClass} placeholder="e.g. Brand launch offer" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold">Short message</span>
                  <textarea value={editingCampaign.subtitle || ""} onChange={(event) => setEditingCampaign({ ...editingCampaign, subtitle: event.target.value })} className={`${fieldClass} min-h-24 resize-y`} placeholder="A short supporting message" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold">Button label</span>
                  <input value={editingCampaign.ctaText} onChange={(event) => setEditingCampaign({ ...editingCampaign, ctaText: event.target.value })} className={fieldClass} placeholder="Learn more" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold">Destination link</span>
                  <input value={editingCampaign.ctaLink} onChange={(event) => setEditingCampaign({ ...editingCampaign, ctaLink: event.target.value })} className={fieldClass} placeholder="/pricing or https://..." />
                </label>
                <div>
                  <span className="mb-1.5 block text-xs font-bold">Promo image</span>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input value={editingCampaign.imageUrl || ""} onChange={(event) => setEditingCampaign({ ...editingCampaign, imageUrl: event.target.value })} className={fieldClass} placeholder="Paste an image URL" />
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-500/35 px-4 py-2.5 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500/10 disabled:opacity-60 dark:text-[#00FF87]">
                      <Upload className="h-4 w-4" /> {isUploading ? "Uploading" : "Upload"}
                    </button>
                  </div>
                </div>
                <label className={`flex items-center justify-between rounded-2xl border p-4 ${editingCampaign.active ? "border-emerald-500/35 bg-emerald-500/10" : isDark ? "border-white/10 bg-black/30" : "border-slate-200 bg-slate-50"}`}>
                  <span className="text-sm font-bold">Campaign active</span>
                  <input type="checkbox" checked={editingCampaign.active} onChange={(event) => setEditingCampaign({ ...editingCampaign, active: event.target.checked })} className="h-4 w-4 accent-emerald-500" />
                </label>
              </div>

              <div className={`border-t p-5 sm:p-6 lg:border-l lg:border-t-0 ${isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-slate-50"}`}>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-[#00FF87]">
                  <ImageIcon className="h-4 w-4" /> Campaign preview
                </div>
                <div className="overflow-hidden rounded-3xl border border-emerald-500/25 bg-[#031008] shadow-xl">
                  <div className="relative aspect-[16/10] bg-[#06140c]">
                    {editingCampaign.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={editingCampaign.imageUrl} alt="Campaign preview" className="h-full w-full object-cover opacity-75" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020704] via-[#020704]/45 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-xl font-bold leading-tight">{editingCampaign.title || "Your offer title"}</h3>
                      {editingCampaign.subtitle && <p className="mt-2 text-sm text-white/70">{editingCampaign.subtitle}</p>}
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00FF87] px-4 py-2 text-xs font-black text-[#02180C]">
                        {editingCampaign.ctaText || "Learn more"}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex justify-end gap-3 border-t px-5 py-4 sm:px-6 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <button type="button" onClick={closeEditor} className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-400 transition hover:bg-white/10">Cancel</button>
              <button type="button" onClick={saveCampaign} className="inline-flex items-center gap-2 rounded-xl bg-[#00FF87] px-5 py-2.5 text-xs font-black text-[#02180C] shadow-[0_0_20px_rgba(0,255,135,0.3)] transition hover:bg-[#00DF81]">
                <Save className="h-4 w-4" /> Save campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminCampaignsPage() {
  return <CampaignsPageSimplified />;
}

function LegacyAdminCampaignsPage() {
  const { cmsData, addCampaign, updateCampaign, deleteCampaign, toggleCampaignActive } = useCms();
  const { isDark } = useAdminTheme();

  const campaigns = cmsData.campaigns || [];

  const [editingCampaign, setEditingCampaign] = useState<CampaignOffer | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<"both" | "bar" | "modal">("both");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenNew = () => {
    setIsNew(true);
    setMobileTab("editor");
    setEditingCampaign({
      id: `camp-${Date.now()}`,
      title: "Seasonal Creative Sprint: Enjoy 25% Off",
      subtitle: "Limited Time Offer on all agency creative packages",
      badge: "Special Promo",
      description: "",
      code: "QLLIX25",
      discountPercent: 25,
      ctaText: "Claim 25% Off Now",
      ctaLink: "/pricing",
      imageUrl: "/images/campaign-banner.jpg",
      displayType: "both",
      active: true,
      countdownDate: "",
    });
  };

  const handleOpenEdit = (campaign: CampaignOffer) => {
    setIsNew(false);
    setMobileTab("editor");
    setEditingCampaign({ ...campaign });
  };

  const handleApplyPreset = (preset: typeof CAMPAIGN_PRESETS[0]) => {
    if (!editingCampaign) return;
    setEditingCampaign({
      ...editingCampaign,
      title: preset.title,
      subtitle: preset.subtitle,
      badge: preset.badge,
      code: preset.code,
      discountPercent: preset.discountPercent,
      ctaText: preset.ctaText,
      ctaLink: preset.ctaLink,
      imageUrl: preset.imageUrl,
      displayType: preset.displayType,
    });
    showToast(`Applied preset: ${preset.name}`);
  };

  const handleGenerateRandomCode = () => {
    if (!editingCampaign) return;
    const prefixes = ["SAVE", "BOOST", "QLLIX", "DEAL", "PROMO", "CREATIVE"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const pct = editingCampaign.discountPercent || 25;
    const newCode = `${randomPrefix}${pct}`;
    setEditingCampaign({ ...editingCampaign, code: newCode });
    showToast(`Generated code: ${newCode}`);
  };

  const handleCopyCode = () => {
    if (!editingCampaign?.code) return;
    navigator.clipboard.writeText(editingCampaign.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveModal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingCampaign || !editingCampaign.title.trim()) {
      alert("Please enter a campaign headline.");
      return;
    }

    if (isNew) {
      addCampaign(editingCampaign);
      showToast("Campaign created and published successfully!");
    } else {
      updateCampaign(editingCampaign.id, editingCampaign);
      showToast("Campaign updated successfully!");
    }
    setEditingCampaign(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete campaign "${title}"?`)) {
      deleteCampaign(id);
      showToast("Campaign deleted.");
    }
  };

  // Keyboard shortcuts: ESC to close, Ctrl+Enter to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!editingCampaign) return;
      if (e.key === "Escape") {
        setEditingCampaign(null);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSaveModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingCampaign]);

  return (
    <div>
      <AdminHeader
        title="Campaigns & Offer Ads"
        subtitle="Manage promotional announcement bars, coupon discount codes, and popup offer modals"
        actionButton={
          <button
            onClick={handleOpenNew}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Campaign</span>
          </button>
        }
      />

      <div className="p-6 lg:p-10 space-y-8 max-w-7xl">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-[#00FF87] flex items-center gap-2 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Campaign Placement Guide Info */}
        <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${
          isDark
            ? "bg-gradient-to-r from-emerald-950/30 via-[#020F07] to-cyan-950/30 border-emerald-500/20"
            : "bg-gradient-to-r from-emerald-50 via-white to-cyan-50 border-emerald-200 shadow-sm"
        }`}>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Multi-Channel Promotional Engine</span>
            </div>
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
              Run Special Offers Across the Entire Website
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Active campaigns automatically render as a <strong>Top Announcement Marquee Bar</strong> or an eye-catching <strong>Promo Popup Modal</strong> with custom coupon codes and instant checkout links.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-3 py-2 rounded-xl text-xs font-mono border ${
              isDark ? "bg-black/50 border-white/10 text-slate-300" : "bg-white border-slate-200 text-slate-700"
            }`}>
              Active: <strong className="text-emerald-500">{campaigns.filter((c) => c.active).length}</strong>
            </div>
            <div className={`px-3 py-2 rounded-xl text-xs font-mono border ${
              isDark ? "bg-black/50 border-white/10 text-slate-300" : "bg-white border-slate-200 text-slate-700"
            }`}>
              Total: <strong className="text-slate-400">{campaigns.length}</strong>
            </div>
          </div>
        </div>

        {/* ═══ CAMPAIGNS LIST ═══ */}
        {campaigns.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${
            isDark ? "bg-[#020F07] border-white/10" : "bg-white border-slate-200"
          }`}>
            <Megaphone className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>No Campaigns Created Yet</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Create your first promotional campaign to show special discounts and announcement banners on the website.
            </p>
            <button
              onClick={handleOpenNew}
              type="button"
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#00FF87] text-[#02180C] font-black text-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className={`rounded-3xl border p-6 flex flex-col justify-between transition-all group ${
                  camp.active
                    ? isDark
                      ? "bg-[#020F07] border-emerald-500/40 shadow-[0_0_30px_rgba(0,255,135,0.06)]"
                      : "bg-white border-emerald-400 shadow-md"
                    : isDark
                    ? "bg-[#080D12] border-white/5 opacity-75"
                    : "bg-slate-50 border-slate-200 opacity-80"
                }`}
              >
                <div>
                  {/* Card Header: Badges & Toggle */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00FF87]/20 text-emerald-700 dark:text-[#00FF87] border border-[#00FF87]/30 uppercase">
                        {camp.badge || "Special Promo"}
                      </span>

                      {camp.discountPercent ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-[#00FF87] border border-emerald-500/30">
                          {camp.discountPercent}% AUTO-DISCOUNT
                        </span>
                      ) : null}

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                        camp.displayType === "both"
                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30"
                          : camp.displayType === "announcement_bar"
                          ? "bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30"
                      }`}>
                        {camp.displayType === "both"
                          ? "Top Bar + Popup Modal"
                          : camp.displayType === "announcement_bar"
                          ? "Top Announcement Bar"
                          : "Popup Offer Modal"}
                      </span>
                    </div>

                    {/* Active Toggle Switch */}
                    <button
                      onClick={() => toggleCampaignActive(camp.id)}
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-bold font-mono cursor-pointer transition-colors"
                      title={camp.active ? "Pause Campaign" : "Activate Campaign"}
                    >
                      {camp.active ? (
                        <span className="text-emerald-500 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-ping" />
                          LIVE
                        </span>
                      ) : (
                        <span className="text-slate-500">PAUSED</span>
                      )}
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h4 className={`text-base font-bold leading-snug font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                    {camp.title}
                  </h4>
                  {camp.subtitle && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {camp.subtitle}
                    </p>
                  )}

                  {/* Code & CTA Info Pill */}
                  <div className={`mt-4 p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                    isDark ? "bg-black/50 border-white/10" : "bg-slate-100 border-slate-200"
                  }`}>
                    {camp.code ? (
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {camp.code}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">No Code Required</span>
                    )}

                    <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <span>CTA:</span>
                      <strong className={isDark ? "text-white" : "text-slate-800"}>{camp.ctaText}</strong>
                      <span className="text-slate-500">({camp.ctaLink})</span>
                    </div>
                  </div>

                  {/* Optional Image Preview */}
                  {camp.imageUrl && (
                    <div className="mt-3 h-28 rounded-xl overflow-hidden bg-black/40 border border-white/10 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={camp.imageUrl}
                        alt={camp.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Actions Bar */}
                <div className={`mt-5 pt-4 border-t flex items-center justify-between ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {camp.id}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(camp)}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isDark
                          ? "bg-white/5 border-white/10 hover:border-[#00FF87] text-slate-300 hover:text-[#00FF87]"
                          : "bg-white border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 shadow-xs"
                      }`}
                      title="Edit Campaign"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(camp.id, camp.title)}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isDark
                          ? "bg-white/5 border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400"
                          : "bg-white border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-600 shadow-xs"
                      }`}
                      title="Delete Campaign"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            ═══ ULTRA-SMART CREATE / EDIT CAMPAIGN MODAL WITH LIVE PREVIEW ═══
            ═════════════════════════════════════════════════════════════════ */}
        {editingCampaign && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <div className={`border rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl my-auto transition-all flex flex-col max-h-[94vh] ${
              isDark
                ? "bg-[#030e07] border-emerald-500/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                : "bg-white border-slate-200 text-slate-900 shadow-[0_25px_80px_rgba(0,0,0,0.2)]"
            }`}>
              
              {/* ── Modal Header Bar ── */}
              <div className={`px-6 py-4 border-b flex items-center justify-between gap-4 shrink-0 ${
                isDark ? "border-white/10 bg-black/40" : "border-slate-200 bg-slate-50/70"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87] shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-[#00FF87]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className={`text-base font-bold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>
                        {isNew ? "Create New Campaign & Offer" : "Edit Campaign & Offer"}
                      </h3>
                      {editingCampaign.active ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-[#00FF87] border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          LIVE ON WEBSITE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          PAUSED / DRAFT
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Configure top marquee strip, promo coupon codes, and 1:1 square offer popup
                    </p>
                  </div>
                </div>

                {/* Mobile Tab Switcher + Close */}
                <div className="flex items-center gap-2">
                  <div className="lg:hidden flex items-center gap-1 p-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/50 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setMobileTab("editor")}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        mobileTab === "editor" ? "bg-[#00FF87] text-[#02180C] font-bold" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab("preview")}
                      className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                        mobileTab === "preview" ? "bg-[#00FF87] text-[#02180C] font-bold" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setEditingCampaign(null)}
                    type="button"
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isDark
                        ? "border-white/10 hover:border-white/30 text-slate-400 hover:text-white hover:bg-white/5"
                        : "border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Main Modal Content: Split Screen on Desktop ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden flex-1">
                
                {/* ══ LEFT: FORM EDITOR (7 COLS) ══ */}
                <div className={`p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(94vh-140px)] ${
                  mobileTab === "preview" ? "hidden lg:block lg:col-span-7" : "lg:col-span-7"
                }`}>
                  
                  {/* Smart 1-Click Preset Starters */}
                  <div className={`p-3.5 rounded-2xl border transition-colors ${
                    isDark ? "bg-black/40 border-white/10" : "bg-emerald-50/50 border-emerald-200"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00FF87] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>1-Click Smart Campaign Presets</span>
                      </span>
                      <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Click to auto-fill best performing copy
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CAMPAIGN_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => handleApplyPreset(preset)}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer hover:scale-[1.02] text-xs font-semibold ${
                            editingCampaign.code === preset.code
                              ? "border-[#00FF87] bg-emerald-500/15 text-emerald-700 dark:text-[#00FF87] font-bold shadow-xs"
                              : isDark
                              ? "border-white/10 hover:border-white/20 bg-black/50 text-slate-300"
                              : "border-slate-200 hover:border-slate-300 bg-white text-slate-700 shadow-xs"
                          }`}
                        >
                          <div className="font-bold text-[11px] truncate">{preset.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">{preset.code} ({preset.discountPercent}%)</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Group 1: Headline & Copy ── */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={`block text-xs font-mono uppercase font-bold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}>
                          Campaign Headline <span className="text-emerald-500">*</span>
                        </label>
                        <span className={`text-[11px] font-mono ${
                          editingCampaign.title.length > 70
                            ? "text-amber-500 font-bold"
                            : isDark ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {editingCampaign.title.length}/70 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={editingCampaign.title}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                        placeholder="Ex. Seasonal Creative Sprint: Enjoy 25% Off"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                          isDark
                            ? "bg-black/60 border-white/10 text-white placeholder-slate-500"
                            : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                        }`}
                      />
                      <p className={`text-[10.5px] mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Displayed prominently in the top announcement bar marquee.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={`block text-xs font-mono uppercase font-bold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}>
                          Sub-Description (Optional)
                        </label>
                        <span className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {(editingCampaign.subtitle || "").length}/120 chars
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={editingCampaign.subtitle || ""}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, subtitle: e.target.value })}
                        placeholder="Short description highlighting the value or offer details"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                          isDark
                            ? "bg-black/60 border-white/10 text-white placeholder-slate-500"
                            : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                        }`}
                      />
                    </div>

                    {/* Offer Badge + Quick Suggestions */}
                    <div>
                      <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}>
                        Offer Badge Text
                      </label>
                      <input
                        type="text"
                        value={editingCampaign.badge}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, badge: e.target.value })}
                        placeholder="Ex. Special Promo, Limited Time, 25% Off"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                          isDark
                            ? "bg-black/60 border-white/10 text-white"
                            : "bg-white border-slate-300 text-slate-900"
                        }`}
                      />
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className={`text-[10px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Suggestions:
                        </span>
                        {BADGE_PRESETS.map((bp) => (
                          <button
                            key={bp}
                            type="button"
                            onClick={() => setEditingCampaign({ ...editingCampaign, badge: bp })}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                              editingCampaign.badge.toUpperCase() === bp
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-[#00FF87] border-[#00FF87]"
                                : isDark
                                ? "border-white/10 text-slate-400 hover:text-white"
                                : "border-slate-200 text-slate-600 hover:text-slate-900 bg-slate-100"
                            }`}
                          >
                            {bp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Group 2: Discount & Coupon Code Engine ── */}
                  <div className={`p-4 rounded-2xl border space-y-4 ${
                    isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00FF87] flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Discount &amp; Coupon Engine</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Coupon Code with Generator */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`block text-xs font-mono uppercase font-bold ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}>
                            Coupon / Promo Code
                          </label>
                          <button
                            type="button"
                            onClick={handleGenerateRandomCode}
                            className="text-[10.5px] text-emerald-600 dark:text-[#00FF87] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                            title="Generate random code"
                          >
                            <Dices className="w-3 h-3" />
                            <span>Auto-Generate</span>
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={editingCampaign.code || ""}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, code: e.target.value.toUpperCase() })}
                            placeholder="Ex. QLLIX25"
                            className={`w-full pl-3.5 pr-14 py-2.5 rounded-xl border text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                              isDark
                                ? "bg-black/60 border-white/10 text-white"
                                : "bg-white border-slate-300 text-slate-900"
                            }`}
                          />
                          {editingCampaign.code && (
                            <button
                              type="button"
                              onClick={handleCopyCode}
                              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                copiedCode
                                  ? "bg-emerald-500 text-black font-bold"
                                  : isDark
                                  ? "text-slate-400 hover:text-white hover:bg-white/10"
                                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                              }`}
                              title="Copy code"
                            >
                              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                        <p className={`text-[10.5px] mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Visitors can click this code to copy and apply at checkout.
                        </p>
                      </div>

                      {/* Auto-Discount (%) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`block text-xs font-mono uppercase font-bold ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}>
                            Auto-Discount Percentage
                          </label>
                          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-[#00FF87]">
                            {editingCampaign.discountPercent || 0}% OFF
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="90"
                            value={editingCampaign.discountPercent ?? 25}
                            onChange={(e) => setEditingCampaign({
                              ...editingCampaign,
                              discountPercent: Math.max(0, Math.min(90, Number(e.target.value) || 0))
                            })}
                            placeholder="25"
                            className={`w-full pl-3.5 pr-16 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                              isDark
                                ? "bg-black/60 border-white/10 text-white"
                                : "bg-white border-slate-300 text-slate-900"
                            }`}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-[#00FF87] pointer-events-none">
                            % OFF
                          </span>
                        </div>

                        {/* Quick % chips */}
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {DISCOUNT_PRESETS.map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => setEditingCampaign({ ...editingCampaign, discountPercent: pct })}
                              className={`text-[10.5px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                editingCampaign.discountPercent === pct
                                  ? "bg-[#00FF87] text-[#02180C] font-bold border-[#00FF87]"
                                  : isDark
                                  ? "border-white/10 text-slate-400 hover:text-white"
                                  : "border-slate-200 text-slate-600 hover:text-slate-900 bg-white"
                              }`}
                            >
                              {pct}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Group 3: Website Display Placement ── */}
                  <div>
                    <label className={`block text-xs font-mono uppercase font-bold mb-2 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}>
                      Website Display Placement
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          type: "both",
                          label: "Both Formats",
                          desc: "Top Bar + Popup Modal",
                          badge: "⭐ Recommended",
                          icon: LayoutTemplate,
                        },
                        {
                          type: "announcement_bar",
                          label: "Top Bar Only",
                          desc: "Continuous top marquee strip",
                          badge: "Subtle Header",
                          icon: Monitor,
                        },
                        {
                          type: "popup_modal",
                          label: "Popup Modal Only",
                          desc: "1:1 Square lightbox offer card",
                          badge: "High Conversion",
                          icon: Smartphone,
                        },
                      ].map((item) => {
                        const IconComponent = item.icon;
                        const isSelected = editingCampaign.displayType === item.type;
                        return (
                          <button
                            key={item.type}
                            type="button"
                            onClick={() => setEditingCampaign({
                              ...editingCampaign,
                              displayType: item.type as CampaignOffer["displayType"],
                            })}
                            className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? isDark
                                  ? "border-[#00FF87] bg-emerald-500/15 shadow-[0_0_20px_rgba(0,255,135,0.15)] ring-1 ring-[#00FF87]"
                                  : "border-emerald-500 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-500"
                                : isDark
                                ? "border-white/10 bg-black/40 hover:border-white/20 text-slate-400"
                                : "border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-600"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-2">
                              <IconComponent className={`w-4 h-4 ${
                                isSelected ? "text-emerald-600 dark:text-[#00FF87]" : "text-slate-400"
                              }`} />
                              <span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                                isSelected
                                  ? "bg-[#00FF87] text-[#02180C]"
                                  : isDark
                                  ? "bg-white/10 text-slate-400"
                                  : "bg-slate-200 text-slate-600"
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <div>
                              <div className={`text-xs font-bold ${
                                isSelected ? (isDark ? "text-white" : "text-slate-900") : ""
                              }`}>
                                {item.label}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{item.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Group 4: Button CTA & Destination URL ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}>
                        CTA Button Label <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCampaign.ctaText}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, ctaText: e.target.value })}
                        placeholder="Ex. Claim 25% Off Now"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                          isDark
                            ? "bg-black/60 border-white/10 text-white"
                            : "bg-white border-slate-300 text-slate-900"
                        }`}
                      />
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {CTA_PRESETS.slice(0, 3).map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setEditingCampaign({ ...editingCampaign, ctaText: preset })}
                            className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                              editingCampaign.ctaText === preset
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-[#00FF87] border-[#00FF87]"
                                : isDark
                                ? "border-white/10 text-slate-400 hover:text-white"
                                : "border-slate-200 text-slate-600 bg-white hover:text-slate-900"
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}>
                        Destination Link / Target URL <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCampaign.ctaLink}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, ctaLink: e.target.value })}
                        placeholder="Ex. /pricing, /contact, #order"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-[#00FF87] transition-all shadow-xs ${
                          isDark
                            ? "bg-black/60 border-white/10 text-white"
                            : "bg-white border-slate-300 text-slate-900"
                        }`}
                      />
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {LINK_PRESETS.map((lp) => (
                          <button
                            key={lp.url}
                            type="button"
                            onClick={() => setEditingCampaign({ ...editingCampaign, ctaLink: lp.url })}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                              editingCampaign.ctaLink === lp.url
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-[#00FF87] border-[#00FF87]"
                                : isDark
                                ? "border-white/10 text-slate-400 hover:text-white"
                                : "border-slate-200 text-slate-600 bg-white hover:text-slate-900"
                            }`}
                          >
                            {lp.url}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Group 5: 1:1 Square Promo Graphic Uploader ── */}
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <MediaUploader
                      label="Promo Graphic / Banner Image (1:1 Square Upload)"
                      value={editingCampaign.imageUrl || ""}
                      onChange={(val) => setEditingCampaign({ ...editingCampaign, imageUrl: val })}
                      acceptVideo={false}
                      recommendedDimensions="1:1 Square (1080 × 1080 px or 800 × 800 px)"
                      helpText="Featured in the offer popup modal. Tested and optimized for 1:1 square display."
                    />
                  </div>

                  {/* ── Group 6: Active Status Switch ── */}
                  <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    editingCampaign.active
                      ? isDark
                        ? "border-[#00FF87]/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(0,255,135,0.08)]"
                        : "border-emerald-300 bg-emerald-50/70"
                      : isDark
                      ? "border-white/10 bg-black/40"
                      : "border-slate-200 bg-slate-50"
                  }`}>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold block ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}>
                          Campaign Active Status
                        </span>
                        {editingCampaign.active ? (
                          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-[#00FF87] bg-[#00FF87]/20 px-2 py-0.5 rounded-full">
                            ● Active
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-full">
                            ○ Paused
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] block ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        When active, announcement bar and popup modal will immediately appear to website visitors.
                      </span>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editingCampaign.active}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, active: e.target.checked })}
                        className="hidden"
                      />
                      <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center ${
                        editingCampaign.active ? "bg-[#00FF87] justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                      }`}>
                        <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md transition-transform" />
                      </div>
                    </label>
                  </div>
                </div>

                {/* ══ RIGHT: REAL-TIME LIVE PREVIEW (5 COLS) ══ */}
                <div className={`p-5 sm:p-6 border-t lg:border-t-0 lg:border-l flex flex-col justify-between overflow-y-auto max-h-[calc(94vh-140px)] ${
                  mobileTab === "editor" ? "hidden lg:flex lg:col-span-5" : "flex lg:col-span-5"
                } ${
                  isDark ? "bg-[#020904] border-white/10" : "bg-slate-100/70 border-slate-200"
                }`}>
                  <div className="space-y-4">
                    {/* Live Preview Header */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00FF87]">
                          Live Website Preview
                        </span>
                      </div>

                      {/* Preview format switcher */}
                      <div className="flex items-center gap-1 text-[11px] font-mono p-0.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/50">
                        <button
                          type="button"
                          onClick={() => setActivePreviewTab("both")}
                          className={`px-2 py-0.5 rounded-lg transition-all ${
                            activePreviewTab === "both" ? "bg-[#00FF87] text-[#02180C] font-bold" : "text-slate-500"
                          }`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePreviewTab("bar")}
                          className={`px-2 py-0.5 rounded-lg transition-all ${
                            activePreviewTab === "bar" ? "bg-[#00FF87] text-[#02180C] font-bold" : "text-slate-500"
                          }`}
                        >
                          Top Bar
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePreviewTab("modal")}
                          className={`px-2 py-0.5 rounded-lg transition-all ${
                            activePreviewTab === "modal" ? "bg-[#00FF87] text-[#02180C] font-bold" : "text-slate-500"
                          }`}
                        >
                          Popup
                        </button>
                      </div>
                    </div>

                    <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      This simulates exactly how visitors will see and interact with this campaign on desktop and mobile.
                    </p>

                    {/* ── 1. Top Announcement Bar Mockup ── */}
                    {(activePreviewTab === "both" || activePreviewTab === "bar") && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>TOP ANNOUNCEMENT BAR</span>
                          <span className="text-emerald-500 font-bold">Sticky Header Marquee</span>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-emerald-500/30 shadow-md">
                          <div className="bg-[#02180C] text-white p-3 relative overflow-hidden text-xs">
                            <div className="absolute top-0 left-1/4 w-48 h-full bg-[#00FF87]/15 blur-lg pointer-events-none" />
                            <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2 flex-wrap min-w-0">
                                <span className="px-2 py-0.5 rounded-full bg-[#00FF87] text-[#02180C] font-black text-[9px] font-mono tracking-wider uppercase flex items-center gap-1 shrink-0">
                                  <Sparkles className="w-2.5 h-2.5 fill-[#02180C]" />
                                  <span>{editingCampaign.badge || "Special Offer"}</span>
                                </span>

                                <span className="font-semibold text-slate-100 text-[11px] line-clamp-1">
                                  {editingCampaign.title || "Your Campaign Headline Here"}
                                </span>

                                {editingCampaign.code && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-[#00FF87]/40 text-[#00FF87] font-mono font-bold text-[10px] shrink-0">
                                    <Tag className="w-2.5 h-2.5" />
                                    <span>{editingCampaign.code}</span>
                                  </span>
                                )}

                                <span className="inline-flex items-center gap-1 font-bold text-[#00FF87] text-[11px] hover:underline shrink-0">
                                  <span>{editingCampaign.ctaText || "Claim Now"}</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </span>
                              </div>

                              <button type="button" className="text-slate-400 hover:text-white p-0.5">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── 2. Popup Modal Mockup ── */}
                    {(activePreviewTab === "both" || activePreviewTab === "modal") && (
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>POPUP OFFER CARD</span>
                          <span className="text-emerald-500 font-bold">1:1 Square Lightbox</span>
                        </div>

                        {/* Interactive mini lightbox simulation */}
                        <div className={`p-4 rounded-3xl border flex items-center justify-center ${
                          isDark ? "bg-black/60 border-white/10" : "bg-slate-200/60 border-slate-300"
                        }`}>
                          <div className="relative w-full max-w-[260px] bg-white rounded-[26px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-100 transition-transform">
                            {/* Floating X close button */}
                            <div className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-slate-900/80 text-white flex items-center justify-center shadow-md">
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>

                            {/* 1:1 Aspect ratio banner graphic */}
                            <div className="relative w-full aspect-square bg-[#050C08] overflow-hidden flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={editingCampaign.imageUrl || "/images/campaign-banner.jpg"}
                                alt="Campaign Banner Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/images/campaign-banner.jpg";
                                }}
                              />
                            </div>

                            {/* Action CTA Button & Link */}
                            <div className="p-3.5 bg-white space-y-2 text-center">
                              <button
                                type="button"
                                className="w-full py-2.5 px-4 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs tracking-wide shadow-[0_4px_16px_rgba(0,255,135,0.4)] flex items-center justify-center gap-1.5 transition-transform cursor-pointer"
                              >
                                <span>{editingCampaign.ctaText || "Claim 25% Off Now"}</span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>

                              <div className="text-[10px] text-slate-400 font-medium">
                                Maybe Later
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary & Value Pill */}
                  <div className={`mt-4 p-3 rounded-2xl border text-xs space-y-1.5 ${
                    isDark ? "bg-black/50 border-white/10" : "bg-white border-slate-200 shadow-xs"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">Auto-Discount:</span>
                      <strong className="text-emerald-600 dark:text-[#00FF87] font-mono">
                        {editingCampaign.discountPercent || 25}% OFF
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">Coupon Code:</span>
                      <strong className="font-mono text-emerald-600 dark:text-[#00FF87]">
                        {editingCampaign.code || "None"}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">Target Route:</span>
                      <strong className="font-mono text-slate-500">
                        {editingCampaign.ctaLink || "/pricing"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Modal Footer Controls ── */}
              <div className={`px-6 py-4 border-t flex items-center justify-between gap-3 shrink-0 flex-wrap ${
                isDark ? "border-white/10 bg-black/60" : "border-slate-200 bg-slate-50"
              }`}>
                <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>Shortcuts:</span>
                  <span className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40">Esc</span>
                  <span>to exit</span>
                  <span className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40">Ctrl + Enter</span>
                  <span>to save</span>
                </div>

                <div className="flex items-center gap-2.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingCampaign(null)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isDark
                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!editingCampaign) return;
                      const pausedCampaign = { ...editingCampaign, active: false };
                      if (isNew) {
                        addCampaign(pausedCampaign);
                        showToast("Campaign saved as Paused / Draft!");
                      } else {
                        updateCampaign(pausedCampaign.id, pausedCampaign);
                        showToast("Campaign updated (Paused)!");
                      }
                      setEditingCampaign(null);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isDark
                        ? "border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/5"
                        : "border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50"
                    }`}
                  >
                    Save as Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveModal()}
                    className="px-6 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_25px_rgba(0,255,135,0.4)] flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-[1.02]"
                  >
                    <Save className="w-4 h-4 stroke-[2.5]" />
                    <span>Save &amp; Publish Live</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
