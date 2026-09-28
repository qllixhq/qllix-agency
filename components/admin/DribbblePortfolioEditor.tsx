"use client";

import React, { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  Image as ImageIcon,
  Layers3,
  Plus,
  Save,
  Trash2,
  Type,
  Upload,
  Video,
} from "lucide-react";
import { PortfolioCategory, ProjectBlockType, ProjectContentBlock } from "@/lib/cmsStore";
import { useCms } from "@/context/CmsContext";

const categories: PortfolioCategory[] = ["Branding", "Logo", "Social Media", "Packaging", "Motion", "Video", "Marketing"];

export interface DribbblePortfolioForm {
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

interface Props {
  form: DribbblePortfolioForm;
  onChange: (next: DribbblePortfolioForm) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}

const inputClass = "w-full border-0 border-b border-[#e7e7ec] bg-transparent px-0 py-3 text-sm text-[#101224] outline-none placeholder:text-[#a2a4af] focus:border-[var(--brand-primary)]";

export default function DribbblePortfolioEditor({ form, onChange, onClose, onSave, saving }: Props) {
  const { cmsData } = useCms();
  const primaryColor = cmsData.general.primaryColor || "#00FF87";
  const secondaryColor = cmsData.general.secondaryColor || "#02180C";
  const brandSoft = /^#[0-9a-f]{6}$/i.test(primaryColor) ? `${primaryColor}18` : "#eaf8f1";
  const [uploading, setUploading] = useState(false);
  const coverInput = useRef<HTMLInputElement>(null);
  const update = (patch: Partial<DribbblePortfolioForm>) => onChange({ ...form, ...patch });

  const addBlock = (type: ProjectBlockType) => {
    const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const defaults: Record<ProjectBlockType, Omit<ProjectContentBlock, "id" | "type">> = {
      text: { heading: "", body: "" }, image: { imageUrl: "", caption: "" }, video: { videoUrl: "" }, gallery: { galleryImages: [] },
    };
    update({ contentBlocks: [...form.contentBlocks, { id, type, ...defaults[type] }] });
  };

  const updateBlock = (id: string, patch: Partial<ProjectContentBlock>) => update({
    contentBlocks: form.contentBlocks.map((block) => block.id === id ? { ...block, ...patch } : block),
  });

  const removeBlock = (id: string) => update({ contentBlocks: form.contentBlocks.filter((block) => block.id !== id) });

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = form.contentBlocks.findIndex((block) => block.id === id);
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || nextIndex < 0 || nextIndex >= form.contentBlocks.length) return;
    const blocks = [...form.contentBlocks];
    [blocks[index], blocks[nextIndex]] = [blocks[nextIndex], blocks[index]];
    update({ contentBlocks: blocks });
  };

  const makeImages = async (files: FileList | null) => {
    if (!files?.length) return [];
    setUploading(true);
    try {
      const { compressImageFile } = await import("@/lib/imageOptimizer");
      return await Promise.all(Array.from(files).map((file) => compressImageFile(file, { maxWidth: 1800, maxHeight: 1800, quality: 0.84 })));
    } catch {
      alert("This image could not be processed. Please try another one.");
      return [];
    } finally {
      setUploading(false);
    }
  };

  const uploadCover = async (files: FileList | null) => {
    const [image] = await makeImages(files);
    if (image) update({ imageUrl: image });
  };

  const uploadBlockImages = async (id: string, type: "image" | "gallery", files: FileList | null) => {
    const images = await makeImages(files);
    if (!images.length) return;
    const block = form.contentBlocks.find((item) => item.id === id);
    if (!block) return;
    updateBlock(id, type === "gallery" ? { galleryImages: [...(block.galleryImages || []), ...images] } : { imageUrl: images[0] });
  };

  const uploadVideo = (id: string, file: File | undefined) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("For files above 10MB, paste a YouTube, Vimeo, or direct MP4 link.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateBlock(id, { videoUrl: String(reader.result || "") });
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white text-[#101224]" style={{ "--brand-primary": primaryColor, "--brand-secondary": secondaryColor, "--brand-soft": brandSoft } as React.CSSProperties}>
      <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-[#ededf2] bg-white px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-full border border-[#e5e5eb] px-4 py-2.5 text-sm font-semibold transition hover:border-[#bfc0c9]"><ChevronLeft className="h-4 w-4" /> Cancel</button>
          {cmsData.general.logoUrl && <img src={cmsData.general.logoUrl} alt={cmsData.general.agencyName} className="hidden h-8 w-auto object-contain sm:block" />}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[#777987] sm:block">Changes save when you publish</span>
          <button type="button" onClick={onSave} disabled={saving || uploading} style={{ backgroundColor: primaryColor, color: secondaryColor }} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50">
            <Save className="h-4 w-4" /> {saving ? "Publishing..." : "Publish project"}
          </button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-78px)] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="mx-auto w-full max-w-[1160px] px-5 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[920px]">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#777987]">Portfolio project</p>
            <input value={form.title} onChange={(event) => update({ title: event.target.value })} placeholder="Give me a name" className="mb-10 w-full border-0 bg-transparent text-center text-4xl font-semibold tracking-[-0.05em] outline-none placeholder:text-[#a7a9b4] sm:text-5xl" />

            <section className="rounded-2xl border border-[#e7e7ed] bg-[#fcfcfd] p-3 shadow-[0_8px_30px_rgba(20,20,40,.04)] sm:p-4">
              {form.imageUrl ? (
                <div className="group relative overflow-hidden rounded-xl bg-[#f1f1f4]">
                  <img src={form.imageUrl} alt="Main cover preview" className="max-h-[720px] w-full object-contain" />
                  <button type="button" onClick={() => coverInput.current?.click()} style={{ backgroundColor: `${secondaryColor}B8` }} className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white opacity-0 transition group-hover:opacity-100">Replace cover</button>
                </div>
              ) : (
                <button type="button" onClick={() => coverInput.current?.click()} className="flex min-h-[410px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#dcdde5] bg-white px-5 text-center transition hover:border-[var(--brand-primary)] hover:bg-[var(--brand-soft)]">
                  <span style={{ backgroundColor: brandSoft, color: primaryColor }} className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"><Upload className="h-7 w-7" /></span>
                  <span className="text-lg font-semibold">Drag and drop an image, or <span className="text-[var(--brand-primary)]">Browse</span></span>
                  <span className="mt-2 text-sm text-[#777987]">PNG, JPG, GIF · Minimum 1600px wide recommended</span>
                </button>
              )}
              <input ref={coverInput} type="file" accept="image/*" className="hidden" onChange={(event) => uploadCover(event.target.files)} />
            </section>

            <textarea value={form.description} onChange={(event) => update({ description: event.target.value })} placeholder="Write a short project introduction..." className="mt-8 min-h-[110px] w-full resize-y rounded-xl border border-[#e7e7ed] bg-white p-5 text-base leading-7 outline-none placeholder:text-[#a7a9b4] focus:border-[var(--brand-primary)]" />

            <div className="mt-10 space-y-6">
              {form.contentBlocks.map((block, index) => <ContentBlock key={block.id} block={block} index={index} total={form.contentBlocks.length} onChange={updateBlock} onDelete={removeBlock} onMove={moveBlock} onImages={uploadBlockImages} onVideo={uploadVideo} />)}
            </div>

            <div className="mt-10 flex justify-center border-t border-[#e7e7ed] pt-8">
              <span className="rounded-full border border-[#dedfe6] px-5 py-3 text-sm font-semibold text-[#555765]">Use the Insert block panel to keep building</span>
            </div>
          </div>
        </main>

        <aside className="border-t border-[#ededf2] bg-white p-6 lg:border-l lg:border-t-0 lg:p-8">
          <p className="text-sm text-[#777987]">Project editor</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Insert block</h2>
          <p className="mt-2 text-sm leading-6 text-[#777987]">Add as many visual and text sections as the project needs.</p>

          <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.14em] text-[#989aa6]">Basic</p>
          <div className="space-y-1">
            <SidebarAction icon={<Type />} label="Text" onClick={() => addBlock("text")} />
            <SidebarAction icon={<ImageIcon />} label="Image" onClick={() => addBlock("image")} />
            <SidebarAction icon={<Video />} label="Video" onClick={() => addBlock("video")} />
          </div>
          <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.14em] text-[#989aa6]">Rich media</p>
          <SidebarAction icon={<Layers3 />} label="Gallery" onClick={() => addBlock("gallery")} />

          <div className="mt-10 space-y-5 border-t border-[#ededf2] pt-7">
            <label className="block text-sm font-semibold">Category<select value={form.category} onChange={(event) => update({ category: event.target.value as PortfolioCategory })} className={`${inputClass} mt-1`}><>{categories.map((category) => <option key={category}>{category}</option>)}</></select></label>
            <label className="block text-sm font-semibold">Client<input value={form.client} onChange={(event) => update({ client: event.target.value })} placeholder="Client name" className={`${inputClass} mt-1`} /></label>
            <label className="block text-sm font-semibold">Live project URL<input value={form.projectUrl} onChange={(event) => update({ projectUrl: event.target.value })} placeholder="https://" className={`${inputClass} mt-1`} /></label>
            <label className="block text-sm font-semibold">Deliverables<input value={form.deliverablesText} onChange={(event) => update({ deliverablesText: event.target.value })} placeholder="Branding, Packaging, Social" className={`${inputClass} mt-1`} /></label>
            <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.active} onChange={(event) => update({ active: event.target.checked })} style={{ accentColor: primaryColor }} className="h-4 w-4" /> Visible on website</label>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[15px] font-medium transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand-primary)]"><span className="h-5 w-5 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>{label}<Plus className="ml-auto h-4 w-4 opacity-45" /></button>;
}

