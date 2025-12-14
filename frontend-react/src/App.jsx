import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
import viteLogo from "/vite.svg";
import { useEffect } from "react";
import axios from "axios";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import PublicRoute from "./routes/PublicRoute";

// const find = async () => {
//   try {
//     const response = await axios.get("http://localhost:8000/api/products/1");

//     console.log("Result:", response?.data);
//   } catch (error) {
//     console.error("Error:", error.response?.data);
//   }
// };

function App() {
  find();
  const [count, setCount] = useState(0);
  return (
    <Routes>
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/list/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
