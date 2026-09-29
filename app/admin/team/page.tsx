"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCms } from "@/context/CmsContext";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { TeamMember } from "@/lib/cmsStore";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, Check,
  ArrowUp, ArrowDown, Upload, Users, AlertTriangle,
  Save, CheckCircle2, Loader2, Camera,
} from "lucide-react";

const DEPARTMENTS = [
  "Management & Leadership",
  "Design & Creative",
  "Engineering & Development",
  "3D & Motion",
  "Product & UX",
  "Marketing & Growth",
  "Operations & Admin",
];

const empty = (): Omit<TeamMember, "id"> => ({
  name: "",
  role: "",
  department: "Design & Creative",
  imageUrl: "/images/team/mohammad-alam.png",
  active: true,
  displayOrder: 1,
});

export default function AdminTeamPage() {
  const { cmsData, addTeamMember, updateTeamMember, deleteTeamMember } = useCms();
  const { isDark } = useAdminTheme();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(empty());
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [saveAlertMessage, setSaveAlertMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const members = [...cmsData.teamMembers].sort((a, b) => a.displayOrder - b.displayOrder);

  const openNew = () => {
    setForm({ ...empty(), displayOrder: members.length + 1 });
    setEditingId(null);
    setIsNew(true);
  };

  const openEdit = (m: TeamMember) => {
    if (editingId === m.id) {
      setEditingId(null);
      return;
    }
    setForm({
      name: m.name,
      role: m.role,
      department: m.department || "Design & Creative",
      imageUrl: m.imageUrl,
      active: m.active,
      displayOrder: m.displayOrder,
      email: m.email || "",
      linkedin: m.linkedin || "",
    });
    setEditingId(m.id);
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) return;
    setIsSaving(true);
    try {
      if (isNew) {
        addTeamMember({
          ...form,
          id: `tm-${Date.now()}`,
        });
        setSaveAlertMessage("New team member added & published successfully!");
      } else if (editingId) {
        updateTeamMember(editingId, form);
        setSaveAlertMessage("Team member photo & details updated successfully!");
      }
      setEditingId(null);
      setIsNew(false);
      setTimeout(() => setSaveAlertMessage(null), 4000);
    } catch (e: any) {
      alert("Failed to save changes: " + (e?.message || "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // 1. Try sending directly to /api/admin/upload via FormData
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.url) {
          setForm((prev) => ({ ...prev, imageUrl: json.url }));
          setIsUploading(false);
          e.target.value = "";
          return;
        }
      }
    } catch (uploadErr) {
      console.warn("Direct upload failed, falling back to client canvas compression:", uploadErr);
    }

    // 2. Fallback: Compress image via Canvas to 400x500 portrait aspect ratio
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setIsUploading(false);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const targetW = 400;
        const targetH = 500;
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const srcRatio = img.width / img.height;
          const targetRatio = targetW / targetH;
          let renderW = targetW;
          let renderH = targetH;
          let offsetX = 0;
          let offsetY = 0;

          if (srcRatio > targetRatio) {
            renderW = targetH * srcRatio;
            offsetX = (targetW - renderW) / 2;
          } else {
            renderH = targetW / srcRatio;
            offsetY = (targetH - renderH) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setForm((prev) => ({ ...prev, imageUrl: compressed }));
        } else {
          setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        }
        setIsUploading(false);
        e.target.value = "";
      };
      img.onerror = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        setIsUploading(false);
        e.target.value = "";
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const moveOrder = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= members.length) return;

    const currentMember = members[index];
    const targetMember = members[targetIndex];

    updateTeamMember(currentMember.id, { displayOrder: targetMember.displayOrder });
    updateTeamMember(targetMember.id, { displayOrder: currentMember.displayOrder });
  };

  const inp = isDark
    ? "w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00FF87] transition-colors"
    : "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#00FF87] transition-colors";

  // Reusable Form Component for both inline editing and new member
  const renderMemberForm = (onClose: () => void, isCreateMode: boolean) => (
    <div
      className={`rounded-2xl border p-6 sm:p-7 shadow-xl animate-in fade-in zoom-in-95 duration-200 ${
        isDark
          ? "bg-[#0A0F14] border-[#00FF87]/30 text-white"
          : "bg-white border-slate-200 text-slate-900 shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between mb-5 border-b border-black/5 dark:border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black font-serif">
              {isCreateMode ? "Add New Team Member" : `Edit: ${form.name || "Member"}`}
            </h3>
            <p className="text-xs text-slate-400">
              Configure name, role, department, and rectangle portrait
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-bold mb-1.5">
            Full Name *
          </label>
          <input
            className={inp}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Sakib Rahman"
            required
          />
        </div>

        {/* Role / Title */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-bold mb-1.5">
            Designation / Role *
          </label>
          <input
            className={inp}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="e.g. Chief Design Officer"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-bold mb-1.5">
            Department
          </label>
          <select
            className={inp}
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-bold mb-1.5">
            Display Order
          </label>
          <input
            type="number"
            className={inp}
            value={form.displayOrder}
            onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 1 })}
          />
        </div>

        {/* Portrait Photo URL & Upload (Rectangle Preview) */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-bold mb-1.5">
            Member Portrait Photo (Rectangle Aspect Ratio)
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Live Rectangle Avatar Preview */}
            <div className="w-16 h-20 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00FF87] via-[#30FF97] to-[#059669] shrink-0 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.imageUrl || "/images/team/mohammad-alam.png"}
                alt="Preview"
                className="w-full h-full rounded-[10px] object-cover object-top bg-slate-900"
              />
            </div>

            {/* URL Input */}
            <div className="flex-1 w-full">
              <input
                className={inp}
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="Paste image URL or click upload button"
              />
            </div>

            {/* File Upload Button */}
            <label className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shrink-0 ${
              isDark
                ? "bg-white/[0.08] hover:bg-white/[0.15] border-white/10 text-white"
                : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
            }`}>
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00FF87]" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span>Upload Photo</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {/* Active Toggle */}
        <div className="sm:col-span-2 flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id={`activeMember-${isCreateMode ? 'new' : editingId}`}
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="w-4 h-4 rounded text-[#00FF87] focus:ring-[#00FF87] accent-[#00FF87] cursor-pointer"
          />
          <label htmlFor={`activeMember-${isCreateMode ? 'new' : editingId}`} className="text-sm text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
            Display on live website (Active)
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-black/5 dark:border-white/[0.08]">
        <button
          type="button"
          onClick={onClose}
          className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isDark
              ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isUploading}
          className="px-6 py-2.5 rounded-xl bg-[#00FF87] hover:bg-[#30FF97] disabled:opacity-50 text-[#02180C] text-xs font-extrabold shadow-[0_0_20px_rgba(0,255,135,0.3)] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isCreateMode ? "Add Team Member" : "Save Changes"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <AdminHeader
        title="Team Members"
        subtitle={`${members.filter((m) => m.active).length} of ${members.length} active`}
        action={{ label: "Add Team Member", onClick: openNew, icon: <Plus className="w-4 h-4" /> }}
      />

      <div className="p-6 lg:p-10 max-w-5xl space-y-5">
        {/* Success Alert Banner */}
        {saveAlertMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-[#00FF87] shrink-0" />
            <span className="text-sm font-semibold">{saveAlertMessage}</span>
          </div>
        )}

        {/* TOP FORM (Only for Add New Team Member) */}
        {isNew && (
          <div className="mb-6">
            {renderMemberForm(() => setIsNew(false), true)}
          </div>
        )}

        {/* TEAM MEMBERS LIST (With Inline Editing right at the clicked item) */}
        <div className="space-y-3">
          {members.map((m, index) => {
            const isCurrentlyEditing = editingId === m.id;

            return (
              <div key={m.id} className="space-y-3">
                {/* Main Member Card */}
                <div
                  className={`flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
                    isCurrentlyEditing
                      ? isDark
                        ? "bg-[#09111A] border-[#00FF87] shadow-[0_0_25px_rgba(0,255,135,0.15)] ring-1 ring-[#00FF87]"
                        : "bg-white border-[#00C853] shadow-md ring-1 ring-[#00C853]"
                      : isDark
                      ? m.active
                        ? "bg-[#09111A]/90 border-white/[0.08] hover:border-[#00FF87]/30"
                        : "bg-black/30 border-white/[0.03] opacity-60"
                      : m.active
                      ? "bg-white border-slate-200 hover:border-emerald-500/50 shadow-sm"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  {/* Left: Reorder, Rectangle Avatar, Details */}
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        onClick={() => moveOrder(index, "up")}
                        disabled={index === 0}
                        aria-label="Move Up"
                        className={`p-1 disabled:opacity-20 transition-colors cursor-pointer ${
                          isDark ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveOrder(index, "down")}
                        disabled={index === members.length - 1}
                        aria-label="Move Down"
                        className={`p-1 disabled:opacity-20 transition-colors cursor-pointer ${
                          isDark ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* ═══ RECTANGLE PORTRAIT AVATAR (Not Circle!) ═══ */}
                    <div className="w-13 h-16 sm:w-14 sm:h-17 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00FF87] via-[#30FF97] to-[#059669] shrink-0 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.imageUrl}
                        alt={m.name}
                        className="w-full h-full rounded-[10px] object-cover object-top bg-slate-900"
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-base font-bold truncate font-sans ${isDark ? "text-white" : "text-slate-900"}`}>
                          {m.name}
                        </h4>
                        {!m.active && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 border border-red-500/30 text-red-400">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#00FF87] font-medium truncate">{m.role}</p>
                      {m.department && (
                        <span className={`text-[11px] font-mono block mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {m.department}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Visibility Toggle */}
                    <button
                      onClick={() => updateTeamMember(m.id, { active: !m.active })}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        m.active
                          ? isDark
                            ? "bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/20 hover:bg-[#00FF87]/20"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : isDark
                            ? "bg-white/[0.04] text-slate-500 border-white/[0.06] hover:text-white"
                            : "bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-700"
                      }`}
                      title={m.active ? "Hide on live website" : "Show on live website"}
                    >
                      {m.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    {/* Edit Button: Opens INLINE right here */}
                    <button
                      onClick={() => openEdit(m)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isCurrentlyEditing
                          ? "bg-[#00FF87] text-[#02180C] border-[#00FF87] font-bold"
                          : isDark
                          ? "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border-white/[0.06]"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200"
                      }`}
                      title={isCurrentlyEditing ? "Close Edit Form" : "Edit member inline"}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Delete Button: Triggers Warning Confirmation */}
                    <button
                      onClick={() => setDeleteTarget(m)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isDark
                          ? "bg-white/[0.04] hover:bg-red-500/20 text-slate-400 hover:text-red-400 border-white/[0.06]"
                          : "bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border-slate-200"
                      }`}
                      title="Delete member with confirmation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ═══ INLINE EDIT FORM (Opens right here under the clicked member) ═══ */}
                {isCurrentlyEditing && (
                  <div className="pl-4 sm:pl-8 border-l-2 border-[#00FF87]/50 pt-1 pb-2">
                    {renderMemberForm(() => setEditingId(null), false)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ DELETE WARNING MODAL ═══ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl animate-in zoom-in-95 duration-200 ${
              isDark
                ? "bg-[#0A0F14] border-red-500/30 text-white"
                : "bg-white border-slate-200 text-slate-900 shadow-2xl"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mb-5 shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-extrabold font-serif mb-2">
              Warning: Delete Team Member?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-slate-200 dark:text-white">
                "{deleteTarget.name}"
              </span>
              ? This member profile and their photo will be immediately removed from the live website.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-black/5 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                No, Keep Member
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTeamMember(deleteTarget.id);
                  setSaveAlertMessage(`"${deleteTarget.name}" was permanently removed from the live website.`);
                  setDeleteTarget(null);
                  setTimeout(() => setSaveAlertMessage(null), 4000);
                }}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
