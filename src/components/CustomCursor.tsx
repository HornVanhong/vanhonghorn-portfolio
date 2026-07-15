"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

  // Position and target tracking using refs for high-performance tick loop
  const mouse = useRef({ x: 0, y: 0 });
  const magneticRef = useRef<HTMLElement | null>(null);
  const prevMagneticRef = useRef<HTMLElement | null>(null);
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);

  useGSAP(() => {
    if (typeof window === "undefined" || !dotRef.current || !ringRef.current) return;

    // Apply percent translations for centering via GSAP to prevent transform collisions
    gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });

    // quickTo is highly optimized for updating position properties frequently
    const xDotTo = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3.out" });

    const xRingTo = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onMouseLeaveWindow = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    // Frame-rate based animation loop
    const tick = () => {
      // Bouncy reset for previously magnetic element when mouse leaves
      if (prevMagneticRef.current && prevMagneticRef.current !== magneticRef.current) {
        gsap.to(prevMagneticRef.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1.1, 0.4)",
          overwrite: "auto"
        });
      }
      prevMagneticRef.current = magneticRef.current;

      if (magneticRef.current) {
        const el = magneticRef.current;
        const rect = el.getBoundingClientRect();
        
        // If the element has been unmounted, hidden, or collapsed (e.g. modal closed)
        const isElVisible = el.isConnected && rect.width > 0 && rect.height > 0;
        
        if (!isElVisible) {
          // Reset states immediately
          setMagneticElement(null);
          setIsHovered(false);
          hoverRef.current = false;
          magneticRef.current = null;
          return;
        }

        // Snapping logic: align cursor ring to the target center
        const centerSecX = rect.left + rect.width / 2;
        const centerSecY = rect.top + rect.height / 2;

        const dx = mouse.current.x - centerSecX;
        const dy = mouse.current.y - centerSecY;

        // Mild pull: cursor offset pulls the snapped ring slightly
        const pullFactor = 0.22;
        xRingTo(centerSecX + dx * pullFactor);
        yRingTo(centerSecY + dy * pullFactor);

        // Magnetic physics: pull the actual HTML element slightly toward pointer
        const maxDisplacement = 8;
        const elTranslateX = gsap.utils.clamp(-maxDisplacement, maxDisplacement, dx * 0.35);
        const elTranslateY = gsap.utils.clamp(-maxDisplacement, maxDisplacement, dy * 0.35);

        gsap.to(el, {
          x: elTranslateX,
          y: elTranslateY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        // Normal state tracking
        xRingTo(mouse.current.x);
        yRingTo(mouse.current.y);
      }

      // Dot tracks cursor position
      xDotTo(mouse.current.x);
      yDotTo(mouse.current.y);
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Expand ring on links, buttons and interactive items
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .social, .theme-toggle, .music-toggle, .pdf-download-btn, .pdf-link, .profile-card-btn, .cert-view-btn, .cert-download-btn, .close-modal-btn");
      if (isInteractive) {
        setIsHovered(true);
        hoverRef.current = true;
      } else {
        setIsHovered(false);
        hoverRef.current = false;
      }

      // Check for magnetic elements (social icons, navbar links, toggles, view buttons, close button)
      const isMag = target.closest(".social, .theme-toggle, .music-toggle, .nav-link, .site-brand, .profile-card-btn, .btn, .cert-view-btn, .cert-download-btn, .close-modal-btn, .telegram-qr-btn, .telegram-direct-link-btn");
      if (isMag) {
        setMagneticElement(isMag as HTMLElement);
        magneticRef.current = isMag as HTMLElement;
      } else {
        setMagneticElement(null);
        magneticRef.current = null;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      setIsHovered(false);
      hoverRef.current = false;
      setMagneticElement(null);
      magneticRef.current = null;
    };

    // Add listeners using delegation
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  // Don't render on SSR or touch devices (media query handles display on pointer coarse)
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Calculate style properties for magnetic elements
  const ringStyle = magneticElement
    ? {
        width: `${magneticElement.offsetWidth + 12}px`,
        height: `${magneticElement.offsetHeight + 12}px`,
        borderRadius: window.getComputedStyle(magneticElement).borderRadius || "8px",
      }
    : {};

  return (
    <div
      style={{
        display: isVisible ? "block" : "none",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovered ? "hovered" : ""} ${magneticElement ? "magnetic-active" : ""}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""} ${magneticElement ? "magnetic" : ""}`}
        style={ringStyle}
      />
    </div>
  );
}
