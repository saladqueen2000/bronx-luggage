import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "../global.css";

const API_URL = "http://localhost:8000/api/products/top-rated"; // đổi API

export default function SliderHero() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      try {
        const res = await axios.get(API_URL);

        const items = res.data;

        if (!Array.isArray(items)) {
          throw new Error("API response is not an array");
        }

        if (isMounted) {
          setSlides(items.slice(0, 5));
        }
      } catch (err) {
        console.error("Fetch slides failed:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  if (loading) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  const current = slides[index];
  if (!current) return null;

  return (
    <Box className="home__slides">
      {/* LEFT */}
      <Box>
        <Typography className="home__slides-name" sx={{ mb: 5 }}>
          {current.name}
        </Typography>

        <Box className="home__slides-btn-container" sx={{ mb: 5 }}>
          <Link to={`/list`}>
            {" "}
            {/* Link đến chi tiết sản phẩm */}
            <Button className="home__slides-btn-shop">Shop now</Button>
          </Link>
          <Link to={`/list/${current.id}`}>
            <Button className="home__slides-btn-view">View more</Button>
          </Link>
        </Box>

        <Box className="home__slides-dots-container">
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              className="home__slides-dots"
              sx={{ bgcolor: i === index ? "#EDA415" : "white" }}
            />
          ))}
        </Box>
      </Box>

      {/* RIGHT */}
      <Box sx={{ position: "relative" }}>
        <img
          src={current.gallery?.[0]?.image_url || ""}
          alt={current.name}
          className="home__slides-img"
        />

        <Box className="home__slides-price">
          Only <br /> ${current.price}!
        </Box>
      </Box>
    </Box>
  );
}
