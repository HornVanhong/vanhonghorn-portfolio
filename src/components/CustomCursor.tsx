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

  const [isMouseDown, setIsMouseDown] = useState(false);

  // Position and target tracking using refs for high-performance tick loop
  const mouse = useRef({ x: 0, y: 0 });
  const magneticRef = useRef<HTMLElement | null>(null);
  const magneticRectRef = useRef<DOMRect | null>(null);
  const prevMagneticRef = useRef<HTMLElement | null>(null);
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);

  useGSAP(() => {
    if (typeof window === "undefined" || !dotRef.current || !ringRef.current) return;

    gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });

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

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    const tick = () => {
      if (prevMagneticRef.current && prevMagneticRef.current !== magneticRef.current) {
        gsap.to(prevMagneticRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
      prevMagneticRef.current = magneticRef.current;

      if (magneticRef.current) {
        const el = magneticRef.current;
        if (!magneticRectRef.current) {
          magneticRectRef.current = el.getBoundingClientRect();
        }
        const rect = magneticRectRef.current;

        const isElVisible = el.isConnected && rect.width > 0;
        if (!isElVisible) {
          setMagneticElement(null);
          setIsHovered(false);
          hoverRef.current = false;
          magneticRef.current = null;
          magneticRectRef.current = null;
          return;
        }

        const centerSecX = rect.left + rect.width / 2;
        const centerSecY = rect.top + rect.height / 2;

        const dx = mouse.current.x - centerSecX;
        const dy = mouse.current.y - centerSecY;

        const pullFactor = 0.22;
        xRingTo(centerSecX + dx * pullFactor);
        yRingTo(centerSecY + dy * pullFactor);

        const maxDisplacement = 6;
        const elTranslateX = gsap.utils.clamp(-maxDisplacement, maxDisplacement, dx * 0.25);
        const elTranslateY = gsap.utils.clamp(-maxDisplacement, maxDisplacement, dy * 0.25);

        gsap.to(el, {
          x: elTranslateX,
          y: elTranslateY,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        xRingTo(mouse.current.x);
        yRingTo(mouse.current.y);
      }

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

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const updateRect = () => {
      if (magneticRef.current) {
        magneticRectRef.current = magneticRef.current.getBoundingClientRect();
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .social, .theme-toggle, .music-toggle, .pdf-download-btn, .pdf-link, .profile-card-btn, .cert-view-btn, .cert-download-btn, .close-modal-btn");
      if (isInteractive) {
        setIsHovered(true);
        hoverRef.current = true;
      } else {
        setIsHovered(false);
        hoverRef.current = false;
      }

      const isMag = target.closest(".social, .theme-toggle, .music-toggle, .nav-link, .site-brand, .profile-card-btn, .btn, .cert-view-btn, .cert-download-btn, .close-modal-btn, .telegram-qr-btn, .telegram-direct-link-btn");
      if (isMag && isMag !== magneticRef.current) {
        const el = isMag as HTMLElement;
        setMagneticElement(el);
        magneticRef.current = el;
        magneticRectRef.current = el.getBoundingClientRect();
      } else if (!isMag && magneticRef.current) {
        setMagneticElement(null);
        magneticRef.current = null;
        magneticRectRef.current = null;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      setIsHovered(false);
      hoverRef.current = false;
      setMagneticElement(null);
      magneticRef.current = null;
      magneticRectRef.current = null;
    };

    document.addEventListener("mouseover", handleMouseEnter, { passive: true });
    document.addEventListener("mouseout", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const ringStyle = magneticElement
    ? {
        width: `${magneticElement.offsetWidth + 12}px`,
        height: `${magneticElement.offsetHeight + 12}px`,
        borderRadius: "8px",
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
        className={`custom-cursor-dot ${isHovered ? "hovered" : ""} ${magneticElement ? "magnetic-active" : ""} ${isMouseDown ? "clicked" : ""}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""} ${magneticElement ? "magnetic" : ""} ${isMouseDown ? "clicked" : ""}`}
        style={ringStyle}
      />
    </div>
  );
}
