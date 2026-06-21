"use client";

import { useState } from "react";
import { FaAward, FaDownload, FaEye, FaFilePdf, FaTimes } from "react-icons/fa";

const certificateFiles = [
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
  const [pdfError, setPdfError] = useState(false);

  const handleView = (fileUrl: string, title: string) => {
    setModalPdf(fileUrl);
    setModalTitle(title);
    setPdfError(false);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <section className="certificates-page anim-fade">
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
                    download="certificate.pdf"
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

      {modalOpen && (
        <div className="cert-modal-overlay" onClick={handleClose}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div>
                <span className="cert-modal-label">Certificate Preview</span>
                <h2 className="cert-modal-title">{modalTitle}</h2>
              </div>
              <button
                className="cert-modal-close"
                onClick={handleClose}
                aria-label="Close certificate preview"
                type="button"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            {!pdfError ? (
              <iframe
                src={modalPdf}
                title={modalTitle}
                className="cert-modal-pdf"
                allowFullScreen
                onError={() => setPdfError(true)}
              />
            ) : (
              <div className="cert-modal-error">
                PDF could not be loaded.
                <br />
                Please make sure <b>certificate.pdf</b> exists in{" "}
                <b>public/certificate/</b> and your browser supports PDF
                viewing.
              </div>
            )}

            <a href={modalPdf} download className="cert-modal-download">
              <FaDownload aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
