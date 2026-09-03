"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaDownload,
  FaExternalLinkAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.25;

interface PdfViewerProps {
  fileUrl: string;
  fileName?: string;
}

export default function PdfViewer({ fileUrl, fileName }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    setContainerWidth(el.clientWidth);

    return () => observer.disconnect();
  }, []);

  const pageWidth = containerWidth
    ? Math.min(containerWidth - 32, 860) * scale
    : undefined;

  const downloadName = fileName ?? fileUrl.split("/").pop();

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer-toolbar">
        <div className="pdf-viewer-zoom-controls">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(MIN_SCALE, +(s - SCALE_STEP).toFixed(2)))}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
          >
            <FaSearchMinus aria-hidden="true" />
          </button>
          <span className="pdf-viewer-zoom-value">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(MAX_SCALE, +(s + SCALE_STEP).toFixed(2)))}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
          >
            <FaSearchPlus aria-hidden="true" />
          </button>
        </div>

        <div className="pdf-viewer-toolbar-actions">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-viewer-toolbar-btn"
          >
            <FaExternalLinkAlt aria-hidden="true" />
            <span>Open in new tab</span>
          </a>
          <a
            href={fileUrl}
            download={downloadName}
            className="pdf-viewer-toolbar-btn"
          >
            <FaDownload aria-hidden="true" />
            <span>Download</span>
          </a>
        </div>
      </div>

      <div className="pdf-viewer-pages" ref={containerRef}>
        {failed ? (
          <div className="pdf-viewer-error">
            <FaExclamationTriangle aria-hidden="true" />
            <p>This document could not be previewed.</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="cert-fallback-btn">
              <FaExternalLinkAlt aria-hidden="true" />
              Open PDF in New Tab
            </a>
          </div>
        ) : (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            onLoadError={() => setFailed(true)}
            loading={<div className="pdf-viewer-loading">Loading document…</div>}
            error={<div className="pdf-viewer-loading">Loading document…</div>}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={pageWidth}
                className="pdf-viewer-page"
                renderAnnotationLayer
                renderTextLayer
                loading=""
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}
