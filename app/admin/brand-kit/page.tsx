"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  Upload,
  Download,
  RefreshCw,
  Palette,
  Type,
  Layout,
  CheckCircle2,
  Copy,
  Sparkles,
  Eye,
  Image as ImageIcon,
  Layers,
  ArrowRight,
} from "lucide-react";
import { DeliverablesCatalog } from "./DeliverablesCatalog";
import BrandGuidelineSheet from "./BrandGuidelineSheet";

export interface BrandColor {
  hex: string;
  rgb: [number, number, number];
  name: string;
  role: string;
}

export interface TypographyPairing {
  heading: string;
  body: string;
  headingWeight: string;
  mood: string;
}

export interface BrandKit {
  logoUrl: string;
  brandName: string;
  tagline: string;
  colors: BrandColor[];
  typography: TypographyPairing;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function colorDistance(
  a: [number, number, number],
  b: [number, number, number]
): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function extractDominantColors(
  imageEl: HTMLImageElement,
  count = 6
): [number, number, number][] {
  const canvas = document.createElement("canvas");
  const size = 120;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(imageEl, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;

  const buckets = new Map<string, { color: [number, number, number]; count: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2],
      a = data[i + 3];
    if (a < 128) continue;
    const qr = Math.round(r / 32) * 32;
    const qg = Math.round(g / 32) * 32;
    const qb = Math.round(b / 32) * 32;
    const key = `${qr},${qg},${qb}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.count++;
    } else {
      buckets.set(key, { color: [qr, qg, qb], count: 1 });
    }
  }

  const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count);
  const chosen: [number, number, number][] = [];

  for (const item of sorted) {
    if (chosen.length >= count) break;
    const tooClose = chosen.some((c) => colorDistance(c, item.color) < 50);
    if (!tooClose) chosen.push(item.color);
  }

  while (chosen.length < count) {
    const base = chosen[0] || [80, 80, 80];
    chosen.push([
      Math.min(255, base[0] + 30 * chosen.length),
      Math.min(255, base[1] + 20),
      Math.min(255, base[2] + 50),
    ]);
  }

  return chosen;
}

function buildBrandColors(extracted: [number, number, number][]): BrandColor[] {
  const lum = ([r, g, b]: [number, number, number]) =>
    0.299 * r + 0.587 * g + 0.114 * b;
  const sorted = [...extracted].sort((a, b) => lum(b) - lum(a));

  const roles = [
    "Primary",
    "Secondary",
    "Accent",
    "Neutral",
    "Light Background",
    "Dark Text",
  ];
  const roleKeys = ["primary", "secondary", "accent", "neutral", "background", "text"];

  const result = extracted.map((rgb, i) => ({
    hex: rgbToHex(...rgb),
    rgb,
    name: roles[i] || `Color ${i + 1}`,
    role: roleKeys[i] || "neutral",
  }));

  result[4] = {
    hex: rgbToHex(...sorted[0]),
    rgb: sorted[0],
    name: "Light Background",
    role: "background",
  };
  result[5] = {
    hex: rgbToHex(...sorted[sorted.length - 1]),
    rgb: sorted[sorted.length - 1],
    name: "Dark Text",
    role: "text",
  };

  return result;
}

function detectTypography(colors: BrandColor[]): TypographyPairing {
  const [r, g, b] = colors[0]?.rgb || [0, 0, 0];
  if (g > r && g > b && g > 100)
    return {
      heading: "Outfit",
      body: "DM Sans",
      headingWeight: "800",
      mood: "Fresh & Modern",
    };
  if (b > r && b > g)
    return {
      heading: "Plus Jakarta Sans",
      body: "Inter",
      headingWeight: "700",
      mood: "Professional & Tech",
    };
  if (r > g && r > b && r > 120)
    return {
      heading: "Syne",
      body: "Nunito",
      headingWeight: "800",
      mood: "Bold & Creative",
    };
  if (r > 150 && g > 100 && b < 80)
    return {
      heading: "Playfair Display",
      body: "Lato",
      headingWeight: "700",
      mood: "Warm & Elegant",
    };
  return {
    heading: "Cormorant Garamond",
    body: "Jost",
    headingWeight: "700",
    mood: "Luxury & Refined",
  };
}

function ColorSwatch({ color, isDark }: { color: BrandColor; isDark: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden border ${
        isDark ? "border-white/10" : "border-slate-200"
      } group`}
    >
      <div
        className="h-24 w-full cursor-pointer relative"
        style={{ backgroundColor: color.hex }}
        onClick={copy}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          {copied ? (
            <CheckCircle2 className="w-6 h-6 text-white drop-shadow" />
          ) : (
            <Copy className="w-5 h-5 text-white drop-shadow" />
          )}
        </div>
      </div>
      <div className={`p-3 ${isDark ? "bg-[#0D1117]" : "bg-white"}`}>
        <p className={`text-[11px] font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
          {color.name}
        </p>
        <p className="text-[10px] font-mono text-slate-400">{color.hex}</p>
        <p className="text-[9px] text-slate-500 mt-0.5">
          RGB({color.rgb.join(", ")})
        </p>
      </div>
    </div>
  );
}

function BusinessCardMockup({ kit }: { kit: BrandKit }) {
  const primary = kit.colors[0]?.hex || "#1A1A2E";
  const accent = kit.colors[2]?.hex || "#00FF87";
  const bg = kit.colors[4]?.hex || "#FFFFFF";

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Front */}
      <div
        className="w-64 h-36 rounded-xl relative overflow-hidden shadow-2xl flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${primary}, ${primary}dd)` }}
      >
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 -translate-y-8 translate-x-8"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            {kit.logoUrl && (
              <img
                src={kit.logoUrl}
                alt="Logo"
                className="h-6 w-auto object-contain filter brightness-0 invert opacity-90"
              />
            )}
          </div>
          <div>
            <p className="text-white text-sm font-bold">{kit.brandName || "Brand Name"}</p>
            <p className="text-white/60 text-[10px] mt-0.5">
              {kit.tagline || "Your tagline here"}
            </p>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Back */}
      <div
        className="w-64 h-36 rounded-xl relative overflow-hidden shadow-2xl flex-shrink-0 flex flex-col justify-center items-center gap-1.5"
        style={{ backgroundColor: bg, border: `2px solid ${primary}20` }}
      >
        <div className="w-8 h-0.5 rounded-full mb-2" style={{ backgroundColor: accent }} />
        <p className="text-[10px] text-slate-500 font-mono">
          hello@{(kit.brandName || "brand").toLowerCase().replace(/\s/g, "")}.com
        </p>
        <p className="text-[10px] text-slate-500 font-mono">
          www.{(kit.brandName || "brand").toLowerCase().replace(/\s/g, "")}.com
        </p>
        <p className="text-[10px] text-slate-500 font-mono">+1 (000) 000-0000</p>
      </div>
    </div>
  );
}

