import React from 'react'
import { useState } from 'react'

const AdminDashboard = () => {
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const materials = [];

    return (
        <div>
            <div>
                <h1>Welcome Admin!</h1>
                <div>
                    <h1>Material Price Updation</h1>
                    <button type="button">Add Material</button>
                    <button type="button">Update Material</button>
                </div>
                <div>
                    <h1>Materials list</h1>
                    {materials.map((material, index) => {
                        <div key={index}>
                            <h3>{material.material}</h3>
                            <h3>{material.price}</h3>
                        </div>
                    })}

                </div>
                <div>
                    <h1>Unverified Products</h1>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard