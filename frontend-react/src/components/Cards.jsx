import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

// ResponsiveCard giữ nguyên
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
        <Box sx={{ display: "flex", gap: 2 }}>
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

// ProductCard với rating động
function ProductCard({ image, title, price, rating = 0 }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <StarIcon key={i} sx={{ fontSize: "1.1rem", color: "#FFD700" }} />
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(
          <StarHalfIcon key={i} sx={{ fontSize: "1.1rem", color: "#FFD700" }} />
        );
      } else {
        stars.push(
          <StarOutlineIcon
            key={i}
            sx={{ fontSize: "1.1rem", color: "#ACACAC" }}
          />
        );
      }
    }
    return stars;
  };

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

        <div className="-flexRow">
          <div className="-flexColumn">
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#4A4A4A",
                mb: 1,
                marginBottom: "2.5px",
              }}
            >
              ${price}
            </Typography>

            <Box sx={{ display: "flex", gap: "3px", mb: 2 }}>
              {renderStars()}
            </Box>
          </div>

          <Button
            sx={{
              backgroundColor: "#EDA415",
              minWidth: 40,
              height: 40,
              marginLeft: "auto",
              marginRight: "5px",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "rgba(237, 165, 21, 0.85) ",
              },
            }}
          >
            <ShoppingCartIcon sx={{ color: "white" }} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { ResponsiveCard, ProductCard };
