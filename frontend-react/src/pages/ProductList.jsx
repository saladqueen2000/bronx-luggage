import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SaleBanner from "../components/SaleBanner";
import Breadcrumbs from "../components/Breadcrumb";
import FilterSidebar from "../components/FilterSideBar";
import { ProductCard } from "../components/Cards";
import { Grid, Pagination, CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "../global.css";
import "../assets/style/ProductList.css";

export default function ProductList() {
  /* ---------- FILTER STATES ---------- */
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [gender, setGender] = useState(null);
  const [selectedColor, setSelectedColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);

  /* ---------- FILTER DATA ---------- */
  const [categoriesData, setCategoriesData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [sizesData, setSizesData] = useState([]);

  /* ---------- PRODUCTS ---------- */
  const [products, setProducts] = useState([]); // list render
  const [productsForCount, setProductsForCount] = useState([]); // sidebar count
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;

  /* ---------- LOAD FILTER RESOURCES ---------- */
  useEffect(() => {
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

    loadFilterResources();
  }, []);

  /* ---------- FETCH PRODUCTS (PAGINATED) ---------- */
  const fetchFilteredProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: itemsPerPage,
      };

      if (category.length) params.category_ids = category.join(",");
      if (brand.length) params.brand_ids = brand.join(",");
      if (gender !== null) params.gender = gender;
      if (selectedColor.length) params.color_ids = selectedColor.join(",");
      if (selectedSize.length) params.size_ids = selectedSize.join(",");

      const res = await axios.get("http://localhost:8000/api/products/filter", {
        params,
      });

      setProducts(res.data.data || []);
      setTotalPages(res.data.last_page || 1);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FETCH PRODUCTS FOR COUNT (NO PAGINATE) ---------- */
  const fetchProductsForCount = async () => {
    try {
      const params = {
        no_paginate: true,
      };

      if (category.length) params.category_ids = category.join(",");
      if (brand.length) params.brand_ids = brand.join(",");
      if (selectedColor.length) params.color_ids = selectedColor.join(",");
      if (selectedSize.length) params.size_ids = selectedSize.join(",");

      const res = await axios.get("http://localhost:8000/api/products/filter", {
        params,
      });

      setProductsForCount(res.data.data || []);
    } catch (err) {
      console.error("Error loading count products", err);
    }
  };

  /* ---------- RELOAD WHEN FILTER CHANGE ---------- */
  useEffect(() => {
    setPage(1);
    fetchFilteredProducts(1);
    fetchProductsForCount();
  }, [category, brand, gender, selectedColor, selectedSize]);

  /* ---------- PAGE CHANGE ---------- */
  useEffect(() => {
    fetchFilteredProducts(page);
  }, [page]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="productList">
      <Header />

      <section className="productList_list">
        <FilterSidebar
          allProducts={productsForCount}
          categories={categoriesData}
          brands={brandsData}
          colors={colorsData}
          sizes={sizesData}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          gender={gender}
          setGender={setGender}
          selectedColor={selectedColor}
          setSelectedColors={setSelectedColors}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <div className="-flexColumn">
          <Grid container spacing={5} className="productList_list_display">
            {products.map((p) => (
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
            count={totalPages}
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
