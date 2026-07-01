"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTelegramPlane,
  FaShieldAlt,
} from "react-icons/fa";
import profileImg from "../assets/vanhong.jpg";

import About from "./About";
import Resume from "./Resume";
import Skills from "./Skills";
import Projects from "./Projects";
import Blog from "./Blog";
import Contact from "./Contact";

gsap.registerPlugin(ScrollTrigger);
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

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Set initial states to prevent flash of content
    gsap.set(
      [
        ".hero-intro",
        ".hero-title",
        ".hero-role",
        ".hero-desc",
        ".hero-meta span",
        ".hero-ctas .btn",
        ".hero-stats > div",
        ".social-icons a",
        ".hero-portrait-card",
        ".hero-panel",
      ],
      { opacity: 0 }
    );

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero-intro", { y: 0, opacity: 1, duration: 0.6, startAt: { y: -20 } })
      .to(".hero-title", { y: 0, opacity: 1, duration: 0.8, startAt: { y: 30 } }, "-=0.4")
      .to(".hero-role", { x: 0, opacity: 1, duration: 0.6, startAt: { x: -30 } }, "-=0.5")
      .to(".hero-desc", { y: 0, opacity: 1, duration: 0.7, startAt: { y: 20 } }, "-=0.4")
      .to(".hero-meta span", { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, startAt: { y: 15 } }, "-=0.4")
      .to(".hero-ctas .btn", { scale: 1, opacity: 1, stagger: 0.15, duration: 0.6, ease: "back.out(1.7)", startAt: { scale: 0.9 } }, "-=0.4")
      .to(".hero-stats > div", { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, startAt: { y: 25 } }, "-=0.4")
      .to(".social-icons a", { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(2)", startAt: { scale: 0 } }, "-=0.5")
      .to(".hero-portrait-card", { scale: 1, y: 0, opacity: 1, duration: 1, ease: "power4.out", startAt: { scale: 0.9, y: 40 } }, "-=1.2")
      .to(".hero-panel", { y: 0, opacity: 1, duration: 0.8, startAt: { y: 30 } }, "-=0.8");

    // 3D Tilt Card effect
    const card = containerRef.current.querySelector(".hero-portrait-card");
    if (card) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;

        const tiltX = -(dy / yc) * 10;
        const tiltY = (dx / xc) * 10;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          y: -8, // Lift the card slightly
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4,
          overwrite: "auto",
        });

        // Parallax depth sliding of the image itself
        gsap.to(".profile-photo", {
          x: (dx / xc) * 8,
          y: (dy / yc) * 8,
          scale: 1.04,
          ease: "power2.out",
          duration: 0.4,
          overwrite: "auto"
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

        gsap.to(".profile-photo", {
          x: 0,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.8,
          overwrite: "auto"
        });
      };

      card.addEventListener("mousemove", onMouseMove as EventListener);
      card.addEventListener("mouseleave", onMouseLeave as EventListener);
    }

    // Loop floating/breathing animation for images
    gsap.to(".profile-photo", {
      y: -6,
      scale: 1.02,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".focus-graphic-img", {
      y: -8,
      x: 4,
      rotation: 2,
      scale: 1.05,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Smooth floating animation for overlay panels
    gsap.to(".floating-code-panel", {
      y: -12,
      x: 5,
      rotation: 2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".floating-shield-panel", {
      y: 12,
      x: -6,
      rotation: -1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Cyber background particles animation
    const particles = containerRef.current.querySelectorAll(".hero-particle");
    particles.forEach((part) => {
      gsap.to(part, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: "random(6, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Parallax scrolling triggers for hero layout
    if (typeof window !== "undefined" && window.innerWidth >= 960) {
      gsap.to(".hero-left", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-portrait-card", {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".floating-code-panel", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".floating-shield-panel", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, { scope: containerRef });

  return (
    <>
      <section id="home" ref={containerRef} className="hero">
        {/* Floating background cyber particles container */}
        <div className="hero-particles-container" aria-hidden="true">
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
        </div>

        <div className="hero-left">
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

        <div className="hero-right">
          {/* Floating Cyber elements (outside overflow-hidden card) */}
          <div className="floating-code-panel hero-floating-element">
            <div className="floating-panel-header">
              <span className="floating-panel-dot red" />
              <span className="floating-panel-dot yellow" />
              <span className="floating-panel-dot green" />
            </div>
            <div className="floating-panel-code">
              <span className="code-kw">const</span> secure = <span className="code-str">true</span>;
            </div>
          </div>

          <div className="floating-shield-panel hero-floating-element">
            <FaShieldAlt className="shield-icon" />
            <span>Shield Active</span>
          </div>

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
          <div className="hero-panel focus-area-with-image">
            <div className="focus-area-content">
              <span className="hero-panel-label">Current Focus Area</span>
              <p>
                Securing infrastructure and creating highly polished, reliable,
                and modern application front-ends with solid, clean code.
              </p>
            </div>
            <div className="focus-area-graphic">
              <Image
                src="/developer_3d_illustration.png"
                alt="3D Cyber Developer Focus"
                className="focus-graphic-img"
                width={120}
                height={120}
                loading="lazy"
              />
            </div>
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
