import React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled';

const CustomSaleBtn = styled(Button)(({ }) => ({
    backgroundColor: "#EDA415",
    color: "white",
    fontSize: "18px",
    fontFamily: "Poppins",
    textTransform: "none",
    borderRadius: "25px",
    padding: "10px 12.5px",
    marginLeft: "100px",
    height: "62.5px",
    width: "175px",
    "&:hover": { backgroundColor: "#d59512" },
    "@media (max-width: 768px)": {
        height: "50px",
        width: "150px",
        margin: "auto"
    },
    "@media (max-width: 426px)": {
        fontSize: "0.75rem",
        height: "33.3px",
        width: "100px"
    }
}));

export {
    CustomSaleBtn
}