"use client";

import Link from "next/link";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon, FaMusic, FaPause } from "react-icons/fa";
import ChatBot from "./ChatBot";
import CustomCursor from "./CustomCursor";
import BackgroundCanvas from "./BackgroundCanvas";
import gsap from "gsap";
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
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      updateClock();
    });
    const interval = setInterval(updateClock, 1000);
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
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    // Smooth moving background drift & parallax for glow orbs
    const orbs = [".orb-1", ".orb-2", ".orb-3", ".orb-4"];
    orbs.forEach((orb, i) => {
      // 1. Lava-lamp drift loop
      gsap.to(orb, {
        x: "random(-180, 180)",
        y: "random(-180, 180)",
        scale: "random(0.85, 1.25)",
        duration: "random(20, 32)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        repeatRefresh: true,
      });

      // 2. Parallax scroll effect
      gsap.to(orb, {
        yPercent: i % 2 === 0 ? 35 : -35,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        }
      });
    });

    // 3. GSAP Moving Page Background Gradient
    const gradientPos = { x: 50, y: 50 };
    gsap.to(gradientPos, {
      x: "random(25, 75)",
      y: "random(25, 75)",
      duration: "random(16, 26)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      repeatRefresh: true,
      onUpdate: () => {
        const bgGradientVal = theme === "dark"
          ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #063040 0%, #030712 100%)`
          : `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #e0faff 0%, #f1f5f9 100%)`;
        document.body.style.backgroundImage = bgGradientVal;
      }
    });
  }, { dependencies: [theme], revertOnUpdate: true });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  useEffect(() => {
    const updateScrollState = () => {
      // Toggle scrolled header state
      setScrolled(window.scrollY > 20);

      // Scroll Spy logic to detect current visible section
      const sections = ["home", "about", "resume", "skills", "projects", "blog", "contact"];
      const scrollPosition = window.scrollY + 180; // offset for nav bar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateScrollState();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger scroll spy on mount
    updateScrollState();

    return () => {
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
