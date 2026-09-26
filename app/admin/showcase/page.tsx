"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { ShowcaseItem } from "@/lib/cmsStore";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Save,
  Play,
  Layers
} from "lucide-react";

export default function AdminShowcasePage() {
  const { cmsData, addShowcaseItem, updateShowcaseItem, deleteShowcaseItem } = useCms();
  const [activeRow, setActiveRow] = useState<"row1" | "row2">("row1");
  const [editingItem, setEditingItem] = useState<ShowcaseItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentCards = cmsData.showcase[activeRow] || [];

  const handleOpenAdd = () => {
    const newItem: ShowcaseItem = {
      id: `card-${Date.now()}`,
      title: "",
      image: "",
      aspectRatio: 136 / 102,
      video: ""
    };
    setEditingItem(newItem);
    setIsNewItem(true);
  };

  const handleOpenEdit = (item: ShowcaseItem) => {
    setEditingItem({ ...item });
    setIsNewItem(false);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isNewItem) {
      addShowcaseItem(activeRow, editingItem);
    } else {
      updateShowcaseItem(activeRow, editingItem.id, editingItem);
    }

    setEditingItem(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Remove "${title || "this card"}" from carousel?`)) {
      deleteShowcaseItem(activeRow, id);
    }
  };

  const presetAspectRatios = [
    { 
      label: "Tall / Mobile (9:16)", 
      ratioStr: "0.78x",
      dimensions: "720 × 920 px",
      idealFor: "Vertical UI, Mobile Screens & Reels",
      value: 80 / 102 
    },
    { 
      label: "Square (1:1)", 
      ratioStr: "1.00x",
      dimensions: "800 × 800 px",
      idealFor: "Icons, Square Brand Posts & Packaging",
      value: 103 / 102 
    },
    { 
      label: "Standard / Tablet (4:3)", 
      ratioStr: "1.33x",
      dimensions: "960 × 720 px",
      idealFor: "iPad / Tablet Screens & Editorial",
      value: 136 / 102 
    },
    { 
      label: "Wide Showcase (16:10)", 
      ratioStr: "1.54x",
      dimensions: "1100 × 720 px",
      idealFor: "Laptop, Desktop Web & UI Mockups",
      value: 157 / 102 
    },
    { 
      label: "Ultra-Wide Cinema (21:9)", 
      ratioStr: "2.27x",
      dimensions: "1600 × 700 px",
      idealFor: "Panoramic Dashboards & Wide Banners",
      value: 232 / 102 
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Hero Showcase Carousel"
        subtitle="Upload images, add video showreels, and manage the dual-row draggable marquee on the home page"
        actionButton={
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Showcase Card</span>
          </button>
        }
      />

      <div className="p-6 lg:p-10 space-y-6 max-w-7xl">
        
        {/* Toast */}
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-[#00FF87] flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Showcase carousel updated live! The home hero marquee now reflects your changes.</span>
          </div>
        )}

        {/* ═══ RECOMMENDED DESIGN DIMENSIONS & ASPECT RATIOS GUIDE ═══ */}
        <div className="p-5 rounded-2xl bg-[#03150B] border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF87] animate-pulse" />
              <h3 className="text-xs font-mono uppercase font-bold text-[#00FF87] tracking-wider">
                Recommended Design Dimensions &amp; Aspect Ratio Guide (Canvas Cheat-Sheet)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              For Figma / Photoshop / Blender
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Hero showcase marquee-তে ডিজাইন নিখুঁত ও কোনো ক্রপিং ছাড়া দেখানোর জন্য নিচের রেশিও এবং সাইজ অনুযায়ী ইমেজ/ভিডিও তৈরি করে আপলোড করুন:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {presetAspectRatios.map((preset, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white leading-tight">{preset.label}</span>
                  <span className="text-[10px] font-mono font-bold text-[#00FF87] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {preset.ratioStr}
                  </span>
                </div>
                <div className="text-[13px] font-mono font-black text-[#00FF87]">
                  {preset.dimensions}
                </div>
                <p className="text-[10.5px] text-slate-400 leading-snug">
                  {preset.idealFor}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Row Switcher Tabs */}
        <div className="flex items-center justify-between bg-[#020F07] border border-white/10 p-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveRow("row1")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeRow === "row1"
                  ? "bg-[#00FF87] text-[#02180C] shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                  : "text-slate-400 hover:text-white bg-white/5"
              }`}
            >
              <span>Row 1 (Top Carousel)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 font-mono">
                {cmsData.showcase.row1.length} cards
              </span>
            </button>

            <button
              onClick={() => setActiveRow("row2")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeRow === "row2"
                  ? "bg-[#00FF87] text-[#02180C] shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                  : "text-slate-400 hover:text-white bg-white/5"
              }`}
            >
              <span>Row 2 (Bottom Carousel)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 font-mono">
                {cmsData.showcase.row2.length} cards
              </span>
            </button>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00FF87] hover:underline font-mono font-bold flex items-center gap-1"
          >
            <span>Preview on Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {currentCards.map((card, index) => (
            <div
              key={card.id}
              className="rounded-2xl bg-[#020F07] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#00FF87]/40 transition-all shadow-md"
            >
              <div>
                {/* Media Preview */}
                <div className="relative h-36 w-full bg-black/70 overflow-hidden flex items-center justify-center">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {card.video && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-[#00FF87] flex items-center gap-1 font-bold">
                      <Play className="w-2.5 h-2.5 fill-[#00FF87]" />
                      <span>Video</span>
                    </div>
                  )}

                  {(() => {
                    const matchedPreset = presetAspectRatios.find(
                      (p) => Math.abs(card.aspectRatio - p.value) < 0.1
                    );
                    return (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-white/10 flex items-center gap-1.5">
                        <span className="text-[#00FF87] font-semibold">{matchedPreset?.ratioStr || `${card.aspectRatio.toFixed(2)}x`}</span>
                        <span className="text-slate-400">({matchedPreset?.dimensions || "Custom"})</span>
                      </div>
                    );
                  })()}
                </div>

                {/* Info */}
                <div className="p-4 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    Card #{index + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {card.title || "Untitled Card"}
                  </h4>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  {card.video ? "Interactive Video" : "Image Card"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(card)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00FF87]/20 text-slate-300 hover:text-[#00FF87] transition-colors cursor-pointer"
                    title="Edit Card"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(card.id, card.title)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Card"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ ADD / EDIT MODAL ═══ */}
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#020F07] border border-emerald-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
              
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif">
                    {isNewItem ? "Add Showcase Card" : "Edit Showcase Card"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Target: {activeRow === "row1" ? "Row 1 (Top)" : "Row 2 (Bottom)"} Carousel
                  </p>
                </div>

                <button
                  onClick={() => setEditingItem(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveModal} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">
                    Card Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Ex. FITMATE Mobile Experience"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00FF87]"
                  />
                </div>

                {(() => {
                  const currentPreset = presetAspectRatios.find(
                    (p) => Math.abs(editingItem.aspectRatio - p.value) < 0.08
                  ) || presetAspectRatios[3];

                  return (
                    <>
                      {/* Active Dimension Highlight Box */}
                      <div className="p-3 rounded-2xl bg-emerald-950/40 border border-[#00FF87]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            Current Target Dimension
                          </div>
                          <div className="text-sm font-bold font-mono text-[#00FF87] flex items-center gap-2">
                            <span>{currentPreset.dimensions}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF87]/20 border border-[#00FF87]/30 text-[#00FF87]">
                              {currentPreset.ratioStr} ({currentPreset.value.toFixed(2)}x)
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Recommended for: {currentPreset.idealFor}
                          </div>
                        </div>
                      </div>

                      {/* Image Uploader */}
                      <MediaUploader
                        label="Thumbnail Image *"
                        value={editingItem.image}
                        onChange={(val) => setEditingItem({ ...editingItem, image: val })}
                        acceptVideo={false}
                        recommendedDimensions={currentPreset.dimensions}
                        helpText={`Upload an image matching ~${currentPreset.dimensions} (${currentPreset.ratioStr}) for crisp marquee rendering`}
                      />

                      {/* Video Uploader (Optional) */}
                      <MediaUploader
                        label="Interactive Video URL / File (Optional)"
                        value={editingItem.video || ""}
                        onChange={(val) => setEditingItem({ ...editingItem, video: val })}
                        acceptVideo={true}
                        recommendedDimensions={currentPreset.dimensions}
                        helpText="When added, clicking the card opens an ultra-smooth fullscreen video player"
                      />
                    </>
                  );
                })()}

                {/* Aspect Ratio Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                      Select Aspect Ratio & Dimensions
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      Select before uploading
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {presetAspectRatios.map((preset, idx) => {
                      const isSelected = Math.abs(editingItem.aspectRatio - preset.value) < 0.05;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setEditingItem({ ...editingItem, aspectRatio: preset.value })}
                          className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#00FF87]/15 border-[#00FF87] shadow-[0_0_12px_rgba(0,255,135,0.15)]"
                              : "bg-black/40 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`text-xs font-bold ${isSelected ? "text-[#00FF87]" : "text-white"}`}>
                              {preset.label}
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              isSelected ? "bg-[#00FF87]/20 text-[#00FF87]" : "bg-white/10 text-slate-400"
                            }`}>
                              {preset.ratioStr}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={isSelected ? "text-white font-semibold" : "text-slate-300"}>
                              {preset.dimensions}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {preset.value.toFixed(2)}x
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                            {preset.idealFor}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Save Card</span>
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
