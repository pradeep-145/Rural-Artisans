import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductContextProvider>
      <AuthContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContextProvider>
    </ProductContextProvider>
  </StrictMode>,
)
