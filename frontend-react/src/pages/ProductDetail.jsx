import React, { useState, useEffect } from 'react';
import Backpack1 from '../assets/images/Backpack_image_1.png'
import Backpack2 from '../assets/images/Backpack_image_2.png'
import Backpack3 from '../assets/images/Backpack_image_3.png';
import { useParams } from "react-router-dom";
import axios from 'axios';




export default function ProductDetail(props) {
const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
 const [selectedColor, setSelectedColor] = useState('');
 const [selectedSize, setSelectedSize] = useState('');
 const [quantity, setQuantity] = useState(1);
 const { id } = useParams();
 const [product, setProduct] = useState(null);
 const [addedToCart, setAddedToCart] = useState(false);
 const [cartItems, setCartItems] = useState([]);

 const addedToCartMessage = addedToCart ? (
   <div
     style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#4BB543",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        zIndex: 1000
     }}
   >
     Added to cart!
   </div>
 ) : null;

 useEffect(() => {  
      const fetchProduct = async () => {
      try { 
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const data = response?.data;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: "Arial", margin: "0 auto", maxWidth: "1200px" }}>
      <div style={{ padding: "15px 0" }}>
        Home / All Category / Product
      </div>

      
      <div style={{ display: "flex", gap: "40px" }}>
        
        {/* LEFT IMAGE SECTION */}
        <div style={{ width: "50%" }}>
          <img
            src={product.image}
            alt="product"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          
          <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
            <img src={product.image} width="80" />
            <img src={product.image} width="80" />
            <img src={product.image} width="80" />
          </div>
        </div>

        {/* RIGHT PRODUCT INFO */}
        <div style={{ width: "50%" }}>
          <h2>{product.title}</h2>
          <h3>${product.price}</h3>

          <p>✔️ In stock — Hurry! only 8 product left!</p>

          <form action="/add-to-cart" method="post">

          <div style={{ marginTop: "20px" }}>
            <b>Color:</b>
            <div style={{ marginTop: "10px" }}>
              {colors.map(color => (
                <button key={color} onClick={() => setSelectedColor(color)} style={{
                padding: "8px 16px",
                backgroundColor: selectedColor === color ? color.toLowerCase() : "#f0f0f0",
                color: selectedColor === color ? "white" : "#333",
                border: `2px solid ${selectedColor === "black" ? color.toLowerCase() : "#ddd"}`,
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>{color}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <b>Size:</b>
            <div style={{ marginTop: "10px" }}>
              {['S', 'M', 'L', 'XL','XXL'].map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} style={{ 
                padding: "8px 16px",
                backgroundColor: selectedSize === size ? "#333" : "#f0f0f0",
                color: selectedSize === size ? "white" : "#333",
                border: `2px solid ${selectedSize === size ? "#333" : "#ddd"}`,
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>{size}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <b>Quantity:</b>
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button> <span style={{ padding: "0 15px" }}>{quantity}</span>{" "}
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
            <button style={{ padding: "10px 20px" }} onClick={() => setAddedToCart(true)}>Add to cart</button>
            <button style={{ padding: "10px 20px" }} onClick={''} >Buy it now</button>
            <button>♡</button>
          </div>
              </form>
          <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
            <p>SKU: ZD129-99</p>
            <p>Category: Game pad, Game, Electronics</p>
            <p>Tags: game, pad, action</p>
          </div>
        </div>
      </div>

      {/* ========== DESCRIPTION & REVIEWS ========== */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <button>Description</button>
          <button>Reviews</button>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h4>Customer Reviews</h4>
          <p>No review yet.</p>
          <button>Write a review</button>
        </div>
      </div>

      {/* ========== RELATED PRODUCTS ========== */}
      <h3 style={{ marginTop: "50px" }}>Related products</h3>

      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        {/* Product 1 */}
        <div style={{ width: "200px" }}>
          <img src={Backpack1} width="200" />
          <p>Camera</p>
          <p>$55.90</p>
          <button>Add to cart</button>
        </div>

        {/* Product 2 */}
        <div style={{ width: "200px" }}>
          <img src={Backpack1} width="200" />
          <p>Headphones</p>
          <p>$35.00</p>
          <button>Add to cart</button>
        </div>

        {/* Product 3 */}
        <div style={{ width: "200px" }}>
          <img src={Backpack1} width="200" />
          <p>Play game</p>
          <p>$11.70</p>
          <button>Add to cart</button>
        </div>

        {/* Product 4 */}
        <div style={{ width: "200px" }}>
          <img src={Backpack1} width="200" />
          <p>Laptop</p>
          <p>$450.00</p>
          <button>Add to cart</button>
        </div>
      </div>

      {/* ========== NEWSLETTER ========== */}
      <div
        style={{
          marginTop: "60px",
          padding: "30px",
          background: "#f5f5f5",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3>Subscribe newsletter</h3>
        <input placeholder="Enter email..." style={{ width: "250px" }} />{" "}
        <button>Subscribe</button>
      </div>

      {/* ========== FOOTER ========== */}
      <footer style={{ marginTop: "50px", padding: "20px 0", color: "#555" }}>
        <p>© 2025 Electro Store</p>
      </footer>
    </div>
  );
}
