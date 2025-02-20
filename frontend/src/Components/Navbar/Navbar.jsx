import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoHeartFill } from "react-icons/go";

const Navbar = () => {
        const [login, setLogin] = useState(null);
        
       useEffect ( () => {
          setLogin(localStorage.getItem('user'));
       },[]);

    return (
        <div>
            <div>
                <a href="#home">Home</a>
                <a href="#products">Products</a>
                <a href="#about">About</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#contact">Contact</a>
                {login==null && <a href="/login">Login/SignUp</a>}
                {login && <a href="/customerDashboard"><CgProfile /></a>}  
                {login==='customer' && <a href="/cart"><FaShoppingCart /></a>}   
                {login==='customer' && <a href="/wishlist"><GoHeartFill /></a>}      
            </div>
        </div>
    )
}

export default Navbar