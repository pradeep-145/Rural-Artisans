import { FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleCardClick = (item) => {
    console.log(item)
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

  const handleAddToCart = (event, item) => {
    event.stopPropagation();
    console.log("Added to cart:", item);
  };

  const handleAddToWishlist = (event, item) => {
    event.stopPropagation();
    console.log("Added to wishlist:", item);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsWrapper}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1 className={styles.productsTitle}>Products</h1>
        <div className={styles.productsGrid}>
          {products.map((item) => (
            <div key={item._id} className={styles.productCard} onClick={() => handleCardClick(item)} >
              <div className={styles.productImageContainer}>
                <img src={item.image} alt={item.name} className={styles.productImage} />
                <button className={styles.heartButton} onClick={(event) => handleAddToWishlist(event, item)} >
                  <FaRegHeart className={styles.heartIcon} />
                </button>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  {item.name}
                  <span className={styles.productRating}>
                    {calculateAverageRating(item.review)} <FaStar className={styles.starIcon} />
                  </span>
                </h3>
                <p className={styles.productPrice}>Rs.{item.price}</p>
                <div className={styles.productFooter}>
                  <p className={styles.stockStatus} style={{ color: item.quantity > 0 ? "#059669" : "#ef4444" }} >
                    {item.quantity > 0 ? "In stock" : "Out of stock"}
                  </p>
                  <button className={styles.cartButton} onClick={(event) => handleAddToCart(event, item)} disabled={item.quantity <= 0} >
                    <FaCartShopping className={styles.cartIcon} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
