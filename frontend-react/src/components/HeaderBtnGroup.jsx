import React from 'react'
import { ButtonGroup, IconButton, Button } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import styled from '@emotion/styled';

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
    padding: "0px",
    width: "175px",
    height: "40px",
    "&:hover": {
        backgroundColor: "rgba(110, 110, 110, 0.13)"
    },
}));

function HeaderBtnGroup() {
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
                <ShoppingCartOutlinedIcon sx={{ fontSize: "1.75rem", color: "white", }} />
                <span
                    style={{
                        marginLeft: "10px",
                        fontSize: "1.25rem",
                        fontWeight: "lighter",
                        color: "white",
                    }}
                >
                    Cart</span>
            </CustomBtn1>
        </ButtonGroup>
    );
}

function StoreBtnGroup() {
    return (
        <ButtonGroup variant='text' className='storeBtnGroup'>
            <CustomBtn2>
                <FmdGoodOutlinedIcon sx={{ fontSize: "1.25rem", color: "black" }} />
                <span className='storeBtnGroup-text'>Our store</span>
            </CustomBtn2>

            <CustomBtn2>
                <LocalShippingOutlinedIcon sx={{ fontSize: "1.25rem", color: "black" }} />
                <span className='storeBtnGroup-text'>Track your order</span>
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

function LinkBtnGroup() {
    return (
        <ButtonGroup variant='text' className='linkBtnGroup'>
            <Button variant='text' className='linkBtn'>Home</Button>
            <Button variant='text' className='linkBtn'>Products</Button>
            <Button variant='text' className='linkBtn'>Feedback</Button>
            <Button variant='text' className='linkBtn'>About us</Button>
            <Button variant='text' className='linkBtn'>Contact us</Button>
        </ButtonGroup>
    )
}

export {
    HeaderBtnGroup,
    StoreBtnGroup,
    ReturnBtn,
    LinkBtnGroup
}