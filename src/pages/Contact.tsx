import { useState } from "react";

const TELEGRAM_BOT_TOKEN = "7240003396:AAFlm6CGBo1dis_nol4i_ztNsWcuGiig3FQ";
const TELEGRAM_CHAT_ID = "1675671782";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const text = `New Contact Message:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Error sending message.");
      console.error(error);
    }
  };

  return (
    <section className="contact-page">
      <h1 className="contact-title">Contact</h1>
      <p className="contact-intro">
        Feel free to reach out for collaborations, opportunities, or just to
        connect.
      </p>

      <div className="contact-details">
        <p>
          📧 Email:{" "}
          <a href="mailto:vanhonghorn37@gmail.com">vanhonghorn37@gmail.com</a>
        </p>
        <p>
          📱 Phone: <a href="tel:+85586378933">+855 86-378-933</a>
        </p>
        <p>📍 Location: Phnom Penh, Cambodia</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn-submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
