import { useState } from 'react';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { HiMinus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import CheckoutModal from '../../Components/CheckoutModal/CheckoutModal';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const shippingCost = cartTotal > 1000 ? 0 : 100;
    const tax = cartTotal * 0.05;
    const finalTotal = cartTotal + shippingCost + tax - discount;
    const { authUser } = useAuthContext();

    const handleBack = () => {
        navigate(-1);
    };

    const handleQuantityChange = async (item, newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.productId.quantity) return;
        updateQuantity(item._id, newQuantity);
        const cartItem = cartItems.find(cartItem => cartItem._id === item._id);
        if (cartItem) {
            await axios.post('/api/products/cart/update', {
                id: cartItem._id,
                quantity: newQuantity
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const handleRemoveItem = async (itemId) => {
        removeFromCart(itemId);
        await axios.delete(`/api/products/cart/delete/${itemId}`).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
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
        if (!authUser) {
            alert('Please login to proceed with checkout');
            navigate('/login');
            return;
        }
        setIsCheckoutModalOpen(true);
    };

    const handleCheckoutSubmit = async (shippingData) => {
        try {
            console.log('Order placed with shipping details:', shippingData);
            console.log('Order details:', {
                items: cartItems,
                total: finalTotal,
                discount,
                shipping: shippingCost,
                tax
            });

            setIsCheckoutModalOpen(false);
            alert('Order placed successfully! Your order ID is ' + Math.floor(Math.random() * 10000));

            clearCart();
        } catch (error) {
            console.error('Error placing order:', error);
            alert('There was an error processing your order. Please try again.');
        }
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
                            <div key={item.productId._id} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    <img src={item.productId.image} alt={item.productId.name} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{item.productId.name}</h3>
                                    <p className={styles.itemPrice}>Rs.{item.productId.price}</p>
                                    <p className={styles.stockInfo}>
                                        {item.productId.quantity > 5 ? 'In Stock' : `Only ${item.productId.quantity} left!`}
                                    </p>
                                </div>
                                <div className={styles.itemQuantity}>
                                    <button className={styles.quantityButton} onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                        disabled={item.quantity <= 1} >
                                        <HiMinus />
                                    </button>
                                    <span className={styles.quantityValue}>{item.quantity}</span>
                                    <button className={styles.quantityButton} onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        disabled={item.quantity >= item.productId.quantity} >
                                        <GoPlus />
                                    </button>
                                </div>
                                <div className={styles.itemTotal}>
                                    <p>Rs.{(item.productId.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button className={styles.removeItemButton} onClick={() => handleRemoveItem(item._id)} >
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
                            <input type="text" placeholder="Enter coupon code" value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)} className={styles.couponInput} />
                            <button className={styles.applyCouponButton} onClick={handleApplyCoupon} disabled={couponApplied} >
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

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                finalTotal={finalTotal}
                onSubmit={handleCheckoutSubmit}
            />
        </div>
    );
};

export default Cart;