function SocialMockup({ kit }: { kit: BrandKit }) {
  const primary = kit.colors[0]?.hex || "#1A1A2E";
  const accent = kit.colors[2]?.hex || "#00FF87";

  return (
    <div className="flex gap-6 flex-wrap items-end">
      {/* Icon */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
        >
          {kit.logoUrl ? (
            <img
              src={kit.logoUrl}
              alt="Logo"
              className="w-10 h-10 object-contain filter brightness-0 invert"
            />
          ) : (
            <span className="text-white font-black text-xl">
              {(kit.brandName || "B")[0]}
            </span>
          )}
        </div>
        <p className="text-[9px] text-slate-400 font-mono">Profile Icon (1:1)</p>
      </div>

      {/* Banner */}
      <div className="flex flex-col gap-2">
        <div
          className="w-56 h-16 rounded-xl flex items-center justify-between px-4 shadow-md overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primary}ee, ${accent}44)` }}
        >
          {kit.logoUrl && (
            <img
              src={kit.logoUrl}
              alt="Logo"
              className="h-7 w-auto object-contain filter brightness-0 invert"
            />
          )}
          <p className="text-white/80 text-[9px] font-mono text-right leading-tight">
            {kit.tagline || "Your tagline"}
          </p>
        </div>
        <p className="text-[9px] text-slate-400 font-mono">Cover Banner (16:9)</p>
      </div>

      {/* Post */}
      <div className="flex flex-col gap-2">
        <div
          className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 shadow-md"
          style={{ background: `linear-gradient(160deg, ${primary}, ${accent}66)` }}
        >
          <p className="text-white font-black text-base leading-none">
            {(kit.brandName || "Brand").split(" ")[0]}
          </p>
          <div className="w-8 h-0.5 rounded-full bg-white/60" />
          <p className="text-white/70 text-[8px]">
            {kit.tagline?.split(" ").slice(0, 2).join(" ") || "Post"}
          </p>
        </div>
        <p className="text-[9px] text-slate-400 font-mono">Post (1080×1080)</p>
      </div>
    </div>
  );
}

function StoryMockup({ kit }: { kit: BrandKit }) {
  const primary = kit.colors[0]?.hex || "#1A1A2E";
  const accent = kit.colors[2]?.hex || "#00FF87";

  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-36 h-64 rounded-2xl p-3 flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/20"
        style={{
          background: `linear-gradient(180deg, ${primary} 0%, #050510 100%)`,
        }}
      >
        <div className="flex items-center gap-2">
          {kit.logoUrl && (
            <img
              src={kit.logoUrl}
              alt="Logo"
              className="w-5 h-5 object-contain filter brightness-0 invert"
            />
          )}
          <span className="text-[9px] font-bold text-white truncate">{kit.brandName}</span>
        </div>
        <div className="text-center my-auto px-1">
          <p
            className="text-white text-xs font-black tracking-tight leading-tight mb-1"
            style={{ fontFamily: kit.typography.heading }}
          >
            {kit.brandName} Official
          </p>
          <div
            className="w-6 h-0.5 mx-auto rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
        <div
          className="p-1.5 rounded-lg text-center"
          style={{
            backgroundColor: `${accent}25`,
            border: `1px solid ${accent}60`,
          }}
        >
          <span className="text-[8px] font-bold text-white block uppercase tracking-wider">
            Swipe Up / Learn More
          </span>
        </div>
      </div>
      <p className="text-[9px] text-slate-400 font-mono text-center">Story / Reel (9:16)</p>
    </div>
  );
}

