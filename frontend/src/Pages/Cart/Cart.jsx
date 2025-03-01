import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { HiMinus } from 'react-icons/hi';
import { GoPlus } from 'react-icons/go';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);

    const shippingCost = cartTotal > 1000 ? 0 : 100;
    const tax = cartTotal * 0.05;
    const finalTotal = cartTotal + shippingCost + tax - discount;

    const handleBack = () => {
        navigate(-1);
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.quantity) return;
        updateQuantity(item._id, newQuantity);
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === 'discount10') {
            const discountAmount = cartTotal * 0.1;
            setDiscount(discountAmount);
            setCouponApplied(true);
        } else {
            setDiscount(0);
            setCouponApplied(false);
        }
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
    };

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartHeader}>
                <button className={styles.backButton} onClick={handleBack}>
                    <FaArrowLeft />
                    <span>Back</span>
                </button>
                <h1 className={styles.cartTitle}>Shopping Cart</h1>
                {cartItems.length > 0 && (
                    <button className={styles.clearCartButton} onClick={clearCart}>
                        Clear Cart
                    </button>
                )}
            </div>

            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to your cart to see them here.</p>
                    <button className={styles.continueShoppingButton} onClick={() => navigate('/productList')}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div key={item._id} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <p className={styles.itemPrice}>Rs.{item.price}</p>
                                    <p className={styles.stockInfo}>
                                        {item.quantity > 5 ? 'In Stock' : `Only ${item.quantity} left!`}
                                    </p>
                                </div>
                                <div className={styles.itemQuantity}>
                                    <button
                                        className={styles.quantityButton}
                                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <HiMinus />
                                    </button>
                                    <span className={styles.quantityValue}>{item.quantity}</span>
                                    <button
                                        className={styles.quantityButton}
                                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        disabled={item.quantity >= item.quantity}
                                    >
                                        <GoPlus />
                                    </button>
                                </div>
                                <div className={styles.itemTotal}>
                                    <p>Rs.{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button
                                    className={styles.removeItemButton}
                                    onClick={() => handleRemoveItem(item._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <h2>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                            <span>Rs.{cartTotal.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shippingCost === 0 ? 'Free' : `Rs.${shippingCost.toFixed(2)}`}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Tax (5%)</span>
                            <span>Rs.{tax.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                            <div className={styles.summaryRow}>
                                <span>Discount</span>
                                <span>-Rs.{discount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className={styles.couponSection}>
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className={styles.couponInput}
                            />
                            <button
                                className={styles.applyCouponButton}
                                onClick={handleApplyCoupon}
                                disabled={couponApplied}
                            >
                                {couponApplied ? 'Applied' : 'Apply'}
                            </button>
                        </div>

                        {couponApplied && (
                            <p className={styles.couponMessage}>Coupon applied successfully!</p>
                        )}

                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>Rs.{finalTotal.toFixed(2)}</span>
                        </div>

                        <button className={styles.checkoutButton} onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>

                        <div className={styles.paymentInfo}>
                            <p>Secure Checkout</p>
                            <div className={styles.paymentMethods}>
                                <span>Accepts all major payment methods</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;