import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Pages/Login/AdminLogin';
import ArtisanLogin from './Pages/Login/ArtisanLogin';
import CustomerLogin from './Pages/Login/CustomerLogin';
import ArtisanSignup from './Pages/Signup/ArtisanSignup';
import CustomerSignup from './Pages/Signup/CustomerSignup';
import LoginSplit from './Pages/Login/LoginSplit';
import LandingPage from './Pages/LandingPage';
import ArtisanDashboard from './Pages/Dashboard/ArtisanDashboard';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import Product from './Pages/Product/Product';
import { useEffect } from 'react';
import ProductList from './Components/ProductList/ProductList';
import { useProducts } from './context/ProductContext';
import axios from 'axios';
import Cart from './Pages/Cart/Cart';

function App() {
  const { setProducts } = useProducts()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/get')
        const data = await response.data
        console.log(data)
        setProducts(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [setProducts])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/artisanLogin" element={<ArtisanLogin />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
        <Route path="/artisanSignup" element={<ArtisanSignup />} />
        <Route path="/customerSignup" element={<CustomerSignup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/login" element={<LoginSplit />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/artisanDashboard" element={<ArtisanDashboard />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App