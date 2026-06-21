"use client";

import Link from "next/link";
import { useState, useEffect, type ReactNode } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon } from "react-icons/fa";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  // Load and apply theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initialTheme = prefersLight ? "light" : "dark";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  // System time ticker client-side mount
  useEffect(() => {
    setMounted(true);
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

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scrolled header state
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

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

    window.addEventListener("scroll", handleScroll);
    // Trigger scroll spy on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="next-root">
      <div className="app-root">
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
                {theme === "dark" ? <FaSun size={15} /> : <FaMoon size={15} />}
              </button>

              <button
                className={`menu-icon${menuOpen ? " open" : ""}`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen ? "true" : "false"}
                aria-controls="site-nav"
                onClick={handleMenuToggle}
                type="button"
              >
                {menuOpen ? (
                  <HiX size={26} color="var(--accent)" />
                ) : (
                  <HiMenu size={26} color="var(--text)" />
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
                Copyright © {new Date().getFullYear()} Vanhong Horn. All rights reserved.
              </p>
              <div className="footer-legal">
                <span>Phnom Penh, Cambodia</span>
                <span>•</span>
                <span>Cyber Security & Web Developer</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
