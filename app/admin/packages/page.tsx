"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminPackagesPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the unified Services & Packages dashboard
    const timer = setTimeout(() => {
      router.replace("/admin/services");
    }, 1200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <AdminHeader
        title="Services & Packages"
        subtitle="Services and packages have been unified into a single card dashboard."
      />

      <div className="p-6 lg:p-12 max-w-4xl mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,135,0.15)]">
          <Sparkles className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-white mb-3">
          Services & Packages are now Unified!
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
          You can now drag &amp; drop to reorder services, view all 3 packages inside each service card, and edit or add services with packages together in one place.
        </p>

        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00FF87] hover:bg-[#00DF81] text-[#02180C] font-black text-sm transition-all shadow-[0_0_25px_rgba(0,255,135,0.3)] cursor-pointer active:scale-95"
        >
          <span>Open Services &amp; Packages Dashboard</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}
