import { FaBookOpen, FaCertificate, FaGraduationCap } from "react-icons/fa";

const educationItems = [
  {
    icon: <FaGraduationCap aria-hidden="true" />,
    label: "University",
    title: "Royal University of Phnom Penh",
    meta: "Bachelor of Computer Science",
    period: "2022 - 2025",
    status: "Graduate 2025",
    details: [
      "Scholarship student of Ministry of Posts and Telecommunications",
      "Cyber Security specialization at ANT Technology Training Center",
    ],
  },
  {
    icon: <FaCertificate aria-hidden="true" />,
    label: "Professional Training",
    title: "Cyber Security Program",
    meta: "ANT Technology Training Center",
    period: "Current",
    status: "In progress",
    details: [
      "Network security fundamentals",
      "Linux, database security, and defensive security practice",
    ],
  },
  {
    icon: <FaBookOpen aria-hidden="true" />,
    label: "Foundation",
    title: "High School",
    meta: "General Education",
    period: "2020 - 2021",
    status: "Completed",
    details: ["Completed high school before beginning university study."],
  },
  {
    icon: <FaCertificate aria-hidden="true" />,
    label: "Additional Courses",
    title: "Technical Training",
    meta: "Flutter, Cisco Networking Academy",
    period: "2022 - 2023",
    status: "Completed",
    details: [
      "Flutter 3 course at Instinct Institute Alumni",
      "Cisco Networking Academy fundamentals",
    ],
  },
];

export default function Education() {
  return (
    <section className="education-page" aria-labelledby="education-heading">
      <div className="education-header">
        <span className="education-kicker">Academic Background</span>
        <h1 id="education-heading" className="education-title">
          Education
        </h1>
        <p className="education-intro">
          A practical computer science path focused on cyber security,
          networking, and applied software development.
        </p>
      </div>

      <div className="education-overview" aria-label="Education highlights">
        <div>
          <strong>CS</strong>
          <span>Major</span>
        </div>
        <div>
          <strong>2025</strong>
          <span>Graduation</span>
        </div>
        <div>
          <strong>Cyber</strong>
          <span>Specialization</span>
        </div>
      </div>

      <div className="roadmap education-timeline" role="list">
        {educationItems.map((item) => (
          <article
            className="roadmap-item education-card"
            role="listitem"
            aria-label={item.title}
            key={`${item.label}-${item.title}`}
          >
            <div className="roadmap-dot education-icon">{item.icon}</div>
            <div className="roadmap-content education-card-content">
              <div className="education-card-top">
                <span className="education-label">{item.label}</span>
                <span className="education-period">{item.period}</span>
              </div>
              <h2 className="roadmap-heading">{item.title}</h2>
              <p className="education-meta">{item.meta}</p>
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
