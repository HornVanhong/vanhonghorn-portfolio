import { useState } from "react";

// Only show certificate.pdf from the public/certificate/ folder
const certificateFiles = [{ name: "certificate.pdf", type: "pdf" }];

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
    <section className="certificates-page">
      <h1 className="certificates-title">Certificate</h1>
      <div className="certificates-grid">
        {certificateFiles.map((cert) => {
          const fileUrl = `/certificate/${cert.name}`;
          return (
            <div className="certificate-card" key={fileUrl}>
              <div
                className="certificate-img-wrap pdf-icon-wrap"
                onClick={() => handleView(fileUrl, cert.name)}
                style={{ cursor: "pointer" }}
              >
                <span className="pdf-icon">📄</span>
              </div>
              <div className="certificate-info">
                <h2 className="certificate-title">{cert.name}</h2>
                <div
                  style={{ display: "flex", justifyContent: "center", gap: 8 }}
                >
                  <button
                    className="cert-view-btn"
                    onClick={() => handleView(fileUrl, cert.name)}
                  >
                    View
                  </button>
                  <a
                    href={fileUrl}
                    download="certificate.pdf"
                    className="cert-view-btn"
                  >
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
            <button className="cert-modal-close" onClick={handleClose}>
              &times;
            </button>
            {!pdfError ? (
              <iframe
                src={modalPdf}
                title={modalTitle}
                className="cert-modal-pdf"
                style={{
                  width: "80vw",
                  height: "70vh",
                  border: "none",
                  borderRadius: "0.7rem",
                  background: "#eaf3fa",
                }}
                allowFullScreen
                onError={() => setPdfError(true)}
              />
            ) : (
              <div
                style={{
                  color: "#e74c3c",
                  fontWeight: 600,
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                PDF could not be loaded.
                <br />
                Please make sure <b>certificate.pdf</b> exists in{" "}
                <b>public/certificate/</b> and your browser supports PDF
                viewing.
              </div>
            )}
            <div className="cert-modal-title">{modalTitle}</div>
          </div>
        </div>
      )}
    </section>
  );
}
