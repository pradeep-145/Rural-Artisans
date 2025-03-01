import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { FaCartShopping, FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Import cart context
import styles from './ProductScroll.module.css';
import { useProducts } from '../../context/ProductContext';
import WishlistSidebar from '../WishlistSidebar/WishlistSidebar';

const ProductScroll = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistProductIds, setWishlistProductIds] = useState(new Set());
    const { addToCart } = useCart(); // Use cart context

    const { products } = useProducts();

    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    const handlePrevious = () => {
        setCurrentIndex(prev =>
            prev === 0 ? Math.max(0, products.length - 4) : Math.max(0, prev - 1)
        );
    };

    const handleNext = () => {
        setCurrentIndex(prev =>
            prev >= products.length - 4 ? 0 : prev + 1
        );
    };

    const handleAddToCart = (event, item) => {
        event.stopPropagation();
        addToCart(item, 1);
        // Add notification feedback here if needed
    };

    const handleAddToWishlist = (event, item) => {
        event.stopPropagation();

        setWishlistProductIds(prevIds => {
            const newIds = new Set(prevIds);

            if (newIds.has(item._id)) {
                newIds.delete(item._id);
                setWishlistItems(wishlistItems.filter(wishlistItem => wishlistItem._id !== item._id));
            } else {
                newIds.add(item._id);
                setWishlistItems([...wishlistItems, item]);
                setIsWishlistOpen(true);
            }

            return newIds;
        });
    };

    const handleRemoveFromWishlist = (itemId) => {
        setWishlistProductIds(prevIds => {
            const newIds = new Set(prevIds);
            newIds.delete(itemId);
            return newIds;
        });
        setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
    };

    const addToCartFromWishlist = (item) => {
        addToCart(item, 1);
    };

    const handleCardClick = (item) => {
        navigate(`/product/${item._id}`, { state: { product: item } });
    };

    return (
        <div className={styles.productScrollContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>FEATURED PRODUCTS</h2>
                <button className={styles.seeAllButton} onClick={() => navigate('/productList')}>
                    See All
                </button>
            </div>

            <div className={styles.productSlider}>
                <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrevious}>
                    <FaChevronLeft />
                </button>

                <div className={styles.productsContainer}>
                    <div className={styles.productsWrapper} style={{
                        transform: `translateX(-${currentIndex * (100 / 4 + 1.5)}%)`
                    }}>
                        {products.map((product) => (
                            <div key={product._id} className={styles.productCard} onClick={() => handleCardClick(product)}>
                                <div className={styles.productImageContainer}>
                                    <button className={styles.heartButton}
                                        onClick={(event) => handleAddToWishlist(event, product)}>
                                        <FaHeart className={styles.wishlistButton}
                                            style={{ color: wishlistProductIds.has(product._id) ? "red" : "rgb(184, 182, 182)" }} />
                                    </button>
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
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
                                        <p className={styles.stockStatus} style={{ color: product.quantity > 0 ? "#059669" : "#ef4444" }}>
                                            {product.quantity > 0 ? "In stock" : "Out of stock"}
                                        </p>
                                        <button className={styles.cartButton}
                                            onClick={(event) => handleAddToCart(event, product)}
                                            disabled={product.quantity <= 0}>
                                            <FaCartShopping className={styles.cartIcon} /> Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
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