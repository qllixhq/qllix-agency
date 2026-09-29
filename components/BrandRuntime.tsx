"use client";

import { useEffect } from "react";
import { useCms } from "@/context/CmsContext";

const fontStack = (font?: string) => {
  if (font === "Playfair Display") return "var(--font-playfair), Georgia, serif";
  if (font === "Inter") return "var(--font-inter), Arial, sans-serif";
  return "var(--font-outfit), Arial, sans-serif";
};

/** Applies the editable brand configuration to every public route after CMS data loads. */
export default function BrandRuntime() {
  const { cmsData, isLoaded } = useCms();

  useEffect(() => {
    if (!isLoaded) return;
    const general = cmsData.general;
    const primary = general.primaryColor || "#00FF87";
    const secondary = general.secondaryColor || "#02180C";

    document.documentElement.style.setProperty("--brand-primary", primary);
    document.documentElement.style.setProperty("--brand-secondary", secondary);
    document.documentElement.style.setProperty("--brand-heading-font", fontStack(general.headingFont));
    document.body.style.fontFamily = fontStack(general.bodyFont);
    document.title = general.agencyName ? `${general.agencyName} | ${general.tagline || "Creative Agency"}` : "Qllix";

    const faviconUrl = general.faviconUrl || general.logoUrl;
    if (faviconUrl) {
      let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = faviconUrl;
    }
  }, [cmsData, isLoaded]);

  return null;
}