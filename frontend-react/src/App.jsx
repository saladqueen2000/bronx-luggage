import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import axios from 'axios';
import Login from "./pages/Login";
import Register from "./pages/Register";
const find = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products');

    console.log('Result:', response?.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};

function App() {
  find();
  return (
    <Routes>
           <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ProductList />} />
    </Routes>
  )
}

export default App


