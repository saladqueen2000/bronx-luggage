import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/ContactUs.css";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(""); // thông báo nhỏ dạng toast
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setToast("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setToast("Something went wrong!");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 3000); // toast tự ẩn sau 3s
    }
  };

  return (
    <div className="contact-wrapper">
      <button
        className="btn-back-home"
        onClick={() => navigate("/")}
        aria-label="Back to Home"
      >
        ←
      </button>
      <div className="contact-card">
        {/* LEFT INFO */}
        <div className="contact-info">
          <div className="brand">Bronx Luggage</div>
          <h1>Contact Us</h1>
          <p className="muted">
            Have questions or need help? Reach out to us — we’re always happy to
            hear from you.
          </p>
          <ul>
            <li>📍 Bronx Luggage, New York</li>
            <li>📞 +1 (212) 555-0199</li>
            <li>✉️ support@bronxluggage.com</li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form">
          <div className="form-header">
            <h2>Send us a message</h2>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="label">Message</label>
              <textarea
                className="textarea"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="actions">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              <button
                type="reset"
                className="btn ghost"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="toast">
          <div className="toast-inner">{toast}</div>
        </div>
      )}
    </div>
  );
}
