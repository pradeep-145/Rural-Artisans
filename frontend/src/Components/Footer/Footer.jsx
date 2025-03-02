import React from "react";
import styles from "./Footer.module.css";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>© {new Date().getFullYear()} Rural Artisan E-Commerce. All rights reserved.</p>
      <div className={styles.socials}>
        <a  className={styles.social} href="#"> <FaFacebookSquare /></a> 
        <a  className={styles.social} href="#"> <AiFillInstagram /></a> 
        <a  className={styles.social} href="#"> <RiTwitterXFill /></a>
        </div>
    </div>
  );
};

export default Footer;
