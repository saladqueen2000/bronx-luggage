import React, { useState } from "react";
import axios from "axios";
import RatingStars from "./RatingStars";
import "../../assets/style/Ratings.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RatingForm({ productId, onSubmitted }) {
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Nếu chưa login
  if (!user) {
    return (
      <Link to="/login">
        <div className="rating-login-box">
          <button className="rating-login-btn">Sign in to review</button>
        </div>
      </Link>
    );
  }

  const submitRating = async () => {
    if (rating === 0) {
      alert("Please select a rating (1–5 stars)");
      return;
    }

    setLoading(true);

    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to submit a review");

      await axios.post(
        "http://localhost:8000/api/ratings",
        {
          product_id: productId,
          rating,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // gửi token
          },
        }
      );

      alert("Review submitted!");
      setRating(0);
      setComment("");

      if (onSubmitted) onSubmitted();
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Error submitting review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-form">
      <h4>Write a review</h4>

      <RatingStars value={rating} onChange={setRating} />

      <textarea
        className="rating-textarea"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="rating-submit-btn"
        onClick={submitRating}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
