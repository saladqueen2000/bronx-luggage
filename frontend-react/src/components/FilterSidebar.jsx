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

/* ---------- Section ---------- */
const FilterSection = ({ title, children, onReset }) => {
  return (
    <Box sx={{ mb: 3 }}>
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

/* ---------- Main ---------- */
export default function FilterSidebar({
  categories = [],
  brands = [],
  colors = [],
  sizes = [],
  allProducts,
  category,
  setCategory,
  brand,
  setBrand,
  gender,
  setGender,
  selectedColor,
  setSelectedColors,
  selectedSize,
  setSelectedSize,
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)", { noSsr: true });

  const safeProducts = allProducts || [];
  /* ---------- Counts ---------- */
  const maleCount = safeProducts.filter((p) => String(p.gender) === "1").length;
  const femaleCount = safeProducts.filter(
    (p) => String(p.gender) === "0"
  ).length;

  /* ---------- Handlers ---------- */
  const handleColorChange = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSizeChange = (id) => {
    setSelectedSize((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const resetCategory = () => setCategory([]);
  const resetBrand = () => setBrand([]);
  const resetGender = () => setGender(null);

  /* ---------- Content ---------- */
  const FilterContent = (
    <Box
      className="productList_filter"
      sx={{ width: isMobile ? 280 : 320, p: 2 }}
    >
      {/* Categories */}
      <FilterSection title="Categories" onReset={resetCategory}>
        {categories.map((item) => (
          <Box key={item.id} sx={rowStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={category.includes(item.id)}
                  onChange={() =>
                    setCategory((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((c) => c !== item.id)
                        : [...prev, item.id]
                    )
                  }
                  icon={<Box sx={checkboxStyle} />}
                  checkedIcon={
                    <Box sx={checkboxStyle_checked}>
                      <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                    </Box>
                  }
                />
              }
              label={<Typography sx={labelStyle}>{item.name}</Typography>}
            />
            <Typography sx={countStyle}>
              {item.products?.length ?? 0}
            </Typography>
          </Box>
        ))}
      </FilterSection>

      {/* Gender */}
      <FilterSection title="Gender" onReset={resetGender}>
        {[
          { label: "For men", value: "1", count: maleCount },
          { label: "For women", value: "0", count: femaleCount },
        ].map((item) => (
          <Box key={item.value} sx={rowStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender === item.value}
                  onChange={() =>
                    setGender((prev) =>
                      prev === item.value ? null : item.value
                    )
                  }
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

      {/* Brand */}
      <FilterSection title="Brand" onReset={resetBrand}>
        {brands.map((item) => (
          <Box key={item.id} sx={rowStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={brand.includes(item.id)}
                  onChange={() =>
                    setBrand((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((b) => b !== item.id)
                        : [...prev, item.id]
                    )
                  }
                  icon={<Box sx={checkboxStyle} />}
                  checkedIcon={
                    <Box sx={checkboxStyle_checked}>
                      <CheckIcon sx={{ color: "white", fontSize: "1rem" }} />
                    </Box>
                  }
                />
              }
              label={<Typography sx={labelStyle}>{item.name}</Typography>}
            />
            <Typography sx={countStyle}>
              {item.products?.length ?? 0}
            </Typography>
          </Box>
        ))}
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color" onReset={() => setSelectedColors([])}>
        <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
          {colors.map((item) => (
            <Checkbox
              key={item.id}
              checked={selectedColor.includes(item.id)}
              onChange={() => handleColorChange(item.id)}
              icon={
                <CircleIcon
                  sx={{ color: item.hex ?? "#ccc", fontSize: "1rem" }}
                />
              }
              checkedIcon={
                <CircleIcon
                  sx={{
                    color: item.hex ?? "#ccc",
                    fontSize: "1rem",
                    outline: `2px solid ${item.hex ?? "#ccc"}`,
                    borderRadius: "50%",
                  }}
                />
              }
              sx={{ padding: 0 }}
            />
          ))}
        </Box>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size" onReset={() => setSelectedSize([])}>
        {sizes.map((item) => (
          <Box key={item.id} sx={rowStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSize.includes(item.id)}
                  onChange={() => handleSizeChange(item.id)}
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
            <Typography sx={countStyle}>{item.count ?? 0}</Typography>
          </Box>
        ))}
      </FilterSection>
    </Box>
  );

  /* ---------- Render ---------- */
  return (
    <>
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

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        ModalProps={{ disableScrollLock: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {FilterContent}
      </Drawer>

      {!isMobile && <Box>{FilterContent}</Box>}
    </>
  );
}

/* ---------- Styles ---------- */
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
