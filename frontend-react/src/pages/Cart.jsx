import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import axios from "axios";
import "../global.css";
import "../assets/style/Home.css";
import "../assets/style/Cart.css";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cookieCart = Cookies.get("cart");

    if (cookieCart) {
      try {
        setCart(JSON.parse(cookieCart));
      } catch {
        setCart([]);
      }
    } else {
      setCart([]);
    }

    setLoading(false);
  }, []);

  // Helper save cart to cookie
  const saveCart = (newCart) => {
    setCart(newCart);
    Cookies.set("cart", JSON.stringify(newCart), { expires: 7 });
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    saveCart(updated);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((i) => i.qty > 0);

    saveCart(updated);
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    Cookies.set("cart", JSON.stringify([]));
  };

  const subtotal = cart.reduce((t, i) => t + i.qty * i.price, 0);

  if (loading) {
    return (
      <div className="loadingStyle">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-inner">
        <Breadcrumb />
        <div className="cart-layout">
          {/* LEFT */}
          <div className="cart-left">
            <div className="cart-header-row">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div></div>
            </div>

            {/* EMPTY */}
            {cart.length === 0 && (
              <div className="cart-item empty-row">
                <div className="empty-text">Your cart is empty</div>
              </div>
            )}

            {/* ITEMS */}
            {cart.length > 0 &&
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="col-product">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="prod-img"
                    />
                    <div className="info">
                      <div className="title">
                        <Link to={`/list/${item.id}`} className="product-link">
                          {item.name}
                        </Link>
                      </div>
                      <div className="sub">Color: {item.color}</div>
                      <div className="sub">Size: {item.size}</div>
                    </div>
                  </div>

                  <div className="col-price">$ {item.price.toFixed(2)}</div>

                  <div className="col-qty">
                    <div className="qty-box">
                      <button onClick={() => decreaseQty(item.id)}>−</button>
                      <div className="num">{item.qty}</div>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="col-sub">
                    ${(item.qty * item.price).toFixed(2)}
                  </div>

                  <div
                    className="col-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </div>
                </div>
              ))}

            {cart.length > 0 && (
              <div className="bottom-buttons">
                <button className="btn-continue">Continue shopping</button>
                <button className="btn-clear" onClick={clearCart}>
                  Clear cart
                </button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <aside className="cart-right">
            <div className="right-header">Cart total</div>

            <div className="summary">
              <div className="row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="line"></div>

              <div className="row total">
                <span>Total amount</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <Link to="/checkout">
                <button className="checkout-btn">Proceed to checkout</button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
