"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCms } from "@/context/CmsContext";

export default function TopLoadingBar() {
  const { cmsData } = useCms();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const loadingConfig = cmsData.general.loadingBar ?? {
    enabled: true,
    color: "#00FF87",
    height: 3,
  };

  useEffect(() => {
    if (!loadingConfig.enabled) return;

    // Trigger smooth progress animation on route change
    setVisible(true);
    setProgress(25);

    const t1 = setTimeout(() => setProgress(65), 100);
    const t2 = setTimeout(() => setProgress(90), 250);
    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200);
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, loadingConfig.enabled]);

  if (!loadingConfig.enabled || !visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none transition-all duration-300 ease-out"
      style={{
        height: `${loadingConfig.height || 3}px`,
        width: `${progress}%`,
        backgroundColor: loadingConfig.color || "#00FF87",
        boxShadow: `0 0 10px ${loadingConfig.color || "#00FF87"}, 0 0 5px ${loadingConfig.color || "#00FF87"}`,
      }}
    />
  );
}
