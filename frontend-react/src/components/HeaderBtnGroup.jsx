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
        <ButtonGroup variant='text' className='headerBtnGroup'>
            <CustomBtn1 className='headerBtn'>
                <PersonOutlineIcon className='headerBtnGroup-icon'/>
                <span className='headerBtnGroup-text'>Sign in</span>
            </CustomBtn1>

            <CustomBtn1 className='headerBtn'>
                <ShoppingCartOutlinedIcon className='headerBtnGroup-icon'/>
                <span className='headerBtnGroup-text'>Cart</span>
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
        <Button variant='text' className='returnBtn'>30 Days Free Return</Button>
    )
}

function LinkBtnGroup() {
    return (
        <ButtonGroup variant='text' className='linkBtnGroup'>
            <Button variant='text' className='linkBtn'>Home</Button>
            <Button variant='text' className='linkBtn'>Products</Button>
            <Button variant='text' className='linkBtn'>Feedback</Button>
            <Button variant='text' className='linkBtn'>About</Button>
            <Button variant='text' className='linkBtn'>Contact</Button>
        </ButtonGroup>
    )
}

export {
    HeaderBtnGroup,
    StoreBtnGroup,
    ReturnBtn,
    LinkBtnGroup
}