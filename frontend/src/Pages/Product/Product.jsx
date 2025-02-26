import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { useState } from 'react';
import styles from './Product.module.css';
import CartSidebar from '../../Components/CartSidebar/CartSidebar';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    const [count, setCount] = useState(1);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleBack = () => {
        navigate(-1);
    };

    const increment = () => {
        if (count < product.quantity) {
            setCount(count + 1);
        }
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const handleAddToCart = () => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === product._id);

        if (existingItemIndex >= 0) {
            const updatedCart = [...cartItems];
            const newQuantity = Math.min(
                updatedCart[existingItemIndex].cartQuantity + count,
                product.quantity
            );
            updatedCart[existingItemIndex].cartQuantity = newQuantity;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, cartQuantity: count }]);
        }

        setIsCartOpen(true);
    };

    const handleRemoveFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item._id !== itemId));
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item._id === itemId ? { ...item, cartQuantity: newQuantity } : item
        ));
    };

    const rating = 4.5;
    const totalReviews = product?.review?.length || 0;

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} />);
            } else if (i - rating < 1) {
                stars.push(<FaStar key={i} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }
        return stars;
    };

    if (!product) {
        return <h1>Product not found</h1>;
    }

    const writeReview = () => {
        console.log('Write a review');
    }

    return (
        <div className={styles.productContainer}>
            <button onClick={handleBack} className={styles.backButton}>
                <FaArrowLeft />
                <span>Back</span>
            </button>
            <div className={styles.productContent}>
                <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                </div>

                <div className={styles.productDetails}>
                    <div className={styles.productHeaderDetails}>
                        <h1 className={styles.productTitle}>{product.name}</h1>
                        <button className={styles.heartButton}>
                            <FaRegHeart />
                        </button>
                    </div>

                    <div className={styles.ratingContainer}>
                        <div className={styles.starRating}>
                            {renderStars(rating)}
                        </div>
                        <span className={styles.ratingCount}>({totalReviews} reviews)</span>
                    </div>

                    <div className={styles.priceContainer}>
                        <span className={styles.currentPrice}>Rs.{product.price}.00</span>
                    </div>

                    <p className={styles.productDescription}>
                        {product.description || "No description available."}
                    </p>

                    <div className={styles.actionContainer}>
                        <div className={styles.quantityControls}>
                            <button
                                className={styles.quantityButton}
                                onClick={decrement}
                                disabled={count <= 1}
                            >
                                <HiMinus />
                            </button>
                            <span className={styles.quantityDisplay}>{count}</span>
                            <button
                                className={styles.quantityButton}
                                onClick={increment}
                                disabled={count >= product.quantity}
                            >
                                <GoPlus />
                            </button>
                        </div>

                        <button
                            className={styles.addToCartButton}
                            onClick={handleAddToCart}
                            disabled={product.quantity <= 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.reviewsSection}>
                <div className={styles.reviewsHeader}>
                    <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
                    <button className={styles.writeReviewButton} onClick={() => writeReview()}>
                        Write a Review
                    </button>
                </div>
                {
                    product.review && product.review.length > 0 ? product.review.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewerName}>{review.customerName}</div>
                                <div className={styles.reviewDate}>2 days ago</div>
                            </div>
                            <div className={styles.starRating}>
                                {renderStars(review.rating)}
                            </div>
                            <p className={styles.reviewContent}>
                                {review.comment}
                            </p>
                        </div>
                    )) : <h3>No reviews yet</h3>
                }
            </div>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                removeFromCart={handleRemoveFromCart}
                updateQuantity={handleUpdateQuantity}
            />
        </div>
    );
}

export default Product;