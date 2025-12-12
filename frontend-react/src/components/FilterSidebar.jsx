import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const FilterSection = ({ title, children, onReset }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontFamily: "Poppins",
            fontSize: "1rem",
            color: "#003F62",
          }}
        >
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
  const [gendered, setGendered] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [selectedColor, setSelectedColor] = useState([]);
  const [open, setOpen] = useState(false);

  const colors = [
    "#E53E3E",
    "#F6AD55",
    "#ECC94B",
    "#48BB78",
    "#38B2AC",
    "#3182CE",
    "#805AD5",
    "#E53E96",
    "#9AE6B4",
  ];
  //Xử lý khi đổi màu
  const handleColorChange = (color) => {
    setSelectedColor(
      (prev) =>
        prev.includes(color)
          ? prev.filter((c) => c !== color) // Nếu có rồi → bỏ
          : [...prev, color] // Nếu chưa có → thêm
    );
  };

  //Xử lý khi đổi các mục
  const resetCategory = () => setCategory("");
  const resetGendered = () => setGendered("");
  const resetProductType = () => setProductType("");
  const resetBrand = () => setBrand("");
  const resetSize = () => setSize("");

  //Responsive cho mobile
  const isMobile = useMediaQuery("(max-width:700px)", { noSsr: true });
  const FilterContent = (
    <Box
      className="productList_filter"
      sx={{ width: isMobile ? 260 : "auto", p: 2 }}
    >
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
                  icon={<Box sx={checkboxStyle} />}
                  checkedIcon={
                    <Box sx={checkboxStyle_checked}>
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

      {/* Gender */}
      <FilterSection title="Gender" onReset={resetGendered}>
        {[
          { label: "For men", value: "men", count: 5 },
          { label: "For women", value: "women", count: 0 },
        ].map((item) => (
          <Box key={item.value} sx={rowStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gendered === item.value}
                  onChange={() => setGendered(item.value)}
                  icon={<Box sx={checkboxStyle} />}
                  checkedIcon={
                    <Box sx={checkboxStyle_checked}>
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
                icon={<Box sx={checkboxStyle} />}
                checkedIcon={
                  <Box sx={checkboxStyle_checked}>
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
                icon={<Box sx={checkboxStyle} />}
                checkedIcon={
                  <Box sx={checkboxStyle_checked}>
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
      <FilterSection title="Color" onReset={() => {}}>
        <Box sx={{ display: "flex", gap: 1.2 }}>
          {colors.map((color, index) => (
            <Checkbox
              key={index}
              checked={selectedColor.includes(color)}
              onChange={() => handleColorChange(color)}
              icon={<CircleIcon sx={{ color, fontSize: "1rem" }} />}
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
                cursor: "pointer",
              }}
            />
          ))}
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
                  icon={<Box sx={checkboxStyle} />}
                  checkedIcon={
                    <Box sx={checkboxStyle_checked}>
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

  return (
    <>
      {/* Mobile btn */}
      {isMobile && !open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "fixed",
            top: 75,
            left: 15,
            zIndex: 2000,
            backgroundColor: "white",
            boxShadow: 2,
          }}
        >
          <FilterAltOutlinedIcon />
        </IconButton>
      )}

      {/* MOBILE DRAWER */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {FilterContent}
      </Drawer>

      {/* DESKTOP SIDEBAR */}
      {!isMobile && <Box>{FilterContent}</Box>}
    </>
  );
}

/* ---------------- Styles ---------------- */

const checkboxStyle = {
  width: 28,
  height: 28,
  borderRadius: "7.5px",
  border: "none",
  backgroundColor: "#B3D4E5",
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
};

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
