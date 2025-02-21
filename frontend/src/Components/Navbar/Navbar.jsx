import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { GiThreeLeaves } from "react-icons/gi";
import { GrCart } from "react-icons/gr";
import { FaRegUser, FaSearch, FaRegHeart } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [login, setLogin] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLogin(localStorage.getItem("user"));
  }, []);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleAuth = () => {
    if (login) {
      localStorage.removeItem("user");
      setLogin(null);
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <nav className={styles.user__navbar}>
      <div className={styles.user__navbar_inner}>
        <div className={styles.logo}>
          <GiThreeLeaves />
        </div>

        <div className={styles.usernav__contents}>
          <div className={styles.usernav__items}>HOME</div>
          <div className={styles.usernav__items}>PRODUCT</div>
          <div className={styles.usernav__items}>ABOUT</div>
          <div className={styles.usernav__items}>TESTIMONIALS</div>
          <div className={styles.usernav__items}>CONTACT</div>
        </div>

        <div className={styles.search__box}>
          <FaSearch className={styles.search__icon} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.auth__cart_container}>
          {!login ? (
            <FaRegUser className={styles.__icon} />
          ) : (
            <button className={styles.auth__button} onClick={handleAuth}>
              Login / Register
            </button>
          )}
          <div className={styles.__icon} onClick={toggleCart}>
            <GrCart />
          </div>
          <FaRegHeart className={styles.__icon} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
