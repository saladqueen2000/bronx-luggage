import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/Feedback.css";

export default function Feedback() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please enter your feedback message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSending(true);

    try {
      // Call API here
      // await fetch('/api/feedback', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      await new Promise((res) => setTimeout(res, 900));

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Sending failed — please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="feedback-page">
      {/* Back to Home mũi tên */}
      <button
        className="btn-back-home"
        onClick={() => navigate("/")}
        aria-label="Back to Home"
      >
        ←
      </button>

      <div className="feedback-card">
        <div className="left-visual">
          <div className="brand">Bronx-Luggage</div>
          <h1>Share your feedback</h1>
          <p className="muted">Help us improve your shopping experience.</p>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h2>Feedback</h2>
            <p className="muted">
              Only takes a few minutes — we appreciate all feedback.
            </p>
          </div>

          <label className="field">
            <span className="label">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input"
              required
            />
          </label>

          <label className="field">
            <span className="label">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input"
              required
            />
          </label>

          <label className="field">
            <span className="label">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              placeholder="Describe your experience, issues encountered, or suggestions for improvement..."
              className="textarea"
              required
            />
          </label>

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button type="submit" className="btn primary" disabled={sending}>
              {sending ? "Sending..." : "Send feedback"}
            </button>

            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setForm({ name: "", email: "", message: "" });
                setError(null);
              }}
            >
              Cancel
            </button>
          </div>

          <div className="note muted">
            We are committed to protecting your information.
          </div>
        </form>
      </div>

      {sent && (
        <div className="toast" role="status">
          <div className="toast-inner">
            <strong>Sent!</strong>
            <p>Thank you — we have received your feedback.</p>
            <button className="btn small" onClick={() => setSent(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
