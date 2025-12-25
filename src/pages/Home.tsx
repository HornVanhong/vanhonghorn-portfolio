import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
import profileImg from "../assets/vanhong.jpg";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-intro">Hello, It's Me</p>
        <h1 className="hero-title">VanhongHorn</h1>
        <h2 className="hero-role">
          And I'm a <span className="accent-text">Cyber</span> Security Student
        </h2>
        <p className="hero-desc">
          I'm studying Cyber Security — focused on network security, ethical
          hacking, and securing web applications while learning practical
          defensive techniques and tools.
        </p>

        <div className="hero-ctas">
          <button className="btn cta">More About Me</button>
        </div>

        <div className="social-icons">
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
        <div className="profile-ring">
          <img src={profileImg} alt="Profile" className="profile-photo" />
          <div className="ring-gradient" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
