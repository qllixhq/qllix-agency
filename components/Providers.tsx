"use client";

import React from "react";
import { CmsProvider, useCms } from "@/context/CmsContext";
import SecretAdminModal from "@/components/SecretAdminModal";
import TopLoadingBar from "@/components/TopLoadingBar";
import BrandRuntime from "@/components/BrandRuntime";

function CmsReadyContent({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useCms();

  if (!isLoaded) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#07050E]" aria-busy="true">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-emerald-400" />
      </main>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CmsProvider>
      <BrandRuntime />
      <TopLoadingBar />
      <CmsReadyContent>{children}</CmsReadyContent>
      <SecretAdminModal />
    </CmsProvider>
  );
}
