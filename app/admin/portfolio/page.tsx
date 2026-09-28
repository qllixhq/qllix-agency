"use client";

import React, { useState, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import PortfolioStoryBuilder from "@/components/admin/PortfolioStoryBuilder";
import DribbblePortfolioEditor from "@/components/admin/DribbblePortfolioEditor";
import { useCms } from "@/context/CmsContext";
import { PortfolioCategory, PortfolioItem, ProjectContentBlock, ProjectBlockType } from "@/lib/cmsStore";
import {
  Plus, Pencil, Trash2, X, Check, ArrowUp, ArrowDown,
  Upload, Image as ImageIcon, Film, ExternalLink,
  Sparkles, MonitorPlay, Type, AlignLeft
} from "lucide-react";

const CATEGORIES: PortfolioCategory[] = ["Branding", "Logo", "Social Media", "Packaging", "Motion", "Video", "Marketing"];

interface FormState {
  title: string;
  category: PortfolioCategory;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  videoUrl: string;
  contentBlocks: ProjectContentBlock[];
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
  contentBlocks: [],
  projectUrl: "",
  client: "",
  deliverablesText: "",
  active: true,
  displayOrder: 1,
});

const getLegacyContentBlocks = (project: PortfolioItem): ProjectContentBlock[] => {
  const blocks: ProjectContentBlock[] = [];
  if (project.galleryImages?.length) {
    blocks.push({ id: `legacy-gallery-${project.id}`, type: "gallery", galleryImages: project.galleryImages });
  }
  if (project.videoUrl) {
    blocks.push({ id: `legacy-video-${project.id}`, type: "video", videoUrl: project.videoUrl });
  }
  return blocks;
};

