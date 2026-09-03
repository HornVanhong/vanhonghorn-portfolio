"use client";

import { useState } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Certificates from "./Certificates";
import { FaDownload, FaEye } from "react-icons/fa";
import DocumentModal from "../components/DocumentModal";

const CV_URL = "/CV/Horn%20Vanhong(CV).pdf";

export default function Resume() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <div id="resume" className="resume-view">
      <div className="resume-download-section">
        <div className="resume-download-text">
          <span className="resume-kicker">Curriculum Vitae</span>
          <h2>Looking for the offline version?</h2>
          <p>
            View or download my complete resume as a single PDF document to read, print, or share.
          </p>
        </div>
        <div className="resume-download-actions">
          <button
            type="button"
            className="btn secondary"
            onClick={() => setCvOpen(true)}
          >
            <FaEye aria-hidden="true" />
            View CV
          </button>
          <a
            href={CV_URL}
            download="Horn_Vanhong_CV.pdf"
            className="btn cta"
          >
            <FaDownload aria-hidden="true" />
            Download CV (PDF)
          </a>
        </div>
      </div>
      <Experience />
      <Education />
      <Certificates />

      <DocumentModal
        isOpen={cvOpen}
        onOpenChange={setCvOpen}
        title="Horn Vanhong — Curriculum Vitae"
        fileUrl={CV_URL}
        kicker="Resume Preview"
      />
    </div>
  );
}
