import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./ProductScroll.module.css";
import { useProducts } from "../../context/ProductContext";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import WishlistSidebar from "../WishlistSidebar/WishlistSidebar";

const ProductScroll = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const { authUser } = useAuthContext();
  const { products } = useProducts();

  // Add wishlist state variables
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set()); // Track wishlist items

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (localStorage.getItem("authUser")) {
          const customerId = JSON.parse(localStorage.getItem("authUser"))._id;
          const response = await axios.get(`/api/products/cart/${customerId}`);
          setCartItems(response.data || []);
        }
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, products.length - 4) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= products.length - 4 ? 0 : prev + 1));
  };

  // Check if a product is in the cart
  const isInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  const handleAddToCart = async (event, item) => {
    event.stopPropagation();

    setLoadingItems(prev => ({ ...prev, [item._id]: true }));

    try {
      const response = await axios.post("/api/products/cart/add", {
        customerId: JSON.parse(localStorage.getItem("authUser"))._id,
        productId: item._id,
        quantity: 1,
      });
      console.log(response.data);

      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...cartItems];
        const currentQuantity = updatedCart[existingItemIndex].cartQuantity;

        if (currentQuantity < item.quantity) {
          updatedCart[existingItemIndex].cartQuantity = currentQuantity + 1;
          setCartItems(updatedCart);
        }
      } else {
        setCartItems([...cartItems, { ...item, cartQuantity: 1 }]);
      }
      setIsCartOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [item._id]: false }));
    }
  };

  const handleRemoveFromCart = async (event, item) => {
    event.stopPropagation();

    setLoadingItems(prev => ({ ...prev, [item._id]: true }));

    try {
      const response = await axios.delete("/api/products/cart/remove", {
        data: {
          customerId: JSON.parse(localStorage.getItem("authUser"))._id,
          productId: item._id
        }
      });

      console.log(response.data);

      // Remove item from local cart state
      setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    } catch (error) {
      console.log("Error removing item from cart:", error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [item._id]: false }));
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, cartQuantity: newQuantity } : item
      )
    );
  };

  // Update wishlist handling functions to match ProductList
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

  const addToCartFromWishlist = (item) => {
    handleAddToCart({ stopPropagation: () => { } }, item);
  };

  const handleCardClick = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className={styles.productScrollContainer} id="products">
      <div className={styles.header}>
        <h2 className={styles.title}>FEATURED PRODUCTS</h2>
        <button className={styles.seeAllButton} onClick={() => navigate("/productList")} >
          See All
        </button>
      </div>

      <div className={styles.productSlider}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrevious} >
          <FaChevronLeft />
        </button>

        <div className={styles.productsContainer}>
          <div className={styles.productsWrapper}
            style={{
              transform: `translateX(-${currentIndex * (100 / 4 + 1.5)}%)`,
            }}
          >
            {products.map((product) => (
              <div key={product._id} className={styles.productCard} onClick={() => handleCardClick(product)} >
                <div className={styles.productImageContainer}>
                  <button className={styles.heartButton} onClick={(event) => handleAddToWishlist(event, product)} >
                    <IoIosHeart
                      className={styles.wishlistButton}
                      style={{ color: wishlistProductIds.has(product._id) ? "red" : "rgb(184, 182, 182)" }}
                    />
                  </button>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>
                    {product.name}
                    <span className={styles.productRating}>
                      {calculateAverageRating(product.review)} <FaStar className={styles.starIcon} />
                    </span>
                  </h3>
                  <p className={styles.productPrice}>Rs.{product.price}</p>
                  <div className={styles.productFooter}>
                    <p className={styles.stockStatus}
                      style={{
                        color: product.quantity > 0 ? "#059669" : "#ef4444",
                      }}
                    >
                      {product.quantity > 0 ? "In stock" : "Out of stock"}
                    </p>

                    {isInCart(product._id) ? (
                      <button
                        className={`${styles.cartButton} ${styles.removeButton}`}
                        onClick={(event) => handleRemoveFromCart(event, product)}
                        disabled={loadingItems[product._id]}
                      >
                        {loadingItems[product._id] ? (
                          <span className={styles.loader}></span>
                        ) : (
                          <>
                            <FaTrash className={styles.cartIcon} /> Remove
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className={styles.cartButton}
                        onClick={(event) => handleAddToCart(event, product)}
                        disabled={product.quantity <= 0 || loadingItems[product._id]}
                      >
                        {loadingItems[product._id] ? (
                          <span className={styles.loader}></span>
                        ) : (
                          <>
                            <FaCartShopping className={styles.cartIcon} /> Add to cart
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext} >
          <FaChevronRight />
        </button>
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

export default ProductScroll;