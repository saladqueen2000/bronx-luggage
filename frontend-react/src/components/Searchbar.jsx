import React, { useState, useEffect } from "react";
import "@fontsource/roboto/400.css";
import { TextField, Button, Autocomplete } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function HeaderSearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Gọi API search khi input thay đổi
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (inputValue.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/search",
          {
            params: { keyword: inputValue },
          }
        );
        // Lấy tối đa 8 gợi ý
        setSuggestions(
          response.data.slice(0, 8).map((p) => ({
            name: p.name,
            id: p.id,
          }))
        );
      } catch (error) {
        console.error(
          "Error fetching search:",
          error.response?.data || error.message
        );
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <div className="headerSearchBar-container">
      <Autocomplete
        freeSolo
        disablePortal
        options={suggestions}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        onChange={(event, selectedOption) => {
          if (selectedOption?.id) {
            navigate(`/list/${selectedOption.id}`);
          }
        }}
        className="headerSearchBar-textfield"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search any things"
            className="headerSearchBar-textfield"
            autoComplete="off"
          />
        )}
      />
    </div>
  );
}

function FooterSearchBar() {
  return (
    <Button
      component={Link}
      to="/contact-us"
      className="footerSearchBar"
      endIcon={<SendIcon />}
      sx={{
        width: "500px",
        height: "70px",
        borderRadius: "22.5px",

        backgroundColor: "#EDA415", // ⭐ BẮT BUỘC
        color: "#fff",

        textTransform: "none",
        justifyContent: "space-between",
        padding: "0 25px",
        fontSize: "1rem",
        fontWeight: 500,

        "& svg": {
          color: "#fff",
          fontSize: "1.4rem",
        },

        "&:hover": {
          backgroundColor: "#e19a0f",
        },
      }}
    >
      Contact us
    </Button>
  );
}

export { HeaderSearchBar, FooterSearchBar };
