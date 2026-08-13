"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  FaCode,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGithub,
  FaLaptopCode,
  FaMobileAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SmartNasImage from "../assets/Smart_nas.png";
import RestaurantImage from "../assets/Resturant.png";

gsap.registerPlugin(ScrollTrigger);

const pdf1 = "/Project/TCI-2510-CAMBODIA-II.s6.xe101.pdf";
const pdf2 = "/Project/TCI-2510-CAMBODIA-II.s6.xe103.pdf";
const pdf3 = "/Project/TCI-2510-CAMBODIA-II.s6.xe105.pdf";

const projectCards = [
  {
    icon: <FaLaptopCode aria-hidden="true" />,
    title: "CyberLab",
    meta: "TypeScript • Updated Aug 2026",
    summary: "Cybersecurity laboratory platform & network analysis tools.",
    tags: ["TypeScript", "Cyber Security", "Vercel"],
    repoUrl: "https://github.com/HornVanhong/CyberLab",
    liveUrl: "https://cyber-lab-roan.vercel.app",
    previewTone: "cyan",
  },
  {
    icon: <FaLaptopCode aria-hidden="true" />,
    title: "SmartCV",
    meta: "TypeScript • Updated Aug 2026",
    summary: "Smart CV & resume builder published as a live web application.",
    image: "/project-screenshots/smart-cv.png",
    imageAlt: "SmartCV resume builder landing page",
    tags: ["TypeScript", "CV Builder", "Vercel"],
    repoUrl: "https://github.com/HornVanhong/SmartCV",
    liveUrl: "https://smart-cv-two.vercel.app",
    previewTone: "green",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Korea-Learn",
    meta: "TypeScript • Updated Aug 2026",
    summary: "Interactive Korean language learning platform built with TypeScript.",
    tags: ["TypeScript", "Korean", "EdTech"],
    repoUrl: "https://github.com/HornVanhong/Korea-Learn",
    liveUrl: "https://korea-learn.vercel.app",
    previewTone: "violet",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "English-Learn",
    meta: "TypeScript • Updated Jul 2026",
    summary: "English language learning platform featuring interactive exercises.",
    tags: ["TypeScript", "English", "Education"],
    repoUrl: "https://github.com/HornVanhong/English-Learn",
    liveUrl: "https://english-learn-zeta-taupe.vercel.app",
    previewTone: "amber",
  },
  {
    icon: <FaLaptopCode aria-hidden="true" />,
    title: "SmartCV V2",
    meta: "TypeScript • Updated Jul 2026",
    summary: "Next generation CV builder featuring custom PDF generation.",
    tags: ["TypeScript", "Resume", "Vercel"],
    repoUrl: "https://github.com/HornVanhong/SmartCVV2",
    liveUrl: "https://smart-cvv-2.vercel.app",
    previewTone: "green",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Confessly",
    meta: "TypeScript • Updated Jul 2026",
    summary: "Anonymous confession and social messaging platform.",
    tags: ["TypeScript", "Web App", "Vercel"],
    repoUrl: "https://github.com/HornVanhong/Confessly",
    liveUrl: "https://confessly-m4nn.vercel.app",
    previewTone: "rose",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "AudioScribe",
    meta: "TypeScript • Updated Jul 2026",
    summary: "Audio transcription and speech-to-text notes converter.",
    tags: ["TypeScript", "Audio", "Web App"],
    repoUrl: "https://github.com/HornVanhong/AudioScribe",
    liveUrl: "https://audio-scribe-delta.vercel.app",
    previewTone: "violet",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "TextSnap",
    meta: "TypeScript • Updated Jul 2026",
    summary: "Text capture web app with image OCR conversion.",
    image: "/project-screenshots/text-snap.png",
    imageAlt: "TextSnap image to text converter app screen",
    tags: ["TypeScript", "Web App", "OCR"],
    repoUrl: "https://github.com/HornVanhong/TextSnap",
    liveUrl: "https://text-snap-navy.vercel.app",
    previewTone: "cyan",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Digital_Clock",
    meta: "HTML / JS • Updated Jun 2026",
    summary: "Sleek digital clock web widget with custom themes.",
    tags: ["HTML", "Clock", "Web UI"],
    repoUrl: "https://github.com/HornVanhong/Digital_Clock",
    liveUrl: "https://digital-clock-green-omega.vercel.app",
    previewTone: "amber",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "KSHRD Web Project",
    meta: "JavaScript • Updated Mar 2026",
    summary: "Interactive JavaScript web application project.",
    tags: ["JavaScript", "Web App", "Vercel"],
    repoUrl: "https://github.com/HornVanhong/09_HORN_VANHONG_SR_Web_Homework005",
    liveUrl: "https://09-horn-vanhong-sr-web-homework005.vercel.app",
    previewTone: "amber",
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "JongNham Restaurant",
    meta: "HTML • Updated Dec 2024",
    summary: "Restaurant menu and ordering interface with live Vercel deployment.",
    image: RestaurantImage,
    imageAlt: "Restaurant menu web app screen",
    tags: ["HTML", "Restaurant", "Menu"],
    repoUrl: "https://github.com/HornVanhong/JongNham_Resturant",
    liveUrl: "https://jong-nham-resturant.vercel.app",
  },
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "DramTranslatorApp",
    meta: "Dart / Flutter • Updated Jul 2026",
    summary: "Mobile drama sub/translator application built with Flutter.",
    tags: ["Flutter", "Dart", "Mobile App"],
    repoUrl: "https://github.com/HornVanhong/DramTranslatorApp",
    previewTone: "cyan",
  },
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "Quiz-for-Android-Developer",
    meta: "Kotlin • Updated Aug 2025",
    summary: "Android quiz application for developer self-assessment.",
    tags: ["Kotlin", "Android", "Quiz"],
    repoUrl: "https://github.com/HornVanhong/Quiz-for-Android-Developer",
    previewTone: "green",
  },
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "Smart_App",
    meta: "JavaScript • Updated Jul 2025",
    summary: "Smart mobile app UI work, represented by the SmartNas screen.",
    image: SmartNasImage,
    imageAlt: "SmartNas mobile app UI screen",
    tags: ["JavaScript", "Mobile UI", "Smart App"],
    repoUrl: "https://github.com/HornVanhong/Smart_App",
  },
];

