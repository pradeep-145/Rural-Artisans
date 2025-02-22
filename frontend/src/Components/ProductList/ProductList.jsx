import { useNavigate } from "react-router-dom";
import styles from "./ProductList.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping, FaStar } from "react-icons/fa6";

const ProductList = () => {
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
      name: "Baby Garment",
      price: 100,
      quantity: 10,
      rating: 4,
    },
    {
      id: 2,
      img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
      name: "Baby Outfit",
      price: 120,
      quantity: 0,
      rating: 3,
    },
    {
      id: 3,
      img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
      name: "Cute Romper",
      price: 80,
      quantity: 5,
      rating: 5,
    },
    {
      id: 4,
      img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
      name: "Newborn Set",
      price: 150,
      quantity: 2,
      rating: 4,
    },
    {
      id: 5,
      img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
      name: "Comfy Onesie",
      price: 90,
      quantity: 7,
      rating: 4,
    },
  ];

  const handleCardClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  const handleAddToCart = (event, item) => {
    event.stopPropagation();
    console.log("Added to cart:", item);
  };

  const handleAddToWishlist = (event, item) => {
    event.stopPropagation();
    console.log("Added to wishlist:", item);
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsWrapper}>
        <h1 className={styles.productsTitle}>Products</h1>
        <div className={styles.productsGrid}>
          {items.map((item) => (
            <div key={item.id} className={styles.productCard} onClick={() => handleCardClick(item)} >
              <div className={styles.productImageContainer}>
                <img src={item.img} alt={item.name} className={styles.productImage} />
                <button className={styles.heartButton} onClick={(event) => handleAddToWishlist(event, item)} >
                  <FaRegHeart className={styles.heartIcon} />
                </button>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  {item.name}
                  <span className={styles.productRating}>
                    {item.rating} <FaStar className={styles.starIcon} />
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
