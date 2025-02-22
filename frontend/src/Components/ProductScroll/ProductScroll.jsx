import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { FaCartShopping, FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import styles from './ProductScroll.module.css';
import { useProducts } from '../../context/ProductContext';
const ProductScroll = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

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
        console.log("Added to cart:", item);
    };

    const handleAddToWishlist = (event, item) => {
        event.stopPropagation();
        console.log("Added to wishlist:", item);
    };

    const handleCardClick = (item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
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
                <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrevious} >
                    <FaChevronLeft />
                </button>

                <div className={styles.productsContainer}>
                    <div className={styles.productsWrapper} style={{
                        transform: `translateX(-${currentIndex * (100 / 4 + 1.5)}%)`
                    }}>
                        {products.map((product) => (
                            <div key={product.id} className={styles.productCard} onClick={() => handleCardClick(product)}>
                                <div className={styles.productImageContainer}>
                                    <button className={styles.heartButton}
                                        onClick={(event) => handleAddToWishlist(event, product)} >
                                        <FaHeart className={styles.wishlistButton} />
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
                                        <p className={styles.stockStatus} style={{ color: product.quantity > 0 ? "#059669" : "#ef4444" }} >
                                            {product.quantity > 0 ? "In stock" : "Out of stock"}
                                        </p>
                                        <button className={styles.cartButton} onClick={(event) => handleAddToCart(event, product)}
                                            disabled={product.quantity <= 0} >
                                            <FaCartShopping className={styles.cartIcon} /> Add to cart
                                        </button>
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
        </div>
    );
};

export default ProductScroll;

// [
//     {
//         id: 1,
//         name: "Apple iPad",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 4,
//         price: 369.00,
//         quantity: 5
//     },
//     {
//         id: 2,
//         name: "Sony Headphone",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 4,
//         price: 23.99,
//         quantity: 0
//     },
//     {
//         id: 3,
//         name: "Macbook Air",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 4.5,
//         price: 649.00,
//         quantity: 3
//     },
//     {
//         id: 4,
//         name: "Nikon DSLR",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 3,
//         price: 250.00,
//         quantity: 2
//     }, {
//         id: 4,
//         name: "Nikon DSLR",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 3,
//         price: 250.00,
//         quantity: 2
//     }, {
//         id: 4,
//         name: "Nikon DSLR",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 3,
//         price: 250.00,
//         quantity: 2
//     }, {
//         id: 4,
//         name: "Nikon DSLR",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 3,
//         price: 250.00,
//         quantity: 2
//     }, {
//         id: 4,
//         name: "Nikon DSLR",
//         image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
//         rating: 3,
//         price: 250.00,
//         quantity: 2
//     }
// ];