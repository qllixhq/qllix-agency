"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Video, CheckCircle2, Sparkles } from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  acceptVideo?: boolean;
  helpText?: string;
  recommendedDimensions?: string;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  acceptVideo = true,
  helpText,
  recommendedDimensions
}: MediaUploaderProps) {
  const { isDark } = useAdminTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeMode, setActiveMode] = useState<"file" | "url">("file");
  const [urlInput, setUrlInput] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isVideo =
    value &&
    (value.endsWith(".mp4") ||
      value.endsWith(".webm") ||
      value.includes("video") ||
      value.startsWith("data:video/"));

  const processFile = async (file: File) => {
    if (!file) return;

    // Validate size (max 20MB for video, 20MB for images)
    if (file.size > 20 * 1024 * 1024) {
      alert("File is too large. Please select a file under 20MB.");
      return;
    }

    setIsUploading(true);
    try {
      if (file.type.startsWith("image/")) {
        const { compressImageFile } = await import("@/lib/imageOptimizer");
        const compressed = await compressImageFile(file, { maxWidth: 1400, maxHeight: 1400, quality: 0.82 });
        onChange(compressed);
        setUrlInput(compressed);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          onChange(result);
          setUrlInput(result);
        };
        reader.onerror = () => {
          alert("Failed to read file from disk.");
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Media processing error:", err);
      alert("Failed to process media file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <label className={`block text-xs font-mono uppercase font-bold ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            {label}
          </label>
          {recommendedDimensions && (
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              isDark
                ? "text-[#00FF87] bg-emerald-500/10 border-emerald-500/30"
                : "text-emerald-700 bg-emerald-50 border-emerald-300"
            }`}>
              Size: {recommendedDimensions}
            </span>
          )}
        </div>
        
        {/* Toggle Mode */}
        <div className={`flex items-center gap-1 text-[11px] font-mono p-0.5 rounded-xl border ${
          isDark ? "bg-black/50 border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => setActiveMode("file")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold ${
              activeMode === "file"
                ? "bg-[#00FF87] text-[#02180C] shadow-xs"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("url")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold ${
              activeMode === "url"
                ? "bg-[#00FF87] text-[#02180C] shadow-xs"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Enter URL
          </button>
        </div>
      </div>

      {/* Mode 1: Direct File Upload with Drag & Drop */}
      {activeMode === "file" && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={acceptVideo ? "image/*,video/mp4,video/webm" : "image/*"}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-4 transition-all text-center cursor-pointer group ${
              isDragging
                ? "border-[#00FF87] bg-emerald-500/10 scale-[1.01]"
                : isDark
                ? "border-white/15 hover:border-[#00FF87]/60 bg-black/40 hover:bg-black/60"
                : "border-slate-300 hover:border-emerald-500 bg-slate-50/80 hover:bg-slate-100/90"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                isDark
                  ? "bg-white/5 group-hover:bg-[#00FF87]/20 text-[#00FF87]"
                  : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200"
              }`}>
                <Upload className="w-5 h-5" />
              </div>
              <div className={`text-xs font-bold transition-colors ${
                isDark
                  ? "text-white group-hover:text-[#00FF87]"
                  : "text-slate-800 group-hover:text-emerald-700"
              }`}>
                {isUploading
                  ? "Uploading & processing..."
                  : isDragging
                  ? "Drop image file here!"
                  : "Click to browse or drag & drop image"}
              </div>
              <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {acceptVideo ? "Supports PNG, JPG, WebP, MP4, WebM (Max 8MB)" : "Supports PNG, JPG, WebP (Max 8MB)"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: URL Input */}
      {activeMode === "url" && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <LinkIcon className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`} />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://... or /images/campaign-banner.jpg"
              className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00FF87] ${
                isDark
                  ? "bg-black/60 border-white/10 text-white"
                  : "bg-white border-slate-300 text-slate-900"
              }`}
            />
          </div>
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-[#00FF87] text-[#02180C] font-bold text-xs hover:bg-[#00DF81] transition-all cursor-pointer shrink-0 shadow-xs"
          >
            Apply
          </button>
        </div>
      )}

      {/* Quick Preset Samples for 1:1 Graphic */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Sample Assets:
        </span>
        <button
          type="button"
          onClick={() => {
            onChange("/images/campaign-banner.jpg");
            setUrlInput("/images/campaign-banner.jpg");
          }}
          className={`text-[10.5px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
            value === "/images/campaign-banner.jpg"
              ? "border-[#00FF87] bg-emerald-500/10 text-emerald-600 dark:text-[#00FF87] font-bold"
              : isDark
              ? "border-white/10 hover:border-white/20 text-slate-400"
              : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
          }`}
        >
          Default Campaign Banner
        </button>
        <button
          type="button"
          onClick={() => {
            onChange("/images/campaign-banner-square.jpg");
            setUrlInput("/images/campaign-banner-square.jpg");
          }}
          className={`text-[10.5px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
            value === "/images/campaign-banner-square.jpg"
              ? "border-[#00FF87] bg-emerald-500/10 text-emerald-600 dark:text-[#00FF87] font-bold"
              : isDark
              ? "border-white/10 hover:border-white/20 text-slate-400"
              : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
          }`}
        >
          Square Promo 1:1
        </button>
      </div>

      {/* Media Preview Box if value exists */}
      {value && (
        <div className={`relative rounded-2xl overflow-hidden border p-2.5 flex items-center gap-3 transition-colors ${
          isDark
            ? "border-emerald-500/30 bg-black/70"
            : "border-emerald-200 bg-emerald-50/70"
        }`}>
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/20 bg-black/90 shadow-xs">
            {isVideo ? (
              <video src={value} className="w-full h-full object-cover" muted autoPlay loop playsInline />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/campaign-banner.jpg";
                }}
              />
            )}
          </div>

          <div className="flex-1 min-w-0 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-[#00FF87] font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Media Attached &amp; Ready</span>
            </div>
            <div className={`text-[10.5px] truncate mt-0.5 font-mono ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}>
              {value.startsWith("data:") ? "Local Upload (Base64 file)" : value}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Aspect Ratio: 1:1 Square recommended
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25 transition-colors cursor-pointer shrink-0"
            title="Remove Media"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {helpText && (
        <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {helpText}
        </p>
      )}
    </div>
  );
}
