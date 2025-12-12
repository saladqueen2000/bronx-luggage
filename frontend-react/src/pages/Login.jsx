import React, { useState } from "react";
import "../assets/style/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";     // <--- thêm dòng này

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();                   // <--- thêm hook này
  const { loading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form login đã chạy!!!");

    const result = await dispatch(loginUser({ email, password }));
    console.log("Kết quả login:", result);

    // Nếu login thành công, Redux Toolkit sẽ trả "fulfilled"
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Login OK → Redirect sang Home");

      navigate("/");                        // <--- redirect sang home
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to continue shopping</p>

        <form className="login-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="btn-login" disabled={loading}>
            {loading ? "Processing..." : "Sign in"}
          </button>
        </form>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

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
