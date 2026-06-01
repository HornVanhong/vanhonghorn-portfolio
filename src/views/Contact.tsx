"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
} from "react-icons/fa";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);

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

      alert("Message sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-header">
        <span className="contact-kicker">Available for opportunities</span>
        <h1 className="contact-title">Contact</h1>
        <p className="contact-intro">
          Reach out for internships, collaborations, or project discussions.
        </p>
      </div>

      <div className="contact-layout">
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
          </div>

          <div className="contact-note">
            <span className="contact-note-label">Response</span>
            <p>
              I usually reply with project context, availability, and next steps
              after reading your message.
            </p>
          </div>
        </aside>

        <form className="contact-form contact-form-modern" onSubmit={handleSubmit}>
          <div className="contact-form-head">
            <span className="contact-form-label">
              <FaPaperPlane aria-hidden="true" />
              Send a message
            </span>
            <p>
              Keep it short or detailed. I’ll review it on my side and respond as
              soon as possible.
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
              rows={7}
              required
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
