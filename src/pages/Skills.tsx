import {
  FaGlobe,
  FaMobileAlt,
  FaNetworkWired,
  FaShieldAlt,
} from "react-icons/fa";

export default function Skills() {
  return (
    <section className="skills-page">
      <h1 className="skills-title">Skills</h1>

      <div className="skills-grid">
        {/* Cybersecurity */}
        <div className="skill-card">
          <FaShieldAlt className="skill-icon" />
          <h2>Cybersecurity</h2>
          <ul>
            <li>Linux (Kali, CentOS) for penetration testing</li>
            <li>Cyber Security fundamentals (MPTC scholarship training)</li>
            <li>Database security (SQL, MySQL)</li>
            <li>Git for secure version control</li>
          </ul>
        </div>

        {/* App Development */}
        <div className="skill-card">
          <FaMobileAlt className="skill-icon" />
          <h2>App Development</h2>
          <ul>
            <li>Flutter (mobile apps)</li>
            <li>React Native (front-end mobile banking apps)</li>
            <li>Java & PHP for backend logic</li>
            <li>API integration and local data storage</li>
          </ul>
        </div>

        {/* Web Development */}
        <div className="skill-card">
          <FaGlobe className="skill-icon" />
          <h2>Web Development</h2>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>React (front-end web apps)</li>
            <li>Figma (UI/UX design)</li>
            <li>SASS & Styled Components</li>
          </ul>
        </div>

        {/* Networking */}
        <div className="skill-card">
          <FaNetworkWired className="skill-icon" />
          <h2>Networking</h2>
          <ul>
            <li>Cisco Networking Academy coursework</li>
            <li>Network configuration & troubleshooting</li>
            <li>Protocol analysis & service configuration</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