function ContentBlock({ block, index, total, onChange, onDelete, onMove, onImages, onVideo }: { block: ProjectContentBlock; index: number; total: number; onChange: (id: string, patch: Partial<ProjectContentBlock>) => void; onDelete: (id: string) => void; onMove: (id: string, direction: "up" | "down") => void; onImages: (id: string, type: "image" | "gallery", files: FileList | null) => void; onVideo: (id: string, file: File | undefined) => void }) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7e7ed] bg-white">
      <div className="flex items-center justify-between border-b border-[#f0f0f3] bg-[#fcfcfd] px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-[.14em] text-[#777987]">{String(index + 1).padStart(2, "0")} · {block.type}</span>
        <div className="flex items-center gap-1"><button type="button" disabled={index === 0} onClick={() => onMove(block.id, "up")} className="block-button"><ArrowUp className="h-4 w-4" /></button><button type="button" disabled={index === total - 1} onClick={() => onMove(block.id, "down")} className="block-button"><ArrowDown className="h-4 w-4" /></button><button type="button" onClick={() => onDelete(block.id)} className="block-button hover:text-[#dc355f]"><Trash2 className="h-4 w-4" /></button></div>
      </div>
      <div className="p-4 sm:p-5">
        {block.type === "text" && <><input value={block.heading || ""} onChange={(event) => onChange(block.id, { heading: event.target.value })} placeholder="Section title" className="mb-3 w-full border-0 text-2xl font-semibold tracking-[-.04em] outline-none placeholder:text-[#b4b5bd]" /><textarea value={block.body || ""} onChange={(event) => onChange(block.id, { body: event.target.value })} placeholder="Start writing..." className="min-h-[140px] w-full resize-y border-0 text-base leading-7 outline-none placeholder:text-[#a7a9b4]" /></>}
        {block.type === "image" && <><input ref={input} type="file" accept="image/*" className="hidden" onChange={(event) => onImages(block.id, "image", event.target.files)} />{block.imageUrl ? <button type="button" onClick={() => input.current?.click()} className="group relative block w-full overflow-hidden rounded-xl"><img src={block.imageUrl} alt="Project visual" className="max-h-[620px] w-full object-contain" /><span className="absolute inset-0 grid place-items-center bg-black/35 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100">Replace image</span></button> : <UploadButton label="Upload image" onClick={() => input.current?.click()} />}</>}
        {block.type === "gallery" && <><input ref={input} type="file" accept="image/*" multiple className="hidden" onChange={(event) => onImages(block.id, "gallery", event.target.files)} />{block.galleryImages?.length ? <div className="grid grid-cols-2 gap-3">{block.galleryImages.map((image, imageIndex) => <img key={`${image}-${imageIndex}`} src={image} alt={`Gallery ${imageIndex + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover" />)}</div> : null}<div className="mt-3"><UploadButton label={block.galleryImages?.length ? "Add more images" : "Upload gallery images"} onClick={() => input.current?.click()} /></div></>}
        {block.type === "video" && <><input value={block.videoUrl || ""} onChange={(event) => onChange(block.id, { videoUrl: event.target.value })} placeholder="Paste a YouTube, Vimeo, or MP4 URL" className="w-full rounded-xl border border-[#e7e7ed] px-4 py-3 text-sm outline-none focus:border-[var(--brand-primary)]" /><label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#dcdde5] px-4 py-4 text-sm font-semibold text-[#555765] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"><Upload className="h-4 w-4" /> Upload video file<input type="file" accept="video/*" className="hidden" onChange={(event) => onVideo(block.id, event.target.files?.[0])} /></label></>}
      </div>
      <style jsx>{`.block-button{display:inline-flex;height:30px;width:30px;align-items:center;justify-content:center;border-radius:8px;color:#777987}.block-button:hover:not(:disabled){background:var(--brand-soft);color:var(--brand-primary)}.block-button:disabled{opacity:.28}`}</style>
    </section>
  );
}

function UploadButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#dcdde5] text-sm font-semibold text-[#6f7180] transition hover:border-[var(--brand-primary)] hover:bg-[var(--brand-soft)] hover:text-[var(--brand-primary)]"><Upload className="h-5 w-5" />{label}</button>;
}
