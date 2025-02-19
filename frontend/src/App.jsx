import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Pages/Login/AdminLogin';
import ArtisanLogin from './Pages/Login/ArtisanLogin';
import CustomerLogin from './Pages/Login/CustomerLogin';
import ArtisanSignup from './Pages/Signup/ArtisanSignup';
import CustomerSignup from './Pages/Signup/CustomerSignup';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/artisanLogin" element={<ArtisanLogin />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
        <Route path="/artisanSignup" element={<ArtisanSignup />} />
        <Route path="/customerSignup" element={<CustomerSignup />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App