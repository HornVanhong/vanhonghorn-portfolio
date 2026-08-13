"use client";

import Link from "next/link";
import { useState, useEffect, useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon, FaMusic, FaPause } from "react-icons/fa";
import CustomCursor from "./CustomCursor";
import BackgroundCanvas from "./BackgroundCanvas";
import gsap from "gsap";

const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);


const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export default function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  // Initialize background audio element on mount
  useEffect(() => {
    const audio = new Audio("/audio/music.mp3");
    audio.loop = true;
    audio.volume = 0.25; // moderate background volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setMusicPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay block / playback issue:", err);
      });
    }
  };

  // Sync body class with music playing state
  useEffect(() => {
    if (musicPlaying) {
      document.body.classList.add("music-active");
    } else {
      document.body.classList.remove("music-active");
    }
    return () => {
      document.body.classList.remove("music-active");
    };
  }, [musicPlaying]);

  // Load and apply theme from storage or system preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // System time ticker client-side mount
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Phnom_Penh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      updateClock();
    });
    const interval = setInterval(updateClock, 60000);
    return () => {
      window.cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(".site-main > section", { opacity: 1, clearProps: "transform" });
      return;
    }

    gsap.utils.toArray<HTMLElement>(".site-main > section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  useEffect(() => {
    const sections = ["home", "about", "resume", "skills", "projects", "blog", "contact"];
    const sectionElements: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionElements.push(el);
        observer.observe(el);
      }
    });

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        setScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrolled(window.scrollY > 20);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="next-root">
      <div className="app-root">
        {/* Interactive Canvas Particle Background */}
        <BackgroundCanvas />

        {/* Premium Background Glow Orbs */}
        <div className="bg-glow orb-1" aria-hidden="true" />
        <div className="bg-glow orb-2" aria-hidden="true" />
        <div className="bg-glow orb-3" aria-hidden="true" />
        <div className="bg-glow orb-4" aria-hidden="true" />

        <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
          <div className="header-inner">
            <Link href="#home" className="site-brand" onClick={handleNavClick}>
              Vanhong
            </Link>
            <nav className={`site-nav${menuOpen ? " show" : ""}`} id="site-nav">
              {navItems.map((item) => {
                const itemSection = item.href.slice(1);
                const isActive = activeSection === itemSection;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive ? "nav-link active" : "nav-link"}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="header-actions">
              {mounted && (
                <div className="header-clock" aria-label="Current local time">
                  <span className="clock-dot" />
                  <span className="clock-tz">PHN</span>
                  <span className="clock-time">{time}</span>
                </div>
              )}

              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme mode"
                type="button"
              >
                {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>

              {mounted && (
                <button
                  className={`music-toggle${musicPlaying ? " playing" : ""}`}
                  onClick={toggleMusic}
                  aria-label={musicPlaying ? "Pause music" : "Play music"}
                  type="button"
                >
                  {musicPlaying ? <FaPause size={13} /> : <FaMusic size={13} />}
                </button>
              )}

              <button
                className={`menu-icon${menuOpen ? " open" : ""}`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen ? "true" : "false"}
                aria-controls="site-nav"
                onClick={handleMenuToggle}
                type="button"
              >
                {menuOpen ? (
                  <HiX size={22} color="var(--accent)" />
                ) : (
                  <HiMenu size={22} color="var(--text)" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-col">
                <h3>Explore</h3>
                <ul>
                  <li><Link href="#home">Home</Link></li>
                  <li><Link href="#about">About</Link></li>
                  <li><Link href="#resume">Resume</Link></li>
                  <li><Link href="#skills">Skills</Link></li>
                  <li><Link href="#projects">Projects</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3>Connect</h3>
                <ul>
                  <li><a href="https://t.me/vanhongVH" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                  <li><a href="https://www.facebook.com/share/1DSTqwRuh5/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                  <li><a href="https://www.instagram.com/hornvanhong" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="https://www.linkedin.com/in/horn-vanhong-45366324a/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3>Career</h3>
                <p className="footer-text">
                  Specializing in Cyber Security, Networking protocols, and modern Front-End engineering. Open to internships and collaboration.
                </p>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-copy">
                Copyright © {new Date().getFullYear()} Vanhong Horn (헌 완홓). All rights reserved.
              </p>
              <div className="footer-legal">
                <span>Phnom Penh, Cambodia</span>
                <span>•</span>
                <span>Cyber Security & Web Developer</span>
              </div>
            </div>
          </div>
        </footer>

        <ChatBot />
        <CustomCursor />
      </div>
    </div>
  );
}
