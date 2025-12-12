import React from "react";
import RatingStars from "./RatingStars";
import "../../assets/style/Ratings.css";

export default function RatingItem({ rating }) {
  return (
    <div className="rating-item">
      <div className="rating-header">
        <div className="rating-author">
          <strong>{rating.user?.fullname || "User"}</strong>
        </div>
        <RatingStars value={rating.rating} readOnly={true} />
      </div>

      <p className="rating-comment">{rating.comment}</p>

      <span className="rating-date">
        {new Date(rating.created_at).toLocaleDateString()}
      </span>
    </div>
  );
}
