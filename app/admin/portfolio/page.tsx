"use client";

import React, { useState, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { PortfolioCategory, PortfolioItem } from "@/lib/cmsStore";
import { 
  Plus, Pencil, Trash2, X, Check, ArrowUp, ArrowDown, 
  Upload, Image as ImageIcon, Video, Link as LinkIcon, 
  Film, ExternalLink, Sparkles 
} from "lucide-react";

const CATEGORIES: PortfolioCategory[] = ["Branding", "Logo", "Social Media", "Packaging", "Motion", "Video", "Marketing"];

interface FormState {
  title: string;
  category: PortfolioCategory;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  videoUrl: string;
  projectUrl: string;
  client: string;
  deliverablesText: string;
  active: boolean;
  displayOrder: number;
}

const emptyItem = (): FormState => ({
  title: "",
  category: "Branding",
  description: "",
  imageUrl: "",
  galleryImages: [],
  videoUrl: "",
  projectUrl: "",
  client: "",
  deliverablesText: "",
  active: true,
  displayOrder: 1,
});

export default function AdminPortfolioPage() {
  const { cmsData, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useCms();
  const [filter, setFilter] = useState<"All" | PortfolioCategory>("All");
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<FormState>(emptyItem());
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const coverFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const all = [...cmsData.portfolioItems].sort((a, b) => a.displayOrder - b.displayOrder);
  const filtered = filter === "All" ? all : all.filter((p) => p.category === filter);

  const openNew = () => {
    setForm({ ...emptyItem(), displayOrder: all.length + 1 });
    setEditing(null);
    setIsNew(true);
    setNewGalleryUrl("");
    setSaveSuccessMessage(null);
  };

  const openEdit = (p: PortfolioItem) => {
    setForm({
      title: p.title,
      category: p.category,
      description: p.description,
      imageUrl: p.imageUrl,
      galleryImages: p.galleryImages || [],
      videoUrl: p.videoUrl || "",
      projectUrl: p.projectUrl || "",
      client: p.client || "",
      deliverablesText: (p.deliverables || []).join(", "),
      active: p.active,
      displayOrder: p.displayOrder,
    });
    setEditing(p);
    setIsNew(false);
    setNewGalleryUrl("");
    setSaveSuccessMessage(null);
  };

  // Handle Cover Image File Upload with Canvas Compression
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCover(true);
    try {
      const { compressImageFile } = await import("@/lib/imageOptimizer");
      const compressed = await compressImageFile(file, { maxWidth: 1400, maxHeight: 1400, quality: 0.82 });
      setForm((prev) => ({ ...prev, imageUrl: compressed }));
    } catch (err) {
      console.error("Image compression error:", err);
      alert("Could not process image file. Please try another image.");
    } finally {
      setIsUploadingCover(false);
      if (e.target) e.target.value = "";
    }
  };

  // Handle Multiple Gallery Files Upload with Parallel Canvas Compression
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingGallery(true);
    try {
      const { compressImageFile } = await import("@/lib/imageOptimizer");
      const fileList = Array.from(files);
      const compressedList = await Promise.all(
        fileList.map((f) => compressImageFile(f, { maxWidth: 1400, maxHeight: 1400, quality: 0.82 }))
      );
      setForm((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...compressedList],
      }));
    } catch (err) {
      console.error("Gallery compression error:", err);
      alert("Could not process one or more gallery images.");
    } finally {
      setIsUploadingGallery(false);
      if (e.target) e.target.value = "";
    }
  };

  // Add Gallery Image from URL
  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, newGalleryUrl.trim()],
    }));
    setNewGalleryUrl("");
  };

  // Remove Gallery Image
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Handle Video File Upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert("Video file is too large. Max allowed is 20MB. Consider uploading to YouTube or Vimeo and pasting the link.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setForm((prev) => ({ ...prev, videoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.imageUrl.trim()) {
      alert("Please provide both a Project Title and a Cover Image.");
      return;
    }

    setIsSaving(true);
    const deliverables = form.deliverablesText
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    const itemData: Omit<PortfolioItem, "id"> = {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      galleryImages: form.galleryImages.filter(Boolean),
      videoUrl: form.videoUrl.trim() || undefined,
      projectUrl: form.projectUrl.trim() || undefined,
      client: form.client.trim() || undefined,
      deliverables: deliverables.length > 0 ? deliverables : undefined,
      active: form.active,
      displayOrder: form.displayOrder,
    };

    try {
      if (isNew) {
        addPortfolioItem({ ...itemData, id: `pf-${Date.now()}` });
      } else if (editing) {
        updatePortfolioItem(editing.id, itemData);
      }

      setSaveSuccessMessage(isNew ? "New project published successfully!" : "Portfolio item updated successfully!");
      setEditing(null);
      setIsNew(false);
      setTimeout(() => setSaveSuccessMessage(null), 4000);
    } catch (e: any) {
      alert("Save error: " + (e?.message || "Could not save project"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleMove = (id: string, dir: "up" | "down") => {
    const items = [...cmsData.portfolioItems].sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = items.findIndex((p) => p.id === id);
    const target = dir === "up" ? items[idx - 1] : items[idx + 1];
    if (!target) return;
    updatePortfolioItem(id, { displayOrder: target.displayOrder });
    updatePortfolioItem(target.id, { displayOrder: items[idx].displayOrder });
  };

  const showForm = editing || isNew;

  return (
    <div>
      <AdminHeader
        title="Portfolio Management"
        subtitle={`${all.filter((p) => p.active).length} active · ${all.length} total projects`}
        action={{ label: "Add Project", onClick: openNew, icon: <Plus className="w-4 h-4" /> }}
      />

      <div className="p-6 lg:p-10 max-w-7xl space-y-6">
        {/* Form Modal/Card */}
        {showForm && (
          <div className="rounded-2xl bg-[#0A0F14] border border-[#00FF87]/30 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00FF87]" />
                <h3 className="text-lg font-black text-white">
                  {isNew ? "Create New Project" : `Edit — ${editing?.title}`}
                </h3>
              </div>
              <button 
                onClick={() => { setEditing(null); setIsNew(false); }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Project Title */}
              <FField label="Project Title *">
                <input 
                  className={inp} 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  placeholder="e.g. Apex Nitro Energy — Brand & Packaging" 
                />
              </FField>

              {/* Category */}
              <FField label="Category">
                <select 
                  className={inp} 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value as PortfolioCategory })}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FField>

              {/* Client Name */}
              <FField label="Client Name (optional)">
                <input 
                  className={inp} 
                  value={form.client} 
                  onChange={(e) => setForm({ ...form, client: e.target.value })} 
                  placeholder="e.g. Apex Global Ltd." 
                />
              </FField>

              {/* Project External URL (Live Link) */}
              <FField label="Live Project Link / URL (e.g. Behance, Dribbble, Website)">
                <div className="relative">
                  <input 
                    className={`${inp} pl-9`} 
                    value={form.projectUrl} 
                    onChange={(e) => setForm({ ...form, projectUrl: e.target.value })} 
                    placeholder="https://behance.net/gallery/... or https://yoursite.com" 
                  />
                  <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </FField>

              {/* Description */}
              <div className="sm:col-span-2">
                <FField label="Description">
                  <textarea 
                    rows={3} 
                    className={`${inp} resize-none`} 
                    value={form.description} 
                    onChange={(e) => setForm({ ...form, description: e.target.value })} 
                    placeholder="Brief story, brand context, and outcomes shown in the project view modal" 
                  />
                </FField>
              </div>

              {/* Deliverables / Scope */}
              <div className="sm:col-span-2">
                <FField label="Deliverables (Comma-separated tags)">
                  <input 
                    className={inp} 
                    value={form.deliverablesText} 
                    onChange={(e) => setForm({ ...form, deliverablesText: e.target.value })} 
                    placeholder="e.g. Logo Design, 3D Product Renders, Social Kit, Brand Identity" 
                  />
                </FField>
              </div>

              {/* ═══ 1. COVER IMAGE UPLOAD ═══ */}
              <div className="sm:col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#00FF87]" />
                    Main Cover Image *
                  </label>
                  <button
                    type="button"
                    disabled={isUploadingCover}
                    onClick={() => coverFileRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-[#00FF87]/20 border border-[#00FF87]/40 text-[#00FF87] text-xs font-semibold hover:bg-[#00FF87]/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {isUploadingCover ? "Compressing..." : "Upload Image File"}
                  </button>
                  <input
                    ref={coverFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                </div>

                <input 
                  className={inp} 
                  value={form.imageUrl} 
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} 
                  placeholder="Or paste direct image URL (https://images.unsplash.com/...)" 
                />

                {form.imageUrl && (
                  <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-[#00FF87]/40 shadow-md mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={form.imageUrl} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </div>

              {/* ═══ 2. MULTIPLE GALLERY IMAGES UPLOAD ═══ */}
              <div className="sm:col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00FF87]" />
                      Multiple Project Images (Gallery)
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Upload multiple images or paste image URLs so viewers can browse all project photos.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isUploadingGallery}
                    onClick={() => galleryFileRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-[#00FF87] text-[#02180C] text-xs font-bold hover:bg-[#00e87a] flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {isUploadingGallery ? "Optimizing..." : "Upload Multiple Images"}
                  </button>
                  <input
                    ref={galleryFileRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />
                </div>

                {/* Add by URL */}
                <div className="flex gap-2">
                  <input
                    className={inp}
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="Or paste an image URL to add to gallery..."
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddGalleryUrl(); } }}
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryUrl}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold shrink-0"
                  >
                    Add URL
                  </button>
                </div>

                {/* Thumbnails of gallery images */}
                {form.galleryImages.length > 0 ? (
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-2">
                      {form.galleryImages.length} Additional {form.galleryImages.length === 1 ? "Image" : "Images"} Attached:
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {form.galleryImages.map((img, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-square bg-black">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md"
                            title="Remove image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic">No extra gallery images added yet.</div>
                )}
              </div>

              {/* ═══ 3. VIDEO UPLOAD & URL ═══ */}
              <div className="sm:col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                      <Film className="w-4 h-4 text-[#00FF87]" />
                      Project Video (Upload or YouTube/Vimeo/MP4 URL)
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Viewers will get an interactive video player inside the project viewer modal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => videoFileRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-[#00FF87]/20 border border-[#00FF87]/40 text-[#00FF87] text-xs font-semibold hover:bg-[#00FF87]/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Video File
                  </button>
                  <input
                    ref={videoFileRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </div>

                <div className="relative">
                  <input 
                    className={`${inp} pl-9`} 
                    value={form.videoUrl} 
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} 
                    placeholder="e.g. https://www.youtube.com/watch?v=... or direct .mp4 link" 
                  />
                  <Video className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {form.videoUrl && (
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                      <Film className="w-4 h-4 text-[#00FF87] shrink-0" />
                      <span className="truncate">{form.videoUrl.slice(0, 70)}...</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, videoUrl: "" })}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold ml-2 shrink-0"
                    >
                      Remove Video
                    </button>
                  </div>
                )}
              </div>

              {/* Display Order & Active */}
              <FField label="Display Order">
                <input 
                  type="number" 
                  className={inp} 
                  value={form.displayOrder} 
                  onChange={(e) => setForm({ ...form, displayOrder: +e.target.value })} 
                />
              </FField>

              <div className="flex items-center gap-2 self-end mb-2">
                <input 
                  type="checkbox" 
                  checked={form.active} 
                  onChange={(e) => setForm({ ...form, active: e.target.checked })} 
                  className="accent-[#00FF87] w-4 h-4" 
                  id="pf-active" 
                />
                <label htmlFor="pf-active" className="text-sm font-semibold text-slate-300 cursor-pointer">
                  Active (visible on website)
                </label>
              </div>
            </div>

            {/* Save & Cancel buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button 
                onClick={handleSave} 
                disabled={isSaving || isUploadingCover || isUploadingGallery}
                className="px-6 py-2.5 rounded-xl bg-[#00FF87] text-[#02180C] font-black text-sm hover:bg-[#00e87a] flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                {isSaving ? "Saving & Syncing Live..." : isNew ? "Publish Project" : "Save Changes"}
              </button>
              <button 
                onClick={() => { setEditing(null); setIsNew(false); }} 
                className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {saveSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-[#00FF87]/40 text-[#00FF87] flex items-center gap-2.5 text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
            <Check className="w-4 h-4 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as "All" | PortfolioCategory)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === cat 
                  ? "bg-[#00FF87]/15 border-[#00FF87]/40 text-[#00FF87]" 
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const hasGallery = p.galleryImages && p.galleryImages.length > 0;
            const hasVideo = !!p.videoUrl && p.videoUrl.trim().length > 0;

            return (
              <div 
                key={p.id} 
                className={`rounded-xl overflow-hidden border ${p.active ? "border-white/[0.08]" : "border-white/[0.04] opacity-50"} bg-[#0A0F14] group transition-all`}
              >
                <div className="relative aspect-[4/3] bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                  
                  {/* Badges for media attachments */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    {hasGallery && (
                      <span className="px-2 py-0.5 rounded-md bg-black/75 text-[#00FF87] text-[10px] font-mono flex items-center gap-1 border border-white/10">
                        <ImageIcon className="w-3 h-3" />
                        {p.galleryImages?.length}
                      </span>
                    )}
                    {hasVideo && (
                      <span className="px-2 py-0.5 rounded-md bg-black/75 text-[#00FF87] text-[10px] font-mono flex items-center gap-1 border border-white/10">
                        <Film className="w-3 h-3" />
                        Video
                      </span>
                    )}
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => openEdit(p)} 
                      className="p-2 rounded-lg bg-[#00FF87]/20 text-[#00FF87] hover:bg-[#00FF87]/30 transition-all cursor-pointer"
                      title="Edit project"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {p.projectUrl && (
                      <a 
                        href={p.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer"
                        title="View live link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button 
                      onClick={() => { if (confirm("Delete this project?")) deletePortfolioItem(p.id); }} 
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="text-[10.5px] font-mono text-[#00FF87]/80 mb-1 font-bold">{p.category}</div>
                  <div className="text-sm font-semibold text-white leading-tight line-clamp-1">{p.title}</div>
                  {p.client && (
                    <div className="text-xs text-slate-400 mt-1 truncate">Client: {p.client}</div>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <button 
                      onClick={() => updatePortfolioItem(p.id, { active: !p.active })} 
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        p.active 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                          : "bg-white/5 text-slate-500 border-white/10"
                      }`}
                    >
                      {p.active ? "Active" : "Hidden"}
                    </button>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleMove(p.id, "up")} 
                        className="text-slate-500 hover:text-white p-0.5 transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleMove(p.id, "down")} 
                        className="text-slate-500 hover:text-white p-0.5 transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">
            No portfolio projects in this category.
          </div>
        )}
      </div>
    </div>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-300">{label}</label>
      {children}
    </div>
  );
}

const inp = "w-full bg-[#131920] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF87]/50 transition-all";
