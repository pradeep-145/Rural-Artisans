import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { useState } from 'react';
import styles from './Product.module.css';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    const [count, setCount] = useState(1);

    const handleBack = () => {
        navigate(-1);
    };

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const rating = 4.5;
    const totalReviews = 128;

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
                    <img src={product.img} alt={product.name} />
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
                        Discover the beauty of ceramics with our handcrafted. This exquisite
                        piece combines artistry and function, making it a versatile addition to
                        any space. Discover the beauty of ceramics with our handcrafted. This exquisite
                        piece combines artistry and function, making it a versatile addition to
                        any space.
                    </p>

                    <div className={styles.actionContainer}>
                        <div className={styles.quantityControls}>
                            <button className={styles.quantityButton} onClick={decrement}>
                                <HiMinus />
                            </button>
                            <span className={styles.quantityDisplay}>{count}</span>
                            <button className={styles.quantityButton} onClick={increment}>
                                <GoPlus />
                            </button>
                        </div>

                        <button className={styles.addToCartButton}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.reviewsSection}>
                <div className={styles.reviewsHeader}>
                    <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
                    <button className={styles.writeReviewButton} onClick={writeReview()}>Write a Review</button>
                </div>

                <div className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                        <div className={styles.reviewerName}>John Doe</div>
                        <div className={styles.reviewDate}>2 days ago</div>
                    </div>
                    <div className={styles.starRating}>
                        {renderStars(5)}
                    </div>
                    <p className={styles.reviewContent}>
                        Excellent quality and beautiful design. The ceramic planter exceeded my expectations.
                        Perfect size for my indoor plants and adds a touch of elegance to my room.
                    </p>
                </div>

                <div className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                        <div className={styles.reviewerName}>Jane Smith</div>
                        <div className={styles.reviewDate}>1 week ago</div>
                    </div>
                    <div className={styles.starRating}>
                        {renderStars(4)}
                    </div>
                    <p className={styles.reviewContent}>
                        Very satisfied with this purchase. The planter is well-made and looks exactly
                        as pictured. Would definitely recommend to others.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Product;