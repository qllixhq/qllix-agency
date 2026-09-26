"use client";

import React, { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* 1. Subtle Clean Dot Matrix on White */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. Interactive Cursor Spotlight (Subtle Emerald Tint) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-300 ease-out opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 200, 83, 0.25) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 70%)",
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
        }}
      />

      {/* 3. Soft Drifting Light Orbs for visual depth */}
      {/* Top Emerald Aura */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Mid Left Subtle Sky Aura */}
      <div 
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Mid Right Soft Mint Aura */}
      <div 
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Bottom Center Soft Teal Aura */}
      <div className="absolute bottom-20 left-1/3 w-[600px] h-[400px] bg-teal-50/50 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}
