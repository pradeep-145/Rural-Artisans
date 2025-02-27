import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { GiThreeLeaves } from "react-icons/gi";
import { GrCart } from "react-icons/gr";
import { FaRegUser, FaSearch, FaRegHeart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import axios from "axios";

const Navbar = () => {
  const [login, setLogin] = useState(null);
  const [searchModal, setSearchModal] = useState(false);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLogin(localStorage.getItem("type"));
  }, []);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleAuth = async () => {
    if (login) {
      await axios.post("/api/auth/logout").then(() => {
        console.log("done");
      });
      localStorage.removeItem("type");
      localStorage.removeItem("authUser");
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
        {searchModal && (
          <div
            className={`${styles.search__box} ${
              searchModal ? styles.active : ""
            }`}
          >
            <FaSearch className={styles.search__icon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MdClose
              className={styles.closeBtn}
              onClick={() => setSearchModal(false)}
            />
          </div>
        )}

        {!searchModal && (
          <div className={styles.search__icon}>
            <FaSearch onClick={() => setSearchModal(true)} />
          </div>
        )}

        {!login ? (
          <button className={styles.auth__button} onClick={handleAuth}>
            Login / Register
          </button>
        ) : login == "customer" ? (
          <div className={styles.auth__cart_container}>
            <FaRegHeart className={styles.__icon} />
            <GrCart className={styles.__icon} onClick={toggleCart} />
            <FaRegUser className={styles.__icon} />
          </div>
        ) : (
          <>
            <FaRegUser className={styles.__icon} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
