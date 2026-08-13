"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const colorsRef = useRef({ accent: "#00d5e8", accentRGB: "0, 213, 232" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS target for background canvas
    const maxDistance = 110;
    const mouseRadius = 140;

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Calculate particle density based on screen resolution (optimized max 28)
      const density = Math.floor((width * height) / 48000);
      const count = Math.min(28, Math.max(12, density));

      particles = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.5 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: radius,
          baseRadius: radius,
        });
      }
    };

    const handleResize = () => {
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    initParticles();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      colorsRef.current = {
        accent: style.getPropertyValue("--accent").trim() || "#00d5e8",
        accentRGB: style.getPropertyValue("--accent-rgb").trim() || "0, 213, 232",
      };
    };
    updateColors();

    const themeObserver = new MutationObserver(updateColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const tick = (time: number) => {
      if (!ctx || !canvas || document.hidden) return;

      // Throttle canvas updates to ~30 FPS
      const elapsed = time * 1000 - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time * 1000 - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);

      const { accent, accentRGB } = colorsRef.current;
      const mouse = mouseRef.current;

      ctx.lineWidth = 0.7;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (mouse.x > -9999) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadius * mouseRadius) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouseRadius) * 0.18;
            ctx.strokeStyle = `rgba(${accentRGB}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            p1.x += dx * 0.005;
            p1.y += dy * 0.005;
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * 0.06;
            ctx.strokeStyle = `rgba(${accentRGB}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = accent;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;

        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      themeObserver.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-canvas-nodes" aria-hidden="true" />;
}
