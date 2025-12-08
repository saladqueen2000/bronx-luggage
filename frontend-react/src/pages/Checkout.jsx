import React from 'react';
import '../assets/style/Checkout.css';
import { Link } from 'react-router-dom';
  // import Logo from '../assets/images/logo_images.png';




const COD_ICON_URL = '/path/to/cod-icon.png';


const Checkout = () => {
  const bronxData = JSON.parse(localStorage.getItem('cart'));
  // Dữ liệu sản phẩm giả định
  const [items, setItems] = React.useState(bronxData || [])

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-container">
        
        {/* Phần cột chính - Thông tin giao hàng */}
        <div className="checkout-main-column">
          <header className="checkout-header">
            <img src={1} alt="Logo" className="logo" />
            <nav className="breadcrumb">
              <a href="/cart">Giỏ hàng</a> 
              <span className="separator">&gt;</span> 
              <span className="current">Thông tin giao hàng</span>
            </nav>
          </header>

          <main className="form-content">
            
            {/* 1. Thông tin giao hàng */}
            <section className="shipping-form-section">
              <h2 className="section-title">Thông tin giao hàng</h2>
              <p className="login-prompt">
                Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
              
              {/* Form Fields */}
              <div className="form-row">
                <input type="text" placeholder="Họ và tên" className="full-width" />
              </div>

              <div className="form-row split-2">
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Số điện thoại" />
              </div>

              <div className="form-row">
                <input type="text" placeholder="Địa chỉ" className="full-width" />
              </div>
              
              <div className="form-row split-3 address-dropdowns">
                <select defaultValue="">
                  <option value="" disabled>Chọn tỉnh / thành</option>
                </select>
                <select defaultValue="">
                  <option value="" disabled>Chọn quận / huyện</option>
                </select>
                <select defaultValue="">
                  <option value="" disabled>Chọn phường / xã</option>
                </select>
              </div>
            </section>

            {/* 2. Phương thức vận chuyển */}
            <section className="shipping-method-section">
              <h2 className="section-title">Phương thức vận chuyển</h2>
              <div className="shipping-method-box">
                
                <p>Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
              </div>
            </section>

            {/* 3. Phương thức thanh toán */}
            <section className="payment-method-section">
              <h2 className="section-title">Phương thức thanh toán</h2>
              <div className="payment-option selected">
                <label>
                  <input type="radio" name="payment-method" defaultChecked />
                  <img src={COD_ICON_URL} alt="COD Icon" />
                  Thanh toán khi giao hàng (COD)
                </label>
              </div>
              <textarea placeholder="Nhắn hàng rồi thanh toán tiền" rows="2"></textarea>
            </section>
          </main>

          {/* Footer Action Bar */}
          <footer className="checkout-footer">
            <a href="/cart" className="back-to-cart">Giỏ hàng</a>
            <button type="submit" className="btn-primary">Hoàn tất đơn hàng</button>
          </footer>
        </div>

        {/* Phần cột phụ - Tóm tắt đơn hàng */}
        <div className="checkout-sidebar-column">
          <div className="order-summary">
            
            {/* item List */}
            {items.map((item, index) => (
              <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="summary-item-item">
                <div className="item-image-count">
                    <span className="count-badge">{index + 1}</span>
                    <img src={item.image} alt={item.title} className="transparent-image" />
                  <div className="item-name">{item.title}</div>
                  <div className="item-variant">{item.size}</div>
                  <div className="item-quantity">{item.quantity}</div>
                </div>
                
                <div className="item-price">{item.price*item.quantity}</div>
                
              </div>
            ))}

            <hr/>

            {/* Discount Code */}
            <div className="discount-input-group">
              <input type="text" placeholder="Mã giảm giá" />
              <button>SỬ DỤNG</button>
            </div>

            {/* Totals */}
            <div className="summary-totals">
              <div className="summary-row">
                <span className="label">Tạm tính</span>
                <span className="value">699,000₫</span>
              </div>
              <div className="summary-row">
                <span className="label">Phí vận chuyển</span>
                <span className="value">—</span>
              </div>
              <hr/>
              <div className="summary-row total-row">
                <span className="label">Tổng cộng</span>
                <span className="value">VND 699,000₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;