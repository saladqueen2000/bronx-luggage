import React, { useState, useEffect } from "react";
import "../assets/style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"; // import Cookie

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((s) => s.auth);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // JS check confirm password
    if (password.trim() !== passwordConfirm.trim()) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Lấy guest token từ cookie (nếu có)
    const guestToken = Cookies.get("guest_token");

    // Dispatch lên slice, gửi thêm guest token trong meta
    dispatch(
      registerUser(
        { fullname, email, password, passwordConfirm },
        { headers: guestToken ? { "X-Guest-Token": guestToken } : {} }
      )
    );
  };

  // Redirect sau khi register thành công
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join us and start shopping today</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button className="btn-register" disabled={loading}>
            {loading ? "Processing..." : "Sign up"}
          </button>
        </form>

        {success && (
          <p style={{ color: "green", textAlign: "center" }}>
            {success} – Redirecting...
          </p>
        )}

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <div className="register-banner">
        <h1>Start Your Journey</h1>
        <p>Create an account and access thousands of exclusive deals</p>
      </div>
    </div>
  );
}
