import React, { useEffect, useState } from "react";
import axios from "axios";
import RatingItem from "./RatingItem";
import "../../assets/style/Ratings.css";

export default function RatingList({ productId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/${productId}/ratings`
        );
        setRatings(res.data);
      } catch (err) {
        console.log("ERROR LOADING RATINGS:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [productId]);

  if (loading) return <div>Loading ratings...</div>;

  return (
    <div className="rating-list">
      {ratings.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        ratings.map((r) => <RatingItem key={r.id} rating={r} />)
      )}
    </div>
  );
}
