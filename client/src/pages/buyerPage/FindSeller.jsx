import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productList from "../../productList.json";
import styles from "./FindSeller.module.css";

const FindSeller = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const [searchName, setSearchName] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSellers = data.seller.filter((t) => {
    const name = t.name.toLowerCase();
    const product = t.product;

    return (
      name.includes(searchName.toLowerCase()) && product.includes(searchProduct)
    );
  });

  // Find the selected product object so we can display its image in the closed state
  const selectedProductObj = productList.find((p) => p.item === searchProduct);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Marketplace</p>
          <h2 className={styles.title}>Find Seller</h2>
        </div>
      </div>

      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Seller by Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        {/* CUSTOM DROPDOWN COMPONENT */}
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
            <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
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
              {productList.map((product) => (
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
                  <span className={styles.capitalize}>{product.item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {filteredSellers.map((seller) => (
          <div key={seller.id} className={styles.card}>
            <div className={styles.cardInfo}>
              <h3 className={styles.name}>{seller.name}</h3>
              <span className={styles.badge}>Seller Profile</span>
              <p className={styles.product}>Product: {seller.product}</p>
            </div>
            <button
              className={styles.actionButton}
              onClick={() => navigate(`/buyer-interface/${seller.id}`)}
            >
              Contact
            </button>
          </div>
        ))}
        {filteredSellers.length === 0 && (
          <p className={styles.emptyState}>
            No Seller found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindSeller;
