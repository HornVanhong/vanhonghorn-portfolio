import Image from "next/image";
import {
  FaCodeBranch,
  FaLaptopCode,
  FaLayerGroup,
  FaUniversity,
} from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";
import DddLogo from "../assets/logo/DDD.png";
import RhbLogo from "../assets/logo/RHB.webp";

const highlights = [
  { value: "2+", label: "Professional Roles" },
  { value: "React Native", label: "Core Mobile Stack" },
  { value: "Agile Scrum", label: "Team Workflow" },
];

const experienceItems = [
  {
    logo: DddLogo,
    icon: <FaUniversity className="exp-icon" aria-hidden="true" />,
    type: "Data Operations",
    period: "2022 – 2023",
    title: "Data Labeler",
    meta: "Phnom Penh, DDD (Digital Data Divide)",
    description: "Performed key tagging, classification, and data annotation for machine learning pipelines.",
    points: [],
    tags: ["Data Prep", "Quality Assurance", "AI Support"],
  },
  {
    logo: RhbLogo,
    icon: <FaLaptopCode className="exp-icon" aria-hidden="true" />,
    type: "Front-end Development",
    period: "2023 – 2024",
    title: "Intern - Digital Banking",
    meta: "RHB Bank Cambodia",
    description: "",
    points: [
      "Leveraged React Native to build and deploy mobile banking capabilities.",
      "Addressed critical frontend tickets and elevated app stability metrics.",
      "Collaborated closely with UX/UI teams to replicate design systems.",
      "Reviewed PRs and actively participated in peer engineering code reviews.",
      "Integrated Stylesheet properties, SASS, and styled-components components.",
      "Operated in Git, TypeScript, Jira, and Bitbucket version control loops.",
    ],
    tags: [
      <>
        <FaLayerGroup aria-hidden="true" />
        Components
      </>,
      <>
        <FaCodeBranch aria-hidden="true" />
        PR Reviews
      </>,
      "React Native",
      "Jira & Git",
    ],
  },
];

export default function Experience() {
  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section ref={revealRef} className={`experience-page anim-fade ${revealClass}`}>
      <div className="experience-header anim-slide">
        <span className="experience-kicker">Work history</span>
        <h1 className="exp-title">Experience</h1>
        <p className="experience-intro">
          Practical industry work across mobile frontend development, agile collaboration, data pipelines, and deployment workflows.
        </p>
      </div>

      <div className="experience-overview anim-slide" aria-label="Experience highlights" style={{ animationDelay: "0.1s" }}>
        {highlights.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="experience-timeline anim-slide" style={{ animationDelay: "0.2s" }}>
        {experienceItems.map((item) => (
          <article className="exp-card" key={`${item.title}-${item.period}`}>
            <div className="exp-dot" aria-hidden="true" />
            <div className="job-card glass">
              <div className="exp-header">
                <span className="exp-icon-wrap">
                  <Image
                    src={item.logo}
                    alt={`${item.meta} logo`}
                    className="exp-logo-img"
                    width={44}
                    height={44}
                  />
                  <span className="exp-icon-fallback">{item.icon}</span>
                </span>
                <div className="exp-header-text">
                  <div className="exp-header-top">
                    <span className="exp-type">{item.type}</span>
                    <span className="exp-period">{item.period}</span>
                  </div>
                  <h2>{item.title}</h2>
                </div>
              </div>
              <p className="job-meta">{item.meta}</p>
              {item.description ? <p className="job-desc">{item.description}</p> : null}
              {item.points.length > 0 ? (
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              <div className="experience-tags">
                {item.tags.map((tag, index) => (
                  <span key={`${item.title}-tag-${index}`}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <noscript>Your experience timeline will appear here.</noscript>
    </section>
  );
}
