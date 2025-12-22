import { FaLaptopCode, FaUniversity } from "react-icons/fa";

export default function Experience() {
  return (
    <section className="experience-page">
      <h1 className="exp-title">Experience</h1>
      <div className="experience-timeline">
        <div className="exp-card">
          <span className="exp-date-badge">2022 – 2023</span>
          <div className="exp-dot" />
          <div className="job-card glass">
            <div className="exp-header">
              <FaUniversity className="exp-icon" />
              <h2>Labeler</h2>
            </div>
            <p className="job-meta">
              <span>Phnom Penh, DDD</span>
            </p>
            <p>Performed labeling tasks and data preparation for projects.</p>
          </div>
        </div>
        <div className="exp-card">
          <span className="exp-date-badge">2023 – 2024</span>
          <div className="exp-dot" />
          <div className="job-card glass">
            <div className="exp-header">
              <FaLaptopCode className="exp-icon" />
              <h2>Intern — Digital Banking (Front-End Developer)</h2>
            </div>
            <p className="job-meta">RHB Cambodia</p>
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
          </div>
        </div>
      </div>
      {/* Fallback for debugging: */}
      <noscript>Your experience timeline will appear here.</noscript>
    </section>
  );
}
