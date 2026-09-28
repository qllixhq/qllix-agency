"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";

// Portfolio management has moved to /admin/portfolio

export default function AdminProjectsRedirectPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-400/10 border border-purple-400/25 flex items-center justify-center mb-6">
        <Layers className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-2xl font-black text-white mb-3">Projects Moved to Portfolio</h2>
      <p className="text-slate-400 text-sm max-w-sm mb-6">
        Portfolio management is now handled by the new <strong className="text-white">Portfolio</strong> section,
        with category filtering, image preview, and modal detail views.
      </p>
      <Link
        href="/admin/portfolio"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 text-white font-black text-sm hover:bg-purple-600 transition-colors"
      >
        Go to Portfolio
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
