import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

/* ---------- CUSTOM BUTTON ---------- */
const CustomBtn = styled(Button)`
  border: none;
  border-radius: 0;
  width: 150px;
  height: 56px;
  padding: 0;
  min-width: 0;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 255, 255, 0.125);
  }

  /* Mobile dropdown width */
  &.dropdown-btn {
    width: 100px;
  }
`;

/* ---------- HEADER BUTTON GROUP ---------- */
function HeaderBtnGroup() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isDesktop = useMediaQuery("(min-width:650px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <ButtonGroup
        variant="text"
        className="headerBtnGroup"
        sx={{
          "& .MuiButton-root": { color: "#fff" },
          "& .MuiButtonGroup-grouped": { border: "none" },
        }}
      >
        {/* ---------- MOBILE (<650px) ---------- */}
        {!isDesktop && (
          <CustomBtn
            className="dropdown-btn"
            aria-controls={open ? "dropdown-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PersonOutlineIcon />
            <ShoppingCartOutlinedIcon />
          </CustomBtn>
        )}

        {/* ---------- DESKTOP (>=650px) ---------- */}
        {isDesktop && (
          <>
            {user ? (
              <CustomBtn onClick={handleLogout}>
                {user.fullname} <br /> Sign out
              </CustomBtn>
            ) : (
              <CustomBtn component={Link} to="/login">
                Sign in
              </CustomBtn>
            )}

            <CustomBtn component={Link} to="/cart">
              Cart
            </CustomBtn>
          </>
        )}
      </ButtonGroup>

      {/* ---------- MOBILE DROPDOWN ---------- */}
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {user ? (
          <MenuItem onClick={handleLogout}>Sign out ({user.fullname})</MenuItem>
        ) : (
          <MenuItem component={Link} to="/login" onClick={handleClose}>
            Sign in
          </MenuItem>
        )}

        <MenuItem component={Link} to="/cart" onClick={handleClose}>
          Cart
        </MenuItem>
      </Menu>
    </>
  );
}

/* ---------- STORE BUTTON GROUP ---------- */
function StoreBtnGroup() {
  return (
    <ButtonGroup
      variant="text"
      className="storeBtnGroup"
      sx={{
        "& .MuiButton-root": { color: "#fff" },
        "& .MuiButtonGroup-grouped": { border: "none" },
      }}
    />
  );
}

/* ---------- LINK BUTTON GROUP ---------- */
function LinkBtnGroup() {
  return (
    <ButtonGroup variant="text" className="linkBtnGroup">
      <Button className="linkBtn" component={Link} to="/">
        Home
      </Button>
      <Button className="linkBtn" component={Link} to="/list">
        Products
      </Button>
      <Button className="linkBtn" component={Link} to="/feedback">
        Feedback
      </Button>
      <Button className="linkBtn" component={Link} to="/about">
        About
      </Button>
      <Button className="linkBtn" component={Link} to="/contact-us">
        Contact
      </Button>
    </ButtonGroup>
  );
}

export { HeaderBtnGroup, StoreBtnGroup, LinkBtnGroup };
