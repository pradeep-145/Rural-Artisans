import React from "react";

const Footer = () => {
  return (
    <div>
      <p>© {new Date().getFullYear()} Rural Artisan E-Commerce. All rights reserved.</p>
      <p>
        Follow us on: 
        <a href="#"> Facebook</a> | 
        <a href="#"> Instagram</a> | 
        <a href="#"> Twitter</a>
      </p>
    </div>
  );
};

export default Footer;
