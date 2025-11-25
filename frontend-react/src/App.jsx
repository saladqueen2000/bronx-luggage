import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import axios from 'axios';
import './App.css'

// const createProduct = async () => {
//   try {
//     const response = await axios.post('http://localhost:8000/api/products', {
//       name: 'Sample T-Shirt',
//       description: 'A comfortable t-shirt',
//       price: 199.99,
//       gender: 'Unisex',
//       colors: [1, 2],
//       sizes: [1, 2, 3],
//       gallery: [
//         'https://example.com/image1.jpg',
//         'https://example.com/image2.jpg'
//       ]
//     });
    
//     console.log('Product created:', response.data);
//   } catch (error) {
//     console.error('Error creating product:', error.response.data);
//   }
// };

function App() {
  // createProduct();
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
