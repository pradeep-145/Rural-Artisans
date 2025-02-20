import React, { useEffect, useState } from "react";
// import { IoCartOutline } from "react-icons/io5";
import { GiThreeLeaves } from "react-icons/gi";
import { GrCart } from "react-icons/gr";
import { FaRegUser, FaSearch, FaRegHeart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [login, setLogin] = useState(null);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLogin(localStorage.getItem("type"));
  }, []);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleAuth = () => {
    if (login) {
      localStorage.removeItem("type");
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
          {login === "artisan" ? (
            <>
              <div className={styles.usernav__items}>HOME</div>
              <div className={styles.usernav__items}>VIEW ORDERS</div>
            </>
          ) : (
            <>
              <div className={styles.usernav__items}>HOME</div>
              <div className={styles.usernav__items}>PRODUCT</div>
              <div className={styles.usernav__items}>ABOUT</div>
              <div className={styles.usernav__items}>TESTIMONIALS</div>
              <div className={styles.usernav__items}>CONTACT</div>
            </>
          )}
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

        {!login ? (
          <button className={styles.auth__button} onClick={handleAuth}>
            Login / Register
          </button>
        ) : login == "customer" ? (
          <div className={styles.auth__cart_container}>
            <FaRegUser className={styles.__icon}  />

            <div className={styles.__icon} onClick={toggleCart}>
              <GrCart />
            </div>
            <FaRegHeart className={styles.__icon} />
            <FiLogOut className={styles.__icon} onClick={handleAuth} />
          </div>
        ) : (
          <>
          <FaRegUser className={styles.__icon}  />
          <FiLogOut className={styles.__icon} onClick={handleAuth} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
