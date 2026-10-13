"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, GripVertical, Trash2 } from "lucide-react";

export default function GalleryImageEditor({ images, onChange, columns = "grid-cols-2" }: { images: string[]; onChange: (images: string[]) => void; columns?: string }) {
  const grid = useRef<HTMLDivElement>(null);
  const drag = useRef<{ from: number; to: number } | null>(null);
  const [target, setTarget] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= images.length) return;
    const next = [...images];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  };

  return (
    <div>
      <p className="mb-3 text-xs text-slate-500">Drag the grip to reorder images, or use the arrows. Save the project to apply changes.</p>
      <div ref={grid} className={`grid gap-3 ${columns}`}>
        {images.map((image, index) => (
          <div key={`${image}-${index}`} data-gallery-index={index} className={`overflow-hidden rounded-xl border bg-white ${target === index ? "border-blue-500 ring-2 ring-blue-400" : "border-slate-200"}`}>
            <img src={image} alt={`Gallery image ${index + 1}`} draggable={false} className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-2 text-slate-600">
              <button type="button" aria-label={`Drag image ${index + 1} to reorder`} title="Drag to reorder" className="flex h-8 w-8 touch-none items-center justify-center rounded-md hover:bg-slate-200 cursor-grab active:cursor-grabbing"
                onPointerDown={(event) => {
                  if (event.button !== 0) return;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  drag.current = { from: index, to: index };
                  setTarget(index);
                }}
                onPointerMove={(event) => {
                  if (!drag.current) return;
                  const card = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-gallery-index]");
                  if (card && grid.current?.contains(card)) {
                    const to = Number(card.dataset.galleryIndex);
                    drag.current.to = to;
                    setTarget(to);
                  }
                }}
                onPointerUp={() => {
                  if (drag.current) move(drag.current.from, drag.current.to);
                  drag.current = null;
                  setTarget(null);
                }}
                onPointerCancel={() => { drag.current = null; setTarget(null); }}>
                <GripVertical className="h-4 w-4" />
              </button>
              <span className="mr-auto text-xs font-semibold">{index + 1}</span>
              <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label={`Move image ${index + 1} earlier`} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => move(index, index + 1)} disabled={index === images.length - 1} aria-label={`Move image ${index + 1} later`} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30"><ArrowRight className="h-4 w-4" /></button>
              <button type="button" onClick={() => onChange(images.filter((_, position) => position !== index))} aria-label={`Remove image ${index + 1} from gallery`} title="Remove image" className="flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
