"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Plus, Save, Trash2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { useCms } from "@/context/CmsContext";
import { ContactPageConfig } from "@/lib/cmsStore";

function EditableList({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const updateItem = (index: number, value: string) => onChange(items.map((item, itemIndex) => itemIndex === index ? value : item));
  const removeItem = (index: number) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-white">{label}</h3>
          <p className="mt-1 text-xs text-slate-400">Add, edit, remove, or reorder by editing the text below.</p>
        </div>
        <button type="button" onClick={() => onChange([...items, ""])} className="inline-flex items-center gap-1.5 rounded-xl border border-[#00FF87]/30 bg-[#00FF87]/10 px-3 py-2 text-xs font-bold text-[#00FF87] transition hover:bg-[#00FF87]/20">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="flex gap-2">
            <input value={item} onChange={(event) => updateItem(index, event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#00FF87]" />
            <button type="button" onClick={() => removeItem(index)} aria-label={`Remove ${label} item ${index + 1}`} className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 text-rose-300 transition hover:bg-rose-500/20">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminContactPage() {
  const { cmsData, updateContactPage } = useCms();
  const [form, setForm] = useState<ContactPageConfig>(cmsData.contactPage);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(cmsData.contactPage), [cmsData.contactPage]);

  const updateField = <K extends keyof ContactPageConfig>(field: K, value: ContactPageConfig[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateContactPage({
      ...form,
      benefits: form.benefits.map((item) => item.trim()).filter(Boolean),
      serviceOptions: form.serviceOptions.map((item) => item.trim()).filter(Boolean),
      budgetOptions: form.budgetOptions.map((item) => item.trim()).filter(Boolean),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <AdminHeader
        title="Contact Page"
        subtitle="Edit the public inquiry section without touching code. Leads remain available in Inquiries."
        action={{ label: "Save Contact Page", onClick: handleSave, icon: <Save className="h-4 w-4" /> }}
      />

      <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-10">
        {saved && <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-[#00FF87]"><CheckCircle2 className="h-4 w-4" /> Contact page saved and sent to your live CMS.</div>}

        <section className="rounded-2xl border border-white/10 bg-[#020F07] p-5 sm:p-7">
          <h2 className="text-lg font-bold text-white">Heading &amp; visual</h2>
          <p className="mt-1 text-xs text-slate-400">These appear on the left side of the contact form.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-xs font-bold text-slate-300">Small label<input value={form.badge} onChange={(event) => updateField("badge", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#00FF87]" /></label>
            <label className="block text-xs font-bold text-slate-300">Heading line 1<input value={form.headingLine1} onChange={(event) => updateField("headingLine1", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#00FF87]" /></label>
            <label className="block text-xs font-bold text-slate-300">Heading line 2<input value={form.headingLine2} onChange={(event) => updateField("headingLine2", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#00FF87]" /></label>
            <label className="block text-xs font-bold text-slate-300">Italic heading line<input value={form.headingAccent} onChange={(event) => updateField("headingAccent", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#00FF87]" /></label>
          </div>
          <div className="mt-6"><MediaUploader label="Contact card image" value={form.imageUrl} onChange={(imageUrl) => updateField("imageUrl", imageUrl)} acceptVideo={false} helpText="Upload the photo shown beside the form, or paste an image URL." recommendedDimensions="Square image" /></div>
        </section>

        <EditableList label="Trust points" items={form.benefits} onChange={(benefits) => updateField("benefits", benefits)} placeholder="Ex. Expect a response within 24 hours" />
        <EditableList label="Service dropdown options" items={form.serviceOptions} onChange={(serviceOptions) => updateField("serviceOptions", serviceOptions)} placeholder="Ex. Brand Identity Design" />
        <EditableList label="Budget dropdown options" items={form.budgetOptions} onChange={(budgetOptions) => updateField("budgetOptions", budgetOptions)} placeholder="Ex. ৳20,000 – ৳50,000" />

        <div className="flex justify-end"><button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-[#00FF87] px-5 py-3 text-sm font-extrabold text-[#02180C] shadow-[0_0_20px_rgba(0,255,135,0.25)] transition hover:bg-[#00DF81]"><Save className="h-4 w-4" /> Save Contact Page</button></div>
      </div>
    </div>
  );
}
