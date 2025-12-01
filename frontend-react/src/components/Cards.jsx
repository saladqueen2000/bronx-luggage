import React from 'react'
import { Card, CardContent, CardMedia, IconButton, Button, Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarIcon from "@mui/icons-material/Star";

function ResponsiveCard({ image }) {
    return (
        <Card
            sx={{
                width: 300,
                borderRadius: "20px",
                position: "relative",
                overflow: "visible",
                paddingBottom: "15px",
                border: "1px solid #B6B6B6",
            }}
        >
            {/* Icon yêu thích */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#B3D4E5",
                    width: 35,
                    height: 35,
                    "&:hover": {
                        backgroundColor: "#d6edff",
                    },
                }}
            >
                <FavoriteBorderIcon sx={{ color: "black" }} />
            </IconButton>

            {/* Product image */}
            <CardMedia
                component="img"
                image={image}
                // alt={title}
                sx={{
                    height: 180,
                    width: 200,
                    padding: "0px 50px",
                    objectFit: "contain",
                    marginTop: "20px",
                }}
            />

            <CardContent>
                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    {/* Add to cart */}
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: "#87BBD9",
                            color: "black",
                            textTransform: "none",
                            fontFamily: "Poppins",
                            borderRadius: "10px",
                            height: 45,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "#6fb2e0",
                            },
                        }}
                        endIcon={
                            <Box
                                sx={{
                                    backgroundColor: "#EDA415",
                                    borderRadius: "50%",
                                    width: 28,
                                    height: 28,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ShoppingCartIcon sx={{ fontSize: "1rem", color: "white" }} />
                            </Box>
                        }
                    >
                        Add to cart
                    </Button>

                    {/* View */}
                    <Button
                        sx={{
                            backgroundColor: "#87BBD9",
                            minWidth: 60,
                            height: 45,
                            borderRadius: "10px",
                            "&:hover": {
                                backgroundColor: "#6fb2e0",
                            },
                        }}
                    >
                        <VisibilityOutlinedIcon sx={{ color: "black" }} />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

function ProductCard({ image, title, price }) {
    return (
        <Card
            sx={{
                width: 300,
                height: 285,
                borderRadius: "20px",
                position: "relative",
                overflow: "visible",
                paddingBottom: "15px",
                border: "1px solid #B6B6B6",
            }}
        >
            {/* Icon yêu thích */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#B3D4E5",
                    width: 35,
                    height: 35,
                    "&:hover": {
                        backgroundColor: "#d6edff",
                    },
                }}
            >
                <FavoriteBorderIcon sx={{ color: "black" }} />
            </IconButton>

            {/* Product image */}
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    height: 180,
                    width: 200,
                    padding: "0px 50px",
                    objectFit: "contain",
                    marginTop: "20px",
                }}
            />

            <CardContent>
                {/* Title */}
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#003F62",
                        fontSize: "1.1rem",
                        mb: 1,
                        marginBottom: "5px"
                    }}
                >
                    {title}
                </Typography>

                {/* Price */}
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#4A4A4A",
                        mb: 1,
                        marginBottom: "2.5px"
                    }}
                >
                    ${price}
                </Typography>

                {/* Stars */}
                <Box sx={{ display: "flex", gap: "3px", mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} sx={{ fontSize: "1.1rem", color: "#ACACAC" }} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}



export {
    ResponsiveCard,
    ProductCard
}