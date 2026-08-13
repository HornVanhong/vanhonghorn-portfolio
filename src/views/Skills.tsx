"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaCode } from "react-icons/fa";

const BarChart = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.BarChart),
  { ssr: false, loading: () => <div className="skills-chart-skeleton" style={{ height: 360 }} /> }
);
const PieChart = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.PieChart),
  { ssr: false, loading: () => <div className="skills-chart-skeleton" style={{ height: 300 }} /> }
);

gsap.registerPlugin(ScrollTrigger);


interface SkillGroup {
  title: string;
  focus: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

interface SkillGraphItem {
  title: string;
  level: number;
  focus: string;
}

const skillGroups: SkillGroup[] = [
  {
    title: "Cyber Security",
    focus: "Defensive systems",
    skills: [
      { name: "Linux (Kali, CentOS, Debian)", level: 80 },
      { name: "Cybersecurity Principles", level: 75 },
      { name: "Database Security (SQL Audits)", level: 70 },
      { name: "Defensive Coding Standards", level: 65 },
    ],
  },
  {
    title: "App Development",
    focus: "Mobile delivery",
    skills: [
      { name: "Flutter & Dart", level: 85 },
      { name: "React Native", level: 75 },
      { name: "Java (Android SDK)", level: 70 },
      { name: "PHP / backend API structures", level: 65 },
    ],
  },
  {
    title: "Web Development",
    focus: "Modern interfaces",
    skills: [
      { name: "HTML / CSS / JavaScript", level: 85 },
      { name: "React.js / Next.js", level: 80 },
      { name: "TypeScript", level: 70 },
      { name: "CSS Modules / Sass / styled-components", level: 70 },
    ],
  },
  {
    title: "Networking & Admin",
    focus: "Network operations",
    skills: [
      { name: "Cisco Routing & Switching", level: 75 },
      { name: "Network Configuration Labs", level: 70 },
      { name: "Protocol Sniffing (ARP, DNS)", level: 65 },
    ],
  },
];

const skillGraphData: SkillGraphItem[] = skillGroups.map((group) => ({
  title: group.title,
  focus: group.focus,
  level: Math.round(
    group.skills.reduce((total, skill) => total + skill.level, 0) / group.skills.length
  ),
}));

const chartColors = ["#00d5e8", "#38bdf8", "#67e8f9", "#0e7490"];

const SkillGraph: React.FC<{ items: SkillGraphItem[] }> = ({ items }) => {
  const [isMobileChart, setIsMobileChart] = useState(false);
  const topSkill = items.reduce((best, item) => (item.level > best.level ? item : best), items[0]);
  const chartData = items.map((item) => ({
    domain: item.title,
    focus: item.focus,
    score: item.level,
  }));
  const pieData = chartData.map((item, index) => ({
    id: item.domain,
    label: item.domain,
    value: item.score,
    color: chartColors[index % chartColors.length],
  }));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateChartMode = () => setIsMobileChart(mediaQuery.matches);

    updateChartMode();
    mediaQuery.addEventListener("change", updateChartMode);
    return () => mediaQuery.removeEventListener("change", updateChartMode);
  }, []);

  return (
    <div className="skills-chart-card">
      <div className="skills-chart-header">
        <div>
          <span className="skills-chart-eyebrow">Skill Graph</span>
          <h2>Domain Strength</h2>
        </div>
        <div className="skills-chart-score">
          <strong>{topSkill.level}%</strong>
          <span>{topSkill.title}</span>
        </div>
      </div>

      <div className="skills-chart-body" aria-label="Skill strength graph">
        {isMobileChart ? (
          <div className="skills-pie-layout">
            <PieChart
              height={300}
              series={[
                {
                  data: pieData,
                  innerRadius: 58,
                  outerRadius: 105,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  cx: "50%",
                  cy: "50%",
                },
              ]}
              colors={chartColors}
              hideLegend
            />
            <div className="skills-pie-legend">
              {chartData.map((item, index) => (
                <div className="skills-pie-legend-item" key={item.domain}>
                  <span style={{ background: chartColors[index % chartColors.length] }} />
                  <strong>{item.domain}</strong>
                  <b>{item.score}%</b>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <BarChart
            height={360}
            dataset={chartData}
            layout="horizontal"
            margin={{ top: 16, right: 28, bottom: 28, left: 12 }}
            xAxis={[
              {
                min: 0,
                max: 100,
                tickLabelStyle: { fill: "var(--text-muted)", fontSize: 12 },
              },
            ]}
            yAxis={[
              {
                dataKey: "domain",
                scaleType: "band",
                width: 150,
                tickLabelStyle: { fill: "var(--text)", fontSize: 12, fontWeight: 700 },
              },
            ]}
            series={[
              {
                dataKey: "score",
                label: "Skill strength",
                color: "var(--accent)",
              },
            ]}
            grid={{ vertical: true }}
            borderRadius={8}
            hideLegend
          />
        )}
      </div>
    </div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([
        ".skills-header > *",
        ".skills-overview > div",
        ".skills-chart-card"
      ], { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    // Set initial states
    gsap.set([
      ".skills-header > *",
      ".skills-overview > div",
      ".skills-chart-card"
    ], {
      opacity: 0,
      y: 35
    });

    // 1. Header scroll animation
    gsap.to(".skills-header > *", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // 2. Overview scroll animation
    gsap.to(".skills-overview > div", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-overview",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    gsap.to(".skills-chart-card", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-chart-card",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="skills-page">
      <div className="skills-header">
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

      <div className="skills-overview" aria-label="Skills summary">
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

      <SkillGraph items={skillGraphData} />
    </section>
  );
}
