"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { AgencyTestimonial } from "@/lib/cmsStore";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, X, Check } from "lucide-react";

const empty = (): Omit<AgencyTestimonial, "id"> => ({
  clientName: "",
  company: "",
  position: "",
  avatar: "",
  rating: 5,
  text: "",
  videoUrl: "",
  active: true,
  displayOrder: 1,
});

export default function AdminTestimonialsPage() {
  const { cmsData, addTestimonial, updateTestimonial, deleteTestimonial } = useCms();
  const [editing, setEditing] = useState<AgencyTestimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(empty());

  const items = [...cmsData.agencyTestimonials].sort((a, b) => a.displayOrder - b.displayOrder);

  const openNew = () => { setForm({ ...empty(), displayOrder: items.length + 1 }); setEditing(null); setIsNew(true); };
  const openEdit = (t: AgencyTestimonial) => {
    setForm({ clientName: t.clientName, company: t.company, position: t.position, avatar: t.avatar, rating: t.rating, text: t.text, videoUrl: t.videoUrl || "", active: t.active, displayOrder: t.displayOrder });
    setEditing(t); setIsNew(false);
  };
  const handleSave = () => {
    if (!form.clientName.trim() || !form.text.trim()) return;
    if (isNew) { addTestimonial({ ...form, id: `tm-${Date.now()}` }); }
    else if (editing) { updateTestimonial(editing.id, form); }
    setEditing(null); setIsNew(false);
  };

  return (
    <div>
      <AdminHeader title="Testimonials" subtitle={`${items.filter((t) => t.active).length} active`} action={{ label: "Add Testimonial", onClick: openNew, icon: <Plus className="w-4 h-4" /> }} />

      <div className="p-6 lg:p-10 max-w-4xl space-y-6">
        {(editing || isNew) && (
          <div className="rounded-2xl bg-[#0A0F14] border border-[#00FF87]/25 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FField label="Client Name *"><input className={inp} value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="e.g. Rafiqul Islam" /></FField>
              <FField label="Company"><input className={inp} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. TechNova BD" /></FField>
              <FField label="Position"><input className={inp} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="e.g. Founder & CEO" /></FField>
              <FField label="Rating (1–5)">
                <select className={inp} value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })}>
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </FField>
              <div className="sm:col-span-2">
                <FField label="Avatar URL"><input className={inp} value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="https://images.unsplash.com/..." /></FField>
              </div>
              <div className="sm:col-span-2">
                <FField label="Client Video URL (optional)"><input type="url" className={inp} value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="Direct .mp4 or hosted video URL — active card autoplays muted" /></FField>
              </div>
              <div className="sm:col-span-2">
                <FField label="Testimonial Text *"><textarea rows={4} className={`${inp} resize-none`} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="What the client said..." /></FField>
              </div>
              <div className="flex items-center gap-4">
                <FField label="Display Order"><input type="number" className={inp} value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: +e.target.value })} /></FField>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer mt-5">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[#00FF87]" />
                  Active
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-[#00FF87] text-[#021A0C] font-black text-sm flex items-center gap-2 hover:bg-[#00e87a]"><Check className="w-4 h-4" />{isNew ? "Add" : "Save"}</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${t.active ? "bg-[#0A0F14] border-white/[0.07]" : "bg-[#0A0F14]/50 border-white/[0.04] opacity-60"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt={t.clientName} className="w-10 h-10 rounded-full object-cover border-2 border-[#00FF87]/25 shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.clientName); }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-white text-sm">{t.clientName}</span>
                  <span className="text-slate-500 text-xs">· {t.position}, {t.company}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < t.rating ? "text-[#00FF87] fill-current" : "text-slate-700"}`} />)}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">&ldquo;{t.text}&rdquo;</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => updateTestimonial(t.id, { active: !t.active })} className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors">{t.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-slate-500 hover:text-[#00FF87] transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm("Delete?")) deleteTestimonial(t.id); }} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="py-12 text-center text-slate-500 text-sm">No testimonials yet.</div>}
        </div>
      </div>
    </div>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-slate-400">{label}</label>{children}</div>;
}
const inp = "w-full bg-[#131920] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/40 transition-all";
