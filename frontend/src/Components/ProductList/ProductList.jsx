
const ProductList = () => {

    const items = [{ img: "https://www.shutterstock.com/image-photo/gender-neutral-baby-garment-organic-600nw-1987778996.jpg", name: "Baby Garment", price: 100, id: 1 }]
    return (
        <div id="products">
            <div>
                <h1>Products listing</h1>
                <div>
                    {items.map((item, index) => (
                        
                        <div key={index}>
                            <img src={item.img} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList