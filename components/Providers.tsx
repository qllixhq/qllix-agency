"use client";

import React from "react";
import { CmsProvider } from "@/context/CmsContext";
import SecretAdminModal from "@/components/SecretAdminModal";
import TopLoadingBar from "@/components/TopLoadingBar";
import BrandRuntime from "@/components/BrandRuntime";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CmsProvider>
      <BrandRuntime />
      <TopLoadingBar />
      {children}
      <SecretAdminModal />
    </CmsProvider>
  );
}
