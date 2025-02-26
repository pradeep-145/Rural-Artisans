import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

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
    <div className={styles.admin__container}>
      <div className={styles.admin__header}>
        <h1>Welcome Admin!</h1>
        <Link to="/adminLogin">
          <button type="submit" className={styles.admin__logoutBtn}>
            Logout <FiLogOut />
          </button>
        </Link>
      </div>

      <div className={styles.admin__title}>
        <h1>Material Price Management</h1>
        <button
          type="button"
          className={styles.admin__button}
          onClick={() => setAddMaterial(true)}
        >
          Add Material
        </button>

        {addMaterial && (
          <div className={styles.admin__modalOverlay}>
            <div className={styles.admin__modal}>
              <h3>Add Material</h3>
              <button
                className={styles.admin__closeBtn}
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
                <button
                  type="button"
                  className={styles.admin__button}
                  onClick={handleAddMaterial}
                >
                  Add Material
                </button>
              </form>
            </div>
          </div>
        )}

        <button
          type="button"
          className={styles.admin__button}
          onClick={() => setUpdateMaterial(true)}
        >
          Update Material
        </button>

        {updateMaterial && (
          <div className={styles.admin__modalOverlay}>
            <div className={styles.admin__modal}>
              <h3>Update Material</h3>
              <button
                className={styles.admin__closeBtn}
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
                <button
                  type="button"
                  className={styles.admin__button}
                  onClick={handleUpdateMaterial}
                >
                  Update Material
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className={styles.admin__materialList}>
        <h1>Materials List</h1>
        {materials.length > 0 ? (
          materials.map((mat) => (
            <div key={mat._id} className={styles.admin__materialItem}>
              <h3>{mat.name}</h3>
              <h3>{mat.price}</h3>
            </div>
          ))
        ) : (
          <p>No materials added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
