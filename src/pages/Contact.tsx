export default function Contact() {
  return (
    <section className="contact-page">
      <h1 className="contact-title">Contact</h1>
      <p className="contact-intro">
        Feel free to reach out for collaborations, opportunities, or just to
        connect.
      </p>

      {/* Contact Details */}
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

      {/* Contact Form */}
      <form className="contact-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="Your email" required />
        </label>
        <label>
          Message
          <textarea
            name="message"
            placeholder="Write your message..."
            rows={5}
            required
          />
        </label>
        <button type="submit" className="btn-submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
