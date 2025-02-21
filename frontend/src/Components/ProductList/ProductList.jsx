import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const items = [
    {
      img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg",
      name: "Baby Garment",
      price: 100,
      id: 1,
    },
  ];

  const handleCardClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

    return (
        <div id="products">
            <div>
                <h1>Products listing</h1>
                <div>
                    {items.map((item) => (
                        
                        <div key={item.id} onClick={()=>handleCardClick(item)}>
                            <img src={item.img} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductList;
