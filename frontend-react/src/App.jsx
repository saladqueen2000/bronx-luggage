import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import axios from "axios";
import Feedback from "./pages/Feedback";
import Cart from "./pages/Cart";
const find = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/products");

    console.log("Result:", response?.data);
  } catch (error) {
    console.error("Error:", error.response?.data);
  }
};

function App() {
  find();
  return (
    <Routes>
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
