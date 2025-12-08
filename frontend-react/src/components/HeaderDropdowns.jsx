import React from 'react'
import { FormControl, Select, MenuItem, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function CategoriesDropdown() {
    const [cat, setCat] = React.useState('');
    const handleChange = (event) => {
        setCat(event.target.value);
    };
    return (
        <FormControl variant="standard" sx={{ width: 250 }}>
            <Select
                value={cat}
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                disableUnderline
                sx={{
                    border: "none",
                    borderRadius: "0px",
                    width: "237.5px",
                    height: "70px",
                    marginLeft: "40px",
                    padding: "10px 20px",
                    backgroundColor: "#EDA415",
                    color: "white",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    "& .MuiSelect-icon": {
                        color: "white",
                        right: 10,
                    },
                    "&:hover": {
                        backgroundColor: "rgba(209, 144, 23, 1.125)",
                    },
                }}
                renderValue={(selected) => {
                    if (!selected) {
                        return <span style={{ color: "white" }}>Browse categories</span>;
                    }
                    return selected;
                }}
            >
                <MenuItem value="Category 1">Category 1</MenuItem>
                <MenuItem value="Category 2">Category 2</MenuItem>
                <MenuItem value="Category 3">Category 3</MenuItem>
            </Select>
        </FormControl>
    );
}

function DropdownGroup() {
    const [home, setHome] = React.useState('');
    const handleChange1 = (event) => {
        setHome(event.target.value);
    };
    const [ctl, setCtl] = React.useState('');
    const handleChange2 = (event) => {
        setCtl(event.target.value);
    };
    const [page, setPage] = React.useState('');
    const handleChange3 = (event) => {
        setPage(event.target.value);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {/* Dropdown cho Home */}
            <FormControl variant="standard" sx={{ width: 175 }}>
                <Select
                    value={home}
                    onChange={handleChange1}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    disableUnderline
                    sx={{
                        border: "none",
                        borderRadius: "0px",
                        width: "150px",
                        height: "70px",
                        marginLeft: "40px",
                        padding: "10px 20px",
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        "& .MuiSelect-icon": {
                            color: "black",
                            right: 10,
                        },
                        "&:hover": {
                            backgroundColor: "rgba(244, 244, 244, 1.5)",
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span style={{ color: "black" }}>Home</span>;
                        }
                        return selected;
                    }}
                >
                    <MenuItem value="Home 1">Home 1</MenuItem>
                    <MenuItem value="Home 2">Home 2</MenuItem>
                    <MenuItem value="Home 3">Home 3</MenuItem>
                </Select>
            </FormControl>

            {/* Dropdown cho catalog */}
            <FormControl variant="standard" sx={{ width: 175 }}>
                <Select
                    value={ctl}
                    onChange={handleChange2}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    disableUnderline
                    sx={{
                        border: "none",
                        borderRadius: "0px",
                        width: "150px",
                        height: "70px",
                        marginLeft: "12.5px",
                        padding: "10px 20px",
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        "& .MuiSelect-icon": {
                            color: "black",
                            right: 10,
                        },
                        "&:hover": {
                            backgroundColor: "rgba(244, 244, 244, 1.5)",
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span style={{ color: "black" }}>Catalog</span>;
                        }
                        return selected;
                    }}
                >
                    <MenuItem value="Catalog 1">Catalog 1</MenuItem>
                    <MenuItem value="Catalog 2">Catalog 2</MenuItem>
                    <MenuItem value="Catalog 3">Catalog 3</MenuItem>
                </Select>
            </FormControl>

            {/* Button cho blog */}
            <Button
                variant="text"
                sx={{
                    width: "100px",
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textTransform: "none",
                }}
            >
                Blog</Button>

            {/* Dropdown cho pages */}
            <FormControl variant="standard" sx={{ width: 175 }}>
                <Select
                    value={page}
                    onChange={handleChange3}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    disableUnderline
                    sx={{
                        border: "none",
                        borderRadius: "0px",
                        width: "150px",
                        height: "70px",
                        marginLeft: "12.5px",
                        padding: "10px 20px",
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        "& .MuiSelect-icon": {
                            color: "black",
                            right: 10,
                        },
                        "&:hover": {
                            backgroundColor: "rgba(244, 244, 244, 1.5)",
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span style={{ color: "black" }}>Pages</span>;
                        }
                        return selected;
                    }}
                >
                    <MenuItem value="Pages 1">Pages 1</MenuItem>
                    <MenuItem value="Pages 2">Pages 2</MenuItem>
                    <MenuItem value="Pages 3">Pages 3</MenuItem>
                </Select>
            </FormControl>

            {/* Button cho About us */}
            <Button
                variant="text"
                sx={{
                    width: "100px",
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textTransform: "none",
                }}
            >
                About us</Button>
        </div>
    )
}


export {
    CategoriesDropdown,
    DropdownGroup
}