import React from 'react'
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material'
import styled from '@emotion/styled';

const CustomToggleBtn = styled(ToggleButton)(({ }) => ({
    width: "125px",
    height: "50px",
    color: "#1B5A7D",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "1rem",
    textTransform: "none",
}));

function CatBtnGroup() {
    const [type, setType] = React.useState('');
    const handleType = (e, newType) => {
        setType(newType)
    };

    return (
        <ToggleButtonGroup
            value={type}
            onChange={handleType}
            exclusive
            className='home__popular-btn-group'
            sx={{
                "& .MuiToggleButton-root": {
                    borderRadius: "25px !important",   // ép bo tất cả các góc
                    border: "2px solid #B5B5B5",
                },
                "& .MuiToggleButton-root.Mui-hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.5)"
                },
                "& .MuiToggleButton-root.Mui-selected": {
                    borderColor: "#003F62",
                    color: "#1B5A7D",
                    backgroundColor: "transparent"
                },
            }}
        >
            <CustomToggleBtn value="bags">
                Bags
            </CustomToggleBtn>
            <CustomToggleBtn value="Backpacks">
                Backpacks
            </CustomToggleBtn>
            <CustomToggleBtn value="Luggages">
                Luggages
            </CustomToggleBtn>
        </ToggleButtonGroup>
    )
}

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
    "&:hover": { backgroundColor: "#d59512" }
}));




export {
    CatBtnGroup,
    CustomSaleBtn
}