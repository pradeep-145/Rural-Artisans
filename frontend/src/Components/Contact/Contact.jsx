import React from "react";
import styles from "./Contact.module.css";
import { MdEmail } from "react-icons/md";
import { BiSolidPhone } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

const Contact = () => {
  return (
    <div id="contact" className={styles.contacts}>
      <div className={styles.contact_header}><h2>For any queries,<br/> feel free to reach out to us</h2></div>
      <div className={styles.contact_content}>
      <p className={styles.contact_info}><MdEmail className={styles.icons} /> Email: ethnix.help@gmail.com</p>
      <p className={styles.contact_info}><BiSolidPhone className={styles.icons}/> Phone: +91 98765 43210</p>
      <p className={styles.contact_info}><AiFillHome className={styles.icons}/> Address: 123, Artisan Street, Handicraft Nagar, India</p>
      </div>
    </div>
  );
};

export default Contact;
