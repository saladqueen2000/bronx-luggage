import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import axios from 'axios';
<<<<<<< HEAD
import Login from "./pages/Login";
import Register from "./pages/Register";
=======
import Contact from "./pages/Contact";
>>>>>>> e707c96ebdddd6e8f71faef2cc546d4cf21b5d45
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
<<<<<<< HEAD
           <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
=======
      <Route path="/contact" element={<Contact />} />
>>>>>>> e707c96ebdddd6e8f71faef2cc546d4cf21b5d45
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ProductList />} />
    </Routes>
  )
}

export default App


