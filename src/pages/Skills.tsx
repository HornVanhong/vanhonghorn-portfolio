import { useEffect, useState, type JSX } from "react";
import {
  FaGlobe,
  FaMobileAlt,
  FaNetworkWired,
  FaShieldAlt,
} from "react-icons/fa";

/* ===== SkillBar Component ===== */
interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 100); // Animate from 0
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="skill-bar">
      <div className="skill-bar-header">
        <span>{name}</span>
        <span>{progress}%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

/* ===== Skills Page ===== */
export default function Skills(): JSX.Element {
  return (
    <section className="skills-page">
      <h1 className="skills-title">Skills</h1>

      <div className="skills-grid">
        {/* Cybersecurity */}
        <div className="skill-card">
          <FaShieldAlt className="skill-icon" />
          <h2>Cybersecurity</h2>
          <SkillBar name="Linux (Kali, CentOS)" level={80} />
          <SkillBar name="Cybersecurity Fundamentals" level={75} />
          <SkillBar name="Database Security (SQL)" level={70} />
          <SkillBar name="Git (Secure Workflow)" level={65} />
        </div>

        {/* App Development */}
        <div className="skill-card">
          <FaMobileAlt className="skill-icon" />
          <h2>App Development</h2>
          <SkillBar name="Flutter" level={85} />
          <SkillBar name="React Native" level={75} />
          <SkillBar name="Java" level={70} />
          <SkillBar name="PHP" level={65} />
        </div>

        {/* Web Development */}
        <div className="skill-card">
          <FaGlobe className="skill-icon" />
          <h2>Web Development</h2>
          <SkillBar name="HTML / CSS / JavaScript" level={85} />
          <SkillBar name="React" level={80} />
          <SkillBar name="Figma (UI/UX)" level={70} />
          <SkillBar name="SASS / Styled Components" level={65} />
        </div>

        {/* Networking */}
        <div className="skill-card">
          <FaNetworkWired className="skill-icon" />
          <h2>Networking</h2>
          <SkillBar name="Cisco Networking" level={75} />
          <SkillBar name="Network Configuration" level={70} />
          <SkillBar name="Protocol Analysis" level={65} />
        </div>
      </div>
    </section>
  );
}
