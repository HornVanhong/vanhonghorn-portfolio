"use client";

import { useState, useEffect } from "react";
import { FaAward, FaDownload, FaEye, FaFilePdf, FaFileImage, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Modal } from "@heroui/react";

const certificateFiles = [
  {
    name: "cyber.pdf",
    title: "Cyber Security Specialist Certificate",
    issuer: "ANT Technology Training Center",
    category: "Certificate",
    type: "PDF",
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
  const [pdfError, setPdfError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleView = (fileUrl: string, title: string) => {
    const isPdf = !fileUrl.toLowerCase().match(/\.(jpeg|jpg|png|webp)$/);
    if (isPdf && isMobile) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setModalPdf(fileUrl);
    setModalTitle(title);
    setPdfError(false);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

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

      <Modal
        isOpen={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      >
        <Modal.Backdrop className="bg-[#030712]/60 backdrop-blur-md fixed inset-0 z-[1000] flex items-center justify-center p-6" />
        <Modal.Container className="fixed inset-0 z-[1001] flex items-center justify-center p-6 pointer-events-none">
          <Modal.Dialog className="bg-[#0b0f19] border border-[rgba(255,255,255,0.08)] rounded-2xl text-[#f8fafc] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl pointer-events-auto">
            <Modal.Header className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.05)]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-mono">Certificate Preview</span>
                <Modal.Heading className="text-xl font-bold text-[#f8fafc] mt-1">{modalTitle}</Modal.Heading>
              </div>
              <Modal.CloseTrigger className="hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.12)] p-2 rounded-lg text-[#f8fafc] transition-colors cursor-pointer border-none bg-transparent">
                <FaTimes aria-hidden="true" />
              </Modal.CloseTrigger>
            </Modal.Header>
            <Modal.Body className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
              {modalPdf.toLowerCase().match(/\.(jpeg|jpg|png|webp)$/) ? (
                <div className="cert-modal-image-container">
                  <img
                    src={modalPdf}
                    alt={modalTitle}
                    className="cert-modal-image"
                  />
                </div>
              ) : isMobile ? (
                <div className="cert-modal-mobile-pdf-fallback">
                  <div className="fallback-icon-wrap">
                    <FaFilePdf aria-hidden="true" />
                  </div>
                  <h3>Mobile PDF Preview Not Supported</h3>
                  <p>
                    Most mobile browsers do not support inline PDF previews. Please open the file in a new tab to view it.
                  </p>
                  <a
                    href={modalPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-fallback-btn"
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                    Open PDF in New Tab
                  </a>
                </div>
              ) : !pdfError ? (
                <iframe
                  src={modalPdf}
                  title={modalTitle}
                  className="cert-modal-pdf"
                  allowFullScreen
                  onError={() => setPdfError(true)}
                />
              ) : (
                <div className="cert-modal-error">
                  Document could not be loaded.
                  <br />
                  Please make sure the file exists in{" "}
                  <b>public/certificate/</b>.
                </div>
              )}

              <a href={modalPdf} download={modalPdf.split("/").pop()} className="cert-modal-download mt-auto">
                <FaDownload aria-hidden="true" />
                Download {modalPdf.toLowerCase().match(/\.(jpeg|jpg|png|webp)$/) ? "Image" : "PDF"}
              </a>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </section>
  );
}
