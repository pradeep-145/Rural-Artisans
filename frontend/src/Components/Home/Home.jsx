import Slider from "react-slick";
import bamboo from "../../assets/bamboo.jpg";
import ceramics from "../../assets/ceramics.jpg";
import flower from "../../assets/flower.jpg";
import handicrafts from "../../assets/handicrafts.jpg";
import mugs from "../../assets/mugs.jpg";
import pottery from "../../assets/pottery.jpg";
import knitting from "../../assets/knitting.jpg";
import styles from "./Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        <div>
          <img src={pottery} alt="pottery" />
        </div>
        <div>
          <img src={bamboo} alt="bamboo" />
        </div>
        <div>
          <img src={ceramics} alt="ceramics" />
        </div>
        <div>
          <img src={flower} alt="flower" />
        </div>
        <div>
          <img src={handicrafts} alt="handicrafts" />
        </div>
        <div>
          <img src={mugs} alt="mugs" />
        </div>
        <div>
          <img src={knitting} alt="knitting" />
        </div>
      </Slider>
    </div>
  );
};

export default Home;
