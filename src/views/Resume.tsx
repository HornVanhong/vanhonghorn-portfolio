import Experience from "./Experience";
import Education from "./Education";
import Certificates from "./Certificates";
import { FaDownload } from "react-icons/fa";

export default function Resume() {
  return (
    <div id="resume" className="resume-view">
      <div className="resume-download-section">
        <div className="resume-download-text">
          <span className="resume-kicker">Curriculum Vitae</span>
          <h2>Looking for the offline version?</h2>
          <p>
            Download my complete resume as a single PDF document to read, print, or share.
          </p>
        </div>
        <a
          href="/CV/Horn%20Vanhong(CV).pdf"
          download="Horn_Vanhong_CV.pdf"
          className="btn cta"
        >
          <FaDownload aria-hidden="true" />
          Download CV (PDF)
        </a>
      </div>
      <Experience />
      <Education />
      <Certificates />
    </div>
  );
}
