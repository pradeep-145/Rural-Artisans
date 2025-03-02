import React, { useState, useEffect } from "react";
import { FiLogOut, FiEdit, FiCheck, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

const AdminDashboard = () => {
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState([]);
  const [addMaterial, setAddMaterial] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/admin/get-material"
      );
      setMaterials(res.data);
    } catch (error) {
      console.error("Error fetching materials", error);
    }
  };

  const handleAddMaterial = async () => {
    if (!material || price <= 0) return alert("Invalid material details");

    try {
      await axios.post("http://localhost:3001/api/admin/add-material", {
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

  const startEditing = (material) => {
    setEditingMaterialId(material._id);
    setEditPrice(material.price);
  };

  const cancelEditing = () => {
    setEditingMaterialId(null);
    setEditPrice("");
  };

  const handleUpdateMaterial = async (materialName) => {
    if (editPrice <= 0) return alert("Invalid price");

    try {
      await axios.post(`http://localhost:3001/api/admin/add-material`, {
        name: materialName,
        price: editPrice,
      });
      fetchMaterials();
      setEditingMaterialId(null);
      setEditPrice("");
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
                <label className={styles.label}>Material</label>
                <br />
                <input
                  className={styles.input}
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
                <br />
                <label className={styles.label}>Price</label>
                <br />
                <input
                  className={styles.input}
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
      </div>

      <div className={styles.admin__materialList}>
        <h1>Materials List</h1>
        {materials.length > 0 ? (
          materials.map((mat) => (
            <div key={mat._id} className={styles.admin__materialItem}>
              <h3>{mat.name}</h3>

              {editingMaterialId === mat._id ? (
                <div className={styles.admin__editActions}>
                  <input
                    type="number"
                    className={styles.admin__inlineEdit}
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                  <button
                    className={styles.admin__iconButton}
                    onClick={() => handleUpdateMaterial(mat.name)}
                  >
                    <FiCheck className={styles.admin__iconSave} />
                  </button>
                  <button
                    className={styles.admin__iconButton}
                    onClick={cancelEditing}
                  >
                    <FiX className={styles.admin__iconCancel} />
                  </button>
                </div>
              ) : (
                <div className={styles.admin__priceDisplay}>
                  <h3>{mat.price}</h3>
                  <button
                    className={styles.admin__iconButton}
                    onClick={() => startEditing(mat)}
                  >
                    <FiEdit className={styles.admin__iconEdit} />
                  </button>
                </div>
              )}
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
