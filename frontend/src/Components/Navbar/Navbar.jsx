import React, { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { GiThreeLeaves } from "react-icons/gi";
import { GrCart } from "react-icons/gr";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import styles from "./Navbar.module.css";
import axios from "axios";

const Navbar = () => {
  const [login, setLogin] = useState(null);
  const [searchModal, setSearchModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openSearchModal = () => {
    setSearchModal(true);
    // Close mobile menu if it's open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };

  return (
    <nav className={styles.user__navbar}>
      <div className={styles.user__navbar_inner}>
        <div className={styles.logo}>
          <GiThreeLeaves />
        </div>

        {/* Mobile Menu Button - only visible on small screens when search is not active */}
        {!searchModal && (
          <div className={styles.mobile_menu_button} onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </div>
        )}

        {/* Navigation Links */}
        <div
          className={`${styles.usernav__contents} ${
            mobileMenuOpen ? styles.mobile_menu_open : ""
          }`}
        >
          {login === "artisan" ? (
            <>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </div>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                VIEW ORDERS
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </div>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                PRODUCT
              </div>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT
              </div>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                TESTIMONIALS
              </div>
              <div
                className={styles.usernav__items}
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT
              </div>
            </>
          )}
        </div>

        {!login ? (
          <div
            className={`${styles.auth__cart_container} ${
              searchModal ? styles.search_active : ""
            }`}
          >
            {searchModal && (
              <div className={styles.search__box}>
                <IoSearch className={styles.search__icon} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdClose
                  className={styles.closeBtn}
                  onClick={closeSearchModal}
                />
              </div>
            )}

            {!searchModal && (
              <div className={styles.search__icon}>
                <IoSearch onClick={openSearchModal} />
              </div>
            )}
            <button
              className={`${styles.auth__button} ${
                searchModal ? styles.hide_on_mobile : ""
              }`}
              onClick={handleAuth}
            >
              Login / Register
            </button>
          </div>
        ) : login == "customer" ? (
          <div
            className={`${styles.auth__cart_container} ${
              searchModal ? styles.search_active : ""
            }`}
          >
            {searchModal && (
              <div className={styles.search__box}>
                <IoSearch className={styles.search__icon} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdClose
                  className={styles.closeBtn}
                  onClick={closeSearchModal}
                />
              </div>
            )}

            {!searchModal && (
              <div className={styles.search__icon}>
                <IoSearch onClick={openSearchModal} />
              </div>
            )}
            <div
              className={`${styles.icon_group} ${
                searchModal ? styles.hide_on_mobile : ""
              }`}
            >
              <FaRegHeart className={styles.__icon} />
              <GrCart className={styles.__icon} onClick={toggleCart} />
              <FaRegUser className={styles.__icon} />
            </div>
          </div>
        ) : (
          <>
            {!searchModal ? (
              <FaRegUser className={styles.__icon} />
            ) : (
              <div className={styles.search__box}>
                <IoSearch className={styles.search__icon} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdClose
                  className={styles.closeBtn}
                  onClick={closeSearchModal}
                />
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
