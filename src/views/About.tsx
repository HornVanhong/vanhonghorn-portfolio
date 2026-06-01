import Image from "next/image";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";
import profileImg from "../assets/vanhong.jpg";

const profileStats = [
  { value: "2022", label: "Started at RUPP" },
  { value: "MPTC", label: "Scholarship student" },
  { value: "Cyber Security", label: "Current focus" },
];

const trainingItems = [
  {
    icon: <FaGraduationCap aria-hidden="true" />,
    title: "Royal University of Phnom Penh",
    detail: "IT student at RUPP since 2022.",
  },
  {
    icon: <FaShieldAlt aria-hidden="true" />,
    title: "Cyber Security Training",
    detail: "Studying Cyber Security at ANT Technology Training Center.",
  },
  {
    icon: <FaLaptopCode aria-hidden="true" />,
    title: "Hands-on Projects",
    detail: "Building practical web, mobile, and security-focused work.",
  },
];

const interests = [
  "Web development",
  "Cyber security",
  "Networking",
  "React",
  "Technical skills",
  "Hands-on learning",
];

export default function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="about-copy">
          <span className="about-kicker">About me</span>
          <h1>IT student focused on secure, practical digital work.</h1>
          <p>
            I am an IT student at Royal University of Phnom Penh, studying since
            2022. I enjoy learning technology, improving technical skills, and
            applying what I learn through practical projects.
          </p>
          <p>
            I am currently an MPTC scholarship student studying Cyber Security
            at ANT Technology Training Center.
          </p>
        </div>

        <aside className="about-profile-card" aria-label="Profile summary">
          <div className="about-photo-frame">
            <Image
              src={profileImg}
              alt="Horn Vanhong"
              className="about-photo"
              sizes="(max-width: 700px) 100vw, 320px"
            />
          </div>
          <div className="about-profile-info">
            <h2>Horn Vanhong</h2>
            <p>
              <FaMapMarkerAlt aria-hidden="true" />
              Phnom Penh, Cambodia
            </p>
          </div>
        </aside>
      </div>

      <div className="about-stats" aria-label="Profile highlights">
        {profileStats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="about-grid">
        <div className="about-panel">
          <span className="about-panel-label">Education & training</span>
          <div className="about-training-list">
            {trainingItems.map((item) => (
              <article className="about-training-card" key={item.title}>
                <span className="about-training-icon">{item.icon}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="about-panel about-focus-panel">
          <span className="about-panel-label">Interests</span>
          <p>
            I enjoy exploring new technologies, improving technical skills, and
            working on hands-on projects related to web development and
            security.
          </p>
          <div className="about-tags">
            {interests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
