import React, { useEffect, useState } from "react";
import { slides } from "../assets/temporaryData/sliderData";
import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export default function SliderHero() {
    const [index, setIndex] = useState(0);
    // Auto slide mỗi 5 giây
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);
    const current = slides[index];

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "50px 100px",
                boxSizing: "border-box"
            }}
        >
            {/* LEFT CONTENT */}
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "48px",
                        fontWeight: 700,
                        whiteSpace: "pre-line",
                        color: "#1B5A7D",
                        mb: 3
                    }}
                >
                    {current.title}
                </Typography>
                {/* BUTTONS */}
                <Box sx={{ display: "flex", gap: "20px", mb: 5 }}>
                    <Link
                        to="/list"
                    >
                        <Button
                            sx={{
                                backgroundColor: "#EDA415",
                                color: "white",
                                fontSize: "18px",
                                borderRadius: "20px",
                                padding: "10px 30px",
                                fontFamily: "Poppins",
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#d59512" }
                            }}
                        >
                            Shop now
                        </Button>
                    </Link>

                    <Button
                        sx={{
                            border: "2px solid #316887",
                            color: "#316887",
                            fontSize: "18px",
                            borderRadius: "20px",
                            padding: "10px 30px",
                            fontFamily: "Poppins",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#e9eef3" }
                        }}
                    >
                        View more
                    </Button>
                </Box>

                {/* DOTS */}
                <Box sx={{ display: "flex", gap: "12px", marginLeft: "125px" }}>
                    {slides.map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => setIndex(i)}
                            sx={{
                                width: 14,
                                height: 14,
                                bgcolor: i === index ? "#EDA415" : "white",
                                borderRadius: "50%",
                                border: "1.5px solid #ADADAD",
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* RIGHT IMAGE */}
            <Box sx={{ position: "relative" }}>
                <img
                    src={current.image}
                    alt=""
                    style={{ width: "500px", height: "500px" }}
                />

                {/* PRICE CIRCLE */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#EDA415",
                        borderRadius: "50%",
                        width: 120,
                        height: 120,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: "20px"
                    }}
                >
                    only <br /> {current.price}
                </Box>
            </Box>
        </Box>
    );
}
