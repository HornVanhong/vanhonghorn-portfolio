import {
  FaCodeBranch,
  FaLaptopCode,
  FaLayerGroup,
  FaUniversity,
} from "react-icons/fa";

const highlights = [
  { value: "2", label: "Roles" },
  { value: "React Native", label: "Main stack" },
  { value: "Agile", label: "Workflow" },
];

export default function Experience() {
  return (
    <section className="experience-page">
      <div className="experience-header">
        <span className="experience-kicker">Work history</span>
        <h1 className="exp-title">Experience</h1>
        <p className="experience-intro">
          Practical work across data preparation, mobile front-end development,
          team collaboration, and delivery workflows.
        </p>
      </div>

      <div className="experience-overview" aria-label="Experience highlights">
        {highlights.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="experience-timeline">
        <article className="exp-card">
          <span className="exp-date-badge">2022 – 2023</span>
          <div className="exp-dot" aria-hidden="true" />
          <div className="job-card glass">
            <div className="exp-header">
              <span className="exp-icon-wrap">
                <FaUniversity className="exp-icon" aria-hidden="true" />
              </span>
              <div>
                <span className="exp-type">Data operations</span>
                <h2>Labeler</h2>
              </div>
            </div>
            <p className="job-meta">
              <span>Phnom Penh, DDD</span>
            </p>
            <p>Performed labeling tasks and data preparation for projects.</p>
            <div className="experience-tags">
              <span>Data prep</span>
              <span>Accuracy</span>
              <span>Project support</span>
            </div>
          </div>
        </article>

        <article className="exp-card">
          <span className="exp-date-badge">2023 – 2024</span>
          <div className="exp-dot" aria-hidden="true" />
          <div className="job-card glass">
            <div className="exp-header">
              <span className="exp-icon-wrap">
                <FaLaptopCode className="exp-icon" aria-hidden="true" />
              </span>
              <div>
                <span className="exp-type">Front-end development</span>
                <h2>Intern - Digital Banking</h2>
              </div>
            </div>
            <p className="job-meta">RHB Cambodia - Front-End Developer</p>
            <ul>
              <li>Used React Native to build and improve mobile features.</li>
              <li>Fixed front-end issues and improved app stability.</li>
              <li>Implemented new components following UX/UI team designs.</li>
              <li>
                Created and reviewed pull requests; collaborated in code
                reviews.
              </li>
              <li>Participated in team meetings and sprint planning.</li>
              <li>
                Learned and applied Stylesheet techniques, SASS, and
                styled-components.
              </li>
              <li>
                Gained hands-on experience with Git, TypeScript, and React.
              </li>
              <li>
                Used Bitbucket and Jira for source control and issue tracking.
              </li>
            </ul>
            <div className="experience-tags">
              <span>
                <FaLayerGroup aria-hidden="true" />
                Components
              </span>
              <span>
                <FaCodeBranch aria-hidden="true" />
                Pull requests
              </span>
              <span>TypeScript</span>
              <span>Jira</span>
            </div>
          </div>
        </article>
      </div>

      <noscript>Your experience timeline will appear here.</noscript>
    </section>
  );
}
