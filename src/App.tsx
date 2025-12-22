import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-inner">
          <span className="site-brand">Portfolio</span>
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              About
            </NavLink>
            <NavLink
              to="/education"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Education
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Skills
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Projects
            </NavLink>
            <NavLink
              to="/experience"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Experience
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleNavClick}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
