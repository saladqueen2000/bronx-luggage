// pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CartPage() {
   
  return (
    <div>
      <Header />
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px',
        minHeight: '60vh'
      }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>
          Giỏ hàng của bạn ({getTotalItems()} sản phẩm)
        </h1>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Danh sách sản phẩm */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            {cartItems.map(item => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  borderBottom: '1px solid #eee',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
                    {item.title}
                  </h3>
                  
                  {item.selectedColor && (
                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                      Màu: {item.selectedColor}
                    </p>
                  )}
                  
                  {item.selectedSize && (
                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                      Size: {item.selectedSize}
                    </p>
                  )}
                  
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    color: '#e44d26',
                    margin: '10px 0'
                  }}>
                    ${item.price}
                  </p>
                </div>
                
                {/* Quantity controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid #ddd',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    -
                  </button>
                  
                  <span style={{ 
                    minWidth: '40px', 
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid #ddd',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    +
                  </button>
                </div>
                
                {/* Total price for this item */}
                <div style={{ 
                  minWidth: '100px', 
                  textAlign: 'right',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '8px',
                    backgroundColor: 'transparent',
                    color: '#e74c3c',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
            
            {/* Clear cart button */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={clearCart}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Xóa toàn bộ giỏ hàng
              </button>
            </div>
          </div>
          
          {/* Order summary */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{
              padding: '25px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              position: 'sticky',
              top: '20px'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>
                Tóm tắt đơn hàng
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      fontSize: '14px',
                      color: '#666'
                    }}
                  >
                    <span>
                      {item.title} x{item.quantity}
                    </span>
                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                borderTop: '2px solid #ddd', 
                paddingTop: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '16px'
                }}>
                  <span>Tạm tính:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '16px'
                }}>
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#e44d26'
                }}>
                  <span>Tổng cộng:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#e44d26',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '15px'
                }}
              >
                Tiến hành thanh toán
              </button>
              
              <button
                onClick={() => navigate('/')}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: 'transparent',
                  color: '#3498db',
                  border: '2px solid #3498db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}