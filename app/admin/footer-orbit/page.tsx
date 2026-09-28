"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, ImagePlus, Trash2, Upload } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { compressImageFile } from "@/lib/imageOptimizer";

const MAX_ORBIT_IMAGES = 6;

export default function FooterOrbitPage() {
  const { cmsData, updateFooterOrbitImages } = useCms();
  const { isDark } = useAdminTheme();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = cmsData.footerOrbitImages || [];

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2600);
  };

  const addImage = (url: string) => {
    const cleanUrl = url.trim();
    if (!cleanUrl || images.length >= MAX_ORBIT_IMAGES) return;
    updateFooterOrbitImages([...images, cleanUrl]);
    setImageUrl("");
    showMessage("Orbit image added.");
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || images.length >= MAX_ORBIT_IMAGES) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setIsUploading(true);
    try {
      const uploadedImage = await compressImageFile(file, { maxWidth: 640, maxHeight: 640, quality: 0.82 });
      addImage(uploadedImage);
    } catch {
      alert("This image could not be prepared. Please try another image.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    updateFooterOrbitImages(images.filter((_, imageIndex) => imageIndex !== index));
    showMessage("Orbit image removed.");
  };

  const panelClass = isDark ? "border-white/10 bg-[#0A0F14] text-white" : "border-slate-200 bg-white text-slate-900";
  const inputClass = isDark
    ? "border-white/10 bg-black/40 text-white placeholder:text-slate-500"
    : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400";

  return (
    <div>
      <AdminHeader title="Footer Orbit Images" subtitle="Manage the six avatar images shown in the footer network visual." />

      <div className="max-w-6xl space-y-6 p-6 lg:p-10">
        {message && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-[#00FF87]">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </div>
        )}

        <section className={`rounded-3xl border p-5 sm:p-6 ${panelClass}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="block flex-1">
              <span className="mb-1.5 block text-xs font-bold">Image URL</span>
              <input
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="Paste an image URL"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#00FF87] ${inputClass}`}
              />
            </label>
            <button
              type="button"
              onClick={() => addImage(imageUrl)}
              disabled={!imageUrl.trim() || images.length >= MAX_ORBIT_IMAGES}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00FF87] px-4 py-2.5 text-xs font-black text-[#02180C] transition hover:bg-[#00DF81] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ImagePlus className="h-4 w-4" /> Add image
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || images.length >= MAX_ORBIT_IMAGES}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/35 px-4 py-2.5 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#00FF87]"
            >
              <Upload className="h-4 w-4" /> {isUploading ? "Uploading" : "Upload"}
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-400">{images.length}/{MAX_ORBIT_IMAGES} images in use</p>
        </section>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((image, index) => (
            <article key={`${image}-${index}`} className={`group overflow-hidden rounded-2xl border p-2 ${panelClass}`}>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={`Orbit image ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white opacity-0 shadow-lg transition group-hover:opacity-100 focus:opacity-100"
                  aria-label={`Remove orbit image ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] font-bold text-slate-400">Image {index + 1}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
