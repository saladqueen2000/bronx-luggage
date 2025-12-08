import React from "react";
import "../assets/style/Login.css";


export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to continue shopping</p>

        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="btn-login">Sign in</button>
        </form>

        <div className="login-other">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button className="google">Google</button>
          <button className="facebook">Facebook</button>
        </div>

        <p className="signup">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>

      <div className="login-banner">
        <h1>Shop the Best Deals</h1>
        <p>Join our marketplace and discover amazing products</p>
      </div>
    </div>
  );
}
