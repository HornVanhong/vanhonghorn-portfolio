import {
  FaGraduationCap,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";

const profileStats = [
  { value: "2022", label: "Started IT at RUPP" },
  { value: "MPTC", label: "Scholarship Awardee" },
  { value: "Cyber Security", label: "Academic Specialization" },
];

const trainingItems = [
  {
    icon: <FaGraduationCap aria-hidden="true" />,
    title: "Royal University of Phnom Penh",
    detail: "Computer Science candidate since 2022. Developing solid foundational computer science theory.",
  },
  {
    icon: <FaShieldAlt aria-hidden="true" />,
    title: "Cyber Security Specialization",
    detail: "Studying deep cybersecurity methodologies, defensive labs, and networking protocols at ANT Center.",
  },
  {
    icon: <FaLaptopCode aria-hidden="true" />,
    title: "Hands-on Practical Training",
    detail: "Designing and developing production-ready web and mobile applications with React Native and Flutter.",
  },
];

const interests = [
  "Web Development",
  "Cyber Security",
  "Networking & Infrastructure",
  "React & React Native",
  "Linux Systems",
  "Database Security",
  "Information Assurance",
  "Git Workflows",
];

export default function About() {
  return (
    <section id="about" className="about-page anim-fade">
      <div className="about-hero anim-slide">
        <div className="about-copy">
          <span className="about-kicker">About me</span>
          <h1>IT Student Specializing in Secure Software & Networks</h1>
          <p>
            I am a Computer Science student at the Royal University of Phnom Penh (RUPP),
            actively building skills since 2022. I am driven by a passion for solving problems
            at the intersection of secure infrastructure and user-focused web/mobile development.
          </p>
          <p>
            As a Ministry of Posts and Telecommunications (MPTC) scholarship student,
            I also pursue specialized Cyber Security training at the ANT Technology Training Center,
            gaining hands-on knowledge in security auditing, Linux environments, and defensive programming.
          </p>
        </div>

        <aside className="about-profile-card anim-scale" aria-label="Security credentials">
          <div className="security-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal-title">operator_identity.json</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-prompt-line">
                <span className="prompt-char">$</span> cat identity.json
              </div>
              <pre className="terminal-code">
                <code>
                  {"{\n"}
                  {"  "}
                  <span className="json-key">"operator"</span>: <span className="json-val-str">"Vanhong Horn"</span>,
                  {"\n  "}
                  <span className="json-key">"role"</span>: <span className="json-val-str">"Cybersecurity & Web Dev"</span>,
                  {"\n  "}
                  <span className="json-key">"affiliation"</span>: <span className="json-val-str">"RUPP & ANT Center"</span>,
                  {"\n  "}
                  <span className="json-key">"status"</span>: <span className="json-val-str">"Open for Internships"</span>,
                  {"\n  "}
                  <span className="json-key">"location"</span>: <span className="json-val-str">"Phnom Penh, KH"</span>,
                  {"\n  "}
                  <span className="json-key">"clearance"</span>: [
                  {"\n    "}
                  <span className="json-val-arr">"Defensive Scripting"</span>,
                  {"\n    "}
                  <span className="json-val-arr">"Network Security"</span>,
                  {"\n    "}
                  <span className="json-val-arr">"React & Flutter"</span>
                  {"\n  "}]
                  {"\n}"}
                </code>
              </pre>
            </div>
          </div>
        </aside>
      </div>

      <div className="about-stats anim-slide" aria-label="Profile highlights" style={{ animationDelay: "0.1s" }}>
        {profileStats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="about-grid anim-slide" style={{ animationDelay: "0.2s" }}>
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
          <span className="about-panel-label">Core Interests</span>
          <p>
            I enjoy exploring new tech domains, securing network setups, and polishing mobile application user journeys.
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
