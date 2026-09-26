"use client";

import React from "react";
import { CmsProvider } from "@/context/CmsContext";
import SecretAdminModal from "@/components/SecretAdminModal";
import TopLoadingBar from "@/components/TopLoadingBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CmsProvider>
      <TopLoadingBar />
      {children}
      <SecretAdminModal />
    </CmsProvider>
  );
}
