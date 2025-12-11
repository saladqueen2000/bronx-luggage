import { Box, Typography, Checkbox, FormControlLabel, Divider, IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const FilterSection = ({ title, children, onReset }) => {
    return (
        <Box sx={{ mb: 3 }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontWeight: 600, fontFamily: "Poppins", fontSize: "1rem", color: "#003F62" }}>
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "0.85rem",
                        color: "#595959",
                        cursor: "pointer",
                    }}
                    onClick={onReset}
                >
                    Reset
                </Typography>
            </Box>

            {children}

            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};



export default function FilterSidebar() {
    const [category, setCategory] = useState("all");
    const [availability, setAvailability] = useState("");
    const [productType, setProductType] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);

    const colors = ["#E53E3E", "#F6AD55", "#ECC94B", "#48BB78", "#38B2AC", "#3182CE", "#805AD5", "#E53E96", "#9AE6B4"];

    const handleColorChange = (color) => {
        setSelectedColor(color)
    }

    const resetCategory = () => setCategory("");
    const resetAvailability = () => setAvailability("");
    const resetProductType = () => setProductType("");
    const resetBrand = () => setBrand("");
    const resetSize = () => setSize("");

    return (
        <Box className="productList_filter">
            {/* Categories */}
            <FilterSection title="Categories" onReset={resetCategory}>
                {[
                    { label: "All categories", value: "all", count: 10 },
                    { label: "Tablet", value: "tablet", count: 5 },
                    { label: "Laptop", value: "laptop", count: 5 },
                    { label: "Headphones", value: "headphones", count: 5 },
                    { label: "Console", value: "console", count: 5 },
                    { label: "other", value: "other", count: 5 },
                ].map((item) => (
                    <Box key={item.value} sx={rowStyle}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={category === item.value}
                                    onChange={() => setCategory(item.value)}
                                    icon={
                                        <Box
                                            sx={checkboxStyle}
                                        />
                                    }
                                    checkedIcon={
                                        <Box
                                            sx={checkboxStyle_checked}
                                        >
                                            <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                                        </Box>
                                    }
                                />
                            }
                            label={<Typography sx={labelStyle}>{item.label}</Typography>}
                        />

                        <Typography sx={countStyle}>{item.count}</Typography>
                    </Box>
                ))}
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability" onReset={resetAvailability}>
                {[
                    { label: "In stock", value: "in", count: 5 },
                    { label: "Out of stock", value: "out", count: 0 },
                ].map((item) => (
                    <Box key={item.value} sx={rowStyle}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={availability === item.value}
                                    onChange={() => setAvailability(item.value)}
                                    icon={
                                        <Box
                                            sx={checkboxStyle}
                                        />
                                    }
                                    checkedIcon={
                                        <Box
                                            sx={checkboxStyle_checked}
                                        >
                                            <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                                        </Box>
                                    }
                                />
                            }
                            label={<Typography sx={labelStyle}>{item.label}</Typography>}
                        />

                        <Typography sx={countStyle}>{item.count}</Typography>
                    </Box>
                ))}
            </FilterSection>

            {/* Product Type */}
            <FilterSection title="Product type" onReset={resetProductType}>
                <Box sx={rowStyle}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={productType === "smartwatch"}
                                onChange={() => setProductType("smartwatch")}
                                icon={
                                    <Box
                                        sx={checkboxStyle}
                                    />
                                }
                                checkedIcon={
                                    <Box
                                        sx={checkboxStyle_checked}
                                    >
                                        <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                                    </Box>
                                }
                            />
                        }
                        label={<Typography sx={labelStyle}>Smart-watch</Typography>}
                    />

                    <Typography sx={countStyle}>5</Typography>
                </Box>
            </FilterSection>

            {/* Brand */}
            <FilterSection title="Brand" onReset={resetBrand}>
                <Box sx={rowStyle}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={brand === "smartwatch"}
                                onChange={() => setBrand("smartwatch")}
                                icon={
                                    <Box
                                        sx={checkboxStyle}
                                    />
                                }
                                checkedIcon={
                                    <Box
                                        sx={checkboxStyle_checked}
                                    >
                                        <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                                    </Box>
                                }
                            />
                        }
                        label={<Typography sx={labelStyle}>Smart-watch</Typography>}
                    />

                    <Typography sx={countStyle}>5</Typography>
                </Box>
            </FilterSection>

            {/* Color */}
            <FilterSection title="Color" onReset={() => { }}>
                <Box sx={{ display: "flex", gap: 1.2 }}>
                    {colors.map((color, index) => (
                        <Checkbox
                            key={index}
                            checked={selectedColor === color}
                            onChange={() => handleColorChange(color)}
                            icon={
                                <CircleIcon sx={{ color, fontSize: "1rem" }} />
                            }
                            checkedIcon={
                                <CircleIcon
                                    sx={{
                                        color,
                                        fontSize: "1rem",
                                        outline: `2px solid ${color}`,
                                        borderRadius: "50%",
                                    }}
                                />
                            }
                            sx={{
                                padding: 0,
                                cursor: "pointer"
                            }}
                        />
                    )
                    )}
                </Box>
            </FilterSection>

            {/* Size */}
            <FilterSection title="Size" onReset={resetSize}>
                {[
                    { label: "M", value: "m", count: 5 },
                    { label: "S", value: "s", count: 5 },
                    { label: "X", value: "x", count: 5 },
                    { label: "XX", value: "xx", count: 5 },
                ].map((item) => (
                    <Box key={item.value} sx={rowStyle}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={size === item.value}
                                    onChange={() => setSize(item.value)}
                                    icon={
                                        <Box
                                            sx={checkboxStyle}
                                        />
                                    }
                                    checkedIcon={
                                        <Box
                                            sx={checkboxStyle_checked}
                                        >
                                            <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                                        </Box>
                                    }
                                />
                            }
                            label={<Typography sx={labelStyle}>{item.label}</Typography>}
                        />

                        <Typography sx={countStyle}>{item.count}</Typography>
                    </Box>
                ))}
            </FilterSection>
        </Box>
    );
}

/* ---------------- Styles ---------------- */

const checkboxStyle = {
    width: 28,
    height: 28,
    borderRadius: "7.5px",
    border: "none",
    backgroundColor: "#B3D4E5"
};

const checkboxStyle_checked = {
    width: 25,
    height: 25,
    borderRadius: "7.5px",
    border: "2px solid #A5A5A5",
    backgroundColor: "#3F3F3F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const labelStyle = {
    fontFamily: "Poppins",
    fontSize: "0.9rem",
    color: "black",
};

const countStyle = {
    fontFamily: "Poppins",
    fontSize: "0.9rem",
    color: "black",
};

