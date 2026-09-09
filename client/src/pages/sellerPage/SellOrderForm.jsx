import styles from "./SellOrderForm.module.css";

const SellOrderForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span className={styles.label}>Product name</span>
              <input
                type="text"
                name="productName"
                placeholder="e.g. Rice, Wheat, Sugar"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Product quantity</span>
              <input
                type="number"
                name="productQuantity"
                min="1"
                placeholder="Enter quantity"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Price</span>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                placeholder="Enter price"
                className={styles.input}
              />
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
        </form>
      </div>
    </div>
  );
};

export default SellOrderForm;
