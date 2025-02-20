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
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    localStorage.setItem("user", "customer")
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/artisanLogin" element={<ArtisanLogin />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
        <Route path="/artisanSignup" element={<ArtisanSignup />} />
        <Route path="/customerSignup" element={<CustomerSignup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginSplit />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/artisanDashboard" element={<ArtisanDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App