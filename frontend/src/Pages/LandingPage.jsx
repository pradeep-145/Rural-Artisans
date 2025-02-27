import Navbar from "../Components/Navbar/Navbar";
import Testimonials from "../Components/Testimonials/Testimonials";
import About from "../Components/About/About";
import Contact from "../Components/Contact/Contact";
import Footer from "../Components/Footer/Footer";
import Home from "../Components/Home/Home";
import ProductScroll from "../Components/ProductScroll/ProductScroll";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <ProductScroll />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
