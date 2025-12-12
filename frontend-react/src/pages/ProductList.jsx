import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SaleBanner from "../components/SaleBanner";
import FilterSidebar from "../components/FilterSidebar";
import { ProductCard } from "../components/Cards";
import { Grid, Pagination } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import "../global.css";
import "../assets/style/ProductList.css";

export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // FILTER STATES
  const [category, setCategory] = React.useState(null);
  const [brand, setBrand] = React.useState(null);
  const [colors, setColors] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // DATA FOR FILTER SIDEBAR
  const [categoriesData, setCategoriesData] = React.useState([]);
  const [brandsData, setBrandsData] = React.useState([]);
  const [colorsData, setColorsData] = React.useState([]);
  const [sizesData, setSizesData] = React.useState([]);

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 12;

  // LOAD FILTER RESOURCES (categories, brands, colors, sizes)
  const loadFilterResources = async () => {
    try {
      const [c, b, cl, s] = await Promise.all([
        axios.get("http://localhost:8000/api/categories"),
        axios.get("http://localhost:8000/api/brands"),
        axios.get("http://localhost:8000/api/colors"),
        axios.get("http://localhost:8000/api/sizes"),
      ]);

      setCategoriesData(c.data);
      setBrandsData(b.data);
      setColorsData(cl.data);
      setSizesData(s.data);
    } catch (err) {
      console.error("Failed loading filter data", err);
    }
  };

  // FETCH PRODUCTS WITH FILTER
  const fetchFilteredProducts = async () => {
    setLoading(true);

    try {
      const params = {};

      if (category) params.category_id = category;
      if (brand) params.brand_id = brand;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;
      if (colors.length > 0) params.color_ids = colors;
      if (sizes.length > 0) params.size_ids = sizes;

      const res = await axios.get("http://localhost:8000/api/products/filter", {
        params,
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD FILTER RESOURCES + LOAD PRODUCT LIST
  React.useEffect(() => {
    loadFilterResources();
    fetchFilteredProducts();
  }, []);

  // REFRESH WHEN FILTER CHANGES
  React.useEffect(() => {
    fetchFilteredProducts();
    setPage(1);
  }, [category, brand, colors, sizes, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="productList">
      <Header />

      <section className="productList_list">
        <FilterSidebar
          categories={categoriesData}
          brands={brandsData}
          colors={colorsData}
          sizes={sizesData}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          colorsSelected={colors}
          setColorsSelected={setColors}
          sizesSelected={sizes}
          setSizesSelected={setSizes}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="-flexColumn">
          <Grid container spacing={5} className="productList_list_display">
            {currentItems.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Link
                  to={`/list/${p.id}`}
                  className="productList-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ProductCard
                    image={p.gallery?.[0]?.image_url ?? ""}
                    title={p.name}
                    price={p.price}
                    rating={p.rating}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
            showFirstButton
            showLastButton
            className="pagination"
          />
        </div>
      </section>

      <SaleBanner />
      <Footer />
    </div>
  );
}
