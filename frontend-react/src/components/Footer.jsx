import React from 'react'
import '../assets/style/Footer.css'
import { FooterSearchBar } from './Searchbar.jsx'
import { FooterLogo } from './Logo.jsx'
import FooterTicker from './ScrollingTicker.jsx'
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';

export default function Footer() {
    return (
        <footer className="footer">
            <section className="footer__subscribe">
                <span
                    style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: "1.75rem",
                        marginTop: "12.5px",
                        color: "#1B5A7D"
                    }}
                >
                    Subscribe newsletter
                </span>
                <FooterSearchBar />
                <div
                    style={{
                        marginLeft: "auto",
                        marginTop: "12.5px",
                        display: "flex",
                    }}
                >
                    <HeadphonesOutlinedIcon
                        sx={{
                            fontSize: "3.25rem",
                            color: "#EDA415"
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "20px",
                            fontWeight: "bolder",
                            fontSize: "1rem",
                            color: "#606060",
                        }}
                    >
                        <span>Call us 24/7</span>
                        <span>(+84) 0817070903</span>
                    </div>
                </div>
            </section>



            <section className='footer__about'>
                <div className='footer__about-location'>
                    <FooterLogo />
                    <div
                        style={{
                            marginTop: "30px",
                            paddingBottom: "45px",
                            color: "#1B5A7D",
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            borderBottom: "3px solid #BFC8CE"
                        }}
                    >
                        285 Doi Can street, Ba Dinh ward, Ha Noi city
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "37.5px",
                            marginTop: "20px",
                        }}
                    >
                        <GoogleIcon className='footer__about-location--icons' />
                        <FacebookIcon className='footer__about-location--icons' />
                        <LocalPhoneRoundedIcon className='footer__about-location--icons' />
                    </div>
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
            </section>

            <FooterTicker />
        </footer>
    )
}