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
import RatingStars from "../components/ratings/RatingStars";

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

function ProductCard({ image, title, price, rating = 0, onClick }) {
  return (
    <Card
      onClick={onClick} // thêm sự kiện click
      sx={{
        width: 300,
        height: 300,
        borderRadius: "20px",
        position: "relative",
        overflow: "visible",
        paddingBottom: "15px",
        border: "1px solid #B6B6B6",
        cursor: "pointer", // hover giống link
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
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

            <Box sx={{ display: "flex", mb: 2 }}>
              <RatingStars value={Number(rating)} />
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
                backgroundColor: "rgba(237, 165, 21, 0.85)",
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
