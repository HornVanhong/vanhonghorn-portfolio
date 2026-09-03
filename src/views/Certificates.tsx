"use client";

import { useState } from "react";
import { FaAward, FaDownload, FaEye, FaFilePdf, FaFileImage } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";
import DocumentModal from "../components/DocumentModal";

const certificateFiles = [
  {
   name: "cyber.pdf",
    title: "Cyber Security Specialist Certificate",
    issuer: "ANT Technology Training Center",
    category: "Certificate",
    type: "PDF",
  },
  {
   name: "HRD/HRD_Basic_Certificate.png",
    title: "Korea Software HRD Certificate",
    issuer: "Korea Software HRD Center",
    category: "Certificate",
    type: "PNG",
  },
  {
    name: "HRD/Coding1.jpeg",
    title: "HRD Coding Challenge Certificate (Phase 1)",
    issuer: "Korea Software HRD Center",
    category: "Certificate",
    type: "JPEG",
  },
  {
    name: "HRD/Coding2.jpg",
    title: "HRD Coding Challenge Certificate (Phase 2)",
    issuer: "Korea Software HRD Center",
    category: "Certificate",
    type: "JPG",
  },
  {
    name: "FullCertificate.pdf",
    title: "Cyber Security Training Certificate",
    issuer: "ANT Technology Training Center",
    category: "Certificate",
    type: "PDF",
  },
];

export default function Certificates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPdf, setModalPdf] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleView = (fileUrl: string, title: string) => {
    setModalPdf(fileUrl);
    setModalTitle(title);
    setModalOpen(true);
  };

  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section ref={revealRef} className={`certificates-page anim-fade ${revealClass}`}>
      <div className="certificates-header anim-slide">
        <span className="certificates-kicker">
          <FaAward aria-hidden="true" />
          Achievement
        </span>
        <h1 className="certificates-title">Certificates</h1>
        <p className="certificates-intro">
          Verified training records and professional learning milestones.
        </p>
      </div>

      <div className="certificates-grid anim-slide" style={{ animationDelay: "0.1s" }}>
        {certificateFiles.map((cert) => {
          const fileUrl = `/certificate/${cert.name}`;

          return (
            <div className="certificate-card" key={fileUrl}>
              {cert.type !== "PDF" ? (
                <button
                  className="certificate-preview image-preview-mode"
                  onClick={() => handleView(fileUrl, cert.title)}
                  type="button"
                >
                  <img
                    src={fileUrl}
                    alt={cert.title}
                    className="certificate-card-img"
                  />
                  <span className="certificate-preview-file">
                    <FaFileImage aria-hidden="true" />
                    {cert.type}
                  </span>
                </button>
              ) : (
                <button
                  className="certificate-preview"
                  onClick={() => handleView(fileUrl, cert.title)}
                  type="button"
                >
                  <span className="certificate-preview-topline" />
                  <span className="certificate-preview-seal">
                    <FaAward aria-hidden="true" />
                  </span>
                  <span className="certificate-preview-label">
                    {cert.category}
                  </span>
                  <span className="certificate-preview-title">{cert.title}</span>
                  <span className="certificate-preview-lines" />
                  <span className="certificate-preview-file">
                    <FaFilePdf aria-hidden="true" />
                    {cert.type}
                  </span>
                </button>
              )}

              <div className="certificate-info">
                <div className="certificate-meta-row">
                  <span>{cert.issuer}</span>
                  <span>{cert.type}</span>
                </div>
                <h2 className="certificate-title">{cert.title}</h2>
                <p className="certificate-filename">{cert.name}</p>
                <div className="certificate-actions">
                  <button
                    className="cert-view-btn"
                    onClick={() => handleView(fileUrl, cert.title)}
                    type="button"
                  >
                    <FaEye aria-hidden="true" />
                    View
                  </button>
                  <a
                    href={fileUrl}
                    download={cert.name.split("/").pop()}
                    className="cert-view-btn cert-download-btn"
                  >
                    <FaDownload aria-hidden="true" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DocumentModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        fileUrl={modalPdf}
        kicker="Certificate Preview"
      />
    </section>
  );
}
