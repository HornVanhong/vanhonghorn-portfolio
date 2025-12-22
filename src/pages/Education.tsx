export default function Education() {
  return (
    <section className="education-page" aria-labelledby="education-heading">
      <h1 id="education-heading" className="education-title">
        Education
      </h1>

      <div className="roadmap" role="list">
        {/* High School */}
        <article
          className="roadmap-item"
          role="listitem"
          aria-label="High School"
        >
          <div className="roadmap-dot" aria-hidden="true"></div>
          <div className="roadmap-content">
            <h2 className="roadmap-heading">High School</h2>
            <p className="education-meta">Completed — 2020–2021</p>
          </div>
        </article>

        {/* University */}
        <article
          className="roadmap-item"
          role="listitem"
          aria-label="Royal University of Phnom Penh"
        >
          <div className="roadmap-dot" aria-hidden="true"></div>
          <div className="roadmap-content">
            <h2 className="roadmap-heading">Royal University of Phnom Penh</h2>
            <p className="education-meta">
              Bachelor of Computer Science — Graduate 2025
            </p>
            <ul className="education-list">
              <li>
                Scholarship student of Ministry of Posts and Telecommunications
                MPTC
              </li>
              <li>
                Cyber Security specialization at ANT Technology Training Center
              </li>
            </ul>
          </div>
        </article>

        {/* Courses */}
        <article
          className="roadmap-item"
          role="listitem"
          aria-label="Additional Courses and Training"
        >
          <div className="roadmap-dot" aria-hidden="true"></div>
          <div className="roadmap-content">
            <h2 className="roadmap-heading">Additional Courses & Training</h2>
            <ul className="education-list">
              <li>Flutter 3 — Instinct Institute Alumni Dec 2022 – May 2023</li>
              <li>Cisco Networking Academy — Networking fundamentals</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
