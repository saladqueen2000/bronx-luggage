import React, { useState } from "react";
import "../assets/style/Feedback.css";

const Rating = ({ value, onChange }) => {
  return (
    <div className="rating" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={"star " + (n <= value ? "on" : "off")}
          onClick={() => onChange(n)}
          aria-checked={n === value}
          role="radio"
          title={`${n} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Vui lòng nhập tên.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "Vui lòng nhập email hợp lệ.";
    if (!form.message.trim()) return "Vui lòng nhập nội dung phản hồi.";
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
      // Thay bằng API endpoint thật của bạn nếu có
      // await fetch('/api/feedback', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, rating }) });
      await new Promise((res) => setTimeout(res, 900));

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setRating(0);
    } catch (err) {
      console.error(err);
      setError("Gửi thất bại — thử lại sau.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <div className="left-visual">
          <div className="brand">Electon</div>
          <h1>Chia sẻ cảm nhận của bạn</h1>
          <p className="muted">Giúp chúng tôi cải thiện trải nghiệm mua sắm.</p>
          <div className="hero-image" aria-hidden />
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h2>Phản hồi</h2>
            <p className="muted">Chỉ mất vài phút — chúng tôi trân trọng mọi góp ý.</p>
          </div>

          <label className="field">
            <span className="label">Tên</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
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
            <span className="label">Đánh giá</span>
            <Rating value={rating} onChange={setRating} />
          </label>

          <label className="field">
            <span className="label">Nội dung</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              placeholder="Mô tả trải nghiệm, lỗi gặp phải hoặc gợi ý cải thiện..."
              className="textarea"
              required
            />
          </label>

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button type="submit" className="btn primary" disabled={sending}>
              {sending ? "Đang gửi..." : "Gửi phản hồi"}
            </button>

            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setForm({ name: "", email: "", message: "" });
                setRating(0);
                setError(null);
              }}
            >
              Hủy
            </button>
          </div>

          <div className="note muted">Chúng tôi cam kết bảo mật thông tin của bạn.</div>
        </form>
      </div>

      {sent && (
        <div className="toast" role="status">
          <div className="toast-inner">
            <strong>Đã gửi!</strong>
            <p>Cảm ơn bạn — chúng tôi đã nhận được phản hồi.</p>
            <button className="btn small" onClick={() => setSent(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