function LetterheadMockup({ kit }: { kit: BrandKit }) {
  const primary = kit.colors[0]?.hex || "#1A1A2E";
  const accent = kit.colors[2]?.hex || "#00FF87";

  return (
    <div className="flex flex-col gap-2">
      <div className="w-48 h-64 rounded-lg p-3 bg-white shadow-xl flex flex-col justify-between text-slate-800 border border-slate-200">
        <div
          className="flex items-start justify-between border-b pb-2"
          style={{ borderColor: `${primary}20` }}
        >
          <div>
            {kit.logoUrl ? (
              <img
                src={kit.logoUrl}
                alt="Logo"
                className="h-4 w-auto object-contain"
              />
            ) : (
              <p className="text-[10px] font-black" style={{ color: primary }}>
                {kit.brandName}
              </p>
            )}
            <p className="text-[6px] text-slate-400 mt-0.5">{kit.tagline}</p>
          </div>
          <div className="text-right text-[6px] text-slate-400 font-mono">
            <p>OFFICIAL LETTERHEAD</p>
            <p>REF: 2026/BK-01</p>
          </div>
        </div>

        <div className="space-y-1.5 my-auto">
          <div className="w-12 h-1 rounded" style={{ backgroundColor: primary }} />
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-5/6 h-1 bg-slate-200 rounded" />
          <div className="w-4/6 h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-100 rounded" />
        </div>

        <div
          className="pt-2 border-t flex justify-between items-center text-[6px] text-slate-400 font-mono"
          style={{ borderColor: `${primary}20` }}
        >
          <span>
            www.{(kit.brandName || "brand").toLowerCase().replace(/\s/g, "")}.com
          </span>
          <span style={{ color: accent }}>● CONFIDENTIAL</span>
        </div>
      </div>
      <p className="text-[9px] text-slate-400 font-mono text-center">
        Letterhead (A4 / 210×297mm)
      </p>
    </div>
  );
}

