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
    const maxDistance = 120;
    const mouseRadius = 160;

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Calculate particle density based on screen resolution
      const density = Math.floor((width * height) / 38000);
      const count = Math.min(58, Math.max(18, density));

      particles = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.5 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: radius,
          baseRadius: radius,
        });
      }
    };

    const handleResize = () => {
      // Re-init particles on screen size changes to populate the screen nicely
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
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Retrieve active variables from theme computed properties
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

    const tick = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const { accent, accentRGB } = colorsRef.current;
      const mouse = mouseRef.current;

      ctx.lineWidth = 0.75;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connect to mouse if active & close
        if (mouse.x > -9999) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.2;
            ctx.strokeStyle = `rgba(${accentRGB}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gentle gravity pull toward cursor
            p1.x += dx * 0.007;
            p1.y += dy * 0.007;
          }
        }

        // Connect to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.07;
            ctx.strokeStyle = `rgba(${accentRGB}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Render and update individual node drift
      for (const p of particles) {
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;

        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }
    };

    // Add tick function to GSAP central render pipeline
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
