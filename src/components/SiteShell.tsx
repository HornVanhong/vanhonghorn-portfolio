"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { HiMenu } from "react-icons/hi";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="next-root">
      <div className="app-root">
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="site-brand" onClick={handleNavClick}>
              Horn Vanhong
            </Link>
            <button
              className={`menu-icon${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen ? "true" : "false"}
              aria-controls="site-nav"
              onClick={handleMenuToggle}
              type="button"
            >
              <HiMenu size={32} color="var(--text)" />
            </button>
            <nav className={`site-nav${menuOpen ? " show" : ""}`} id="site-nav">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

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
          </div>
        </header>

        <main className="site-main">{children}</main>
      </div>
    </div>
  );
}
