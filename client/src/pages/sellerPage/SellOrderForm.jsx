import styles from "./SellOrderForm.module.css";
import { useRef, useEffect, useState, act } from "react";
import productList from "../../productList.json";
import {
  useOutletContext,
  Form,
  useActionData,
  redirect,
} from "react-router-dom";
const data = JSON.parse(localStorage.getItem("data"));

const SellOrderForm = () => {
  const { sellerId } = useOutletContext();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const actionData = useActionData();
  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (actionData && actionData.error) {
      alert(actionData.error);
      formRef.current.reset();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, actionData);

  const selectedProductObj = productList.find((p) => p.item === searchProduct);
  const seller = data.seller.find((s) => s.id === sellerId);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Seller Portal</p>
            <h1 className={styles.title}>Add Product Sale</h1>
          </div>
          <span className={styles.badge}>Ready to list</span>
        </div>

        <Form className={styles.form} method="POST" ref={formRef}>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span className={styles.label}>Product name</span>
              <div className={styles.customSelectContainer} ref={dropdownRef}>
                <div
                  className={`${styles.searchInput} ${styles.customSelectValue}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedProductObj ? (
                    <>
                      <img
                        src={selectedProductObj.image}
                        alt={selectedProductObj.item}
                        className={styles.selectImage}
                      />
                      <span className={styles.capitalize}>
                        {selectedProductObj.item}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "#758a80" }}>Select Product</span>
                  )}
                  {/* Simple dropdown arrow */}
                  <span className={styles.arrow}>
                    {isDropdownOpen ? "▲" : "▼"}
                  </span>
                </div>

                {isDropdownOpen && (
                  <ul className={styles.customSelectList}>
                    <li
                      className={styles.customSelectOption}
                      onClick={() => {
                        setSearchProduct("");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Clear Selection
                    </li>
                    {productList.map(
                      (product) =>
                        seller.product.find((pro) => pro == product.item) && (
                          <li
                            key={product.id}
                            className={styles.customSelectOption}
                            onClick={() => {
                              setSearchProduct(product.item);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.item}
                              className={styles.selectImage}
                            />
                            <span className={styles.capitalize}>
                              {product.item}
                            </span>
                          </li>
                        ),
                    )}
                  </ul>
                )}
              </div>
              <input
                type="hidden"
                name="productName"
                value={selectedProductObj ? selectedProductObj.item : ""}
              />
              <input
                type="hidden"
                name="seller"
                value={JSON.stringify(seller)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Product quantity</span>
              <div className={styles.quantityInputWrapper}>
                <input
                  type="number"
                  name="productQuantity"
                  min="1"
                  placeholder="0"
                  className={styles.quantityInput}
                  required
                />
                <span className={styles.quantitySuffix}>
                  {selectedProductObj
                    ? selectedProductObj.measuringParameter
                    : ""}
                </span>
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Price</span>
              <div className={styles.quantityInputWrapper}>
                <input
                  type="number"
                  name="price"
                  min={selectedProductObj ? selectedProductObj.minPrice : 0}
                  placeholder={
                    selectedProductObj ? selectedProductObj.minPrice : 0
                  }
                  className={styles.quantityInput}
                  required
                />
                <span className={styles.quantitySuffix}>
                  {selectedProductObj
                    ? `/${selectedProductObj.measuringParameter}`
                    : ""}
                </span>
              </div>
            </label>
          </div>

          <div className={styles.buttonRow}>
            <button type="button" className={styles.secondaryButton}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton}>
              Submit Order
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const sellOrderFormSubmitAction = async (d) => {
  const formData = await d.request.formData();
  const postData = Object.fromEntries(formData);
  if (postData.productName === "") {
    return { error: "Enter a valid Product Name" };
  }
  for (let s of data.seller) {
    if (s.id == JSON.parse(postData.seller).id) {
      s.orders.push({ ...postData, id: Date.now() });
    }
  }
  localStorage.setItem("data", JSON.stringify(data));
  return redirect("/seller-interface");
};

export default SellOrderForm;
