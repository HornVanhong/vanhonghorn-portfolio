"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaTelegramPlane,
  FaTimes,
} from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Modal } from "@heroui/react";

const contactLinks = [
  {
    label: "Email",
    value: "vanhonghorn37@gmail.com",
    href: "mailto:vanhonghorn37@gmail.com",
    icon: <FaEnvelope aria-hidden="true" />,
  },
  {
    label: "Phone",
    value: "+855 86-378-933",
    href: "tel:+85586378933",
    icon: <FaPhoneAlt aria-hidden="true" />,
  },
  {
    label: "Location",
    value: "Phnom Penh, Cambodia",
    href: "https://maps.google.com/?q=Phnom+Penh,+Cambodia",
    icon: <FaMapMarkerAlt aria-hidden="true" />,
  },
];

export default function Contact() {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to send message.");
      }

      setSubmitStatus("success");
      setStatusMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

      // Auto-clear success message after 5s
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section id="contact" ref={revealRef} className={`contact-page anim-fade ${revealClass}`}>
      <div className="contact-header anim-slide">
        <span className="contact-kicker">Available for opportunities</span>
        <h1 className="contact-title">Contact</h1>
        <p className="contact-intro">
          Reach out for internships, collaborations, or project discussions.
        </p>
      </div>

      <div className="contact-layout anim-slide" style={{ animationDelay: "0.1s" }}>
        <aside className="contact-panel">
          <p className="contact-panel-label">Direct details</p>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="contact-link-card"
                href={link.href}
                target={link.label === "Location" ? "_blank" : undefined}
                rel={link.label === "Location" ? "noopener noreferrer" : undefined}
              >
                <span className="contact-link-icon">{link.icon}</span>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.value}</small>
                </span>
              </a>
            ))}
            <button
              type="button"
              className="telegram-qr-btn contact-link-card"
              onClick={() => setQrModalOpen(true)}
            >
              <span className="contact-link-icon">
                <FaTelegramPlane aria-hidden="true" />
              </span>
              <span>
                <strong>Telegram</strong>
                <small>Scan or click for QR Code</small>
              </span>
            </button>
          </div>

          <div className="contact-note">
            <span className="contact-note-label">Response time</span>
            <p>
              I usually reply within 24 hours with project context, availability, and next steps.
            </p>
          </div>
        </aside>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-head">
            <span className="contact-kicker">
              <FaPaperPlane aria-hidden="true" />
              Send a message
            </span>
            <p>
              Leave your details and a short message. I’ll review and respond as soon as possible.
            </p>
          </div>

          <div className="contact-field-grid">
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              name="message"
              placeholder="Write your message..."
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus !== "idle" && (
            <div className={`contact-status-banner ${submitStatus}`} role="alert">
              <span className="banner-icon">{submitStatus === "success" ? "✓" : "⚠"}</span>
              <span className="banner-text">{statusMessage}</span>
            </div>
          )}
        </form>
      </div>

      {qrModalOpen && (
        <Modal
          isOpen={qrModalOpen}
          onOpenChange={(open) => setQrModalOpen(open)}
        >
          <Modal.Backdrop className="bg-[#030712]/60 backdrop-blur-md fixed inset-0 z-[1000] flex items-center justify-center p-6" />
          <Modal.Container className="fixed inset-0 z-[1001] flex items-center justify-center p-6 pointer-events-none">
            <Modal.Dialog className="bg-[#0b0f19] border border-[rgba(255,255,255,0.08)] rounded-2xl text-[#f8fafc] w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl pointer-events-auto">
              <Modal.Header className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.05)]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-mono">Telegram Contact</span>
                  <Modal.Heading className="text-xl font-bold text-[#f8fafc] mt-1">Connect on Telegram</Modal.Heading>
                </div>
                <Modal.CloseTrigger className="hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.12)] p-2 rounded-lg text-[#f8fafc] transition-colors cursor-pointer border-none bg-transparent close-modal-btn">
                  <FaTimes aria-hidden="true" />
                </Modal.CloseTrigger>
              </Modal.Header>
              <Modal.Body className="p-6 flex flex-col items-center gap-6 text-center">
                <div className="telegram-qr-container">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://t.me/vanhongVH"
                    alt="Telegram Contact QR Code"
                    className="telegram-qr-image"
                  />
                </div>
                <div className="telegram-qr-info">
                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    Scan this QR code with your phone camera or Telegram scanner to contact me directly.
                  </p>
                  <strong className="text-base text-[#00d5e8] font-mono mt-2 block">@vanhongVH</strong>
                </div>
                <div className="telegram-qr-actions w-full flex gap-3">
                  <a
                    href="https://t.me/vanhongVH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="telegram-direct-link-btn"
                  >
                    Open Telegram App
                  </a>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal>
      )}
    </section>
  );
}
