import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div id="testimonials" className={styles.testimonialsContainer}>
      <div className={styles.header}><h2 className={styles.testimonialsTitle}>WHAT OUR CUSTOMERS SAY</h2></div>
      <Slider {...settings} className={styles.testimonialsSlider}>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            “This platform helped me connect with skilled artisans and purchase authentic handmade products. The quality is amazing!”
          </p>
          <h4 className={styles.testimonialAuthor}>Aditi Sharma</h4>
        </div>

        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            “I love how this website empowers rural artisans. The craftsmanship is top-notch, and I’ll definitely order again!”
          </p>
          <h4 className={styles.testimonialAuthor}>Rajesh Kumar</h4>
        </div>

        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            “A fantastic initiative! The handmade products are unique, and I appreciate the fair pricing for artisans.”
          </p>
          <h4 className={styles.testimonialAuthor}> Priya Menon</h4>
        </div>
      </Slider>
    </div>
  );
};

export default Testimonials;
