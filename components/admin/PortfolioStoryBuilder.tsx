"use client";

import React from "react";
import {
  ArrowDown,
  ArrowUp,
  Image as ImageIcon,
  Plus,
  Trash2,
  Type,
  Upload,
  Video,
} from "lucide-react";
import { ProjectContentBlock, ProjectBlockType } from "@/lib/cmsStore";

interface PortfolioStoryBuilderProps {
  blocks: ProjectContentBlock[];
  onAdd: (type: ProjectBlockType) => void;
  onChange: (id: string, partial: Partial<ProjectContentBlock>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onImageUpload: (id: string, files: FileList | null) => void;
  onVideoUpload: (id: string, file: File | undefined) => void;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-[#00FF87]/60";

export default function PortfolioStoryBuilder({
  blocks,
  onAdd,
  onChange,
  onDelete,
  onMove,
  onImageUpload,
  onVideoUpload,
}: PortfolioStoryBuilderProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Project story</p>
          <p className="mt-1 text-sm text-slate-500">
            Add content in the same order you want visitors to see it.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onAdd("text")} className="story-add-button">
            <Type className="h-3.5 w-3.5" /> Text
          </button>
          <button type="button" onClick={() => onAdd("image")} className="story-add-button">
            <ImageIcon className="h-3.5 w-3.5" /> Image
          </button>
          <button type="button" onClick={() => onAdd("video")} className="story-add-button">
            <Video className="h-3.5 w-3.5" /> Video
          </button>
          <button type="button" onClick={() => onAdd("gallery")} className="story-add-button">
            <Plus className="h-3.5 w-3.5" /> Gallery
          </button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 px-5 py-12 text-center">
          <p className="text-sm font-semibold text-slate-300">Start building the project story.</p>
          <p className="mt-1 text-xs text-slate-500">Add an image, video, gallery, or text block above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <article key={block.id} className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00FF87]">
                  {String(index + 1).padStart(2, "0")} · {block.type}
                </p>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => onMove(block.id, "up")} disabled={index === 0} className="story-icon-button" aria-label="Move block up">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => onMove(block.id, "down")} disabled={index === blocks.length - 1} className="story-icon-button" aria-label="Move block down">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => onDelete(block.id)} className="story-icon-button hover:text-red-400" aria-label="Delete block">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {block.type === "text" && (
                  <>
                    <input className={fieldClass} value={block.heading || ""} onChange={(event) => onChange(block.id, { heading: event.target.value })} placeholder="Section title (optional)" />
                    <textarea className={`${fieldClass} min-h-[130px] resize-y`} value={block.body || ""} onChange={(event) => onChange(block.id, { body: event.target.value })} placeholder="Write the story, process, challenge, or result..." />
                  </>
                )}

                {block.type === "image" && (
                  <>
                    {block.imageUrl ? <img src={block.imageUrl} alt={block.caption || "Project detail"} className="max-h-[460px] w-full rounded-lg object-cover" /> : <UploadArea label="Upload image" accept="image/*" multiple={false} onChange={(files) => onImageUpload(block.id, files)} />}
                    {block.imageUrl && <UploadArea label="Replace image" accept="image/*" multiple={false} onChange={(files) => onImageUpload(block.id, files)} compact />}
                    <input className={fieldClass} value={block.caption || ""} onChange={(event) => onChange(block.id, { caption: event.target.value })} placeholder="Caption (optional)" />
                  </>
                )}

                {block.type === "gallery" && (
                  <>
                    {(block.galleryImages || []).length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {block.galleryImages!.map((image, imageIndex) => <img key={`${image}-${imageIndex}`} src={image} alt={`Gallery image ${imageIndex + 1}`} className="aspect-[4/3] w-full rounded-lg object-cover" />)}
                      </div>
                    )}
                    <UploadArea label={(block.galleryImages || []).length ? "Add more images" : "Upload gallery images"} accept="image/*" multiple onChange={(files) => onImageUpload(block.id, files)} />
                  </>
                )}

                {block.type === "video" && (
                  <>
                    <input className={fieldClass} value={block.videoUrl || ""} onChange={(event) => onChange(block.id, { videoUrl: event.target.value })} placeholder="Paste a YouTube, Vimeo, or .mp4 URL" />
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#00FF87]/60 hover:text-[#00FF87]">
                      <Upload className="h-4 w-4" /> Upload video file
                      <input type="file" accept="video/*" className="hidden" onChange={(event) => onVideoUpload(block.id, event.target.files?.[0])} />
                    </label>
                    <p className="text-xs text-slate-500">For reliable publishing, a YouTube, Vimeo, or direct MP4 link is best.</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <style jsx>{`
        .story-add-button { display: inline-flex; align-items: center; gap: .375rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,.12); padding: .55rem .75rem; font-size: .75rem; font-weight: 700; color: #cbd5e1; transition: .2s ease; }
        .story-add-button:hover { border-color: rgba(0,255,135,.7); color: #00FF87; }
        .story-icon-button { display: inline-flex; height: 2rem; width: 2rem; align-items: center; justify-content: center; border-radius: .5rem; color: #94a3b8; transition: .2s ease; }
        .story-icon-button:hover:not(:disabled) { background: rgba(255,255,255,.08); color: white; }
        .story-icon-button:disabled { cursor: not-allowed; opacity: .25; }
      `}</style>
    </section>
  );
}

function UploadArea({ label, accept, multiple, onChange, compact = false }: { label: string; accept: string; multiple: boolean; onChange: (files: FileList | null) => void; compact?: boolean }) {
  return (
    <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 text-sm font-semibold text-slate-300 transition hover:border-[#00FF87]/60 hover:text-[#00FF87] ${compact ? "px-4 py-3" : "min-h-[150px] px-4 py-8"}`}>
      <Upload className="h-4 w-4" /> {label}
      <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={(event) => onChange(event.target.files)} />
    </label>
  );
}
