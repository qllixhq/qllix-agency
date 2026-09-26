"use client";

import React from "react";

interface CelestialCometProps {
  /**
   * "pointing-right": Tail on left, blazing head pointing right (flies Left -> Right).
   * "pointing-left": Tail on right, blazing head pointing left (flies Right -> Left).
   */
  direction?: "pointing-right" | "pointing-left";
  className?: string;
}

export default function CelestialComet({
  direction = "pointing-right",
  className = "",
}: CelestialCometProps) {
  const isMirrored = direction === "pointing-left";

  return (
    <div
      className={`relative select-none pointer-events-none ${
        isMirrored ? "scale-x-[-1]" : ""
      } ${className}`}
      style={{ background: "transparent" }}
    >
      <svg
        viewBox="0 0 360 80"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ethereal Outer Gas Haze Filter - ultra soft blur with generous boundary */}
          <filter id={`haze-blur-${direction}`} x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur stdDeviation="4.2" />
          </filter>

          {/* Intense Core Nucleus Flare Filter */}
          <filter id={`core-flare-${direction}`} x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur stdDeviation="2.4" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 100% Seamless Feathered Mask: Tail dissolves completely to 0 at the back without any edge clipping */}
          <mask id={`tail-dissolve-${direction}`}>
            <linearGradient id={`mask-grad-${direction}`} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="12%" stopColor="#000000" stopOpacity="0" />
              <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            {/* Generous mask rectangle that never clips vertically */}
            <rect x="-40" y="-40" width="440" height="160" fill={`url(#mask-grad-${direction})`} />
          </mask>

          {/* Soft Gaseous Nebula Gradient */}
          <linearGradient id={`tail-nebula-${direction}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0" />
            <stop offset="20%" stopColor="#00FF87" stopOpacity="0" />
            <stop offset="40%" stopColor="#00FF87" stopOpacity="0.1" />
            <stop offset="65%" stopColor="#00FFBF" stopOpacity="0.4" />
            <stop offset="88%" stopColor="#80FFE8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Inner Ionized Plasma Spine Gradient */}
          <linearGradient id={`tail-spine-${direction}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0" />
            <stop offset="30%" stopColor="#00FF87" stopOpacity="0" />
            <stop offset="58%" stopColor="#00FFD0" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#B3FFF2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Blazing Nucleus Radial Corona */}
          <radialGradient id={`head-corona-${direction}`} cx="85%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#E6FFFA" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#00FF87" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#00FF87" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00FF87" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ═══ 1. Feathered Ion Tail (Zero hard edges, fully dissolved into space) ═══ */}
        <g mask={`url(#tail-dissolve-${direction})`}>
          {/* Broad Diffuse Gaseous Envelope */}
          <path
            d="M 10,40 C 70,39.6 170,36 260,33 C 298,31.8 330,34 336,40 C 330,46 298,48.2 260,47 C 170,44 70,40.4 10,40 Z"
            fill={`url(#tail-nebula-${direction})`}
            filter={`url(#haze-blur-${direction})`}
            className="animate-comet-breath"
          />

          {/* Ionized Plasma Core Plume */}
          <path
            d="M 35,40 C 110,39.8 200,37.8 280,35.8 C 312,35 332,36.5 336,40 C 332,43.5 312,45 280,44.2 C 200,42.2 110,40.2 35,40 Z"
            fill={`url(#tail-spine-${direction})`}
            filter={`url(#core-flare-${direction})`}
            opacity="0.85"
          />

          {/* High-Energy Plasma Streams (Flowing backward into tail) */}
          <line
            x1="334"
            y1="40"
            x2="25"
            y2="40"
            stroke={`url(#tail-spine-${direction})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            className="comet-pulse-back-fast"
            filter={`url(#core-flare-${direction})`}
          />
          <path
            d="M 332,39.5 Q 210,38 35,40"
            stroke={`url(#tail-nebula-${direction})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            className="comet-pulse-back-mid"
            opacity="0.75"
          />
          <path
            d="M 332,40.5 Q 210,42 35,40"
            stroke={`url(#tail-nebula-${direction})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            className="comet-pulse-back-slow"
            opacity="0.75"
          />

          {/* ═══ REAL ACTIVE MOTION STARDUST PARTICLES (Actively streaming backward from Head into Tail) ═══ */}
          {/* Particle 1: Fast high-intensity spark */}
          <circle fill="#FFFFFF">
            <animate attributeName="cx" from="325" to="30" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="cy" values="40;39;40.8;40" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0.9;0.4;0" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.6;1.5;1.2;0.6" dur="1.1s" repeatCount="indefinite" />
          </circle>

          {/* Particle 2: Upper cosmic ember */}
          <circle fill="#9EFFF2">
            <animate attributeName="cx" from="322" to="50" dur="1.4s" begin="0.25s" repeatCount="indefinite" />
            <animate attributeName="cy" values="39.5;38.5;39;39.5" dur="1.4s" begin="0.25s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0.8;0.3;0" dur="1.4s" begin="0.25s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.4;1.3;1.0;0.5" dur="1.4s" begin="0.25s" repeatCount="indefinite" />
          </circle>

          {/* Particle 3: Lower emerald ember */}
          <circle fill="#00FF87">
            <animate attributeName="cx" from="324" to="40" dur="1.3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="40.5;41.5;41;40.5" dur="1.3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.95;0.7;0.2;0" dur="1.3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.5;1.4;1.1;0.5" dur="1.3s" begin="0.5s" repeatCount="indefinite" />
          </circle>

          {/* Particle 4: Long-trail stardust */}
          <circle fill="#FFFFFF">
            <animate attributeName="cx" from="326" to="20" dur="1.6s" begin="0.75s" repeatCount="indefinite" />
            <animate attributeName="cy" values="40;39.2;40.5;40" dur="1.6s" begin="0.75s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0.85;0.4;0" dur="1.6s" begin="0.75s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.6;1.5;1.2;0.6" dur="1.6s" begin="0.75s" repeatCount="indefinite" />
          </circle>

          {/* Particle 5: Cyan ion speck */}
          <circle fill="#66FFE0">
            <animate attributeName="cx" from="323" to="60" dur="1.25s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="40.2;38.8;39.6;40.2" dur="1.25s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.9;0.75;0.3;0" dur="1.25s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.3;1.2;0.9;0.4" dur="1.25s" begin="0.4s" repeatCount="indefinite" />
          </circle>

          {/* Particle 6: Subtle trailing glow spark */}
          <circle fill="#A8FFEC">
            <animate attributeName="cx" from="325" to="70" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
            <animate attributeName="cy" values="39.8;41.2;40.6;39.8" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.85;0.6;0.2;0" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.2;1.1;0.8;0.4" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ═══ 2. Blazing Celestial Nucleus Head ═══ */}
        {/* Soft Radiant Halo */}
        <ellipse
          cx="322"
          cy="40"
          rx="22"
          ry="8"
          fill={`url(#head-corona-${direction})`}
          filter={`url(#core-flare-${direction})`}
        />

        {/* Dense Ionized Core */}
        <ellipse
          cx="325"
          cy="40"
          rx="14"
          ry="4.5"
          fill="#A8FFF3"
          opacity="0.9"
        />

        {/* Blinding Pure White Nucleus */}
        <ellipse
          cx="328"
          cy="40"
          rx="8"
          ry="2.6"
          fill="#FFFFFF"
          className="animate-comet-core-flare"
        />

        {/* Needle-sharp forward ionization tip */}
        <circle
          cx="333"
          cy="40"
          r="1.7"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}
