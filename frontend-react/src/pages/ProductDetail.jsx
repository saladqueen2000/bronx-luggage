import React from "react";
import { State,useState } from "react";
import { useEffect } from "react";
import Backpack1 from '../assets/images/Backpack_image_1.png'
import Backpack2 from '../assets/images/Backpack_image_2.png'
import Backpack3 from '../assets/images/Backpack_image_3.png';
import { useParams } from "react-router-dom";


export default function ProductDetail(props) {

  const { id } = useParams();
  const [item, setItem] = useState(null);
  
  useEffect(() => {
    const fetchData = 
    async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);  
        const data = await response.json();
        setItem(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div style={{ fontFamily: "Arial", margin: "0 auto", maxWidth: "1200px" }}>
      {/* ========== BREADCRUMB ========== */}
      <div style={{ padding: "15px 0" }}>
        Home / All Category / Product
      </div>

      {/* ========== MAIN PRODUCT AREA ========== */}
      <div style={{ display: "flex", gap: "40px" }}>
        
        {/* LEFT IMAGE SECTION */}
        <div style={{ width: "50%" }}>
          <img
            src={1}
            alt="product"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          
          <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
            <img src={Backpack3} width="80" />
            <img src={Backpack3} width="80" />
            <img src={Backpack3} width="80" />
          </div>
        </div>

        {/* RIGHT PRODUCT INFO */}
        <div style={{ width: "50%" }}>
          <h2>1</h2>
          <h3>1</h3>

          <p>✔️ In stock — Hurry! only 8 product left!</p>

          <div style={{ marginTop: "20px" }}>
            <b>Color:</b>
            <div style={{ marginTop: "10px" }}>
              <button>Red</button> <button>Blue</button> <button>Green</button>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <b>Size:</b>
            <div style={{ marginTop: "10px" }}>
              <button>XS</button> <button>S</button> <button>M</button>{" "}
              <button>L</button> <button>XL</button>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <b>Quantity:</b>
            <div style={{ marginTop: "10px" }}>
              <button>-</button> <span style={{ padding: "0 15px" }}>1</span>{" "}
              <button>+</button>
            </div>
          </div>

          <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
            <button style={{ padding: "10px 20px" }}>Add to cart</button>
            <button style={{ padding: "10px 20px" }}>Buy it now</button>
            <button>♡</button>
          </div>

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
