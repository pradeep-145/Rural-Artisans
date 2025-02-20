import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoHeartFill } from "react-icons/go";
import { Link } from "react-scroll";
import logo from '/logo.png';
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        setLogin(localStorage.getItem('user'));
    }, []);

    return (
        <div>
            <div>
                <a href="/"><img src={logo} width={50} height={50}/></a>
                <Link to="home" smooth={true} duration={500}>Home</Link>
                <Link to="products" smooth={true} duration={500}>Products</Link>
                <Link to="about" smooth={true} duration={500}>About</Link>
                <Link to="testimonials" smooth={true} duration={500}>Testimonials</Link>
                <Link to="contact" smooth={true} duration={500}>Contact</Link>
                
                <div>
                <input type="text" placeholder="Search" />
                <button><IoIosSearch /></button>
                
                {!login && <a href="/login">Login/SignUp</a>}

                {login && <a href="/customerDashboard"><CgProfile /></a>}

                {login === 'customer' && <a href="/cart"><FaShoppingCart /></a>}

                {login === 'customer' && <a href="/wishlist"><GoHeartFill /></a>}
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;
