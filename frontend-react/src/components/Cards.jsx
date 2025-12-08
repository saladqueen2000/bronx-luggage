import React from 'react'
import { Card, CardContent, CardMedia, Button, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarIcon from "@mui/icons-material/Star";

function ResponsiveCard({ image }) {
    
    return (
        <Card
            sx={{
                width: 300,
                height: 285,
                borderRadius: "30px",
                position: "relative",
                overflow: "visible",
                paddingBottom: "15px",
                border: "1px solid #B6B6B6",
            }}
        >
            {/* Product image */}
            <CardMedia
                component="img"
                image={image}
                sx={{
                    height: 180,
                    width: 260,
                    margin: "0px 20px",
                    marginTop: "20px",
                    borderRadius: "10px",
                    "&:hover": {
                        opacity: "0.9",
                        cursor: "pointer",
                    },
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
                height: 300,
                borderRadius: "20px",
                position: "relative",
                overflow: "visible",
                paddingBottom: "15px",
                border: "1px solid #B6B6B6",
            }}
        >

            {/* Product image */}
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    height: 180,
                    width: 260,
                    margin: "0px 20px",
                    marginTop: "20px",
                    borderRadius: "10px",
                    "&:hover": {
                        opacity: "0.9",
                        cursor: "pointer",
                    },
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
                        marginBottom: "5px",
                        cursor: "pointer",
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