import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState([]);
  const [addMaterial, setAddMaterial] = useState(false);
  const [updateMaterial, setUpdateMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/materials");
      setMaterials(res.data);
    } catch (error) {
      console.error("Error fetching materials", error);
    }
  };

  const handleAddMaterial = async () => {
    if (!material || price <= 0) return alert("Invalid material details");

    try {
      await axios.post("http://localhost:3000/api/materials", {
        name: material,
        price: price,
      });
      fetchMaterials(); // Refresh the list
      setMaterial("");
      setPrice("");
      setAddMaterial(false);
    } catch (error) {
      console.error("Error adding material", error);
    }
  };

  const handleUpdateMaterial = async () => {
    if (!selectedMaterial || price <= 0) return alert("Invalid update details");

    try {
      await axios.put(`http://localhost:3000/api/materials/`, {
        name: selectedMaterial,
        price: price,
      });
      fetchMaterials();
      setUpdateMaterial(false);
      setSelectedMaterial(null);
      setPrice("");
    } catch (error) {
      console.error("Error updating material", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Welcome Admin!</h1>
        <Link to="/adminLogin">
          <button type="submit">
            Logout <FiLogOut />
          </button>
        </Link>
      </div>

      <div>
        <h1>Material Price Management</h1>
        <button type="button" onClick={() => setAddMaterial(true)}>
          Add Material
        </button>

        {addMaterial && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add Material</h3>
              <button
                className="close-btn"
                onClick={() => setAddMaterial(false)}
              >
                ×
              </button>
              <form>
                <label>Material</label>
                <br />
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
                <br />
                <label>Price</label>
                <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleAddMaterial}>
                  Add Material
                </button>
              </form>
            </div>
          </div>
        )}

        <button type="button" onClick={() => setUpdateMaterial(true)}>
          Update Material
        </button>

        {updateMaterial && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Update Material</h3>
              <button
                className="close-btn"
                onClick={() => setUpdateMaterial(false)}
              >
                ×
              </button>
              <form>
                <label>Select Material</label>
                <br />
                <select
                  onChange={(e) =>
                    setSelectedMaterial(JSON.parse(e.target.value))
                  }
                >
                  <option value="">Select</option>
                  {materials.map((mat) => (
                    <option key={mat._id} value={JSON.stringify(mat)}>
                      {mat.name}
                    </option>
                  ))}
                </select>
                <br />
                <label>New Price</label>
                <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleUpdateMaterial}>
                  Update Material
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div>
        <h1>Materials List</h1>
        {materials.length > 0 ? (
          materials.map((mat) => (
            <div key={mat._id}>
              <h3>{mat.name}</h3>
              <h3>{mat.price}</h3>
            </div>
          ))
        ) : (
          <p>No materials added yet.</p>
        )}
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
