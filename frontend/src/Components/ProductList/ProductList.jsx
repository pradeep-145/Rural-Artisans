import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext"; // Import cart context
import styles from "./ProductList.module.css";
import WishlistSidebar from "../WishlistSidebar/WishlistSidebar";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
const ProductList = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setCartItems } = useCart(); // Use cart context
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set()); // Track wishlist items
const {authUser}=useAuthContext()
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleCardClick = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

  const handleAddToWishlist = (event, item) => {
    event.stopPropagation();

    setWishlistProductIds((prevIds) => {
      const newIds = new Set(prevIds);

      if (newIds.has(item._id)) {
        newIds.delete(item._id);
        setWishlistItems(wishlistItems.filter((wishlistItem) => wishlistItem._id !== item._id));
      } else {
        newIds.add(item._id);
        setWishlistItems([...wishlistItems, item]);
        setIsWishlistOpen(true);
      }

      return newIds;
    });
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistProductIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.delete(itemId);
      return newIds;
    });

    setWishlistItems(wishlistItems.filter((item) => item._id !== itemId));
  };

  const handleAddToCart = async(event, item) => {
    event.stopPropagation();
    addToCart(item, 1);
    try{

      await axios.post('/api/products/cart/add', {
          customerId: JSON.parse(localStorage.getItem('authUser'))._id,
          productId: item._id,
          quantity: 1
      })
  }
  catch(error){
      console.log(error)
  }

  };

  const addToCartFromWishlist = (item) => {
    addToCart(item, 1);
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
            <div
              key={item._id}
              className={styles.productCard}
              onClick={() => handleCardClick(item)}
            >
              <div className={styles.productImageContainer}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImage}
                />
                <button
                  className={styles.heartButton}
                  onClick={(event) => handleAddToWishlist(event, item)}
                >
                  <IoIosHeart
                    className={styles.heartIcon}
                    style={{ color: wishlistProductIds.has(item._id) ? "red" : "rgb(184, 182, 182)" }}
                  />
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
                  <p
                    className={styles.stockStatus}
                    style={{
                      color: item.quantity > 0 ? "#059669" : "#ef4444",
                    }}
                  >
                    {item.quantity > 0 ? "In stock" : "Out of stock"}
                  </p>
                  <button
                    className={styles.cartButton}
                    onClick={(event) => handleAddToCart(event, item)}
                    disabled={item.quantity <= 0}
                  >
                    <FaCartShopping className={styles.cartIcon} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        removeFromWishlist={handleRemoveFromWishlist}
        addToCart={addToCartFromWishlist}
      />
    </div>
  );
};

export default ProductList;