const pdfFiles = [
  {
    href: pdf1,
    title: "TCI-2510-CAMBODIA-II.s6.xe101.pdf",
    description: "PDF deliverable for the first project document.",
  },
  {
    href: pdf2,
    title: "TCI-2510-CAMBODIA-II.s6.xe103.pdf",
    description: "PDF deliverable for the second project document.",
  },
  {
    href: pdf3,
    title: "TCI-2510-CAMBODIA-II.s6.xe105.pdf",
    description: "PDF deliverable for the third project document.",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pdfTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([
        ".projects-header > *",
        ".projects-overview > div",
        ".projects-carousel",
        ".projects-footer-copy > *",
        ".pdf-carousel"
      ], { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    // Reveal animations
    gsap.set([
      ".projects-header > *",
      ".projects-overview > div",
      ".projects-carousel",
      ".projects-footer-copy > *",
      ".pdf-carousel"
    ], {
      opacity: 0,
      y: 35
    });

    gsap.to(".projects-header > *", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-header",
        start: "top 85%"
      }
    });

    gsap.to(".projects-overview > div", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-overview",
        start: "top 85%"
      }
    });

    gsap.to(".projects-carousel", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-carousel",
        start: "top 85%"
      }
    });

    gsap.to(".projects-footer-copy > *", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-footer",
        start: "top 85%"
      }
    });

    gsap.to(".pdf-carousel", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".pdf-carousel",
        start: "top 85%"
      }
    });

    // 3D Hover Tilt for Project & PDF cards
    const projectCardsList = containerRef.current.querySelectorAll(".project-card, .modern-pdf-card");
    const cleanupTiltListeners: Array<() => void> = [];
    projectCardsList.forEach((card) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;

        const tiltX = -(dy / yc) * 7;
        const tiltY = (dx / xc) * 7;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          y: -5,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4,
          overwrite: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          overwrite: "auto",
        });
      };

      card.addEventListener("mousemove", onMouseMove as EventListener);
      card.addEventListener("mouseleave", onMouseLeave as EventListener);
      cleanupTiltListeners.push(() => {
        card.removeEventListener("mousemove", onMouseMove as EventListener);
        card.removeEventListener("mouseleave", onMouseLeave as EventListener);
      });
    });

    return () => {
      cleanupTiltListeners.forEach((cleanup) => cleanup());
    };
  }, { scope: containerRef });

  const handleScroll = (track: HTMLDivElement | null, direction: "prev" | "next", itemSelector: string) => {
    if (!track) return;
    const cardWidth = track.querySelector(itemSelector)?.getBoundingClientRect().width || 320;
    const gap = 24; // 1.5rem
    const delta = direction === "next" ? (cardWidth + gap) : -(cardWidth + gap);
    const newScrollLeft = Math.max(
      0,
      Math.min(
        track.scrollLeft + delta,
        track.scrollWidth - track.clientWidth
      )
    );
    gsap.to(track, {
      scrollLeft: newScrollLeft,
      duration: 0.45,
      ease: "power2.out"
    });
  };

  return (
    <section id="projects" ref={containerRef} className="projects-page">
      <div className="projects-header">
        <span className="projects-kicker">
          <FaLaptopCode aria-hidden="true" />
          Selected Work
        </span>
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          A mix of academic work, internship delivery, networking labs, and
          security-focused exercises.
        </p>
      </div>

      <div className="projects-overview" aria-label="Projects summary">
        <div>
          <strong>{projectCards.length}</strong>
          <span>Featured Projects</span>
        </div>
        <div>
          <strong>3</strong>
          <span>PDF Deliverables</span>
        </div>
        <div>
          <strong>Work</strong>
          <span>Internship & Coursework</span>
        </div>
      </div>

      {/* Projects Horizontal Carousel */}
      <div className="projects-carousel">
        <div className="projects-track" ref={trackRef}>
          {projectCards.map((project) => {
            const targetUrl = project.liveUrl || project.repoUrl;
            const displayUrl = project.liveUrl
              ? project.liveUrl.replace("https://", "")
              : project.repoUrl.replace("https://github.com/", "github.com/");

            return (
              <article className="project-card" key={project.title}>
                <div className="project-card-top">
                  <span className="project-icon">{project.icon}</span>
                  <span className="project-badge">{project.liveUrl ? "Live App" : "Repository"}</span>
                </div>

                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-preview-link"
                  title={`Open ${project.title} live website (${targetUrl})`}
                >
                  <div className={`project-preview project-preview-${project.previewTone || "cyan"}`}>
                    <div className="project-preview-browser">
                      <div className="browser-dots">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="browser-address-bar">
                        {displayUrl}
                      </div>
                    </div>

                    {project.image ? (
                      <div className="project-image-wrap">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          className="project-image"
                          width={1600}
                          height={1000}
                          sizes="(max-width: 768px) 84vw, 320px"
                          placeholder={typeof project.image === "string" ? "empty" : "blur"}
                        />
                      </div>
                    ) : project.liveUrl ? (
                      <div className="project-iframe-wrap">
                        <iframe
                          src={project.liveUrl}
                          title={`${project.title} live thumbnail`}
                          className="project-iframe"
                          loading="lazy"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="project-preview-content">
                        <span className="project-preview-icon">{project.icon}</span>
                        <div className="project-preview-lines">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    )}

                    <div className="project-preview-overlay">
                      <span className="overlay-btn">
                        <FaExternalLinkAlt aria-hidden="true" />
                        View Real Site
                      </span>
                    </div>
                  </div>
                </a>
              <h2>{project.title}</h2>
              <p className="project-meta">{project.meta}</p>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-actions">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub aria-hidden="true" />
                  GitHub
                </a>
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link project-link-live">
                    <FaExternalLinkAlt aria-hidden="true" />
                    Live
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
        </div>

        {/* Carousel controls */}
        <div className="carousel-controls">
          <button
            className="carousel-btn prev-btn magnetic"
            onClick={() => handleScroll(trackRef.current, "prev", ".project-card")}
            aria-label="Scroll Left"
          >
            <FaChevronLeft />
          </button>
          <button
            className="carousel-btn next-btn magnetic"
            onClick={() => handleScroll(trackRef.current, "next", ".project-card")}
            aria-label="Scroll Right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="projects-footer">
        <div className="projects-footer-copy">
          <span className="projects-footer-label">Documents</span>
          <h2>Project Files</h2>
          <p>
            Reference PDFs for supporting coursework and project documentation.
          </p>
        </div>

        {/* PDFs Horizontal Carousel */}
        <div className="pdf-carousel">
          <div className="pdf-track" ref={pdfTrackRef}>
            {pdfFiles.map((file) => (
              <article className="modern-pdf-card" key={file.href}>
                <div className="pdf-card-top">
                  <span className="pdf-file-icon">
                    <FaFilePdf aria-hidden="true" />
                  </span>
                  <span className="pdf-card-label">PDF File</span>
                </div>
                <h3>{file.title}</h3>
                <p className="project-summary">{file.description}</p>
                <div className="pdf-actions">
                  <a
                    href={file.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-link"
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                    Open
                  </a>
                  <a href={file.href} download className="pdf-download-btn">
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="carousel-controls">
            <button
              className="carousel-btn prev-btn magnetic"
              onClick={() => handleScroll(pdfTrackRef.current, "prev", ".modern-pdf-card")}
              aria-label="Scroll Left"
            >
              <FaChevronLeft />
            </button>
            <button
              className="carousel-btn next-btn magnetic"
              onClick={() => handleScroll(pdfTrackRef.current, "next", ".modern-pdf-card")}
              aria-label="Scroll Right"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
