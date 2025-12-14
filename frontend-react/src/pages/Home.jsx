import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SaleBanner from "../components/SaleBanner";
import SliderHero from "../components/HomeSlides";
import { ProductCard } from "../components/Cards";

import "../global.css";
import "../assets/style/Home.css";

const API_URL = "http://localhost:8000/api/products/top-rated";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);

        if (!Array.isArray(res.data)) {
          throw new Error("Invalid API response format");
        }

        if (isMounted) setProducts(res.data.slice(0, 8));
      } catch (err) {
        console.error("Fetch products failed:", err);
        if (isMounted) setError("Không thể tải danh sách sản phẩm");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div className="loadingStyle">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="home">
      <Header />

      <main className="home__content">
        <SliderHero />

        <section className="home__popular">
          <div className="home__popular-header">
            <span className="home__popular-text">Top Rated Products</span>
          </div>

          {products.length > 0 ? (
            <Grid container spacing={5} className="home__popular-list">
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard
                    image={product.gallery?.[0]?.image_url || ""}
                    title={product.name}
                    price={product.price}
                    rating={product.ratings_avg_rating || 0}
                    onClick={() => navigate(`/list/${product.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>Không có sản phẩm nào</p>
          )}
        </section>

        <SaleBanner />
      </main>

      <Footer />
    </div>
  );
}
