import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./ProductScroll.module.css";
import { useProducts } from "../../context/ProductContext";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
const ProductScroll = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuthContext();
  const { products } = useProducts();

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

    const handleAddToCart = async(event, item) => {
        event.stopPropagation();
        try{
            if(cartItems.find(cartItem=>cartItem._id===item._id)){
                await axios.post('/api/products/cart/update', {
                    id: item._id,
                    quantity: cartItems.find(cartItem=>cartItem._id===item._id).quantity+1
                })
                console.log("Item updated in cart")

                return
            }
            const response=await axios.post('/api/products/cart/add', {
                customerId: authUser.user._id,
                productId: item._id,
                quantity: 1
            })
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);

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
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, cartQuantity: newQuantity } : item
      )
    );
  };

  const handleAddToWishlist = (event, item) => {
    event.stopPropagation();
    console.log("Added to wishlist:", item);
  };

  const handleCardClick = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

  return (
    <div className={styles.productScrollContainer} id="products">
      <div className={styles.header}>
        <h2 className={styles.title}>FEATURED PRODUCTS</h2>
        <button
          className={styles.seeAllButton}
          onClick={() => navigate("/productList")}
        >
          See All
        </button>
      </div>

      <div className={styles.productSlider}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrevious}
        >
          <FaChevronLeft />
        </button>

        <div className={styles.productsContainer}>
          <div
            className={styles.productsWrapper}
            style={{
              transform: `translateX(-${currentIndex * (100 / 4 + 1.5)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className={styles.productCard}
                onClick={() => handleCardClick(product)}
              >
                <div className={styles.productImageContainer}>
                  <button
                    className={styles.heartButton}
                    onClick={(event) => handleAddToWishlist(event, product)}
                  >
                    <FaHeart className={styles.wishlistButton} />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>
                    {product.name}
                    <span className={styles.productRating}>
                      {product.rating} <FaStar className={styles.starIcon} />
                    </span>
                  </h3>
                  <p className={styles.productPrice}>Rs.{product.price}</p>
                  <div className={styles.productFooter}>
                    <p
                      className={styles.stockStatus}
                      style={{
                        color: product.quantity > 0 ? "#059669" : "#ef4444",
                      }}
                    >
                      {product.quantity > 0 ? "In stock" : "Out of stock"}
                    </p>
                    <button
                      className={styles.cartButton}
                      onClick={(event) => handleAddToCart(event, product)}
                      disabled={product.quantity <= 0}
                    >
                      <FaCartShopping className={styles.cartIcon} /> Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductScroll;
