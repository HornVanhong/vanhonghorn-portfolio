// import { useState } from "react";

// const TELEGRAM_BOT_TOKEN = "7240003396:AAFlm6CGBo1dis_nol4i_ztNsWcuGiig3FQ";
// const TELEGRAM_CHAT_ID = "1675671782";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const text = `New Contact Message:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;

//     const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: text,
//         }),
//       });

//       const data = await res.json();
//       if (data.ok) {
//         alert("Message sent successfully!");
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         alert("Failed to send message.");
//       }
//     } catch (error) {
//       alert("Error sending message.");
//       console.error(error);
//     }
//   };

//   return (
//     <section className="contact-page">
//       <h1 className="contact-title">Contact</h1>
//       <p className="contact-intro">
//         Feel free to reach out for collaborations, opportunities, or just to
//         connect.
//       </p>

//       <div className="contact-details">
//         <p>
//           📧 Email:{" "}
//           <a href="mailto:vanhonghorn37@gmail.com">vanhonghorn37@gmail.com</a>
//         </p>
//         <p>
//           📱 Phone: <a href="tel:+85586378933">+855 86-378-933</a>
//         </p>
//         <p>📍 Location: Phnom Penh, Cambodia</p>
//       </div>

//       <form className="contact-form" onSubmit={handleSubmit}>
//         <label>
//           Name
//           <input
//             type="text"
//             name="name"
//             placeholder="Your name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Email
//           <input
//             type="email"
//             name="email"
//             placeholder="Your email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Message
//           <textarea
//             name="message"
//             placeholder="Write your message..."
//             rows={5}
//             required
//             value={formData.message}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit" className="btn-submit">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// }
import emailjs from "@emailjs/browser";
import { useState } from "react";

// Telegram Bot config
const TELEGRAM_BOT_TOKEN = "7240003396:AAFlm6CGBo1dis_nol4i_ztNsWcuGiig3FQ";
const TELEGRAM_CHAT_ID = "1675671782";

// EmailJS config
const EMAILJS_SERVICE_ID = "service_fa9ivpt";
const EMAILJS_TEMPLATE_ID = "template_bv9fzhd";
const EMAILJS_USER_ID = "9W-OPDAVBVrz81TVD";

// Sanitize input to prevent XSS
function sanitize(input: string) {
  const div = document.createElement("div");
  div.innerText = input;
  return div.innerHTML;
}

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

    if (submitting) return; // prevent double submit
    setSubmitting(true);

    // Sanitize input
    const name = sanitize(formData.name.trim());
    const email = sanitize(formData.email.trim());
    const message = sanitize(formData.message.trim());

    // Validate input
    if (!name || !email || !message) {
      alert("All fields are required.");
      setSubmitting(false);
      return;
    }

    if (name.length > 100 || email.length > 100 || message.length > 1000) {
      alert("Input is too long.");
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      setSubmitting(false);
      return;
    }

    const telegramMessage = `New Contact Message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // 1️⃣ Send message to Telegram
    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
        }),
      });

      const data = await res.json();
      if (!data.ok) {
        alert("Failed to send message to Telegram.");
        setSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Telegram Error:", error);
      alert("Error sending message to Telegram.");
      setSubmitting(false);
      return;
    }

    // 2️⃣ Send confirmation email using EmailJS
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: name,
          email: email,
          title: `Hello ${name}! Thanks for contacting us. We received your message: "${message}"`,
        },
        EMAILJS_USER_ID
      );

      alert("Message sent! Confirmation email has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(
        "Message sent to Telegram, but failed to send confirmation email. Check console for details."
      );
    }

    setSubmitting(false);
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
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
