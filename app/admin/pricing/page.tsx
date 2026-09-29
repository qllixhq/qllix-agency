"use client";

import React from "react";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

// This page has been superseded by the new Packages management system.
// Please use /admin/packages for full package management.

export default function AdminPricingRedirectPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#00FF87]/10 border border-[#00FF87]/25 flex items-center justify-center mb-6">
        <Package className="w-8 h-8 text-[#00FF87]" />
      </div>
      <h2 className="text-2xl font-black text-white mb-3">Pricing Moved</h2>
      <p className="text-slate-400 text-sm max-w-sm mb-6">
        Pricing is now managed through the new <strong className="text-white">Packages</strong> system,
        which supports unlimited packages per service with BDT pricing, features, and more.
      </p>
      <Link
        href="/admin/packages"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00FF87] text-[#021A0C] font-black text-sm hover:bg-[#00e87a] transition-colors"
      >
        Go to Packages
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
