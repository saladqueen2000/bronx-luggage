import React from "react";
import Rating from "@mui/material/Rating";

export default function RatingStars({ value, onChange, readOnly = false }) {
  return (
    <Rating
      value={value}
      onChange={(_, v) => onChange && onChange(v)}
      readOnly={readOnly}
      precision={1}
    />
  );
}