const SAMPLE_PRESETS = [
  {
    name: "Blinko Tech",
    tagline: "Ideas in. Action out.",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    badge: "⚡ Tech & SaaS",
  },
  {
    name: "Roast & Co",
    tagline: "Artisanal Single Origin Roasters",
    logoUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80",
    badge: "☕ Coffee & Lifestyle",
  },
  {
    name: "Verde Organics",
    tagline: "Pure Botanical Care & Wellness",
    logoUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
    badge: "🌿 Eco & Skincare",
  },
  {
    name: "Apex Global",
    tagline: "Next-Gen Fintech & Enterprise Cloud",
    logoUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&q=80",
    badge: "💎 Fintech & Cloud",
  },
];

export default function BrandKitPage() {
  const { isDark } = useAdminTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brandName, setBrandName] = useState("Blinko Tech");
  const [tagline, setTagline] = useState("Ideas in. Action out.");
  const [logoUrl, setLogoUrl] = useState<string | null>(
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
  );
  const [activeTab, setActiveTab] = useState<
    "guidelines" | "deliverables" | "colors" | "typography" | "mockups"
  >("guidelines");

  const generate = useCallback((url: string, name: string, tag: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const rawColors = extractDominantColors(img, 6);
      const colors = buildBrandColors(rawColors);
      const typography = detectTypography(colors);
      setBrandKit({
        logoUrl: url,
        brandName: name || "Your Brand",
        tagline: tag || "Precision. Craft. Impact.",
        colors,
        typography,
      });
      setIsProcessing(false);
    };
    img.onerror = () => {
      // Fallback colors if image crossOrigin fails
      const fallbackColors: BrandColor[] = [
        { hex: "#FF5A4F", rgb: [255, 90, 79], name: "Primary Coral", role: "primary" },
        { hex: "#4DABFF", rgb: [77, 171, 255], name: "Secondary Sky Blue", role: "secondary" },
        { hex: "#AEEA00", rgb: [174, 234, 0], name: "Accent Lime", role: "accent" },
        { hex: "#FFC83D", rgb: [255, 200, 61], name: "Warm Yellow", role: "neutral" },
        { hex: "#F8FAFC", rgb: [248, 250, 252], name: "Light Background", role: "background" },
        { hex: "#11171F", rgb: [17, 23, 31], name: "Dark Text", role: "text" },
      ];
      setBrandKit({
        logoUrl: url,
        brandName: name || "Your Brand",
        tagline: tag || "Precision. Craft. Impact.",
        colors: fallbackColors,
        typography: {
          heading: "Outfit",
          body: "DM Sans",
          headingWeight: "800",
          mood: "Fresh & Modern",
        },
      });
      setIsProcessing(false);
    };
    img.src = url;
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&family=DM+Sans:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;600;700&family=Inter:wght@400;500;600&family=Syne:wght@700;800&family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Lato:wght@400;700&family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Jost:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    // Initialize with default preset so no tab starts empty
    generate(
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      "Blinko Tech",
      "Ideas in. Action out."
    );

    return () => {
      try {
        document.head.removeChild(link);
      } catch (_) {}
    };
  }, [generate]);

  const loadPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setBrandName(preset.name);
    setTagline(preset.tagline);
    setLogoUrl(preset.logoUrl);
    setIsProcessing(true);
    generate(preset.logoUrl, preset.name, preset.tagline);
  };

  const processImage = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setIsProcessing(true);
      try {
        const { compressImageFile } = await import("@/lib/imageOptimizer");
        const compressedUrl = await compressImageFile(file, { maxWidth: 800, maxHeight: 800, quality: 0.85 });
        setLogoUrl(compressedUrl);
        generate(compressedUrl, brandName, tagline);
      } catch (err) {
        console.error("Logo optimization error:", err);
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          setLogoUrl(url);
          generate(url, brandName, tagline);
        };
        reader.readAsDataURL(file);
      }
    },
    [brandName, tagline, generate]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processImage(f);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processImage(f);
  };

  const regenerate = () => {
    if (logoUrl) {
      setIsProcessing(true);
      generate(logoUrl, brandName, tagline);
    }
  };

  const card = isDark
    ? "bg-[#0D1117] border-white/[0.07]"
    : "bg-white border-slate-200 shadow-sm";
  const text = isDark ? "text-white" : "text-slate-900";
  const muted = isDark ? "text-slate-400" : "text-slate-500";
  const subtle = isDark
    ? "bg-[#161B22] border-white/[0.06]"
    : "bg-slate-50 border-slate-200";

  const tabs = [
    { id: "guidelines" as const, label: "Brand Guidelines (Sheet & PDF)", icon: Eye },
    { id: "deliverables" as const, label: "Deliverables Catalog (150+)", icon: Layers },
    { id: "colors" as const, label: "Color Palette", icon: Palette },
    { id: "typography" as const, label: "Typography", icon: Type },
    { id: "mockups" as const, label: "Live Mockups", icon: Layout },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#010804]" : "bg-slate-50"} pb-16`}>
      {/* Header */}
      <div
        className={`border-b px-6 py-5 no-print ${
          isDark ? "border-white/[0.06] bg-[#050A0F]" : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#00FF87]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#00FF87] font-bold">
                Design System Engine
              </span>
            </div>
            <h1 className={`text-xl font-black ${text}`}>Brand Identity Guidelines &amp; Style Manual</h1>
            <p className={`text-xs mt-0.5 ${muted}`}>
              Complete brand manual matching professional agency guidelines with cover page, logo rules, typography, and PDF export
            </p>
          </div>
          <div className="flex items-center gap-2">
            {brandKit && (
              <button
                onClick={regenerate}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${subtle} ${muted} hover:border-[#00FF87]/40 cursor-pointer`}
              >
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] text-xs font-black transition-all shadow-[0_4px_20px_rgba(0,255,135,0.3)] cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" /> Export Brand Manual (PDF)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Step 1: Upload Card */}
        <div className={`rounded-2xl border p-6 no-print ${card}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#00FF87]">
                Step 01
              </p>
              <h2 className={`text-sm font-bold ${text}`}>Upload Brand Logo</h2>
            </div>
            <span className={`text-xs ${muted}`}>PNG, SVG, JPG, WebP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`block text-[11px] font-mono font-semibold mb-1 ${muted}`}>
                Brand Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Studio"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-all ${
                  isDark
                    ? "bg-[#161B22] border-white/10 text-white placeholder-slate-600 focus:border-[#00FF87]/50"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#00FF87]"
                }`}
              />
            </div>
            <div>
              <label className={`block text-[11px] font-mono font-semibold mb-1 ${muted}`}>
                Brand Tagline (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Design. Build. Scale."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-all ${
                  isDark
                    ? "bg-[#161B22] border-white/10 text-white placeholder-slate-600 focus:border-[#00FF87]/50"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#00FF87]"
                }`}
              />
            </div>
          </div>

          {/* Sample Preset Brand Chips */}
          <div className="mb-4">
            <label className={`block text-[10px] font-mono font-bold uppercase tracking-wider mb-2 ${muted}`}>
              Or Try 1-Click Sample Brand Presets:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    brandName === preset.name
                      ? "border-[#00FF87] bg-emerald-500/10 shadow-xs"
                      : isDark
                      ? "border-white/10 hover:border-white/20 bg-white/[0.02]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <img
                    src={preset.logoUrl}
                    alt={preset.name}
                    className="w-8 h-8 rounded-lg object-cover border border-white/20 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${brandName === preset.name ? "text-[#00FF87]" : text}`}>
                      {preset.name}
                    </p>
                    <p className="text-[9.5px] font-mono text-slate-400 truncate">
                      {preset.badge}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
              dragging
                ? "border-[#00FF87] bg-[#00FF87]/5"
                : isDark
                ? "border-white/10 hover:border-white/20 bg-white/[0.01]"
                : "border-slate-300 hover:border-slate-400 bg-slate-50"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            {logoUrl ? (
              <div className="flex items-center gap-4">
                <img
                  src={logoUrl}
                  alt="Uploaded Logo"
                  className="h-14 w-auto max-w-[160px] object-contain drop-shadow"
                />
                <div className="text-left">
                  <p className={`text-xs font-bold ${text}`}>Logo uploaded successfully</p>
                  <p className={`text-[10px] ${muted}`}>Click or drag to replace logo</p>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-white/5" : "bg-slate-200"
                  }`}
                >
                  <Upload className="w-5 h-5 text-[#00FF87]" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${text}`}>Drop your brand logo here</p>
                  <p className={`text-[11px] mt-0.5 ${muted}`}>
                    PNG, SVG, JPG, WebP supported
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-[10px] font-mono font-bold border border-[#00FF87]/20">
                  Click or drag to upload
                </span>
              </>
            )}
          </div>

          {logoUrl && !isProcessing && (
            <button
              onClick={regenerate}
              className="mt-4 w-full py-3 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-sm transition-all shadow-[0_4px_20px_rgba(0,255,135,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Generate / Refresh Brand Kit
            </button>
          )}
        </div>

        {/* Navigation Tabs (Available at all times) */}
        <div className={`flex gap-1.5 p-1.5 rounded-xl border ${subtle} overflow-x-auto no-print`}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === id
                  ? "bg-[#00FF87] text-[#02180C] shadow-sm font-bold"
                  : `${muted} hover:text-[#00FF87]`
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: Brand Guidelines Sheet */}
        {activeTab === "guidelines" && (
          <BrandGuidelineSheet
            brandKit={brandKit}
            brandName={brandName}
            tagline={tagline}
            logoUrl={logoUrl}
            isDarkTheme={isDark}
          />
        )}

        {/* TAB 2: Deliverables Catalog (150+ items across 8 systems with aspect-ratio visual markers) */}
        {activeTab === "deliverables" && (
          <DeliverablesCatalog brandKit={brandKit} isDark={isDark} />
        )}

        {/* TAB 3: Colors */}
        {activeTab === "colors" && (
          <>
            {brandKit ? (
              <div className={`rounded-2xl border p-6 ${card} space-y-6`}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h2 className={`text-sm font-bold mb-0.5 ${text}`}>Color Palette</h2>
                    <p className={`text-xs ${muted}`}>
                      Auto-extracted from your logo. Click any swatch to copy hex code.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const cssVars = `:root {\n${brandKit.colors
                          .map((c, i) => `  --color-${c.role || `color-${i + 1}`}: ${c.hex}; /* ${c.name} */`)
                          .join("\n")}\n}`;
                        navigator.clipboard.writeText(cssVars);
                        alert("CSS Variables copied to clipboard!");
                      }}
                      className="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-[#00FF87]/50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSS Variables</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const jsonStr = JSON.stringify(brandKit.colors, null, 2);
                        const blob = new Blob([jsonStr], { type: "application/json" });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `${(brandName || "brand").toLowerCase().replace(/\s/g, "-")}-colors.json`;
                        a.click();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#00FF87]/20 border border-[#00FF87]/40 text-[#00FF87] text-xs font-semibold hover:bg-[#00FF87]/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {brandKit.colors.map((color, i) => (
                    <ColorSwatch key={i} color={color} isDark={isDark} />
                  ))}
                </div>

                <div className={`p-4 rounded-xl border ${subtle}`}>
                  <p
                    className={`text-[11px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                  >
                    Color Usage Guide
                  </p>
                  <div className="space-y-2">
                    {brandKit.colors.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-lg flex-shrink-0 border border-white/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="flex-1">
                          <p className={`text-xs font-semibold ${text}`}>
                            {c.name}{" "}
                            <span className="font-mono text-slate-400">{c.hex}</span>
                          </p>
                          <p className={`text-[10px] ${muted}`}>
                            {[
                              "Primary buttons, headings, key UI elements",
                              "Secondary elements, hover states, borders",
                              "CTAs, highlights, icon accents",
                              "Backgrounds, dividers, subtle surfaces",
                            ][i]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl border p-12 ${card} text-center`}>
                <Palette className="w-10 h-10 text-[#00FF87] mx-auto mb-3 opacity-60" />
                <h3 className={`text-sm font-bold ${text}`}>No Colors Extracted Yet</h3>
                <p className={`text-xs mt-1 max-w-sm mx-auto ${muted}`}>
                  Upload your logo in Step 01 above to auto-extract the dominant color palette with Canvas API.
                </p>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00FF87] text-[#02180C] text-xs font-bold inline-flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Logo Now
                </button>
              </div>
            )}
          </>
        )}

        {/* TAB 3: Typography */}
        {activeTab === "typography" && (
          <>
            {brandKit ? (
              <div className={`rounded-2xl border p-6 ${card}`}>
                <h2 className={`text-sm font-bold mb-1 ${text}`}>Typography System</h2>
                <p className={`text-xs mb-5 ${muted}`}>
                  Auto-selected pairing based on your brand color personality:{" "}
                  <strong>{brandKit.typography.mood}</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-xl border ${subtle}`}>
                    <p
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                    >
                      Heading Font
                    </p>
                    <p
                      className={`text-3xl font-bold mb-2 ${text}`}
                      style={{
                        fontFamily: brandKit.typography.heading,
                        fontWeight: brandKit.typography.headingWeight,
                      }}
                    >
                      {brandKit.brandName}
                    </p>
                    <p
                      className={`text-sm ${text}`}
                      style={{ fontFamily: brandKit.typography.heading }}
                    >
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp
                    </p>
                    <p className={`text-[11px] font-mono mt-3 ${muted}`}>
                      {brandKit.typography.heading} · Weight {brandKit.typography.headingWeight}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-[9px] font-mono font-bold border border-[#00FF87]/20">
                      {brandKit.typography.mood}
                    </span>
                  </div>
                  <div className={`p-5 rounded-xl border ${subtle}`}>
                    <p
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                    >
                      Body Font
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${text}`}
                      style={{ fontFamily: brandKit.typography.body }}
                    >
                      Premium creative agency delivering world-class branding, digital design, and
                      performance marketing solutions that drive measurable growth for ambitious
                      brands.
                    </p>
                    <p className={`text-[11px] font-mono mt-3 ${muted}`}>
                      {brandKit.typography.body} · Weight 400 / 500
                    </p>
                  </div>
                </div>

                {/* Scale preview */}
                <div className={`mt-5 p-5 rounded-xl border ${subtle}`}>
                  <p
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-4 ${muted}`}
                  >
                    Type Scale Preview
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        size: "36px",
                        weight: "800",
                        label: "H1 — Display Title",
                        sample: "Headline Title",
                        font: brandKit.typography.heading,
                      },
                      {
                        size: "28px",
                        weight: "700",
                        label: "H2 — Section Title",
                        sample: "Section Heading",
                        font: brandKit.typography.heading,
                      },
                      {
                        size: "18px",
                        weight: "600",
                        label: "H3 — Card Title",
                        sample: "Card Title Here",
                        font: brandKit.typography.heading,
                      },
                      {
                        size: "14px",
                        weight: "400",
                        label: "Body — Paragraph",
                        sample: "Regular body paragraph text for reading and comprehension.",
                        font: brandKit.typography.body,
                      },
                      {
                        size: "11px",
                        weight: "600",
                        label: "Caption / Label",
                        sample: "LABEL · TAG · SPECIFICATION",
                        font: brandKit.typography.body,
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-baseline gap-4">
                        <span className={`text-[9px] font-mono w-28 flex-shrink-0 ${muted}`}>
                          {item.label}
                        </span>
                        <p
                          className={text}
                          style={{
                            fontSize: item.size,
                            fontWeight: item.weight,
                            fontFamily: item.font,
                            lineHeight: 1.2,
                          }}
                        >
                          {item.sample}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl border p-12 ${card} text-center`}>
                <Type className="w-10 h-10 text-[#00FF87] mx-auto mb-3 opacity-60" />
                <h3 className={`text-sm font-bold ${text}`}>No Typography Generated Yet</h3>
                <p className={`text-xs mt-1 max-w-sm mx-auto ${muted}`}>
                  Upload your logo in Step 01 above to auto-detect the matching typography pairings and mood.
                </p>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00FF87] text-[#02180C] text-xs font-bold inline-flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Logo Now
                </button>
              </div>
            )}
          </>
        )}

        {/* TAB 4: Live Mockups */}
        {activeTab === "mockups" && (
          <>
            {brandKit ? (
              <div className={`rounded-2xl border p-6 ${card} space-y-8`}>
                <div>
                  <h2 className={`text-sm font-bold mb-1 ${text}`}>Live Brand Mockups</h2>
                  <p className={`text-xs ${muted}`}>
                    Interactive mockups rendered in real-time with your uploaded logo and extracted colors.
                  </p>
                </div>

                <div>
                  <p
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                  >
                    01 — Business Card (85.6×54mm / Front & Back)
                  </p>
                  <BusinessCardMockup
                    kit={{
                      ...brandKit,
                      brandName: brandName || brandKit.brandName,
                      tagline: tagline || brandKit.tagline,
                    }}
                  />
                </div>

                <div>
                  <p
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                  >
                    02 — Social Media Assets (Profile, Banner, Post)
                  </p>
                  <SocialMockup
                    kit={{
                      ...brandKit,
                      brandName: brandName || brandKit.brandName,
                      tagline: tagline || brandKit.tagline,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                    >
                      03 — Mobile Story / Reel (1080×1920 / 9:16)
                    </p>
                    <StoryMockup
                      kit={{
                        ...brandKit,
                        brandName: brandName || brandKit.brandName,
                        tagline: tagline || brandKit.tagline,
                      }}
                    />
                  </div>

                  <div>
                    <p
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                    >
                      04 — Corporate Letterhead (A4 / 210×297mm)
                    </p>
                    <LetterheadMockup
                      kit={{
                        ...brandKit,
                        brandName: brandName || brandKit.brandName,
                        tagline: tagline || brandKit.tagline,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-3 ${muted}`}
                  >
                    05 — Email Signature Strip (600×200px)
                  </p>
                  <div
                    className={`flex items-center gap-4 p-4 rounded-xl border max-w-sm ${subtle}`}
                  >
                    {brandKit.logoUrl && (
                      <img
                        src={brandKit.logoUrl}
                        alt="Logo"
                        className="h-8 w-auto object-contain"
                      />
                    )}
                    <div
                      className="border-l-2 pl-4"
                      style={{ borderColor: brandKit.colors[2]?.hex || "#00FF87" }}
                    >
                      <p
                        className={`text-xs font-bold ${text}`}
                        style={{ fontFamily: brandKit.typography.heading }}
                      >
                        {brandName || brandKit.brandName}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {tagline || brandKit.tagline}
                      </p>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                        hello@{(brandName || "brand").toLowerCase().replace(/\s/g, "")}.com · +1 (000) 000-0000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl border p-12 ${card} text-center`}>
                <Layout className="w-10 h-10 text-[#00FF87] mx-auto mb-3 opacity-60" />
                <h3 className={`text-sm font-bold ${text}`}>No Mockups Generated Yet</h3>
                <p className={`text-xs mt-1 max-w-sm mx-auto ${muted}`}>
                  Upload your brand logo to view live rendered mockups: Business Card, Social Assets, Story/Reel, Letterhead, and Email Signature.
                </p>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00FF87] text-[#02180C] text-xs font-bold inline-flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Logo Now
                </button>
              </div>
            )}
          </>
        )}


        {/* Kit Summary Bottom Strip */}
        {brandKit && (
          <div
            className={`rounded-2xl border p-5 ${card} flex flex-wrap gap-6 items-center no-print`}
          >
            {brandKit.logoUrl && (
              <img
                src={brandKit.logoUrl}
                alt="Brand"
                className="h-8 w-auto object-contain"
              />
            )}
            <div>
              <p className={`text-sm font-black ${text}`}>
                {brandName || brandKit.brandName}
              </p>
              <p className={`text-[10px] ${muted}`}>{tagline || brandKit.tagline}</p>
            </div>
            <div className="flex gap-1.5">
              {brandKit.colors.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white/20 shadow"
                  style={{ backgroundColor: c.hex }}
                  title={c.hex}
                />
              ))}
            </div>
            <p className={`text-[11px] font-mono ${muted}`}>
              {brandKit.typography.heading} + {brandKit.typography.body}
            </p>
            <div className="ml-auto">
              <span className="px-3 py-1 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-[10px] font-mono font-bold border border-[#00FF87]/20">
                {brandKit.typography.mood}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
