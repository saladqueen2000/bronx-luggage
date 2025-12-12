import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import RatingStars from "./RatingStars";
import "../../assets/style/Ratings.css";

export default function RatingForm({ productId, onSubmitted }) {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="rating-login-box">
        <button className="rating-login-btn">Sign in to review</button>
      </div>
    );
  }

  const submitRating = async () => {
    if (rating === 0) return alert("Please select a rating (1–5 stars)");

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/ratings", {
        user_id: user.id,
        product_id: productId,
        rating,
        comment,
      });

      alert("Review submitted!");
      setComment("");
      setRating(0);

      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error submitting review");
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
