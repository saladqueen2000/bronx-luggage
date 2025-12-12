

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Backpack1 from '../assets/images/Backpack_image_1.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/style/ProductDetail.css'; // IMPORT TỆP CSS MỚI
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";




// Hằng số cho key localStorage

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // 1. Tải dữ liệu sản phẩm
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
  
  const [colors, setColors] = useState(['Red', 'Blue', 'Green', 'Black', 'White']);
  const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL', 'XXL']);
  
  
  // 1. Khởi tạo giỏ hàng trong localStorage nếu chưa có
  if(!localStorage.getItem("cart")){
  localStorage.setItem("cart", JSON.stringify([]));
  }

  // 2. Lấy dữ liệu giỏ hàng cũ từ localStorage 
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")));

  // 3. Xử lý thêm vào giỏ hàng
  //-tạo biến trạng thái
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
    //-xử lý validate và thêm vào giỏ hàng
  
  
    const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select size.');
      return;
    }
    if (!selectedColor) {
      alert('Please select color.');
      return;
    }
    
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.image,
    };
  
    setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(i => i.id === item.id && i.color === item.color && i.size === item.size);
        if (existingItemIndex > -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity += quantity;
            return updatedCart;
        }
        return [...prevCart, item];
    });

    setAdded(true);
    

    setTimeout(() => {
      setQuantity(1);
      setSelectedColor('');
      setSelectedSize('');
      setAdded(false);
    }, 3000);
  };

  const [isLiked, setIsLiked] = useState(false); 
  
  const handleLike = () => {
      setIsLiked(!isLiked); 
  };

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [cart]);


const [loggedIn,setLoggedIn]= useState(false);
const [reviewForm,setReviewForm]=useState(false);
const writeView = ()=>{
  // setLoggedIn=localStorage.getItem('login');
  setLoggedIn(true);
    if(!loggedIn){
      alert('Please Login');
      return;
      }
    setReviewForm(true);
    }





  if (!product) return <div>Loading...</div>;
  
  
  
  

  return (
    <div className="product-detail-wrapper">
      <Header />
      
      <div className="product-detail-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          Home / Category / Product
        </div>
        
        {/* MAIN ROW */}
        <div className="main-content-row">
          
          {/* LEFT: IMAGE */} 
          <div className="image-column">
            <div className="main-image-wrapper">
              <img 
                src={product.image}
                className="main-product-image"
              />
            </div>
            
            {/* Thumbnail */}
            <div className="thumbnail-container">
              {[1, 2].map((n) => (
                <div  className="thumbnail-image" key={n}>
                <img
                  src={product.image}
                  width={100}
                />
                </div>
              ))}
            </div>
          </div>
          
          {/* RIGHT: PRODUCT INFO */}
          <div className="info-column">
            <h2 className="product-title">{product.title}</h2>
            <h3 className="product-price">${product.price}</h3>
            <div className="product-reviews">
              ★★★★★ (100 reviews)
            </div>
            
            <div className="in-stock">
              <div className="availability">Availability:</div>
              <div className="availability-status">✔ In stock</div>
            </div>

            <p className="stock-alert">Hurry up! only 34 product left in stock!</p>

            
            <div className="selector-group">
              <b>Color</b>
              <div className="selector-options color-options">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    
                    className={`color-button ${selectedColor === c ? 'selected' : ''}`}
                    style={{ 
                        color: selectedColor === c ? '#fff' : '#333' 
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="selector-group">
              <b>Size</b>
              <div className="selector-options size-options">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`size-button ${selectedSize === s ? 'selected' : ''}`}
                    style={{ 
                        color: selectedSize === s ? '#fff' : '#333' 
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="selector-group">
              <b>Quantity</b>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                
                <span className="quantity-display">{quantity}</span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="action-buttons-group">
              <button onClick={handleAddToCart}
                className="btn-add-to-cart"
              >
                {added ? '✔ Added successfully' : 'Add to cart'}
              </button>
              
              <Link to="/cart">
                <button className="btn-buy-now">
                  Buy it now
                </button>
              </Link>
              
              <button onClick={handleLike}  className="like-button">
                {isLiked ? "❤️" : "🤍"} 
               </button>
            </div>

            <div className="meta-info">
              <div className="meta-item">SKU: 01133-9-9</div>
              <div className="meta-item-category">Category: @category</div>
              <div className="meta-item-share">
                Share: 
                <a href="facebook.com"><FaFacebookSquare size={24}/></a>
                <a href="instagram"><FaInstagram size={24}/></a>
                <a href="google.com"><FcGoogle size={24}/></a>
                <a href="tiktok.com"><SiTiktok size={24}/></a>
              </div>
            </div>
          </div>
        </div>
        
        {/* DESCRIPTION + REVIEW */}
        <div className="tab-section">
          <div className="tab-buttons">
            <button className="tab-button-description">Description</button>
            <button className="tab-button-review">Reviews</button>
          </div>
          
          <div className="review-box">
            <div className='customer-review'>Customer reviews</div>
            <div className='review-number'>No reviews yet.</div>
            <button className="btn-write-review" onClick={writeView}>
              Write a review
            </button>
          
          {reviewForm ? (
            <div className="review-form-container">
            <h4>Write your review</h4>
            <form className="review-form">
            <textarea placeholder="Write your review here..." />
            <button type="submit">Submit Review</button>
            </form>
            </div>
            ) : null}
           
          
          </div>
        </div>

        {/* RELATED PRODUCTS */}

        <div className="related-products-title">Related products</div>
        
        <div className="related-products-row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="related-product-item">
              <img src={Backpack1} width={210} className="related-product-image" />
              <p className="related-product-name">Product name</p>
              <p>$45.00</p>
            </div>
          ))}
        </div>

        {/* NEWSLETTER */}
        <div className="newsletter-section">
          <h2>Subscribe newsletter</h2>
          <input
            placeholder="Enter email..."
            className="newsletter-input"
          />
          <button className="newsletter-btn">
            Subscribe
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}