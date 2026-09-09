import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data.json";
import styles from "./FindBuyer.module.css";

const FindBuyer = () => {
  const [searchName, setSearchName] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();

  const filteredBuyers = data.buyer.filter((t) => {
    const name = (t.name || "").toLowerCase();
    const product = (t.product || "").toLowerCase();

    return (
      name.includes(searchName.toLowerCase()) &&
      product.includes(searchProduct.toLowerCase())
    );
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Marketplace</p>
          <h2 className={styles.title}>Find Buyer</h2>
        </div>
        <button
          className={styles.primaryButton}
          onClick={() => navigate(`/seller-interface/sell-order`)}
        >
          + Create Sell Order
        </button>
      </div>

      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Buyer by Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by Product..."
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filteredBuyers.map((buyer) => (
          <div key={buyer.id} className={styles.card}>
            <div className={styles.cardInfo}>
              <h3 className={styles.name}>{buyer.name}</h3>
              <span className={styles.badge}>Buyer Profile</span>
              <p className={styles.product}>Product: {buyer.product}</p>
            </div>
            <button
              className={styles.actionButton}
              onClick={() => navigate(`/seller-interface/${buyer.id}`)}
            >
              View Prices & Contact
            </button>
          </div>
        ))}
        {filteredBuyers.length === 0 && (
          <p className={styles.emptyState}>
            No buyers found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindBuyer;
