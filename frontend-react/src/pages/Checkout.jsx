import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumb";
import Logo from "../assets/images/logo_images.jpg";

import "../assets/style/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // ---------- CART ----------
  const [items, setItems] = useState([]);
  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    if (cartCookie) setItems(JSON.parse(cartCookie));
  }, []);

  // ---------- FORM STATE ----------
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- FILL FULLNAME AND EMAIL IF USER LOGGED IN ----------
  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // ---------- TOTAL ----------
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const shippingCost = 5;
  const grandTotal = (subtotal + shippingCost).toFixed(2);

  // ---------- SUBMIT ----------

  // Generate guest token if not exist
  let guestToken = Cookies.get("guest_token");
  if (!guestToken) {
    guestToken =
      crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15);
    Cookies.set("guest_token", guestToken, { expires: 7 });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !phone || !address) {
      alert("Please fill in all required fields");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_id: user?.id || null,
        fullname,
        email,
        phonenumber: phone,
        address,
        note,
        items: items.map((item) => ({
          product_id: item.id,
          color: item.color || null,
          size: item.size || null,
          quantity: item.qty,
          price: item.price,
        })),
      };

      await axios.post("http://127.0.0.1:8000/api/orders", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(user ? {} : { "X-Guest-Token": guestToken }),
        },
      });

      Cookies.remove("cart");
      alert("Order placed successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page-wrapper">
      <Header />

      <div className="checkout-container">
        {/* ================= LEFT ================= */}
        <div className="checkout-main-column">
          <header className="checkout-header">
            <img src={Logo} alt="Logo" className="logo" />
          </header>

          <Breadcrumbs />

          <main className="form-content">
            <form onSubmit={handleSubmit} noValidate>
              <section className="shipping-form-section">
                <h2 className="section-title">Delivery information</h2>

                {!user && (
                  <p className="login-prompt">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                )}

                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Full name *"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    readOnly={!!user} // guest có thể nhập
                  />
                </div>

                <div className="form-row split-2">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!!user}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <textarea
                  placeholder="Note (optional)"
                  rows="2"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </section>

              <footer className="checkout-footer">
                <Link to="/cart" className="back-to-cart">
                  Cart
                </Link>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Complete your order"}
                </button>
              </footer>
            </form>
          </main>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="checkout-sidebar-column">
          <div className="order-summary">
            {items.length === 0 && (
              <p className="empty-cart">Your cart is empty</p>
            )}

            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="summary-item-item">
                <div className="item-count">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-variant">
                      {item.size && <div>{item.size}</div>}
                      {item.color && <div>{item.color}</div>}
                    </div>
                  </div>
                </div>

                <div className="item-price-box">
                  <div className="item-qty">× {item.qty}</div>
                  <div className="item-sum">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            <hr />

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} $</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost} $</span>
              </div>

              <hr />

              <div className="summary-row total-row">
                <span>Total</span>
                <span>{grandTotal} $</span>
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
