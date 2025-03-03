import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList/ProductList';
import Cart from './Pages/Cart/Cart';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import ArtisanDashboard from './Pages/Dashboard/ArtisanDashboard';
import LandingPage from './Pages/LandingPage';
import AdminLogin from './Pages/Login/AdminLogin';
import ArtisanLogin from './Pages/Login/ArtisanLogin';
import CustomerLogin from './Pages/Login/CustomerLogin';
import LoginSplit from './Pages/Login/LoginSplit';
import Product from './Pages/Product/Product';
import ArtisanSignup from './Pages/Signup/ArtisanSignup';
import CustomerSignup from './Pages/Signup/CustomerSignup';
import { useAuthContext } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useProducts } from './context/ProductContext';

function App() {
  const { setProducts } = useProducts()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/get')
        const data = await response.data
        setProducts(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [setProducts])

  const {authUser, setAuthUser} = useAuthContext()

  
const {setCartItems,cartItems}=useCart()
  useEffect(() => {
    if(authUser){
      
      const fetchCart = async () => {
        try {
          const response = await axios.get(`/api/products/cart/get/${authUser.user._id}`)
          const data = await response.data
          localStorage.setItem('cart',JSON.stringify(data
          ))
          setCartItems(data)
        }
        catch (error) {
          console.log(error)
        }
      }
      fetchCart()

    }
    

  }
  , [setAuthUser,setCartItems])


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