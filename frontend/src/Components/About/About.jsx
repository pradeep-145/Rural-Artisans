import React from "react";
import styles from './About.module.css';

const About = () => {
  return (
    <div id="about" className={styles.aboutContainer}>
      <div className={styles.header}>
      <h2 className={styles.aboutTitle}>ABOUT US</h2>
      </div>
      <div className={styles.aboutText}>
      <p>
        Welcome to our Rural Artisan E-Commerce Platform! We are dedicated to 
        empowering skilled artisans from rural areas by providing them with a 
        digital marketplace to showcase and sell their handcrafted products.
      </p>
      <p>
        Our mission is to preserve traditional craftsmanship, ensure fair 
        pricing, and create economic opportunities for artisans while delivering 
        authentic and high-quality handmade goods to customers.
      </p>
      <p>
        By leveraging storytelling, fair trade principles, and seamless online 
        shopping, we bridge the gap between artisans and buyers, promoting 
        sustainable livelihoods and cultural heritage.
      </p>
      </div>
    </div>
  );
};

export default About;
