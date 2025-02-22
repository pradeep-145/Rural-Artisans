import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProductScroll.module.css';

const ProductScroll = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const products = [
        {
            id: 1,
            name: "Apple iPad",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 4,
            price: 369.00
        },
        {
            id: 2,
            name: "Sony Headphone",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 4,
            price: 23.99
        },
        {
            id: 3,
            name: "Macbook Air",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 4.5,
            price: 649.00
        },
        {
            id: 4,
            name: "Nikon DSLR",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 3,
            price: 250.00
        },
        {
            id: 5,
            name: "Nikon DSLR",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 3,
            price: 250.00
        },
        {
            id: 6,
            name: "Nikon DSLR",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 3,
            price: 250.00
        },
        {
            id: 7,
            name: "Nikon DSLR",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 3,
            price: 250.00
        },
        {
            id: 8,
            name: "Nikon DSLR",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 3,
            price: 250.00
        },
        {
            id: 9,
            name: "Nikon DSLR",
            image: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
            rating: 3,
            price: 250.00
        },
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? styles.starFilled : styles.starEmpty} >
                ★
            </span>
        ));
    };

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

    const handleSeeAll = () => {
        navigate('/products');
    };

    return (
        <div className={styles.productScrollContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>FEATURED PRODUCTS</h2>
                <button className={styles.seeAllButton} onClick={handleSeeAll}>
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
                    }} >
                        {products.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.wishlistButton}>
                                    <FaHeart />
                                </div>
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productName}>{product.name}</h3>
                                    <div className={styles.rating}>
                                        {renderStars(product.rating)}
                                    </div>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.price}>
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <button className={styles.addToCartButton}>
                                        ADD TO CART
                                    </button>
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