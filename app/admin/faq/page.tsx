"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { AgencyFAQ } from "@/lib/cmsStore";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check, ArrowUp, ArrowDown } from "lucide-react";

const empty = (): Omit<AgencyFAQ, "id"> => ({
  question: "",
  answer: "",
  category: "General",
  active: true,
  displayOrder: 1,
});

export default function AdminFAQPage() {
  const { cmsData, addFAQ, updateFAQ, deleteFAQ } = useCms();
  const [editing, setEditing] = useState<AgencyFAQ | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(empty());

  const items = [...cmsData.agencyFaqs].sort((a, b) => a.displayOrder - b.displayOrder);
  const categories = Array.from(new Set(["General", "Getting Started", "Process", "Deliverables", "Pricing", "Monthly Plans", ...items.map((f) => f.category)]));

  const openNew = () => { setForm({ ...empty(), displayOrder: items.length + 1 }); setEditing(null); setIsNew(true); };
  const openEdit = (f: AgencyFAQ) => {
    setForm({ question: f.question, answer: f.answer, category: f.category, active: f.active, displayOrder: f.displayOrder });
    setEditing(f); setIsNew(false);
  };
  const handleSave = () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    if (isNew) { addFAQ({ ...form, id: `faq-${Date.now()}` }); }
    else if (editing) { updateFAQ(editing.id, form); }
    setEditing(null); setIsNew(false);
  };
  const handleMove = (id: string, dir: "up" | "down") => {
    const idx = items.findIndex((f) => f.id === id);
    const target = dir === "up" ? items[idx - 1] : items[idx + 1];
    if (!target) return;
    updateFAQ(id, { displayOrder: target.displayOrder });
    updateFAQ(target.id, { displayOrder: items[idx].displayOrder });
  };

  return (
    <div>
      <AdminHeader title="FAQ" subtitle={`${items.filter((f) => f.active).length} active · ${items.length} total`} action={{ label: "Add Question", onClick: openNew, icon: <Plus className="w-4 h-4" /> }} />

      <div className="p-6 lg:p-10 max-w-4xl space-y-6">
        {(editing || isNew) && (
          <div className="rounded-2xl bg-[#0A0F14] border border-[#00FF87]/25 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">{isNew ? "Add FAQ" : "Edit FAQ"}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <FField label="Question *"><input className={inp} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="e.g. How do I order a package?" /></FField>
              <FField label="Answer *"><textarea rows={5} className={`${inp} resize-none`} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Detailed answer..." /></FField>
              <div className="grid grid-cols-2 gap-4">
                <FField label="Category">
                  <input className={inp} value={form.category} list="cat-options" onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Process" />
                  <datalist id="cat-options">{categories.map((c) => <option key={c} value={c} />)}</datalist>
                </FField>
                <FField label="Display Order"><input type="number" className={inp} value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: +e.target.value })} /></FField>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[#00FF87]" />
                Active (visible on site)
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-[#00FF87] text-[#021A0C] font-black text-sm flex items-center gap-2 hover:bg-[#00e87a]"><Check className="w-4 h-4" />{isNew ? "Add FAQ" : "Save"}</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {items.map((f) => (
            <div key={f.id} className={`rounded-xl border p-4 transition-all ${f.active ? "bg-[#0A0F14] border-white/[0.07]" : "bg-[#0A0F14]/50 border-white/[0.04] opacity-60"}`}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-0.5 shrink-0 mt-0.5">
                  <button onClick={() => handleMove(f.id, "up")} className="text-slate-600 hover:text-white p-0.5 transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
                  <span className="text-slate-600 font-mono text-[10px] text-center">{f.displayOrder}</span>
                  <button onClick={() => handleMove(f.id, "down")} className="text-slate-600 hover:text-white p-0.5 transition-colors"><ArrowDown className="w-3.5 h-3.5" /></button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/20">{f.category}</span>
                  </div>
                  <p className="font-semibold text-white text-sm mb-1">{f.question}</p>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => updateFAQ(f.id, { active: !f.active })} className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors">{f.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}</button>
                  <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg text-slate-500 hover:text-[#00FF87] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => { if (confirm("Delete?")) deleteFAQ(f.id); }} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="py-12 text-center text-slate-500 text-sm">No FAQ items yet.</div>}
        </div>
      </div>
    </div>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-slate-400">{label}</label>{children}</div>;
}
const inp = "w-full bg-[#131920] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF87]/40 transition-all";
