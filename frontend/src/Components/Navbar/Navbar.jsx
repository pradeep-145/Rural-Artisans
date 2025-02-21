import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { GiThreeLeaves } from "react-icons/gi";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const [login, setLogin] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    setLogin(localStorage.getItem("user"));
  }, []);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className={styles.user__navbar}>
      <div className={styles.user__navbar_inner}>
        <div className={styles.logo}>
          <GiThreeLeaves />
        </div>
        <div className={styles.usernav__contents}>
          <div className={styles.usernav__items}>HOME</div>
          <div className={styles.usernav__items}>PRODUCT</div>
          <div className={styles.usernav__items}>ABOUT</div>
          <div className={styles.usernav__items}>CONTACT</div>
        </div>
      </div>
      <div className={styles.user__cart} onClick={toggleCart}>
        <BsCart3 />
      </div>
    </div>
  );
};

export default Navbar;
