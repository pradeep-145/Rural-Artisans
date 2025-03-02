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
        <a  className={styles.social} href="#"> <FaFacebookSquare className={styles.icons} /></a> 
        <a  className={styles.social} href="#"> <AiFillInstagram className={styles.icons} /></a> 
        <a  className={styles.social} href="#"> <RiTwitterXFill className={styles.icons} /></a>
        </div>
    </div>
  );
};

export default Footer;
