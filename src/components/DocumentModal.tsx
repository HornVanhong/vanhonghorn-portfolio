"use client";

import dynamic from "next/dynamic";
import { FaDownload, FaTimes } from "react-icons/fa";
import { Modal } from "@heroui/react";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <div className="pdf-viewer-loading">Loading document…</div>,
});

const IMAGE_EXT_RE = /\.(jpeg|jpg|png|webp)$/i;

interface DocumentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fileUrl: string;
  kicker?: string;
}

export default function DocumentModal({
  isOpen,
  onOpenChange,
  title,
  fileUrl,
  kicker = "Document Preview",
}: DocumentModalProps) {
  if (!isOpen) return null;

  const isImage = IMAGE_EXT_RE.test(fileUrl);
  const fileName = fileUrl.split("/").pop();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop className="bg-[#030712]/60 backdrop-blur-md fixed inset-0 z-[1000] flex items-center justify-center p-6" />
      <Modal.Container className="fixed inset-0 z-[1001] flex items-center justify-center p-6 pointer-events-none">
        <Modal.Dialog className="bg-[#0b0f19] border border-[rgba(255,255,255,0.08)] rounded-2xl text-[#f8fafc] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl pointer-events-auto">
          <Modal.Header className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.05)]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-mono">{kicker}</span>
              <Modal.Heading className="text-xl font-bold text-[#f8fafc] mt-1">{title}</Modal.Heading>
            </div>
            <Modal.CloseTrigger className="hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.12)] p-2 rounded-lg text-[#f8fafc] transition-colors cursor-pointer border-none bg-transparent close-modal-btn">
              <FaTimes aria-hidden="true" />
            </Modal.CloseTrigger>
          </Modal.Header>
          <Modal.Body className="p-6 flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
            {isImage ? (
              <>
                <div className="cert-modal-image-container">
                  <img src={fileUrl} alt={title} className="cert-modal-image" />
                </div>
                <a href={fileUrl} download={fileName} className="cert-modal-download mt-auto">
                  <FaDownload aria-hidden="true" />
                  Download Image
                </a>
              </>
            ) : (
              <PdfViewer key={fileUrl} fileUrl={fileUrl} fileName={fileName} />
            )}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}
