"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";

export default function AdminHomepagePage() {
  const { cmsData, updateHomeSection, reorderHomeSections } = useCms();
  const sections = [...cmsData.homeSections].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleMove = (id: string, dir: "up" | "down") => {
    const idx = sections.findIndex((s) => s.id === id);
    const target = dir === "up" ? sections[idx - 1] : sections[idx + 1];
    if (!target) return;
    const updated = sections.map((s) => {
      if (s.id === id) return { ...s, displayOrder: target.displayOrder };
      if (s.id === target.id) return { ...s, displayOrder: sections[idx].displayOrder };
      return s;
    });
    reorderHomeSections(updated);
  };

  return (
    <div>
      <AdminHeader
        title="Homepage Control"
        subtitle="Enable/disable sections and edit their content"
      />

      <div className="p-6 lg:p-10 max-w-3xl space-y-3">
        <p className="text-sm text-slate-400 mb-6">
          Toggle sections on/off, change titles, subtitles, and CTA text. Changes appear immediately on the site.
          Use the arrows to reorder sections.
        </p>

        {sections.map((sec, i) => (
          <div
            key={sec.id}
            className={`rounded-2xl border p-5 transition-all ${sec.enabled ? "bg-[#0A0F14] border-white/[0.08]" : "bg-[#0A0F14]/50 border-white/[0.04] opacity-60"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              {/* Reorder */}
              <div className="flex flex-col gap-0.5 shrink-0">
                <button
                  onClick={() => handleMove(sec.id, "up")}
                  disabled={i === 0}
                  className="text-slate-600 hover:text-white disabled:opacity-30 p-0.5 transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(sec.id, "down")}
                  disabled={i === sections.length - 1}
                  className="text-slate-600 hover:text-white disabled:opacity-30 p-0.5 transition-colors"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Toggle */}
              <button
                onClick={() => updateHomeSection(sec.id, { enabled: !sec.enabled })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                  sec.enabled
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-white/5 text-slate-500 border-white/10"
                }`}
              >
                {sec.enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {sec.enabled ? "Visible" : "Hidden"}
              </button>

              <span className="font-bold text-white">{sec.label}</span>
              <span className="text-xs text-slate-500 font-mono">#{sec.id}</span>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sec.title !== undefined && (
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 mb-1 block">Section Title</label>
                  <input
                    className={inp}
                    value={sec.title || ""}
                    onChange={(e) => updateHomeSection(sec.id, { title: e.target.value })}
                    placeholder="Section heading..."
                  />
                </div>
              )}
              {sec.subtitle !== undefined && (
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase text-slate-500 mb-1 block">Subtitle</label>
                  <input
                    className={inp}
                    value={sec.subtitle || ""}
                    onChange={(e) => updateHomeSection(sec.id, { subtitle: e.target.value })}
                    placeholder="Section subtitle..."
                  />
                </div>
              )}
              {sec.ctaText !== undefined && (
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 mb-1 block">CTA Button Text</label>
                  <input
                    className={inp}
                    value={sec.ctaText || ""}
                    onChange={(e) => updateHomeSection(sec.id, { ctaText: e.target.value })}
                    placeholder="e.g. Start Your Project"
                  />
                </div>
              )}
              {sec.ctaUrl !== undefined && (
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 mb-1 block">CTA URL / Anchor</label>
                  <input
                    className={inp}
                    value={sec.ctaUrl || ""}
                    onChange={(e) => updateHomeSection(sec.id, { ctaUrl: e.target.value })}
                    placeholder="#order or /contact"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inp = "w-full bg-[#131920] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/40 transition-all";
