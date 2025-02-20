import React, { useState } from 'react';

const AdminDashboard = () => {
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [addMaterial, setAddMaterial] = useState(false);
    const [updateMaterial, setUpdateMaterial] = useState(false);
    const [materials, setMaterials] = useState([]);

    const handleAddMaterial = () => {
        if (material && price) {
            setMaterials([...materials, { name: material, price }]);
            setMaterial('');
            setPrice('');
            setAddMaterial(false);
        }
    };

    return (
        <div>
            <h1>Welcome Admin!</h1>

            <div>
                <h1>Material Price Updation</h1>

                <button type="button" onClick={() => setAddMaterial(true)}>Add Material</button>

                {addMaterial && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Add Material</h3>
                            <button type="button" className="close-btn" onClick={() => setAddMaterial(false)}>×</button>
                            <form>
                                <label>Material</label><br/>
                                <input
                                    type="text"
                                    placeholder="Enter material"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value)}
                                />
                                <br />
                                <label>Price</label><br/>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <br />
                                <button type="button" onClick={handleAddMaterial}>Add Material</button>
                            </form>
                        </div>
                    </div>
                )}

                <button type="button" onClick={() => setUpdateMaterial(true)}>Update Material</button>

                {updateMaterial && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Update Material</h3>
                            <button type="button" className="close-btn" onClick={() => setUpdateMaterial(false)}>×</button>
                            <form>
                                <label>Material</label><br/>
                                <input
                                    type="text"
                                    placeholder="Enter material"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value)}
                                />
                                <br />
                                <label>Price</label><br/>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <br />
                                <button type="button">Update Material</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h1>Materials List</h1>
                {materials.length > 0 ? (
                    materials.map((mat, index) => (
                        <div key={index}>
                            <h3>{mat.name}</h3>
                            <h3>{mat.price}</h3>
                        </div>
                    ))
                ) : (
                    <p>No materials added yet.</p>
                )}
            </div>

            <div>
                <h1>Unverified Products</h1>
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
    );
};

export default AdminDashboard;
