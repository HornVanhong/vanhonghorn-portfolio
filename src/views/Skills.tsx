"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
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
    title: "Cyber Security",
    summary: "Security fundamentals, Linux administration, and secure system auditing.",
    icon: <FaShieldAlt aria-hidden="true" />,
    level: "Core focus",
    skills: [
      { name: "Linux (Kali, CentOS, Debian)", level: 80 },
      { name: "Cybersecurity Principles", level: 75 },
      { name: "Database Security (SQL Audits)", level: 70 },
      { name: "Defensive Coding Standards", level: 65 },
    ],
    tools: ["Kali Linux", "SQL", "Git", "Wireshark"],
  },
  {
    title: "App Development",
    summary: "Mobile UI creation, cross-platform apps, and database integration.",
    icon: <FaMobileAlt aria-hidden="true" />,
    level: "Applied",
    skills: [
      { name: "Flutter & Dart", level: 85 },
      { name: "React Native", level: 75 },
      { name: "Java (Android SDK)", level: 70 },
      { name: "PHP / backend API structures", level: 65 },
    ],
    tools: ["Flutter", "React Native", "Java", "REST APIs"],
  },
  {
    title: "Web Development",
    summary: "Responsive front-end development with standard and modern toolsets.",
    icon: <FaGlobe aria-hidden="true" />,
    level: "Strong",
    skills: [
      { name: "HTML / CSS / JavaScript", level: 85 },
      { name: "React.js / Next.js", level: 80 },
      { name: "TypeScript", level: 70 },
      { name: "CSS Modules / Sass / styled-components", level: 70 },
    ],
    tools: ["React", "Next.js", "TypeScript", "Figma Design"],
  },
  {
    title: "Networking & Admin",
    summary: "LAN setup, Cisco NetAcad configurations, and packet capture analytics.",
    icon: <FaNetworkWired aria-hidden="true" />,
    level: "Practical",
    skills: [
      { name: "Cisco Routing & Switching", level: 75 },
      { name: "Network Configuration Labs", level: 70 },
      { name: "Protocol Sniffing (ARP, DNS)", level: 65 },
    ],
    tools: ["Cisco Packet Tracer", "ARP", "DNS", "DHCP"],
  },
];

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 150);
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
  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section id="skills" ref={revealRef} className={`skills-page anim-fade ${revealClass}`}>
      <div className="skills-header anim-slide">
        <span className="skills-kicker">
          <FaCode aria-hidden="true" />
          Technical Profile
        </span>
        <h1 className="skills-title">Skills & Competencies</h1>
        <p className="skills-intro">
          A practical mix of cyber security threat management, network structures,
          and production-oriented front-end web and mobile development capabilities.
        </p>
      </div>

      <div className="skills-overview anim-slide" aria-label="Skills summary" style={{ animationDelay: "0.1s" }}>
        <div>
          <strong>4</strong>
          <span>Key Domains</span>
        </div>
        <div>
          <strong>16+</strong>
          <span>Tools & Technologies</span>
        </div>
        <div>
          <strong>Secure</strong>
          <span>Development Approach</span>
        </div>
      </div>

      <div className="skills-grid anim-slide" style={{ animationDelay: "0.2s" }}>
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
