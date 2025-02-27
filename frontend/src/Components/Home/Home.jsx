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
    pauseOnHover: false,
    fade: true,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        <div>
          <img
            src={pottery}
            alt="pottery"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
        <div>
          <img
            src={bamboo}
            alt="bamboo"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
        <div>
          <img
            src={ceramics}
            alt="ceramics"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
        <div>
          <img
            src={flower}
            alt="flower"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
        <div>
          <img
            src={handicrafts}
            alt="handicrafts"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
        <div>
          <img
            src={mugs}
            alt="mugs"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
        <div>
          <img
            src={knitting}
            alt="knitting"
            style={{
              filter: "brightness(80%)",
            }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Home;