export default function AdminPortfolioPage() {
  const { cmsData, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useCms();
  const [filter, setFilter] = useState<"All" | PortfolioCategory>("All");
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<FormState>(emptyItem());

  const [tagInput, setTagInput] = useState("");

  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const coverFileRef = useRef<HTMLInputElement>(null);

  const all = [...cmsData.portfolioItems].sort((a, b) => a.displayOrder - b.displayOrder);
  const filtered = filter === "All" ? all : all.filter((p) => p.category === filter);

  const openNew = () => {
    setForm({ ...emptyItem(), displayOrder: all.length + 1 });
    setEditing(null);
    setIsNew(true);
    setTagInput("");
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
      // An empty array means the editor deliberately removed every block.
      // Only old projects with no contentBlocks field should fall back to legacy media.
      contentBlocks: Array.isArray(p.contentBlocks) ? p.contentBlocks : getLegacyContentBlocks(p),
      projectUrl: p.projectUrl || "",
      client: p.client || "",
      deliverablesText: (p.deliverables || []).join(", "),
      active: p.active,
      displayOrder: p.displayOrder,
    });
    setEditing(p);
    setIsNew(false);
    setTagInput("");
    setSaveSuccessMessage(null);
  };

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

  const addContentBlock = (type: ProjectBlockType) => {
    const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const defaults: Record<ProjectBlockType, Omit<ProjectContentBlock, "id" | "type">> = {
      text: { heading: "", body: "" },
      image: { imageUrl: "", caption: "" },
      video: { videoUrl: "" },
      gallery: { galleryImages: [] },
    };
    setForm((previous) => ({
      ...previous,
      contentBlocks: [...previous.contentBlocks, { id, type, ...defaults[type] }],
    }));
  };

  const updateContentBlock = (id: string, partial: Partial<ProjectContentBlock>) => {
    setForm((previous) => ({
      ...previous,
      contentBlocks: previous.contentBlocks.map((block) =>
        block.id === id ? { ...block, ...partial } : block
      ),
    }));
  };

  const deleteContentBlock = (id: string) => {
    setForm((previous) => ({
      ...previous,
      contentBlocks: previous.contentBlocks.filter((block) => block.id !== id),
    }));
  };

  const moveContentBlock = (id: string, direction: "up" | "down") => {
    setForm((previous) => {
      const index = previous.contentBlocks.findIndex((block) => block.id === id);
      const nextIndex = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || nextIndex < 0 || nextIndex >= previous.contentBlocks.length) return previous;
      const blocks = [...previous.contentBlocks];
      [blocks[index], blocks[nextIndex]] = [blocks[nextIndex], blocks[index]];
      return { ...previous, contentBlocks: blocks };
    });
  };

  const handleContentImageUpload = async (id: string, files: FileList | null) => {
    if (!files?.length) return;
    setIsUploadingGallery(true);
    try {
      const { compressImageFile } = await import("@/lib/imageOptimizer");
      const images = await Promise.all(
        Array.from(files).map((file) => compressImageFile(file, { maxWidth: 1800, maxHeight: 1800, quality: 0.84 }))
      );
      setForm((previous) => ({
        ...previous,
        contentBlocks: previous.contentBlocks.map((block) => {
          if (block.id !== id) return block;
          return block.type === "gallery"
            ? { ...block, galleryImages: [...(block.galleryImages || []), ...images] }
            : { ...block, imageUrl: images[0] };
        }),
      }));
    } catch (error) {
      console.error("Project content image upload failed:", error);
      alert("Could not process this image. Please try another file.");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleContentVideoUpload = (id: string, file: File | undefined) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("For this CMS, please use a video link for files over 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateContentBlock(id, { videoUrl: String(reader.result || "") });
    reader.readAsDataURL(file);
  };

  const currentTags = form.deliverablesText ? form.deliverablesText.split(",").map(t => t.trim()).filter(Boolean) : [];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...currentTags, tagInput.trim()];
      setForm({ ...form, deliverablesText: newTags.join(", ") });
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const newTags = currentTags.filter((_, idx) => idx !== indexToRemove);
    setForm({ ...form, deliverablesText: newTags.join(", ") });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.imageUrl.trim()) {
      alert("Please provide both a Project Title and a Cover Image.");
      return;
    }
    setIsSaving(true);
    const itemData: Omit<PortfolioItem, "id"> = {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      galleryImages: form.galleryImages.filter(Boolean),
      videoUrl: form.videoUrl.trim() || undefined,
      contentBlocks: form.contentBlocks.filter((block) => {
        if (block.type === "text") return Boolean(block.heading?.trim() || block.body?.trim());
        if (block.type === "image") return Boolean(block.imageUrl);
        if (block.type === "video") return Boolean(block.videoUrl);
        return Boolean(block.galleryImages?.length);
      }),
      projectUrl: form.projectUrl.trim() || undefined,
      client: form.client.trim() || undefined,
      deliverables: currentTags.length > 0 ? currentTags : undefined,
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

  if (showForm) {
    return (
      <DribbblePortfolioEditor
        form={form}
        onChange={(next) => setForm(next)}
        onClose={() => { setEditing(null); setIsNew(false); }}
        onSave={handleSave}
        saving={isSaving}
      />
    );
  }

  return (
    <div>
      <AdminHeader
        title="Portfolio Management"
        subtitle={`${all.filter((p) => p.active).length} active · ${all.length} total projects`}
        action={!showForm ? { label: "Create Project", onClick: openNew, icon: <Plus className="w-4 h-4" /> } : undefined}
      />

      <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">

        {/* DRIBBBLE STYLE UPLOAD FORM */}
        {showForm && (
          <div className="bg-[#0A0F14] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors cursor-pointer" onClick={() => { setEditing(null); setIsNew(false); }}>
                <div className="p-2 rounded-full bg-white/5"><X className="w-4 h-4" /></div>
                <span className="text-sm font-semibold">Cancel</span>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving || isUploadingCover || isUploadingGallery}
                className="px-8 py-3 rounded-full bg-[#00FF87] text-[#02180C] font-black text-sm hover:bg-[#00e87a] transition-all shadow-lg hover:shadow-[#00FF87]/20 disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? "Publishing..." : "Publish to Portfolio"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Canvas - Visuals */}
              <div className="lg:col-span-8 p-8 lg:p-12 lg:border-r border-white/5">

                {/* Huge Title Input */}
                <input
                  type="text"
                  className="w-full bg-transparent text-4xl lg:text-5xl font-black text-white placeholder:text-white/20 focus:outline-none mb-10"
                  placeholder="Give me a name"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                {/* Main Cover Dropzone */}
                <div className="mb-10">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MonitorPlay className="w-4 h-4" /> Main Cover
                  </div>
                  {form.imageUrl ? (
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden group border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => coverFileRef.current?.click()} className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                          <ImageIcon className="w-4 h-4" /> Replace Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => coverFileRef.current?.click()}
                      className="aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00FF87]/50 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-7 h-7 text-slate-400 group-hover:text-[#00FF87]" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white mb-1">Drag and drop an image, or <span className="text-[#00FF87]">Browse</span></p>
                        <p className="text-sm text-slate-500">Minimum 1600x1200px recommended.</p>
                      </div>
                    </div>
                  )}
                  <input ref={coverFileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                </div>

                {/* Story / Description Editor */}
                <div className="mb-10">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4" /> Project Story
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden focus-within:border-[#00FF87]/50 transition-colors">
                    <div className="flex items-center gap-4 p-3 border-b border-white/5 bg-black/20">
                      <Type className="w-4 h-4 text-slate-400" />
                      <div className="h-4 w-px bg-white/10"></div>
                      <span className="text-xs font-semibold text-slate-500">Rich Text (Write about the process, challenges, and outcome)</span>
                    </div>
                    <textarea
                      rows={6}
                      className="w-full bg-transparent p-6 text-slate-300 placeholder:text-slate-600 focus:outline-none resize-y min-h-[150px] leading-relaxed"
                      placeholder="Share the story behind this project..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                </div>

                <PortfolioStoryBuilder
                  blocks={form.contentBlocks}
                  onAdd={addContentBlock}
                  onChange={updateContentBlock}
                  onDelete={deleteContentBlock}
                  onMove={moveContentBlock}
                  onImageUpload={handleContentImageUpload}
                  onVideoUpload={handleContentVideoUpload}
                />

              </div>

              {/* Right Sidebar - Settings */}
              <div className="lg:col-span-4 bg-black/20 p-8 lg:p-10 space-y-8">

                <FField label="Category">
                  <select
                    className={inpDribbble}
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as PortfolioCategory })}
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0A0F14]">{c}</option>)}
                  </select>
                </FField>

                <FField label="Client Name">
                  <input
                    className={inpDribbble}
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="e.g. Apex Global"
                  />
                </FField>

                <FField label="Live Project URL">
                  <div className="relative">
                    <input
                      className={`${inpDribbble} pl-10`}
                      value={form.projectUrl}
                      onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
                      placeholder="https://"
                    />
                    <ExternalLink className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </FField>

                {/* Interactive Tags */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Deliverables (Tags)</label>
                  <div className="min-h-[50px] p-2 bg-white/[0.03] border border-white/10 rounded-xl flex flex-wrap gap-2 focus-within:border-[#00FF87]/50 transition-colors">
                    {currentTags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-semibold text-white flex items-center gap-2">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(idx)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white px-2 min-w-[120px] placeholder:text-slate-600"
                      placeholder="Type & press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="w-5 h-5 accent-[#00FF87] rounded cursor-pointer"
                      id="pf-active-dribbble"
                    />
                    <label htmlFor="pf-active-dribbble" className="text-sm font-bold text-slate-300 cursor-pointer">
                      Visible on Website
                    </label>
                  </div>

                  <FField label="Display Priority (Order)">
                    <input
                      type="number"
                      className={inpDribbble}
                      value={form.displayOrder}
                      onChange={(e) => setForm({ ...form, displayOrder: +e.target.value })}
                    />
                  </FField>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {saveSuccessMessage && !showForm && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-[#00FF87]/40 text-[#00FF87] flex items-center gap-2.5 text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
            <Check className="w-4 h-4 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* Existing Grid View (Hidden when form is open) */}
        {!showForm && (
          <>
            <div className="flex items-center gap-2 flex-wrap">
              {["All", ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as "All" | PortfolioCategory)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${filter === cat
                    ? "bg-[#00FF87]/15 border-[#00FF87]/40 text-[#00FF87]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => {
                const hasGallery = p.galleryImages && p.galleryImages.length > 0;
                const hasVideo = !!p.videoUrl && p.videoUrl.trim().length > 0;

                return (
                  <div key={p.id} className={`rounded-2xl overflow-hidden bg-[#0A0F14] group transition-all border border-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl ${!p.active && "opacity-50"}`}>
                    <div className="relative aspect-[4/3] bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {hasGallery && <span className="p-1.5 rounded-lg bg-black/80 text-white backdrop-blur-md shadow-lg"><ImageIcon className="w-3.5 h-3.5" /></span>}
                        {hasVideo && <span className="p-1.5 rounded-lg bg-black/80 text-white backdrop-blur-md shadow-lg"><Film className="w-3.5 h-3.5" /></span>}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <div className="flex items-center justify-end gap-2 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                          <button onClick={() => openEdit(p)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => { if (confirm("Delete this project?")) deletePortfolioItem(p.id); }} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-all" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-[#00FF87]/20 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-[#00FF87]" />
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.category}</div>
                      </div>
                      <div className="text-base font-black text-white leading-tight line-clamp-1 mb-1">{p.title}</div>
                      {p.client && <div className="text-sm font-semibold text-slate-500 truncate">For {p.client}</div>}

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                        <button
                          onClick={() => updatePortfolioItem(p.id, { active: !p.active })}
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${p.active ? "bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/20" : "bg-white/5 text-slate-500 border-white/10"}`}
                        >
                          {p.active ? "Live" : "Hidden"}
                        </button>
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleMove(p.id, "up")} className="text-slate-500 hover:text-white p-1" title="Move Up"><ArrowUp className="w-4 h-4" /></button>
                          <button onClick={() => handleMove(p.id, "down")} className="text-slate-500 hover:text-white p-1" title="Move Down"><ArrowDown className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inpDribbble = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/50 focus:bg-white/[0.05] transition-all";
