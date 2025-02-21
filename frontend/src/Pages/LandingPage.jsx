import Navbar from "../Components/Navbar/Navbar"
import ProductList from "../Components/ProductList/ProductList"
import Testimonials from "../Components/Testimonials/Testimonials"
import About from "../Components/About/About"
import Contact from "../Components/Contact/Contact"
import Footer from "../Components/Footer/Footer"
import Home from "../Components/Home/Home"


const LandingPage = () => {
    return (
        <>
            <Navbar />
            <Home/>
            <ProductList />
            {/* <About/>
            <Testimonials/>
            <Contact/>
            <Footer/> */}
            
        </>
    )
}

export default LandingPage