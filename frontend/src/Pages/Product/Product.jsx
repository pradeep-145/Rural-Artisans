import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { useState } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Product = () => {
    const location = useLocation();
    const product = location.state?.product;
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }


    if (!product) {
        return <h1>Product not found</h1>;
    }

    return (
        <div>

            <div>
                <div>
                    <Link to="/">
                        <button><FaArrowLeft /></button>
                    </Link>
                    <h1>Product detail page</h1>
                </div>
                <div>
                    <img src={product.img} alt={product.name} />
                </div>
                <div>
                    <div>
                        <h3>{product.name}</h3>
                        <button><FaRegHeart /></button>
                    </div>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <div>
                        <button onClick={increment}><GoPlus /></button>
                        <span>{count}</span>
                        <button onClick={decrement}><HiMinus /></button>
                    </div>
                    <button>Add to Cart</button>
                </div>
            </div>

            <div>
                <h1>Reviews and ratings</h1>
            </div>

        </div>
    )
}

export default Product