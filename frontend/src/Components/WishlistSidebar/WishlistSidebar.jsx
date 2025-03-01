import { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaStar } from 'react-icons/fa';
import styles from './WishlistSidebar.module.css';

const WishlistSidebar = ({ isOpen, onClose, wishlistItems, removeFromWishlist, addToCart }) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass(isOpen ? styles.wishlistSidebarOpen : styles.wishlistSidebarClose);
    }, [isOpen]);

    return (
        <>
            {isOpen && <div className={styles.wishlistOverlay} onClick={onClose}></div>}

            <div className={`${styles.wishlistSidebar} ${animationClass}`}>
                <div className={styles.wishlistHeader}>
                    <h2>Your Wishlist ({wishlistItems.length})</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className={styles.emptyWishlist}>
                        Your wishlist is empty
                    </div>
                ) : (
                    <div className={styles.wishlistItems}>
                        {wishlistItems.map((item) => (
                            <div key={item._id} className={styles.wishlistItem}>
                                <div className={styles.wishlistItemImage}>
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className={styles.wishlistItemInfo}>
                                    <div className={styles.rating}>
                                        <FaStar className={styles.starIcon} />
                                        <span>{item.rating}</span>
                                    </div>

                                    <h3>{item.name}</h3>
                                    <p className={styles.itemPrice}>Rs.{item.price}</p>

                                    <p style={{
                                        color: item.quantity > 0 ? "#059669" : "#ef4444"
                                    }}>
                                        {item.quantity > 0 ? "In stock" : "Out of stock"}
                                    </p>

                                    <div className={styles.wishlistItemActions}>
                                        <button
                                            className={styles.addToCartButton}
                                            onClick={() => addToCart(item)}
                                            disabled={item.quantity <= 0}
                                        >
                                            Add to Cart
                                        </button>

                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeFromWishlist(item._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default WishlistSidebar;