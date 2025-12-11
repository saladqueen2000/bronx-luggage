import React from "react";
import { ButtonGroup, IconButton, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CustomBtn1 = styled(Button)`
  border: none;
  border-radius: 0px;
  width: 125px;
  height: 50px;
  padding: 0;
  min-width: 0;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.125);
  }
`;

const CustomBtn2 = styled(Button)`
  border: "none",
  borderRadius: "0px",
  padding: "0px",
  width: "175px",
  height: "40px",
  min-width: 0;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  "&:hover": {
    backgroundColor: "rgba(110, 110, 110, 0.13)",
  },
`;

function HeaderBtnGroup() {
  return (
    <ButtonGroup
      variant="text"
      className="headerBtnGroup"
      sx={{
        "& .MuiButtonGroup-grouped": {
          borderRight: "none !important",
          borderLeft: "none !important",
        },
      }}
    >
      <CustomBtn1 component={Link} to="/login" className="headerBtn">
        <PersonOutlineIcon className="headerBtnGroup-icon" />
        <span className="headerBtnGroup-text">Sign in</span>
      </CustomBtn1>

      <CustomBtn1 component={Link} to="/cart" className="headerBtn">
        <ShoppingCartOutlinedIcon className="headerBtnGroup-icon" />
        <span className="headerBtnGroup-text">Cart</span>
      </CustomBtn1>
    </ButtonGroup>
  );
}

function StoreBtnGroup() {
  return (
    <ButtonGroup
      variant="text"
      className="storeBtnGroup"
      sx={{
        "& .MuiButtonGroup-grouped": {
          border: "none !important",
        },
      }}
    >
      <CustomBtn2>
        <FmdGoodOutlinedIcon sx={{ fontSize: "1.25rem", color: "black" }} />
        <span className="storeBtnGroup-text">Our store</span>
      </CustomBtn2>

      <CustomBtn2>
        <LocalShippingOutlinedIcon
          sx={{ fontSize: "1.25rem", color: "black" }}
        />
        <span className="storeBtnGroup-text">Track your order</span>
      </CustomBtn2>
    </ButtonGroup>
  );
}

function ReturnBtn() {
  return (
    <Button variant="text" className="returnBtn">
      30 Days Free Return
    </Button>
  );
}

function LinkBtnGroup() {
  return (
    <ButtonGroup variant="text" className="linkBtnGroup">
      <Button variant="text" className="linkBtn">
        Home
      </Button>
      <Button variant="text" className="linkBtn">
        Products
      </Button>
      <Button variant="text" className="linkBtn">
        Feedback
      </Button>
      <Button variant="text" className="linkBtn">
        About
      </Button>
      <Button variant="text" className="linkBtn">
        Contact
      </Button>
    </ButtonGroup>
  );
}

export { HeaderBtnGroup, StoreBtnGroup, ReturnBtn, LinkBtnGroup };
