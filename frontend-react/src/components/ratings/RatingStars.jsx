import { Rating } from "@mui/material";

function RatingStars({ value }) {
  return (
    <Rating
      name="product-rating"
      value={Number(value)}
      precision={0.5}
      readOnly
      sx={{
        fontSize: "1.3rem",
        color: "#FFD700",
      }}
    />
  );
}

export default RatingStars;
