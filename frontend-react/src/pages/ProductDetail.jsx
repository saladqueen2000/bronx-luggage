import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Backpack1 from '../assets/images/Backpack_image_1.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/style/ProductDetail.css'; // IMPORT TỆP CSS MỚI
// import { FaFacebookSquare } from 'react-icons/fa';

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
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [cart]);


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
              {[1, 2, 3].map((n) => (
                <img
                  key={n}
                  src={product.image}
                  width={80}
                  className="thumbnail-image"
                />
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
            
            <p className="availability-status">
              Availability:✔ In stock
            </p>
            <p className="stock-alert">Hurry up! only 34 product left in stock!</p>

            {/* COLOR */}
            <div className="selector-group">
              <b>Color</b>
              <div className="selector-options color-options">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    // DÙNG CLASS VÀ INLINE STYLE ĐỘNG
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
                    // DÙNG CLASS VÀ INLINE STYLE ĐỘNG
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
              <button className="btn-wishlist">
                ♡
              </button>
            </div>

            <div className="meta-info">
              <div className="meta-item">SKU: 01133-9-9</div>
              <div className="meta-item category">Category: @category</div>
              <div className="meta-item share">
                Share: 
                <FaFacebookSquare size={24} style={{ marginLeft: 10, color: '#3b5998' }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* DESCRIPTION + REVIEW */}
        <div className="tab-section">
          <div className="tab-buttons">
            <button className="tab-button active">Description</button>
            <button className="tab-button">Reviews</button>
          </div>
          
          <div className="review-box">
            <h3>Customer reviews</h3>
            <p>No reviews yet.</p>
            <button className="btn-write-review">
              Write a review
            </button>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <h3 className="related-products-title">Related products</h3>
        
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