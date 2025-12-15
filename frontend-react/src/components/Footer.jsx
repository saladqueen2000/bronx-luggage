import React from "react";
import "../assets/style/Footer.css";
import { FooterSearchBar } from "./Searchbar.jsx";
import { FooterLogo } from "./Logo.jsx";
import FooterTicker from "./ScrollingTicker.jsx";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer__subscribe">
        <span className="footer__subscribe-text">Reach Us</span>
        <FooterSearchBar />
        <div className="footer__subscribe-contact">
          <HeadphonesOutlinedIcon className="footer__subscribe-icon" />
          <div className="footer__subscribe-number">
            <span>Call us 24/7</span>
            <span>(+84) 0817070903</span>
          </div>
        </div>
      </section>

      <section className="footer__about">
        <div className="footer__about-location">
          <FooterLogo />
          <div className="footer__about-location-text">
            285 Doi Can street, Ba Dinh ward, Ha Noi city
          </div>
          {/* <div className="footer__about-icon-container">
            <GoogleIcon className="footer__about-location--icons" />
            <FacebookIcon className="footer__about-location--icons" />
            <LocalPhoneRoundedIcon className="footer__about-location--icons" />
          </div> */}
        </div>

        <div className="footer-list">
          <h3>Find product</h3>
          <ul>
            <li>Bronze arnold</li>
            <li>Chronograph blue</li>
            <li>Smart phones</li>
            <li>Automatic watch</li>
            <li>Hair straighteners</li>
          </ul>
        </div>

        <div className="footer-list">
          <h3>Get help</h3>
          <ul>
            <li>About us</li>
            <li>Contact us</li>
            <li>Return policy</li>
            <li>Privacy policy</li>
            <li>Payment policy</li>
          </ul>
        </div>

        <div className="footer-list">
          <h3>About us</h3>
          <ul>
            <li>News</li>
            <li>Service</li>
            <li>Our policy</li>
            <li>Customer care</li>
            <li>Faq's</li>
          </ul>
        </div>

        <div className="footer-list">
          <h3>Company</h3>
          <ul>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Customer Service</li>
          </ul>
        </div>
      </section>

      <FooterTicker />
    </footer>
  );
}
