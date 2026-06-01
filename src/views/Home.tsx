import Image from "next/image";
import Link from "next/link";
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

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-intro">Cyber Security Student & Front-End Developer</p>
        <h1 className="hero-title">VanhongHorn</h1>
        <h2 className="hero-role">
          Building secure, reliable, and user-focused digital experiences.
        </h2>
        <p className="hero-desc">
          I study Cyber Security and build practical web and mobile interfaces,
          with hands-on experience in networking, Linux, React Native, and
          secure application workflows.
        </p>

        <div className="hero-meta" aria-label="Profile summary">
          <span>
            <FaMapMarkerAlt aria-hidden="true" />
            Phnom Penh, Cambodia
          </span>
          <span>Open to internships</span>
          <span>Next.js, React, Flutter</span>
        </div>

        <div className="hero-ctas">
          <Link href="/projects" className="btn cta">
            View Projects
            <FaArrowRight aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn secondary">
            Contact Me
            <FaPaperPlane aria-hidden="true" />
          </Link>
        </div>

        <div className="hero-stats" aria-label="Portfolio highlights">
          <div>
            <strong>2+</strong>
            <span>Years learning IT</span>
          </div>
          <div>
            <strong>4</strong>
            <span>Core skill areas</span>
          </div>
          <div>
            <strong>2025</strong>
            <span>CS graduate</span>
          </div>
        </div>

        <div className="social-icons" aria-label="Social links">
          <a
            href="https://www.facebook.com/share/1DSTqwRuh5/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://t.me/vanhongVH"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <FaTelegramPlane size={20} />
          </a>
          <a
            href="https://www.instagram.com/hornvanhong"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/horn-vanhong-45366324a/"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-portrait-card">
          <div className="profile-ring">
            <Image
              src={profileImg}
              alt="Horn Vanhong"
              className="profile-photo"
              sizes="(max-width: 700px) 100vw, 360px"
              priority
            />
            <div className="ring-gradient" aria-hidden="true" />
          </div>
          <div className="hero-availability">
            <span aria-hidden="true" />
            Available for internship and collaboration
          </div>
        </div>
        <div className="hero-panel">
          <span className="hero-panel-label">Current focus</span>
          <p>
            Cyber security and front-end work, with an emphasis on clean UI,
            secure flows, and production-minded execution.
          </p>
        </div>
      </div>
    </section>
  );
}
