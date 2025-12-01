import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import axios from 'axios';
import Contact from "./pages/Feedback";
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
      <Route path="/feedback" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ProductList />} />
    </Routes>
  )
}

export default App