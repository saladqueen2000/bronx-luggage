import React from "react";
import { Grid } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SaleBanner from "../components/SaleBanner";
import SliderHero from "../components/HomeSlides";
import { ResponsiveCard, ProductCard } from "../components/Cards";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import "../global.css";
import "../assets/style/Home.css";
import axios from "axios";

export default function Home() {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const find = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      const data = response.data.slice(0, 8);
      setList(data);
    } catch (error) {
      console.error("Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    find();
  }, []);

  //Phần hiện lên trong lúc loading
  if (loading) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="home">
      <Header />
      <main className="home__content">
        <SliderHero />

        <section className="home__popular">
          <div style={{ display: "flex" }}>
            <span className="home__popular-text">Popular products</span>
          </div>

          <Grid container spacing={5} className="home__popular-list">
            <Grid item xs={12} sm={6} md={3}>
              <ResponsiveCard
                image={list[0].gallery?.[0]?.image_url ?? ""}
                title={list[0].name}
                price={list[0].price}
              />
            </Grid>
            {list.slice(1).map((p) => (
              <Grid item xs={12} sm={6} md={3} key={p.id}>
                <ProductCard
                  image={p.gallery?.[0]?.image_url ?? ""}
                  title={p.name}
                  price={p.price}
                />
              </Grid>
            ))}
          </Grid>
        </section>

        <SaleBanner />
      </main>
      <Footer />
    </div>
  );
}

//phần popular product hiện ra sản phẩm có rating cao nhất

//git add .
//git commit -m "linhtinh"
//git push
