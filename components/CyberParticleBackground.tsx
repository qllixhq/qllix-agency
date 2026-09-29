"use client";

import React, { useEffect, useRef } from "react";

export default function CyberParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate cyber mesh particles
    const particleCount = Math.min(Math.floor(width / 14), 100);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      side: "left" | "right" | "ambient";
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const isLeft = i % 2 === 0;
      const side = isLeft ? "left" : "right";
      const x = isLeft
        ? Math.random() * (width * 0.35)
        : width - Math.random() * (width * 0.35);

      particles.push({
        x,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.5 + 0.2,
        side
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle wave lines on left and right sides
      const drawCyberWave = (startX: number, isRight: boolean) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 255, 135, 0.08)";
        ctx.lineWidth = 1.2;

        for (let y = 0; y < height; y += 20) {
          const waveOffset = Math.sin(y * 0.01 + time) * 30 + Math.cos(y * 0.02 - time * 0.5) * 20;
          const px = isRight ? width - startX - waveOffset : startX + waveOffset;
          if (y === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
        ctx.restore();
      };

      for (let i = 0; i < 5; i++) {
        drawCyberWave(40 + i * 50, false);
        drawCyberWave(40 + i * 50, true);
      }

      // Update & draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.side === "left") {
          if (p.x < 0 || p.x > width * 0.4) p.vx *= -1;
        } else {
          if (p.x < width * 0.6 || p.x > width) p.vx *= -1;
        }
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse alpha
        const alpha = p.baseAlpha + Math.sin(time * 2 + idx) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 135, ${Math.max(0.1, alpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00FF87";
        ctx.fill();

        // Connect nearby particles with glowing green lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p.side === p2.side) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 255, 135, ${0.15 * (1 - dist / 90)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}
