"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTelegramPlane,
} from "react-icons/fa";
import profileImg from "../assets/vanhong.jpg";

import About from "./About";
import Resume from "./Resume";
import Skills from "./Skills";
import Projects from "./Projects";
import Blog from "./Blog";
import Contact from "./Contact";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Home() {
  const roles = [
    "Cyber Security Student",
    "Front-End Developer",
    "MPTC Scholarship Student",
    "KSHRD 14th Generation Student",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullText = roles[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setRoleText(currentFullText.substring(0, roleText.length + 1));
        setTypingSpeed(100);

        if (roleText === currentFullText) {
          // Pause at the end of typing
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setRoleText(currentFullText.substring(0, roleText.length - 1));
        setTypingSpeed(50);

        if (roleText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  const [revealRef, revealClass] = useScrollReveal();

  return (
    <>
      <section id="home" ref={revealRef} className={`hero anim-fade ${revealClass}`}>
        <div className="hero-left anim-slide">
          <p className="hero-intro">
            <span className="hero-dot" aria-hidden="true" />
            Open to Internships
          </p>
          <h1 className="hero-title">
            Vanhong Horn <span className="korean-name">헌 완홓</span>
          </h1>
          <h2 className="hero-role">
            <span>{roleText}</span>
          </h2>
          <p className="hero-desc">
            I study Cyber Security and build practical web and mobile interfaces.
            As a 14th Generation student at Korea Software HRD Center (KSHRD) and MPTC Scholarship student,
            I am equipped with hands-on experience in networking, Linux configuration,
            React Native development, and secure application workflows.
          </p>

          <div className="hero-meta" aria-label="Profile summary">
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
              Phnom Penh, Cambodia
            </span>
            <span>Next.js, React, Flutter</span>
          </div>

          <div className="hero-ctas">
            <a href="#projects" className="btn cta">
              View Projects
              <FaArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="btn secondary">
              Contact Me
              <FaPaperPlane aria-hidden="true" />
            </a>
          </div>

          <div className="hero-stats" aria-label="Portfolio highlights">
            <div>
              <strong>3+</strong>
              <span>Years IT Journey</span>
            </div>
            <div>
              <strong>6+</strong>
              <span>Completed Projects</span>
            </div>
            <div>
              <strong>2025</strong>
              <span>CS Graduate</span>
            </div>
          </div>

          <div className="social-icons" aria-label="Social links">
            <a
              href="https://www.facebook.com/share/1DSTqwRuh5/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="social"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://t.me/vanhongVH"
              target="_blank"
              rel="noopener noreferrer"
              className="social"
            >
              <FaTelegramPlane size={18} />
            </a>
            <a
              href="https://www.instagram.com/hornvanhong"
              target="_blank"
              rel="noopener noreferrer"
              className="social"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/horn-vanhong-45366324a/"
              target="_blank"
              rel="noopener noreferrer"
              className="social"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        <div className="hero-right anim-slide" style={{ animationDelay: "0.2s" }}>
          <div className="hero-portrait-card">
            {/* The main background photo */}
            <div className="profile-photo-wrapper">
              <Image
                src={profileImg}
                alt="Vanhong Horn"
                className="profile-photo"
                sizes="(max-width: 700px) 100vw, 320px"
                priority
              />
              <div className="profile-photo-gradient-top" />
              <div className="profile-photo-gradient-bottom" />
            </div>

            {/* Bottom Action Bar */}
            <div className="profile-card-bottom">
              <div className="profile-card-user">
                <div className="profile-card-avatar-wrap">
                  <Image
                    src={profileImg}
                    alt="Vanhong Horn Avatar"
                    className="profile-card-avatar"
                    width={36}
                    height={36}
                  />
                  <span className="avatar-status-dot" />
                </div>
                <div className="profile-card-user-info">
                  <span className="profile-card-username">@hornvanhong</span>
                  <span className="profile-card-time">Active now</span>
                </div>
              </div>

              <a href="#contact" className="profile-card-btn">
                <span className="plus-icon">+</span> Let's Chat
              </a>
            </div>
          </div>
          <div className="hero-panel">
            <span className="hero-panel-label">Current Focus Area</span>
            <p>
              Securing infrastructure and creating highly polished, reliable,
              and modern application front-ends with solid, clean code.
            </p>
          </div>
        </div>
      </section>

      <About />
      <Resume />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
