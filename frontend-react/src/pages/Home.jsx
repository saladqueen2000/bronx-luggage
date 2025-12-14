import React, { useEffect, useState, useRef } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SaleBanner from "../components/SaleBanner";
import SliderHero from "../components/HomeSlides";
import { ProductCard } from "../components/Cards";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "../global.css";
import "../assets/style/Home.css";

const NORMAL_SPEED = 3000;
const FAST_SPEED = 400;

const API_URL = "http://localhost:8000/api/products/top-rated";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const swiperRef = useRef(null);
  const rafRef = useRef(null);
  const navigate = useNavigate();

  /* =====================
     FETCH PRODUCTS
  ====================== */
  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);
        if (!Array.isArray(res.data)) throw new Error("Invalid API");

        if (mounted) setProducts(res.data.slice(0, 8));
      } catch {
        if (mounted) setError("Can't load product list");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* =====================
     RENDER STATES
  ====================== */
  if (loading) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="loadingStyle">
        <p>{error}</p>
      </div>
    );
  }

  /* =====================
     RENDER UI
  ====================== */
  return (
    <div className="home">
      <Header />

      <main className="home__content">
        <SliderHero />

        <section className="home__popular">
          <div className="home__popular-header">
            <span className="home__popular-text">Top Rated Products</span>
          </div>

          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={{ enabled: true, momentum: false }}
            loop={true}
            speed={3000} // QUAN TRỌNG
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            allowTouchMove={true}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="home__popular-slide">
                  <ProductCard
                    image={product.gallery?.[0]?.image_url || ""}
                    title={product.name}
                    price={product.price}
                    rating={product.ratings_avg_rating || 0}
                    onClick={() => navigate(`/list/${product.id}`)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <SaleBanner />
      </main>

      <Footer />
    </div>
  );
}
