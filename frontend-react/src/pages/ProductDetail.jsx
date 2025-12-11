import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import "../assets/style/ProductDetail.css";
import { ImageList, ImageListItem } from "@mui/material";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState("");

  // NEW: TAB STATE
  const [activeTab, setActiveTab] = useState("description");

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("ERROR FETCH PRODUCT:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // SET MAIN IMAGE
  useEffect(() => {
    if (product?.gallery?.length > 0) {
      setMainImage(product.gallery[0].image_url);
    }
  }, [product]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, [cart]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select size.");
      return;
    }
    if (!selectedColor) {
      alert("Please select color.");
      return;
    }

    const item = {
      id: product.id,
      title: product.name,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize.label,
      quantity,
      image: mainImage,
    };

    setCart((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );

      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }

      return [...prev, item];
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="pd-wrapper">
      <Header />

      <div className="pd-container">
        <Breadcrumb />

        {/* MAIN PRODUCT SECTION */}
        <div className="pd-main-row">
          {/* LEFT IMAGE COLUMN */}
          <div className="pd-left">
            <div className="pd-main-image-box">
              <img src={mainImage} className="pd-main-image" />
            </div>

            <ImageList
              cols={4}
              rowHeight={80}
              gap={10}
              className="pd-thumb-list"
            >
              {product.gallery?.map((img) => (
                <ImageListItem key={img.id}>
                  <img
                    src={img.image_url}
                    className={`pd-thumb ${
                      mainImage === img.image_url ? "active" : ""
                    }`}
                    onClick={() => setMainImage(img.image_url)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          {/* RIGHT INFO COLUMN */}
          <div className="pd-right">
            <h2 className="pd-title">{product.name}</h2>

            <div className="pd-price">${product.price}</div>

            <div className="pd-meta">
              <p>
                <b>Availability:</b> In stock
              </p>
              <p>
                <b>SKU:</b> {product.sku || "N/A"}
              </p>
              <p>
                <b>Category:</b> {product.category?.name}
              </p>
              <p>
                <b>Brand:</b> {product.brand?.name}
              </p>
            </div>

            {/* COLOR SELECTOR */}
            <div className="pd-section">
              <label className="pd-label">Color</label>
              <div className="pd-options">
                {product.colors?.map((c) => (
                  <button
                    key={c.id}
                    className={`pd-color-btn ${
                      selectedColor?.id === c.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div className="pd-section">
              <label className="pd-label">Size</label>
              <div className="pd-options">
                {product.sizes?.map((s) => (
                  <button
                    key={s.id}
                    className={`pd-size-btn ${
                      selectedSize?.id === s.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="pd-section">
              <label className="pd-label">Quantity</label>
              <div className="pd-qty-box">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pd-buttons">
              <button className="pd-add-btn" onClick={handleAddToCart}>
                {added ? "Added Successfully" : "Add to cart"}
              </button>

              <Link to="/cart">
                <button className="pd-buy-btn">Buy it now</button>
              </Link>

              <button className="pd-wishlist-btn">♡</button>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* NEW TAB TOGGLE SECTION   */}
        {/* ========================= */}

        <div className="pd-tabs">
          <button
            className={`pd-tab-btn ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          <button
            className={`pd-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        <div className="pd-tab-content">
          {activeTab === "description" && (
            <div>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <p>No reviews yet</p>
              <button className="pd-review-btn">Write a review</button>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        <h3 className="pd-related-title">Related products</h3>

        <div className="pd-related-row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pd-related-card">
              <img src={mainImage} className="pd-related-img" />
              <p className="pd-related-name">{product.name}</p>
              <p className="pd-related-price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
