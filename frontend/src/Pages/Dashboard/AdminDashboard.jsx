import React, { useState, useEffect } from "react";
import {
  FiLogOut,
  FiEdit,
  FiCheck,
  FiX,
  FiEye,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  // Materials state
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState([]);
  const [addMaterial, setAddMaterial] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  // Products state
  const [unverifiedProducts, setUnverifiedProducts] = useState([]);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    fetchMaterials();
    fetchUnverifiedProducts();
  }, []);

  // Materials functions
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
      await axios.put(`http://localhost:3000/api/admin/add-material`, {
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

  // Products functions
  const fetchUnverifiedProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/products/admin/get"
      );
      // Filter only unverified products
      const unverified = res.data.filter((product) => !product.isVerified);
      setUnverifiedProducts(unverified);
    } catch (error) {
      console.error("Error fetching unverified products", error);
    }
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
    setEvaluationResult(null); // Reset any previous evaluation
  };

  const closeProductView = () => {
    setViewingProduct(null);
    setEvaluationResult(null);
  };

  const evaluateProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/evaluate-price",
        {
          product: viewingProduct,
        }
      );
      setEvaluationResult(res.data);
    } catch (error) {
      console.error("Error evaluating product", error);
      setEvaluationResult({
        error: true,
        message: error.response?.data?.message || "Error evaluating product",
      });
    }
  };

  const verifyProduct = async (productId, isVerified) => {
    try {
      await axios.post(
        `http://localhost:3001/api/admin/verify-product/${productId}`,
        {
          isVerified,
        }
      );
      fetchUnverifiedProducts();
      closeProductView();
    } catch (error) {
      console.error("Error updating verification status", error);
      alert("Error updating verification status");
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

      {/* Product Verification Section */}
      <div className={styles.admin__section}>
        <h1 className={styles.admin__sectionTitle}>Product Verification</h1>

        <div className={styles.admin__products}>
          {unverifiedProducts.length > 0 ? (
            <div className={styles.admin__productGrid}>
              {unverifiedProducts.map((product) => (
                <div key={product._id} className={styles.admin__productCard}>
                  <div className={styles.admin__productImageContainer}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.admin__productImage}
                    />
                  </div>
                  <div className={styles.admin__productDetails}>
                    <h3>{product.name}</h3>
                    <p>Price: ₹{product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <button
                      className={styles.admin__viewButton}
                      onClick={() => handleViewProduct(product)}
                    >
                      <FiEye /> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.admin__noItems}>
              No products pending verification.
            </p>
          )}
        </div>

        {/* Product Details Modal */}
        {viewingProduct && (
          <div className={styles.admin__modalOverlay}>
            <div className={styles.admin__productModal}>
              <h2>Product Details</h2>
              <button
                className={styles.admin__closeBtn}
                onClick={closeProductView}
              >
                ×
              </button>

              <div className={styles.admin__productModalContent}>
                <div className={styles.admin__productModalImageContainer}>
                  <img
                    src={viewingProduct.image}
                    alt={viewingProduct.name}
                    className={styles.admin__productModalImage}
                  />
                </div>

                <div className={styles.admin__productModalDetails}>
                  <h3>{viewingProduct.name}</h3>
                  <p>
                    <strong>Price:</strong> ₹{viewingProduct.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {viewingProduct.quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {viewingProduct.description}
                  </p>
                  <p>
                    <strong>Tags:</strong> {viewingProduct.tag.join(", ")}
                  </p>
                  <p>
                    <strong>Packaging Cost:</strong> ₹
                    {viewingProduct.packagingCost}
                  </p>

                  <div className={styles.admin__materialsList}>
                    <h4>Raw Materials:</h4>
                    <table className={styles.admin__materialsTable}>
                      <thead>
                        <tr>
                          <th>Material</th>
                          <th>Quantity</th>
                          <th>Cost</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewingProduct.rawMaterials?.map((material, index) => (
                          <tr key={index}>
                            <td>{material.name}</td>
                            <td>{material.quantity}</td>
                            <td>₹{material.cost}</td>
                            <td>₹{material.cost * material.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className={styles.admin__evaluationSection}>
                <button
                  className={styles.admin__evaluateButton}
                  onClick={evaluateProduct}
                  disabled={evaluationResult !== null}
                >
                  Evaluate Price
                </button>

                {evaluationResult && (
                  <div
                    className={`${styles.admin__evaluationResult} ${
                      evaluationResult.error
                        ? styles.admin__evaluationError
                        : styles.admin__evaluationSuccess
                    }`}
                  >
                    <p>{evaluationResult.message}</p>
                    {evaluationResult.profitMargin && (
                      <p>Profit Margin: {evaluationResult.profitMargin}</p>
                    )}
                  </div>
                )}

                <div className={styles.admin__verificationActions}>
                  <button
                    className={`${styles.admin__verifyButton} ${styles.admin__approveButton}`}
                    onClick={() => verifyProduct(viewingProduct._id, true)}
                    disabled={!evaluationResult || evaluationResult.error}
                  >
                    <FiThumbsUp /> Approve
                  </button>
                  <button
                    className={`${styles.admin__verifyButton} ${styles.admin__rejectButton}`}
                    onClick={() => verifyProduct(viewingProduct._id, false)}
                  >
                    <FiThumbsDown /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Material Management Section */}
      <div className={styles.admin__section}>
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
            <p className={styles.admin__noItems}>No materials added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
