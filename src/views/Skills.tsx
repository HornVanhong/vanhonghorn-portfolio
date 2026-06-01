"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  FaCode,
  FaGlobe,
  FaMobileAlt,
  FaNetworkWired,
  FaShieldAlt,
} from "react-icons/fa";

interface SkillBarProps {
  name: string;
  level: number;
}

interface SkillGroup {
  title: string;
  summary: string;
  icon: ReactNode;
  level: string;
  skills: SkillBarProps[];
  tools: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Cybersecurity",
    summary: "Security fundamentals, Linux practice, and secure workflows.",
    icon: <FaShieldAlt aria-hidden="true" />,
    level: "Core focus",
    skills: [
      { name: "Linux (Kali, CentOS)", level: 80 },
      { name: "Cybersecurity Fundamentals", level: 75 },
      { name: "Database Security (SQL)", level: 70 },
      { name: "Git Secure Workflow", level: 65 },
    ],
    tools: ["Kali Linux", "SQL", "Git", "Security Labs"],
  },
  {
    title: "App Development",
    summary: "Mobile interfaces, feature implementation, and API integration.",
    icon: <FaMobileAlt aria-hidden="true" />,
    level: "Applied",
    skills: [
      { name: "Flutter", level: 85 },
      { name: "React Native", level: 75 },
      { name: "Java", level: 70 },
      { name: "PHP", level: 65 },
    ],
    tools: ["Flutter", "React Native", "Java", "REST APIs"],
  },
  {
    title: "Web Development",
    summary: "Responsive front-end development with modern React tooling.",
    icon: <FaGlobe aria-hidden="true" />,
    level: "Strong",
    skills: [
      { name: "HTML / CSS / JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Figma UI/UX", level: 70 },
      { name: "SASS / Styled Components", level: 65 },
    ],
    tools: ["React", "Next.js", "TypeScript", "Figma"],
  },
  {
    title: "Networking",
    summary: "Network configuration, protocol analysis, and Cisco coursework.",
    icon: <FaNetworkWired aria-hidden="true" />,
    level: "Practical",
    skills: [
      { name: "Cisco Networking", level: 75 },
      { name: "Network Configuration", level: 70 },
      { name: "Protocol Analysis", level: 65 },
    ],
    tools: ["Cisco", "ARP", "DNS", "DHCP"],
  },
];

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 100);
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

export default function Skills() {
  return (
    <section className="skills-page">
      <div className="skills-header">
        <span className="skills-kicker">
          <FaCode aria-hidden="true" />
          Technical Profile
        </span>
        <h1 className="skills-title">Skills</h1>
        <p className="skills-intro">
          A practical mix of cyber security, networking, web development, and
          mobile application experience.
        </p>
      </div>

      <div className="skills-overview" aria-label="Skills summary">
        <div>
          <strong>4</strong>
          <span>Focus areas</span>
        </div>
        <div>
          <strong>16+</strong>
          <span>Tools & skills</span>
        </div>
        <div>
          <strong>Secure</strong>
          <span>Development mindset</span>
        </div>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <div className="skill-card-header">
              <span className="skill-icon">{group.icon}</span>
              <span className="skill-level">{group.level}</span>
            </div>
            <h2>{group.title}</h2>
            <p className="skill-summary">{group.summary}</p>

            <div className="skill-bars">
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>

            <div className="skill-tags">
              {group.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
