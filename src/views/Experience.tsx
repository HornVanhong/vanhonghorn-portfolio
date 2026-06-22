import {
  FaCodeBranch,
  FaLaptopCode,
  FaLayerGroup,
  FaUniversity,
} from "react-icons/fa";

const highlights = [
  { value: "2+", label: "Professional Roles" },
  { value: "React Native", label: "Core Mobile Stack" },
  { value: "Agile Scrum", label: "Team Workflow" },
];

export default function Experience() {
  return (
    <section className="experience-page anim-fade">
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
        <article className="exp-card">
          <div className="exp-dot" aria-hidden="true" />
          <div className="job-card glass">
            <div className="exp-header">
              <span className="exp-icon-wrap">
                <FaUniversity className="exp-icon" aria-hidden="true" />
              </span>
              <div className="exp-header-text">
                <div className="exp-header-top">
                  <span className="exp-type">Data Operations</span>
                  <span className="exp-period">2022 – 2023</span>
                </div>
                <h2>Data Labeler</h2>
              </div>
            </div>
            <p className="job-meta">Phnom Penh, DDD (Digital Data Divide)</p>
            <p className="job-desc">Performed key tagging, classification, and data annotation for machine learning pipelines.</p>
            <div className="experience-tags">
              <span>Data Prep</span>
              <span>Quality Assurance</span>
              <span>AI Support</span>
            </div>
          </div>
        </article>

        <article className="exp-card">
          <div className="exp-dot" aria-hidden="true" />
          <div className="job-card glass">
            <div className="exp-header">
              <span className="exp-icon-wrap">
                <FaLaptopCode className="exp-icon" aria-hidden="true" />
              </span>
              <div className="exp-header-text">
                <div className="exp-header-top">
                  <span className="exp-type">Front-end Development</span>
                  <span className="exp-period">2023 – 2024</span>
                </div>
                <h2>Intern - Digital Banking</h2>
              </div>
            </div>
            <p className="job-meta">RHB Bank Cambodia</p>
            <ul>
              <li>Leveraged React Native to build and deploy mobile banking capabilities.</li>
              <li>Addressed critical frontend tickets and elevated app stability metrics.</li>
              <li>Collaborated closely with UX/UI teams to replicate design systems.</li>
              <li>Reviewed PRs and actively participated in peer engineering code reviews.</li>
              <li>Integrated Stylesheet properties, SASS, and styled-components components.</li>
              <li>Operated in Git, TypeScript, Jira, and Bitbucket version control loops.</li>
            </ul>
            <div className="experience-tags">
              <span>
                <FaLayerGroup aria-hidden="true" />
                Components
              </span>
              <span>
                <FaCodeBranch aria-hidden="true" />
                PR Reviews
              </span>
              <span>React Native</span>
              <span>Jira & Git</span>
            </div>
          </div>
        </article>
      </div>

      <noscript>Your experience timeline will appear here.</noscript>
    </section>
  );
}
