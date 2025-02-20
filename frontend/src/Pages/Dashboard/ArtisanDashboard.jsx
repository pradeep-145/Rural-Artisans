import React, { useState } from 'react'

const ArtisanDashboard = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [addProduct, setAddProduct] = useState(false);


    return (
        <div>
            <div>
                <h1>Artisan Dashboard</h1>
                <div>
                    <button onClick={() => setAddProduct(true)}>Add Product</button>
                    {addProduct && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>Add Product</h3>
                                <button onClick={() => setAddProduct(false)}>×</button>
                                <form>
                                    <label>Name</label><br />
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <br />
                                    <label>Price</label><br />
                                    <input
                                        type="number"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <br />
                                    <label>Quantity</label><br />
                                    <input
                                        type="number"
                                        placeholder="Enter quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <br />
                                    <label>Description</label><br />
                                    <input
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <br />
                                    <label>Image</label><br />
                                    <input
                                        type="file"
                                        size={50}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <br />
                                    <button type="button">Add Product</button>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
                <div>
                    <h3>My Orders</h3>
                    
                </div>
                <div>
                    <h3>My Products</h3>
                    <div>
                        {products.map((product) => (
                            <div key={product.id}>
                                <h4>{product.name}</h4>
                                <p>{product.price}</p>
                                <p>{product.quantity}</p>
                                <p>{product.description}</p>
                                <img src={product.image} alt={product.name} />
                            </div>
                        ))}
                        </div>

                </div>

            </div>

            <style>
                {`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                    width: 300px;
                    position: relative;
                }
                
                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                }
                `}
            </style>

        </div>
    )
}

export default ArtisanDashboard