
//   const { id } = useParams();
//  const [product, setProduct] = useState(null);

//  useEffect(() => {  
//       const fetchProduct = async () => {
//       try { 
//         const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
//         const data = response?.data;
//         setProduct(data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);
//   if (!product) {
//     return <div>Loading...</div>;
//   }
import React, { useState } from 'react';

// Dữ liệu giả định cho giỏ hàng
const initialCartItems = [
  {
    id: 1,
    name: 'Play game',
    color: 'Green',
    size: 30,
    price: 11.70,
    quantity: 1,
    image: 'green-controller-url.png' // Thay thế bằng URL ảnh thực tế
  },
  {
    id: 2,
    name: 'Play game',
    color: 'Black',
    size: 30,
    price: 11.70,
    quantity: 1,
    image: 'black-controller-url.png' // Thay thế bằng URL ảnh thực tế
  },
];

export default function Cart(props) {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [subtotal, setSubtotal] = useState(23.40); // 11.70 * 2
  const [coupon, setCoupon] = useState('');

  // Hàm tính toán tổng phụ (đơn giản hóa)
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Hàm tăng/giảm số lượng
  const updateQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
    // Sau khi cập nhật cartItems, cần cập nhật subtotal trong useEffect (hoặc gọi hàm ở đây)
    // Ví dụ: setSubtotal(calculateSubtotal(newItems));
  };

  // Hàm xóa sản phẩm
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-page-container" style={styles.container}>
      {/* 1. BREADCRUMB */}
      <div className="breadcrumb" style={styles.breadcrumb}>
        Home &gt; All category
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="cart-main-content" style={styles.mainContent}>
        
        {/* LEFT SECTION: CART TABLE */}
        <div className="cart-table-section" style={styles.cartTableSection}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableRowHeader}>
                <th style={styles.thProduct}>Product</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} style={styles.tableRow}>
                  {/* Cột Product */}
                  <td style={styles.tdProduct}>
                    <img src={item.image} alt={item.name} style={styles.productImage} />
                    <div style={styles.productDetails}>
                      <div style={styles.productName}>{item.name}</div>
                      <div style={styles.productInfo}>Color: {item.color}</div>
                      <div style={styles.productInfo}>Size: {item.size}</div>
                    </div>
                  </td>
                  {/* Cột Price */}
                  <td style={styles.tdPrice}>${item.price.toFixed(2)}</td>
                  {/* Cột Quantity */}
                  <td style={styles.tdQuantity}>
                    <div style={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>-</button>
                      <span style={styles.qtyDisplay}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>+</button>
                    </div>
                  </td>
                  {/* Cột Subtotal */}
                  <td style={styles.tdSubtotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                    <button onClick={() => removeItem(item.id)} style={styles.removeButton}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.actionButtons}>
            <button style={styles.continueShoppingButton}>Continue shopping</button>
            <button style={styles.updateCartButton}>Update cart</button>
            <button style={styles.clearCartButton}>Clear cart</button>
          </div>
        </div>

        {/* RIGHT SECTION: CART TOTAL */}
        <div className="cart-total-section" style={styles.cartTotalSection}>
          <h3 style={styles.cartTotalHeader}>Cart total</h3>
          
          <div style={styles.totalRow}>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          
          <div style={styles.couponBox}>
            <input 
              type="text" 
              placeholder="Enter coupon code" 
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              style={styles.couponInput}
            />
            <button style={styles.applyButton}>Apply</button>
          </div>

          <div style={styles.countrySelector}>
            <label htmlFor="country-select">County</label>
            <select id="country-select" style={styles.selectInput}>
              <option>United States</option>
              <option>Vietnam</option>
            </select>
          </div>
          
          <div style={styles.totalRow}>
            <span>Total amount</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <button style={styles.checkoutButton}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}

// Minimal CSS Styles (sử dụng inline style cho ví dụ)
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  breadcrumb: {
    padding: '10px 0',
    color: '#666',
    fontSize: '14px',
  },
  mainContent: {
    display: 'flex',
    gap: '30px',
    marginTop: '20px',
  },
  cartTableSection: {
    flex: '2',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  cartTotalSection: {
    flex: '1',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    height: 'fit-content',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableRowHeader: {
    borderBottom: '1px solid #ddd',
    color: '#666',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
  },
  thProduct: { textAlign: 'left', padding: '15px 0' },
  th: { padding: '15px 0', textAlign: 'center' },
  tdProduct: { display: 'flex', alignItems: 'center', padding: '15px 0' },
  tdPrice: { textAlign: 'center' },
  tdQuantity: { textAlign: 'center' },
  tdSubtotal: { textAlign: 'center', position: 'relative' },
  productImage: { width: '60px', height: '60px', marginRight: '15px', objectFit: 'contain' },
  productDetails: { textAlign: 'left' },
  productName: { fontWeight: '600', marginBottom: '4px' },
  productInfo: { fontSize: '12px', color: '#888' },
  quantityControl: { display: 'inline-flex', border: '1px solid #ddd', borderRadius: '4px' },
  qtyButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px 10px' },
  qtyDisplay: { padding: '5px 10px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' },
  removeButton: { 
    background: 'none', 
    border: 'none', 
    color: '#ccc', 
    fontSize: '20px', 
    position: 'absolute', 
    right: '0', 
    top: '50%', 
    transform: 'translateY(-50%)', 
    cursor: 'pointer' 
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start',
  },
  continueShoppingButton: { 
    backgroundColor: '#ffaa1c', 
    color: '#fff', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer' 
  },
  updateCartButton: { 
    backgroundColor: '#fff', 
    color: '#888', 
    padding: '10px 20px', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    cursor: 'pointer' 
  },
  clearCartButton: { 
    backgroundColor: '#fff', 
    color: 'red', 
    padding: '10px 20px', 
    border: '1px solid red', 
    borderRadius: '4px', 
    cursor: 'pointer' 
  },
  cartTotalHeader: {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px',
    fontWeight: '600',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    fontSize: '16px',
  },
  couponBox: {
    display: 'flex',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  },
  couponInput: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px',
    marginRight: '-1px',
  },
  applyButton: {
    backgroundColor: '#ffaa1c',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  countrySelector: {
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#ffaa1c',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};