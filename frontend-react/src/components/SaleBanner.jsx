import React from 'react'
import { CustomSaleBtn } from '../components/HomeBtnGroup'
import BagsBackground from '../assets/images/Bags_background_img.png'
import { Link } from 'react-router-dom';

export default function SaleBanner() {
    return (
        <section
            style={{
                backgroundImage: `url(${BagsBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% auto",
                width: "90%",
                height: "400px",
                margin: "auto",
                marginBottom: "50px",
                borderRadius: "25px",
                paddingTop: "100px"
            }}
        >
            <div
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "875px"
                }}
            >
                <CustomSaleBtn>New bag</CustomSaleBtn>
                <span
                    style={{
                        margin: "25px 0px",
                        fontFamily: "Poppins",
                        fontWeight: "600",
                        fontSize: "2.75rem",
                        color: "#2E8FC5"
                    }}
                >
                    Sale up to 50% off
                </span>
                <Link
                    to="/list"
                >
                    <CustomSaleBtn>Shop now</CustomSaleBtn>
                </Link>
            </div>
        </section>
    )
}