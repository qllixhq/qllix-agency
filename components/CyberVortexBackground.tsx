"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speed: number;
  phase: number;
  color: string;
}

export default function CyberVortexBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      height = canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Cosmic stars scattered across the deep space canvas
    const starCount = 140;
    const stars: Star[] = [];
    for (let s = 0; s < starCount; s++) {
      const isEmerald = Math.random() < 0.35;
      stars.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.1 + 0.4,
        baseAlpha: Math.random() * 0.45 + 0.15,
        speed: Math.random() * 1.8 + 0.6,
        phase: Math.random() * Math.PI * 2,
        color: isEmerald ? "0, 255, 135" : "255, 255, 255",
      });
    }

    let time = 0;

    const render = () => {
      time += 0.011;
      ctx.clearRect(0, 0, width, height);

      // 0. DEEP SPACE: Gentle Twinkling Stars
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const sx = star.x * width;
        const sy = star.y * height;
        const twinkle = Math.sin(time * star.speed + star.phase);
        const alpha = Math.max(0.05, star.baseAlpha + twinkle * 0.25);

        ctx.beginPath();
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        if (alpha > 0.45 && star.radius > 0.8) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgb(${star.color})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      // 1. LEFT SIDE: Dense Curved Dot Matrix Wave with smooth vertical edge blending
      const cols = 35;
      const rows = 40;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const u = i / cols;
          const v = j / rows;

          const baseX = Math.pow(u, 1.4) * (width * 0.36);
          const baseY = v * height;
          const wave = Math.sin(v * Math.PI * 2.5 + time + u * 4) * 28 * (1 - u);
          const x = baseX + wave - 20;
          const y = baseY + Math.cos(u * Math.PI + time * 0.8) * 15;

          const distFromLeft = u;
          // Smooth vertical falloff so top and bottom edges blend seamlessly without any sharp cutoffs
          const verticalFade = Math.sin(v * Math.PI);
          const alpha =
            (1 - distFromLeft * 0.85) *
            (0.18 + 0.35 * Math.sin(time * 2 + i * 0.4 + j * 0.2)) *
            Math.pow(verticalFade, 0.45);
          const radius = Math.max(0.6, (1 - distFromLeft * 0.6) * 1.6);

          if (alpha > 0.03 && x < width * 0.42) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 135, ${alpha})`;
            if (u < 0.15 && (i + j) % 7 === 0) {
              ctx.shadowBlur = 8;
              ctx.shadowColor = "#00FF87";
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fill();
          }
        }
      }

      // 2. RIGHT SIDE: Dense Curved Dot Matrix Wave with smooth vertical edge blending
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const u = i / cols;
          const v = j / rows;

          const baseX = width - Math.pow(1 - u, 1.4) * (width * 0.36);
          const baseY = v * height;
          const wave = Math.sin(v * Math.PI * 2.5 + time - (1 - u) * 4) * 28 * u;
          const x = baseX - wave + 20;
          const y = baseY + Math.cos((1 - u) * Math.PI + time * 0.8) * 15;

          const distFromRight = 1 - u;
          const verticalFade = Math.sin(v * Math.PI);
          const alpha =
            (1 - distFromRight * 0.85) *
            (0.18 + 0.35 * Math.sin(time * 2 + i * 0.4 + j * 0.2)) *
            Math.pow(verticalFade, 0.45);
          const radius = Math.max(0.6, (1 - distFromRight * 0.6) * 1.6);

          if (alpha > 0.03 && x > width * 0.58) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 135, ${alpha})`;
            if (u > 0.85 && (i + j) % 7 === 0) {
              ctx.shadowBlur = 8;
              ctx.shadowColor = "#00FF87";
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-90"
    />
  );
}
