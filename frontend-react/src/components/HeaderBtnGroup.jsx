import React from 'react'
import { ButtonGroup, IconButton, Button } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



const CustomBtn1 = styled(IconButton)(({ }) => ({
    border: "none",
    borderRadius: "0px",
    width: "125px",
    height: "50px",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.125)"
    },
}));

const CustomBtn2 = styled(IconButton)(({ }) => ({
    border: "none",
    borderRadius: "0px",
    width: "175px",
    height: "40px",
    "&:hover": {
        backgroundColor: "rgba(110, 110, 110, 0.13)"
    },
}));

function HeaderBtnGroup() {
    const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length);
  }, [cartLength]);

    return (
        <ButtonGroup
            variant='text'
            sx={{
                marginLeft: "auto",
                marginRight: "40px",
            }}
        >
            <CustomBtn1>
                <PersonOutlineIcon sx={{ fontSize: "1.75rem", color: "white", }} />
                <span
                    style={{
                        marginLeft: "10px",
                        fontSize: "1.25rem",
                        fontWeight: "lighter",
                        color: "white",
                    }}
                >
                    Sign in</span>
            </CustomBtn1>

            <CustomBtn1>
                <Link to="/cart" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: "1.75rem", color: "white", }} />
                <div
                    style={{
                        marginLeft: "10px",
                        fontSize: "1.25rem",
                        fontWeight: "lighter",
                        color: "white",
                    }}
                >
                    ({cartLength}) Cart </div>
                </Link>
            </CustomBtn1>
        </ButtonGroup>
    );
}

function StoreBtnGroup() {
    return (
        <ButtonGroup
            variant='text'
            sx={{
                marginLeft: "auto",
                marginRight: "40px",
            }}
        >
            <CustomBtn2>
                <FmdGoodOutlinedIcon sx={{ fontSize: "1.25rem", color: "black" }} />
                <span
                    style={{
                        marginLeft: "7.5px",
                        fontSize: "1rem",
                        color: "black",
                        fontFamily: "Poppins"
                    }}
                >
                    Our store</span>
            </CustomBtn2>

            <CustomBtn2>
                <LocalShippingOutlinedIcon sx={{ fontSize: "1.25rem", color: "black" }} />
                <span
                    style={{
                        marginLeft: "7.5px",
                        fontSize: "1rem",
                        color: "black",
                        fontFamily: "Poppins"
                    }}
                >
                    Track your order</span>
            </CustomBtn2>
        </ButtonGroup>
    )
}

function ReturnBtn() {
    return (
        <Button
            variant='text'
            sx={{
                marginLeft: "auto",
                marginRight: "40px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#003F62",
                fontFamily: "Poppins"
            }}
        >
            30 Days Free Return
        </Button>
    )
}

export {
    HeaderBtnGroup,
    StoreBtnGroup,
    ReturnBtn
}