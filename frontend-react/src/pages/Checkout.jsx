import React, { useReducer, useState } from 'react';
import '../assets/style/Checkout.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../assets/images/logo_images.jpg'
import Cookies from "js-cookie";


function Checkout () {
  
  const bronxData = JSON.parse(Cookies.get('cart'));
  console.log(bronxData);
  // Dữ liệu sản phẩm giả định
    const [items, setItems] = React.useState(bronxData || []);


  // if(logedIn){}

{/* Thông tin khách hàng*/}
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress]= useState('');

{/* chọn địa chỉ khách hàng*/}
  const [selectedState, setSelectedState] = React.useState("");
  const StateChoice = (event) => {
    setSelectedState(event.target.value);
  };
  const [selectedCounty, setSelectedCounty] = React.useState("");
  const CountyChoice = (event) => {
    setSelectedCounty(event.target.value);
  };
  const [selectedLocal, setSelectedLocal] = React.useState("");
  const LocalChoice = (event) => {
    setSelectedLocal(event.target.value);
  };

 const [selectedPayment,setSelectedPayment]=useState('cod');
 const [note,setNote]=useState('');

const handleSubmit = (event) => {
    event.preventDefault(); 
    
    // 1. Lấy dữ liệu từ form bằng FormData (cho các input có thuộc tính 'name')
    const form = event.target;
    const formData = new FormData(form);
    
    // Tạo đối tượng chứa tất cả thông tin đơn hàng
    const orderData = {
        // Lấy từ input (phần Uncontrolled)
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        tel: formData.get('tel'),
        address: formData.get('address'),
        
        // Lấy từ state (phần Controlled: Selects)
        state: selectedState,
        county: selectedCounty,
        local: selectedLocal,
        
        
        paymentMethod: selectedPayment,

        note: formData.get('note'),

        
        // Dữ liệu giỏ hàng và tổng tiền
        items: items,
        grandTotal: grandTotal,
    };

    
};

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const shippingCost = 5.00; // Giả sử phí vận chuyển là 5 đô la
  const grandTotal = (parseFloat(totalAmount) + shippingCost).toFixed(2);

  return (
    <div className="checkout-page-wrapper">
      <Header />
      <div className="checkout-container">
        
        {/* Phần cột chính - Delivery information */}
        <div className="checkout-main-column">
          <header className="checkout-header">
            <img src={Logo} alt="Logo" className="logo" />
            <nav className="breadcrumb">
              <a href="/cart">Cart</a> 
              <span className="separator">&gt;</span> 
              <span className="current">Delivery information</span>
            </nav>
          </header>

          <main className="form-content">
            <form action="" method="post" onSubmit={handleSubmit}>
            {/* 1. Delivery information*/}
            <section className="shipping-form-section">
              <h2 className="section-title">Delivery information</h2>
              <p className="login-prompt">
                Already have an account? <a href="/login">Login</a>
              </p>
              
              {/* Form Fields */}
              <div className="form-row">
                <input type="text" name="fullname" placeholder="Fullname" className="full-width" />
              </div>

              <div className="form-row split-2">
                <input type="email" name="email" placeholder="Email" />
                <input type="tel" name="tel" placeholder="Phone number" />
              </div>
                           
              <div className="form-row split-3 address-dropdowns">
                <select value={selectedState} onChange={StateChoice}>
                  <option value="" disabled>State</option>
                  <option value="New York">New York</option>
                  <option value="Pennsylvania" >Pennsylvania</option>
                  <option value="New Jersey">New Jersey</option>
                </select>
                <select value={selectedCounty} onChange={CountyChoice}>
                  <option value="" >County</option>
                  <option value="Los Angeles">Harris</option>
                  <option value="Orange" >Orange</option>
                  <option value="Cook">Cook</option>
                  <option value="King">King</option>

                </select>
                <select value={selectedLocal} onChange={LocalChoice}>
                  <option value="">Local</option>
                  <option value="Washington">Washington</option>
                  <option value="Los Angeles" >Los Angeles</option>
                  <option value="Texas">Texas</option>
                </select>
              </div>
              <div className="form-row">
                <input type="text" name="address" placeholder="Address" className="full-width" />
              </div>
            </section>

            {/* 2. Shipping method */}
            <section className="shipping-method-section">
              <h2 className="section-title">Shipping method</h2>
              <div className="shipping-method-box">
                
                <p>Please select a province / city to get a list of Shipping methods.</p>
              </div>
            </section>

            {/* 3. Payment method*/}
            <section className="payment-method-section">
              <h2 className="section-title">Payment method</h2>
              <div className="payment-option selected">
                <label>
                  <select 
                    name="payment-method"
                    value={selectedPayment}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="payment-select"
                    required
                  >
                    <option value="" disabled>Select payment method</option>
                    <option value="cod">
                      💰 Payment upon delivery (COD)
                    </option>
                    <option value="transfer">
                      🏦 Bank Transfer
                    </option>
                    <option value="qr">
                      📱 QR Payment
                    </option>
                    <option value="card">
                      💳 Credit/Debit Card
                    </option>
                  </select>
                  
                  
                </label>
              </div>
              <textarea name="note" placeholder="Note" rows="2"></textarea>
            </section>
          {/* Footer Action Bar */}
          <footer className="checkout-footer">
            <a href="/cart" className="back-to-cart">Cart</a>
            <button type="submit" className="btn-primary">Complete your order</button>
          </footer>

          </form>
          </main>
          
          

        </div>

        {/* Phần cột phụ - Tóm tắt đơn hàng */}
        <div className="checkout-sidebar-column">
          <div className="order-summary">
            
            {/* item List */}
            {items.map((item, index) => (
              <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="summary-item-item">
                <div className="item-count">
                  <div className='=item-image'>
                    <span className="count-badge">{index + 1}</span>
                    <img src={item.image} alt={item.name} className="transparent-image" />
                  </div>

                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-variant">
                      <div>{item.size}</div>
                      <div>{item.color}</div>
                    </div>
                    
                  </div>
                </div>

                <div>
                <div className="item-quantity">{item.quantity}</div>
                <div className="item-sum">{item.price*item.quantity}$</div>   
                </div>    

              </div>)
              )}

            <hr/>

            {/* Discount Code */}
            <div className="discount-input-group">
              <input type="text" placeholder="discount code" />
              <button>USE</button>
            </div>

            {/* Totals */}
            <div className="summary-totals">
              <div className="summary-row">
                <span className="label">Temporarily calculated</span>
                <span className="value">{totalAmount} $</span>
              </div>
              <div className="summary-row">
                <span className="label">Shipping Cost</span>
                <span className="shipping-cost">{totalAmount==0?0 : shippingCost} $</span>
              </div>
              <hr/>
              <div className="summary-row total-row">
                <span className="label">Total</span>
                <span className="value">{ parseFloat(totalAmount) ==0 ? 0 :grandTotal} $</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Checkout;