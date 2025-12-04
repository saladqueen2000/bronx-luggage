

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Backpack1 from '../assets/images/Backpack_image_1.png';
import Header from '../components/Header';
import Footer from '../components/Footer';



export default function ProductDetail() {

  {/* SAMPLE DATA */}
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  {/* HANDLE SELECTORS */}
  const [added, setAdded] = useState(false);
  const handleAddToCart = () => {
    
    const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    color: selectedColor,
    size: selectedSize,
    quantity: quantity,
    image: product.image,
  };
 if ( !selectedSize) {
    alert("Please select  size.");
    return;
  }
  if (!selectedColor ) {
    alert("Please select color.");
    return;
  }
  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 3000); 
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));
};

  {/* FETCH PRODUCT DATA */}

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;



  

  return (
    <div style={{ fontFamily: "Arial", background: "#ffffff" }}>
      <Header />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: "14px", color: "#888", marginBottom: "15px" }}>
          Home / Category / Product
        </div>

        {/* MAIN ROW */}
        <div style={{ display: "flex", gap: "40px" }}>

          {/* LEFT: IMAGE */} 
          <div style={{ width: "50%" }}>
            <div style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #eee"
            }}>
              <img src={product.image}
                style={{ width: "100%", background: "#fff" }}
              />
            </div>

            {/* Thumbnail */}
            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              {[1, 2, 3].map((n) => (
                <img
                  key={n}
                  src={product.image}
                  width="80"
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px",
                    borderRadius: "8px",
                    background: "#fff",
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div style={{ width: "50%" }}>

            <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>{product.title}</h2>

            <div style={{ color: "#ffb400", fontSize: "18px", margin: "5px 0" }}>
              ★★★★★ (100 reviews)
            </div>

            <h3 style={{ fontSize: "28px", color: "#2b4eff" }}>${product.price}</h3>
            <p style={{ color: "#25a244", fontWeight: "bold" }}>
              ✔ In stock — Hurry! only 8 left!
            </p>

            {/* COLOR */}
            
            <div style={{ marginTop: "25px" }}>
              <b>Color</b>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      background: selectedColor === c ? "#2b4eff" : "#f8f8f8",
                      color: selectedColor === c ? "#fff" : "#333",
                      cursor: "pointer"
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div style={{ marginTop: "25px" }}>
              <b>Size</b>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      background: selectedSize === s ? "#333" : "#f8f8f8",
                      color: selectedSize === s ? "#fff" : "#333",
                      cursor: "pointer"
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div style={{ marginTop: "25px" }}>
              <b>Quantity</b>
              <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  style={{
                    width: "35px", height: "35px",
                    border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer"
                  }}
                >
                  -
                </button>

                <span style={{ fontSize: "18px" }}>{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "35px", height: "35px",
                    border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer"
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{ marginTop: "35px", display: "flex", gap: "15px" }}>
              <button onClick={handleAddToCart}
              style={{
                padding: "12px 22px",
                background: "#2b4eff",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold"
              }}>
                 {added ? "✔ Added successfully" : "Add to cart"}
              </button>

              <button style={{
                padding: "12px 22px",
                background: "#ffb300",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold"
              }}>
                Buy it now
              </button>

              <button style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                cursor: "pointer"
              }}>
                ♡
              </button>
            </div>

            <div style={{ marginTop: "25px", fontSize: "14px", color: "#777" }}>
              <p>SKU: ZD129-99</p>
              <p>Category: Game pad, Game, Electronics</p>
              <p>Tags: game, pad, action</p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION + REVIEW */}
        <div style={{ marginTop: "60px" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <button style={{ padding: "10px 20px", background: "#2b4eff", color: "#fff", borderRadius: "6px" }}>Description</button>
            <button style={{ padding: "10px 20px", background: "#eee", borderRadius: "6px" }}>Reviews</button>
          </div>

          <div style={{
            marginTop: "25px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px"
          }}>
            <h3>Customer reviews</h3>
            <p>No reviews yet.</p>
            <button style={{
              padding: "10px 20px",
              background: "#2b4eff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}>
              Write a review
            </button>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <h3 style={{ marginTop: "50px", fontSize: "22px" }}>Related products</h3>

        <div style={{ display: "flex", gap: "25px", marginTop: "20px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: "210px", textAlign: "center" }}>
              <img src={Backpack1} width="210" style={{ borderRadius: "10px" }} />
              <p style={{ fontWeight: "bold" }}>Product name</p>
              <p>$45.00</p>
              <button style={{
                padding: "8px 15px",
                background: "#2b4eff",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}>
                Add to cart
              </button>
            </div>
          ))}
        </div>

        {/* NEWSLETTER */}
        <div style={{
          marginTop: "60px",
          padding: "40px",
          background: "#e9f0ff",
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <h2>Subscribe newsletter</h2>
          <input
            placeholder="Enter email..."
            style={{
              padding: "12px 15px",
              width: "280px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          />
          <button style={{
            padding: "12px 22px",
            background: "#ffb300",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            Subscribe
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}

