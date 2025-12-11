import React, { useState } from "react";
import "../assets/style/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

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
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Create a password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="btn-register" disabled={loading}>
            {loading ? "Processing..." : "Sign up"}
          </button>
        </form>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

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
