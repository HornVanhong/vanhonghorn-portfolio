"use client";

import { useRef } from "react";
import {
  FaCode,
  FaExternalLinkAlt,
  FaFilePdf,
  FaLaptopCode,
  FaLinux,
  FaMobileAlt,
  FaNetworkWired,
  FaPython,
  FaReact,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const pdf1 = "/Project/TCI-2510-CAMBODIA-II.s6.xe101.pdf";
const pdf2 = "/Project/TCI-2510-CAMBODIA-II.s6.xe103.pdf";
const pdf3 = "/Project/TCI-2510-CAMBODIA-II.s6.xe105.pdf";

const projectCards = [
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "Flutter 3 Course Projects",
    meta: "Instinct Institute Alumni — Dec 2022 to May 2023",
    summary: "Hands-on app work focused on UI cloning, local storage, and API usage.",
    tags: ["Flutter", "Mobile UI", "Local Storage", "REST APIs"],
    points: [
      "Read and write data in localhost",
      "Consume and display data from APIs",
      "Clone UI of Cellcard App",
    ],
  },
  {
    icon: <FaReact aria-hidden="true" />,
    title: "Digital Banking Front-End Features",
    meta: "Internship — Dec 2023 to Dec 2024",
    summary: "Built and improved React Native features inside a real product workflow.",
    tags: ["React Native", "TypeScript", "SASS", "styled-components"],
    points: [
      "Developed new components following UX/UI designs",
      "Fixed front-end issues and improved app stability",
      "Collaborated via Git, Bitbucket, and Jira",
      "Applied TypeScript and component styling systems",
    ],
  },
  {
    icon: <FaNetworkWired aria-hidden="true" />,
    title: "Cisco Networking Academy Labs",
    meta: "Coursework",
    summary: "Network configuration practice with troubleshooting and service setup.",
    tags: ["Cisco", "Networking", "Protocols"],
    points: [
      "Hands-on practice with network configuration",
      "Troubleshooting and protocol analysis",
      "Service configuration exercises",
    ],
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Cyberium Arena - Net Crafts",
    meta: "Networking & Security Simulation",
    summary: "Mapped a simulated network and analyzed routing, ownership, and traffic.",
    tags: ["Shodan", "WHOIS", "ARP", "DNS", "DHCP"],
    points: [
      "Mapped the network: IP, MAC, router IPs, DNS and DHCP",
      "Identified ISP and connection type",
      "Used Shodan and WHOIS to analyze IP ownership",
      "Sniffed traffic and identified protocols",
    ],
  },
  {
    icon: <FaLinux aria-hidden="true" />,
    title: "Cyberium Arena - Linux Fundamentals",
    meta: "System Info Extractor",
    summary: "Command-line analysis for system information, processes, and storage.",
    tags: ["Linux", "Bash", "System Info", "Monitoring"],
    points: [
      "Identified public and private IP addresses",
      "Displayed masked MAC address for security",
      "Monitored CPU processes and memory usage",
      "Listed active system services and large files",
    ],
  },
  {
    icon: <FaPython aria-hidden="true" />,
    title: "Cyberium Arena - Python Fundamentals",
    meta: "Auth.log Analyzer",
    summary: "Parsed auth logs to extract account activity and command history.",
    tags: ["Python", "Linux", "Log Analysis", "Security"],
    points: [
      "Parsed /var/log/auth.log to extract command usage",
      "Detected new and deleted users",
      "Tracked password change activity",
      "Generated alerts for failed sudo attempts",
    ],
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
    });

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
          <strong>6</strong>
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
          {projectCards.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-card-top">
                <span className="project-icon">{project.icon}</span>
                <span className="project-badge">Project</span>
              </div>
              <h2>{project.title}</h2>
              <p className="project-meta">{project.meta}</p>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <ul>
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
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
