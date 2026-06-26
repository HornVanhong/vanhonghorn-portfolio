import Image from "next/image";
import { FaBookOpen, FaCertificate, FaGraduationCap } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";

import RuppLogo from "../assets/logo/Rupp_logo.png";
import AntLogo from "../assets/logo/ANT.png";
import KshrdLogo from "../assets/logo/KSHRD.png";

const educationItems = [
  {
    logo: RuppLogo,
    icon: <FaGraduationCap aria-hidden="true" />,
    label: "University",
    title: "Royal University of Phnom Penh",
    meta: "Bachelor of Computer Science",
    period: "2022 - 2025",
    status: "Graduate 2025",
    details: [
      "Scholarship student of Ministry of Posts and Telecommunications (MPTC)",
      "Cyber Security specialization training track",
    ],
  },
  {
    logo: AntLogo,
    icon: <FaCertificate aria-hidden="true" />,
    label: "Professional Training",
    title: "Cyber Security Program",
    meta: "ANT Technology Training Center",
    period: "Current",
    status: "In progress",
    details: [
      "Deep dive into network security architecture, vulnerability assessment",
      "Linux configuration, database audit, and shell scripting security logs",
    ],
  },
  {
    logo: KshrdLogo,
    icon: <FaCertificate aria-hidden="true" />,
    label: "IT Specialization",
    title: "Korea Software HRD Center (KSHRD)",
    meta: "14th Generation IT Training Program",
    period: "2026",
    status: "Completed",
    details: [
      "Intensive training in Java, Spring Boot web development, and React Native mobile frameworks",
      "Engaged in group project design, automated testing, and agile workflows",
    ],
  },
  {
    logo: null,
    icon: <FaBookOpen aria-hidden="true" />,
    label: "Foundation",
    title: "High School",
    meta: "General Education",
    period: "2020 - 2021",
    status: "Completed",
    details: ["Completed high school with general science major before beginning university study."],
  },
  {
    logo: null,
    icon: <FaCertificate aria-hidden="true" />,
    label: "Additional Courses",
    title: "Technical Training",
    meta: "Flutter Development & Cisco NetAcad",
    period: "2022 - 2023",
    status: "Completed",
    details: [
      "Flutter 3 course at Instinct Institute Alumni",
      "Cisco Networking Academy fundamentals course",
    ],
  },
];

export default function Education() {
  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section ref={revealRef} className={`education-page anim-fade ${revealClass}`} aria-labelledby="education-heading">
      <div className="education-header anim-slide">
        <span className="education-kicker">Academic Background</span>
        <h1 id="education-heading" className="education-title">
          Education
        </h1>
        <p className="education-intro">
          A practical computer science education focused on threat mitigation, secure networks, and software engineering.
        </p>
      </div>

      <div className="education-overview anim-slide" aria-label="Education highlights" style={{ animationDelay: "0.1s" }}>
        <div>
          <strong>CS</strong>
          <span>Academic Major</span>
        </div>
        <div>
          <strong>2025</strong>
          <span>Graduation Year</span>
        </div>
        <div>
          <strong>Cyber</strong>
          <span>Specialization</span>
        </div>
      </div>

      <div className="roadmap education-timeline anim-slide" role="list" style={{ animationDelay: "0.2s" }}>
        {educationItems.map((item) => (
          <article
            className="roadmap-item education-card"
            role="listitem"
            aria-label={item.title}
            key={`${item.label}-${item.title}`}
          >
            <div className="roadmap-dot education-icon">{item.icon}</div>
            <div className="roadmap-content education-card-content">
              <div className="education-card-header">
                <div className="education-logo-wrapper">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={`${item.title} logo`}
                      className="education-logo-img"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <span className="education-logo-icon">{item.icon}</span>
                  )}
                </div>
                <div className="education-card-title-group">
                  <div className="education-card-top">
                    <span className="education-label">{item.label}</span>
                    <span className="education-period">{item.period}</span>
                  </div>
                  <h2 className="roadmap-heading">{item.title}</h2>
                  <p className="education-meta">{item.meta}</p>
                </div>
              </div>
              <span className="education-status">{item.status}</span>
              <ul className="education-list">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

