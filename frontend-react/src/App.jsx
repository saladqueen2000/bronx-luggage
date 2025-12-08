import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect  } from 'react'
import axios from 'axios';
import './App.css'

const find = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products',);
    
    console.log('Result:', response?.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
    console.error('Error:', error.response?.data);
  }
};

function App() {
  find();
  const [count, setCount] = useState(0);
  return (
    <Routes>
      <Route path="/feedback" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ProductList />} />
    </Routes>
  )
}

export default App