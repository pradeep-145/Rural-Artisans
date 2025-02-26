import { useState, useEffect } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import styles from './CartSidebar.module.css';

const CartSidebar = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity }) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (isOpen) {
            setAnimationClass(styles.cartSidebarOpen);
        } else {
            setAnimationClass(styles.cartSidebarClose);
        }
    }, [isOpen]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0).toFixed(2);
    };

    return (
        <>
            {isOpen && (
                <div className={styles.cartOverlay} onClick={onClose}></div>
            )}

            <div className={`${styles.cartSidebar} ${animationClass}`}>
                <div className={styles.cartHeader}>
                    <h2>Your Cart ({cartItems.length})</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.cartItems}>
                            {cartItems.map((item) => (
                                <div key={item._id} className={styles.cartItem}>
                                    <div className={styles.cartItemImage}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.cartItemInfo}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.itemPrice}>Rs.{item.price}</p>
                                        <div className={styles.quantityControls}>
                                            <button
                                                onClick={() => updateQuantity(item._id, Math.max(1, item.cartQuantity - 1))}
                                                disabled={item.cartQuantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.cartQuantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, Math.min(item.quantity, item.cartQuantity + 1))}
                                                disabled={item.cartQuantity >= item.quantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button className={styles.removeButton} onClick={() => removeFromCart(item._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.cartFooter}>
                            <div className={styles.cartTotal}>
                                <span>Total:</span>
                                <span>Rs.{calculateTotal()}</span>
                            </div>
                            <button className={styles.checkoutButton}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
