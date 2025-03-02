import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./ArtisanDashboard.module.css";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const ArtisanDashboard = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [packagingCost, setPackagingCost] = useState("");
  const [tags, setTags] = useState("");
  const [rawMaterials, setRawMaterials] = useState([
    { name: "", cost: "", quantity: "" },
  ]);
  const [addProduct, setAddProduct] = useState(false);

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/${authUser._id}`);
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleRawMaterialChange = (index, field, value) => {
    const updatedRawMaterials = [...rawMaterials];
    updatedRawMaterials[index][field] = value;
    setRawMaterials(updatedRawMaterials);
  };

  const addRawMaterial = () => {
    setRawMaterials([...rawMaterials, { name: "", cost: "", quantity: "" }]);
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !price ||
      !quantity ||
      !description ||
      !image ||
      !packagingCost ||
      rawMaterials.some((rm) => !rm.name || !rm.cost || !rm.quantity) ||
      !tags
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("artisanId", authUser._id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("packagingCost", packagingCost);
    formData.append(
      "tags",
      tags.split(",").map((tag) => tag.trim())
    ); // Convert tags into an array
    formData.append("rawMaterials", JSON.stringify(rawMaterials)); // Send raw materials as JSON

    try {
      const response = await axios.post("/api/products/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setAddProduct(false);
      setProducts((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.artisan__container}>
      <div className={styles.artisan__header}>
        <h1>Artisan Dashboard</h1>
        <Link to="/adminLogin">
          <button type="submit" className={styles.artisan__logoutBtn}>
            Logout <FiLogOut />
          </button>
        </Link>
      </div>

      <div>
        <button
          className={styles.artisan__button}
          onClick={() => setAddProduct(true)}
        >
          Add Product
        </button>
        {addProduct && (
          <div className={styles.artisan__modalOverlay}>
            <div className={styles.artisan__modal}>
              <h3>Add Product</h3>
              <button
                className={styles.artisan__closeBtn}
                onClick={() => setAddProduct(false)}
              >
                ×
              </button>
              <form>
                <label className={styles.label}>Name</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />

                <label className={styles.label}>Price</label>
                <br />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <br />

                <label className={styles.label}>Quantity</label>
                <br />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <br />

                <label className={styles.label}>Description</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />

                <label className={styles.label}>Tags (comma separated)</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <br />

                <label className={styles.label}>Packaging Cost</label>
                <br />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Enter packaging cost"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                />
                <br />

                <label className={styles.label}>Raw Materials</label>
                <br />
                {rawMaterials.map((rm, index) => (
                  <div key={index} className={styles.rawMaterialRow}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Material Name"
                      value={rm.name}
                      onChange={(e) =>
                        handleRawMaterialChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Cost"
                      value={rm.cost}
                      onChange={(e) =>
                        handleRawMaterialChange(index, "cost", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Quantity"
                      value={rm.quantity}
                      onChange={(e) =>
                        handleRawMaterialChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.artisan__button}
                  onClick={addRawMaterial}
                >
                  + Add Raw Material
                </button>
                <br />

                <label className={styles.label}>Image</label>
                <br />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br />

                <button
                  type="button"
                  className={styles.artisan__button}
                  onClick={handleSubmit}
                >
                  Add Product
                </button>
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
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <h4>{product.name}</h4>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>{product.description}</p>
                <p>Packaging Cost: {product.packagingCost}</p>
                <p>Tags: {product.tag.join(", ")}</p>
                <p>Raw Materials:</p>
                <ul>
                  {product.rawMaterials.map((rm, index) => (
                    <li key={index}>
                      {rm.name} - {rm.quantity} units @ ${rm.cost}
                    </li>
                  ))}
                </ul>
                <img src={product.image} alt={product.name} width="100" />
              </div>
            ))
          ) : (
            <p>No products added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
