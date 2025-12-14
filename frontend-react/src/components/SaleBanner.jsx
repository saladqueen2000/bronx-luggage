import React from "react";
import { CustomSaleBtn } from "../components/HomeBtnGroup";
import BagsBackground from "../assets/images/Bags_background_img.png";
import { Link } from "react-router-dom";

export default function SaleBanner() {
  return (
    <section
      className="home__sale-container"
      style={{
        backgroundImage: `url(${BagsBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% auto",
      }}
    >
      <div className="home__sale-content">
        <span className="home__sale-text">Sale up to 50% off</span>
        <Link to="/list" className="shopBtnLink">
          <CustomSaleBtn>Shop now</CustomSaleBtn>
        </Link>
      </div>
    </section>
  );
}
