import { Rating } from "@mui/material";

function RatingStars({ value = 0, onChange, readOnly = false }) {
  return (
    <Rating
      name="product-rating"
      value={Number(value)}
      precision={0.5}
      readOnly={readOnly}
      onChange={(e, newValue) => {
        if (onChange) onChange(newValue);
      }}
      sx={{
        fontSize: "1.5rem",
        color: "#FFD700",
      }}
    />
  );
}

export default RatingStars;
