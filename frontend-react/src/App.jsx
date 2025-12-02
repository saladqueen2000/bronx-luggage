import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import axios from 'axios';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/login';
import Register from './pages/Register';
import List from './components/List';
import CartPage from './pages/Carta';

// const find = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/api/products');

//     console.log('Result:', response?.data);
//   } catch (error) {
//     console.error('Error:', error.response?.data);
//   }
// };

function App() {
  find();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/category/:categoryID" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/carta" element={<CartPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

    </Routes>
  )
}

export default App


