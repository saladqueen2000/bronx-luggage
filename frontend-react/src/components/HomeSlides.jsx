import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import '../global.css';
import axios from "axios"

export default function SliderHero() {
    const [slides, setSlides] = useState([]);
    const [index, setIndex] = useState(0);

    const fetchSlides = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/products");
            const data = res.data.slice(0, 3); // lấy 3 sản phẩm đầu
            setSlides(data);
        } catch (err) {
            console.error("API Error:", err);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const current = slides[index];

    useEffect(() => {
        if (slides.length === 0) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides]);

    if (!current) {
        return (
            <div className='loadingStyle'>
                <CircularProgress />
            </div>
        );
    }

    return (
        <Box className='home__slides'>
            {/* LEFT CONTENT */}
            <Box>
                <Typography className="home__slides-name" sx={{ mb: 3 }}>
                    {current?.name}
                </Typography>
                {/* BUTTONS */}
                <Box className="home__slides-btn-container" sx={{ mb: 5 }}>
                    <Link to="/list">
                        <Button className="home__slides-btn-shop" sx={{ "&:hover": { backgroundColor: "#d59512" }}}>
                            Shop now
                        </Button>
                    </Link>

                    <Button className="home__slides-btn-view" sx={{ "&:hover": { backgroundColor: "#e9eef3" }}}>
                        View more
                    </Button>
                </Box>

                {/* DOTS */}
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

            {/* RIGHT IMAGE */}
            <Box sx={{ position: "relative" }}>
                <img
                    src={current?.gallery?.[0]?.image_url ?? ""}
                    alt=""
                    className="home__slides-img"
                />

                {/* PRICE CIRCLE */}
                <Box className="home__slides-price">
                    Only <br /> ${current.price}!
                </Box>
            </Box>
        </Box>
    );
}
