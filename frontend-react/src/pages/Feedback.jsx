import React from "react";
import "../assets/style/Feedback.css";
import Footer from "../components/Footer";

export default function Feedback() {
  return (
    <div>
   
      <div className="feedback-container">
        <div className="feedback-card">
          <h2 className="feedback-title">We Value Your Feedback</h2>
          <p className="feedback-sub">
            Tell us what you think about our service
          </p>

          <form className="feedback-form">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Feedback subject" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message..." rows="5"></textarea>
            </div>

            <button className="btn-send">Send Feedback</button>
          </form>
        </div>

        <div className="feedback-banner">
          <h1>Your Voice Matters</h1>
          <p>Help us improve our platform and services</p>
        </div>
      </div>
    
    </div>
  );
}
