
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import { Link } from 'react-router-dom';
import '../assets/style/Cart.css';



export default function Cart() {
  // Khởi tạo state từ localStorage
  const bronxData = JSON.parse(localStorage.getItem('cart'));
  const [cartItems, setCartItems] = useState(bronxData || []);
  const [subtotal, setSubtotal] = useState(0);
  const [coupon, setCoupon] = useState('');

  // Hàm tính toán tổng phụ
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Cập nhật state (cartItems) và tính lại subtotal
  const updateQuantity = (itemId, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        // Dùng itemId (id sản phẩm + color + size) để đảm bảo cập nhật đúng item
        item.id === itemId.id && item.color === itemId.color && item.size === itemId.size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Hàm xóa sản phẩm
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item =>
      !(item.id === itemId.id && item.color === itemId.color && item.size === itemId.size)
    ));
  };
  
  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setSubtotal(calculateSubtotal(cartItems));
  }, [cartItems]); 
  
  
  
  return (
    <div className='cart-page-container'>
      <Header />

      {/* 1. BREADCRUMB */}
      <div className='breadcrumb'>
        Home &gt; Cart
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className='cart-main-content'>
        
        {/* LEFT SECTION: CART TABLE */}
        <div className='cart-table-section'>
          <table className='cart-table'>
            <thead className='cart-thead'>
              <tr className='table-row-header'>
                <th className='th-product'>Product</th>
                <th className='th'>Price</th>
                <th className='th'>Quantity</th>
                <th className='th'>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.id}-${item.color}-${item.size}-${index}`} className='table-row'>
                  <td className='td-product'>
                    <img src={item.image} alt={item.name} className='product-image' />
                    <div className='product-details'>
                      <div className='product-name'>{item.title}</div> 
                      <div className='product-info'>Color: {item.color}</div>
                      <div className='product-info'>Size: {item.size}</div>
                    </div>
                  </td>
                  
                  <td className='td-price'>${item.price.toFixed(2)}</td>
                  
                  <td className='td-quantity'>
                    <div className='quantity-control'>
                    <button onClick={() => updateQuantity(item, -1)} className='qty-button'>-</button>
                      <span className='qty-display'>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item, 1)} className='qty-button'>+</button>
                    </div>
                  </td>
                  
                  <td className='td-subtotal'>
                    {(item.price * item.quantity).toFixed(2)}
                    <button onClick={() => removeItem(item)} className='remove-button'>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='action-buttons'>
            <Link to='/'><button className='continue-shopping-button'>Continue shopping</button></Link>
            <button className='clear-cart-button' onClick={clearCart} >Clear cart</button> 
          </div>
        </div>

        {/* RIGHT SECTION: CART TOTAL */}
        <div className='cart-total-section'>
          <h3 className='cart-total-header'>Cart total</h3>
          
          <div className='total-row'>
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>
          
          <div className='coupon-box'>
            <input 
              type='text' 
              placeholder='Enter coupon code' 
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className='coupon-input'
            />
            <button className='apply-button'>Apply</button>
          </div>

          <div className='country-selector'>
            <label htmlFor='country-select'>County</label>
            <select id='country-select' className='select-input'>
              <option>United States</option>
              <option>Vietnam</option>
            </select>
          </div>
          
          <div className='total-row'>
            <span>Total amount</span>
            <strong>${subtotal}</strong> 
          </div>

          <Link to='/checkout' ><button className='checkout-button'>Proceed to checkout</button></Link>
        </div>
      </div>
      <Footer /> 	
    </div>
  );
}