import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import "../assets/style/ProductDetail.css";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import RatingList from "../components/ratings/RatingList";
import RatingForm from "../components/ratings/RatingForm";
import RatingStars from "../components/ratings/RatingStars";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // CART
  const [cart, setCart] = useState(() => {
    const cookieCart = Cookies.get("cart");
    return cookieCart ? JSON.parse(cookieCart) : [];
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingProduct(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("ERROR FETCH PRODUCT:", err);
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [id]);

  // INCREASE VIEW COUNT
  useEffect(() => {
    if (!product) return;

    axios
      .post(`http://localhost:8000/api/products/${product.id}/increase-view`)
      .catch((err) => console.log("ERROR INCREASE VIEW:", err));
  }, [product?.id]);

  // FETCH RELATED
  useEffect(() => {
    if (!product) return;

    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/${product.id}/related`
        );
        setRelated(res.data);
      } catch (err) {
        console.log("ERROR FETCH RELATED:", err);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();
  }, [product?.id]);

  // SET MAIN IMAGE
  useEffect(() => {
    if (product?.gallery?.length > 0) {
      setMainImage(product.gallery[0].image_url);
    }
  }, [product]);

  // SAVE CART TO COOKIE
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, [cart]);

  // ADD TO CART
  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select size.");
    if (!selectedColor) return alert("Please select color.");

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize.label,
      quantity: quantity,
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

  // LOADING UI
  if (loadingProduct) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="pd-wrapper">
      <Header />

      <div className="pd-container">
        <Breadcrumb />

        {/* MAIN ROW */}
        <div className="pd-main-row">
          {/* LEFT IMAGE */}
          <div className="pd-left">
            <div className="pd-main-image-box">
              <img src={mainImage} className="pd-main-image" alt="" />
            </div>

            {/* GALLERY */}
            <div className="pd-thumb-grid">
              {product.gallery?.map((img) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  className={`pd-thumb ${
                    mainImage === img.image_url ? "active" : ""
                  }`}
                  onClick={() => setMainImage(img.image_url)}
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="pd-right">
            <h2 className="pd-title">{product.name}</h2>

            <RatingStars value={product.rating} readOnly={true} />

            <div className="pd-price">${product.price}</div>

            <div className="pd-meta">
              <p>
                <b>Availability: </b>
                {product.quantity > 0 ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ✔ In stock
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Out of stock
                  </span>
                )}
              </p>

              <div className="pd-stock-warning">
                {product.quantity > 0 ? (
                  <p className="pd-hurry">
                    Hurry up! Only {product.quantity} products left in stock!
                  </p>
                ) : (
                  <p className="pd-out">Out of stock</p>
                )}
              </div>

              <div className="pd-divider"></div>
            </div>

            {/* COLOR */}
            <div className="pd-section">
              <label className="pd-label">Color</label>
              <div className="pd-options">
                {product.colors?.map((c) => {
                  const isSelected = selectedColor?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      className={`pd-color-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        backgroundColor: isSelected ? c.name : "transparent",
                        color: isSelected ? "#fff" : "#333",
                        borderColor: c.name,
                      }}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZE */}
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

            {/* BUTTONS */}
            <div className="pd-buttons">
              <button className="pd-add-btn" onClick={handleAddToCart}>
                {added ? "Added Successfully" : "Add to cart"}
              </button>

              <Link to="/cart">
                <button className="pd-buy-btn">Buy it now</button>
              </Link>
            </div>
            <div className="pd-divider"></div>
            <div className="pd-views">
              <p>
                <b>Views:</b> {product.views} views
              </p>
              <p>
                <b>Category:</b> {product.category?.name}
              </p>
              <p>
                <b>Brand:</b> {product.brand?.name}
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
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

        {/* TAB CONTENT */}
        <div className="pd-tab-content">
          {activeTab === "description" && (
            <div>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="pd-review-section">
              <RatingList productId={product.id} />
              <RatingForm productId={product.id} />
            </div>
          )}
        </div>

        {/* RELATED */}
        <h3 className="pd-related-title">Related products</h3>

        {loadingRelated ? (
          <div className="loadingStyle">
            <CircularProgress />
          </div>
        ) : (
          <div className="pd-related-row">
            {related.map((p) => (
              <Link to={`/list/${p.id}`} key={p.id} className="pd-related-card">
                <img
                  src={p.gallery?.[0]?.image_url}
                  className="pd-related-img"
                  alt={p.name}
                />
                <p className="pd-related-name">{p.name}</p>
                <p className="pd-related-price">${p.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
