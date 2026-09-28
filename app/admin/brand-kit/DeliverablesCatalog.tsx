"use client";

import React, { useState, useMemo } from "react";
import {
  DELIVERABLES,
  DeliverableCategory,
  DeliverableSection,
  DeliverableItem,
} from "./deliverablesData";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Maximize2,
  FolderOpen,
  FolderCheck,
} from "lucide-react";

interface DeliverablesCatalogProps {
  brandKit: {
    logoUrl?: string;
    brandName?: string;
    tagline?: string;
    colors?: { hex: string; role: string; name: string }[];
  } | null;
  isDark: boolean;
}

// Aspect ratio marker component
function AspectRatioBox({
  item,
  categoryColor,
  brandLogo,
  brandPrimary,
  isDark,
}: {
  item: DeliverableItem;
  categoryColor: string;
  brandLogo?: string;
  brandPrimary?: string;
  isDark: boolean;
}) {
  const maxW = 76;
  const maxH = 58;

  // Compute proportional dimensions inside bounding box
  const ratio = (item.w || 1) / (item.h || 1);
  let boxW = maxW;
  let boxH = Math.round(maxW / ratio);

  if (boxH > maxH) {
    boxH = maxH;
    boxW = Math.round(maxH * ratio);
  }

  // Ensure minimum dimensions for visibility
  boxW = Math.max(18, Math.min(maxW, boxW));
  boxH = Math.max(16, Math.min(maxH, boxH));

  const activeColor = brandPrimary || categoryColor;

  return (
    <div
      className={`w-20 h-16 rounded-xl flex items-center justify-center p-1 relative flex-shrink-0 transition-all group-hover:scale-105 ${
        isDark ? "bg-white/[0.04] border border-white/10" : "bg-slate-100 border border-slate-200"
      }`}
    >
      {/* Corner Crop Marks for architectural/design feel */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/20 pointer-events-none" />

      {/* Proportional Aspect-Ratio Shape */}
      <div
        className="rounded shadow-sm flex items-center justify-center relative overflow-hidden transition-all duration-300"
        style={{
          width: `${boxW}px`,
          height: `${boxH}px`,
          borderColor: activeColor,
          borderWidth: "1.5px",
          borderStyle: "solid",
          background: isDark
            ? `linear-gradient(135deg, ${activeColor}22 0%, rgba(0,0,0,0.4) 100%)`
            : `linear-gradient(135deg, ${activeColor}15 0%, rgba(255,255,255,0.8) 100%)`,
        }}
      >
        {/* Subtle grid lines inside shape */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${activeColor} 1px, transparent 1px)`,
            backgroundSize: "6px 6px",
          }}
        />

        {/* Brand logo preview inside shape if uploaded, otherwise ratio tag */}
        {brandLogo ? (
          <img
            src={brandLogo}
            alt="Logo Preview"
            className="max-h-[60%] max-w-[70%] object-contain relative z-10 drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
          />
        ) : (
          <span
            className="text-[8px] font-mono font-bold leading-none tracking-tight relative z-10 select-none"
            style={{ color: activeColor }}
          >
            {item.w}:{item.h}
          </span>
        )}
      </div>
    </div>
  );
}

export function DeliverablesCatalog({ brandKit, isDark }: DeliverablesCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const brandPrimary = brandKit?.colors?.[0]?.hex;
  const brandLogo = brandKit?.logoUrl;

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const expandAll = () => {
    setCollapsedCategories({});
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    DELIVERABLES.forEach((cat) => {
      allCollapsed[cat.id] = true;
    });
    setCollapsedCategories(allCollapsed);
  };

  const copySpec = (item: DeliverableItem, categoryName: string) => {
    const text = `${item.name} (${categoryName})\nStandard Size: ${item.size}${
      item.spec ? `\nSpecification: ${item.spec}` : ""
    }`;
    navigator.clipboard.writeText(text);
    setCopiedItem(item.name);
    setTimeout(() => setCopiedItem(null), 1800);
  };

  // Filtered deliverables
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return DELIVERABLES.map((cat) => {
      if (selectedCat !== "all" && cat.id !== selectedCat) {
        return null;
      }

      if (!query) return cat;

      const matchingSections = cat.sections
        .map((sec) => {
          const matchingItems = sec.items.filter(
            (item) =>
              item.name.toLowerCase().includes(query) ||
              item.size.toLowerCase().includes(query) ||
              (item.spec && item.spec.toLowerCase().includes(query)) ||
              sec.name.toLowerCase().includes(query) ||
              cat.category.toLowerCase().includes(query)
          );

          if (matchingItems.length > 0) {
            return { ...sec, items: matchingItems };
          }
          return null;
        })
        .filter(Boolean) as DeliverableSection[];

      if (matchingSections.length > 0) {
        return { ...cat, sections: matchingSections };
      }

      return null;
    }).filter(Boolean) as DeliverableCategory[];
  }, [search, selectedCat]);

  // Total items count
  const totalItemsCount = useMemo(() => {
    return filteredCategories.reduce(
      (acc, cat) => acc + cat.sections.reduce((sAcc, s) => sAcc + s.items.length, 0),
      0
    );
  }, [filteredCategories]);

  // Overall catalog count (unfiltered)
  const masterItemsCount = useMemo(() => {
    return DELIVERABLES.reduce(
      (acc, cat) => acc + cat.sections.reduce((sAcc, s) => sAcc + s.items.length, 0),
      0
    );
  }, []);

  const cardBg = isDark ? "bg-[#0B1511]/80 backdrop-blur-md border-white/10" : "bg-white border-slate-200 shadow-sm";
  const itemBg = isDark ? "bg-white/[0.02] hover:bg-white/[0.05] border-white/10" : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/80";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderSubtle = isDark ? "border-white/10" : "border-slate-200";

  return (
    <div className="space-y-6">
      {/* Top Banner / Stats Header */}
      <div className={`p-6 rounded-2xl border ${cardBg} relative overflow-hidden`}>
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: brandPrimary || "#00FF87" }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-[10px] font-mono font-bold border border-[#00FF87]/20 flex items-center gap-1">
                <Layers className="w-3 h-3" /> 8 Systems · {masterItemsCount} Standard Deliverables
              </span>
              {brandKit && (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono font-bold border border-purple-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Brand Applied
                </span>
              )}
            </div>
            <h2 className={`text-xl font-black tracking-tight ${textPrimary}`}>
              Comprehensive Brand Deliverables Catalog
            </h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Standard industry dimensions, aspect-ratio visual markers, print & digital specs for every branding asset.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? "border-white/10 hover:bg-white/10 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#00FF87]" /> Expand All
            </button>
            <button
              onClick={collapseAll}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? "border-white/10 hover:bg-white/10 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <FolderCheck className="w-3.5 h-3.5 text-slate-400" /> Collapse All
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search deliverables, dimensions, formats (e.g., 1080×1080, A4, business card, story, banner)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-[#00FF87]/50 focus:bg-white/[0.06]"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00FF87] focus:bg-white"
              }`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === "all"
                ? "bg-[#00FF87] text-[#02180C] shadow-sm font-bold"
                : isDark
                ? "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            All Systems ({masterItemsCount})
          </button>
          {DELIVERABLES.map((cat) => {
            const count = cat.sections.reduce((acc, s) => acc + s.items.length, 0);
            const isSelected = selectedCat === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "text-white shadow-sm font-bold"
                    : isDark
                    ? "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
                style={isSelected ? { backgroundColor: cat.color } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: isSelected ? "#fff" : cat.color }}
                />
                <span>
                  {cat.num} {cat.category.replace("Complete ", "")}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? "bg-black/20 text-white"
                      : isDark
                      ? "bg-white/10 text-slate-400"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between px-1">
        <p className={`text-xs font-mono ${textMuted}`}>
          Showing <span className="text-[#00FF87] font-bold">{totalItemsCount}</span> deliverables
          {search && ` matching "${search}"`}
        </p>
      </div>

      {/* Categories List */}
      <div className="space-y-6">
        {filteredCategories.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border ${cardBg}`}>
            <p className={`text-sm font-bold ${textPrimary}`}>No deliverables found</p>
            <p className={`text-xs mt-1 ${textMuted}`}>Try searching for a different term or clear the search filter.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCat("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#00FF87] text-[#02180C] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const isCollapsed = collapsedCategories[cat.id];
            const catItemCount = cat.sections.reduce((acc, s) => acc + s.items.length, 0);

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border transition-all overflow-hidden ${cardBg}`}
              >
                {/* Category Header Bar */}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer border-b ${
                    isCollapsed ? "border-transparent" : borderSubtle
                  } ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-white shadow-sm flex items-center justify-center min-w-[34px]"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.num}
                    </span>
                    <div>
                      <h3 className={`text-sm sm:text-base font-black ${textPrimary}`}>
                        {cat.category}
                      </h3>
                      <p className={`text-[11px] font-mono mt-0.5 ${textMuted}`}>
                        {cat.sections.length} sections · {catItemCount} deliverables
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border"
                      style={{
                        borderColor: `${cat.color}40`,
                        color: cat.color,
                        backgroundColor: `${cat.color}15`,
                      }}
                    >
                      System {cat.num}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                        isDark ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Sections & Items Grid */}
                {!isCollapsed && (
                  <div className="p-4 sm:p-6 space-y-6">
                    {cat.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        {/* Section Sub-heading */}
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-3.5 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <h4 className={`text-xs font-bold uppercase tracking-wider ${textPrimary}`}>
                            {section.name}
                          </h4>
                          <span className={`text-[10px] font-mono ${textMuted}`}>
                            ({section.items.length})
                          </span>
                        </div>

                        {/* Deliverables Grid for this Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {section.items.map((item, itemIdx) => {
                            const isCopied = copiedItem === item.name;

                            return (
                              <div
                                key={itemIdx}
                                className={`group p-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3 relative ${itemBg}`}
                              >
                                {/* Aspect-Ratio Visual Marker */}
                                <AspectRatioBox
                                  item={item}
                                  categoryColor={cat.color}
                                  brandLogo={brandLogo}
                                  brandPrimary={brandPrimary}
                                  isDark={isDark}
                                />

                                {/* Deliverable Info */}
                                <div className="flex-1 min-w-0 pr-6">
                                  <div className="flex items-center gap-1.5">
                                    <h5
                                      className={`text-xs font-bold truncate group-hover:text-[#00FF87] transition-colors ${textPrimary}`}
                                      title={item.name}
                                    >
                                      {item.name}
                                    </h5>
                                  </div>

                                  {/* Standard Size Spec */}
                                  <div className="mt-1 flex items-center gap-1.5">
                                    <span
                                      className="font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold tracking-tight"
                                      style={{
                                        color: brandPrimary || cat.color,
                                        backgroundColor: isDark
                                          ? `${brandPrimary || cat.color}18`
                                          : `${brandPrimary || cat.color}12`,
                                      }}
                                    >
                                      {item.size}
                                    </span>
                                  </div>

                                  {/* Extra spec / note */}
                                  {item.spec && (
                                    <p
                                      className={`text-[10px] mt-1 leading-tight truncate ${textMuted}`}
                                      title={item.spec}
                                    >
                                      {item.spec}
                                    </p>
                                  )}
                                </div>

                                {/* Copy Spec Button */}
                                <button
                                  onClick={() => copySpec(item, cat.category)}
                                  className={`absolute right-2.5 top-3 p-1.5 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer ${
                                    isCopied
                                      ? "bg-[#00FF87]/20 text-[#00FF87]"
                                      : isDark
                                      ? "hover:bg-white/10 text-slate-400 hover:text-white"
                                      : "hover:bg-slate-200 text-slate-500 hover:text-slate-800"
                                  }`}
                                  title="Copy deliverable size & specs"
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-[#00FF87]" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
