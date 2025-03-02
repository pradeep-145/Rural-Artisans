import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const {authUser}=useAuthContext()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setCartCount(itemCount);
    setCartTotal(totalPrice);
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    console.log(product)
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        
        if (newQuantity <= product.quantity) {
          updatedItems[existingItemIndex].quantity = newQuantity;
        }
        
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = async (productId, quantity) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    }));
    



  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    setCartItems,
    setCartCount,
    setCartTotal,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;