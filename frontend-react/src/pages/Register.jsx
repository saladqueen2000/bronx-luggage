import React from "react";
import "../assets/style/Register.css";

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join us and start shopping today</p>

        <form className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter your password" />
          </div>

          <button className="btn-register">Sign up</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>

      <div className="register-banner">
        <h1>Start Your Journey</h1>
        <p>Create an account and access thousands of exclusive deals</p>
      </div>
    </div>
  );
}
