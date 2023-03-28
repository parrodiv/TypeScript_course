import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
)
