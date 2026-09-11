import { useOutletContext } from "react-router-dom";
import styles from "./BuyerDashboard.module.css";

const BuyerDashboard = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const { buyerId } = useOutletContext();

  const buyer = data.buyer.find((s) => s.id === buyerId);
  const products = buyer.product.filter((pro) => pro != "");

  const metrics = [
    {
      label: "Active orders",
      value: buyer.orders.length,
      note: "Across all crops",
    },
    { label: "Products grown", value: products.length, note: "Crop varieties" },
    { label: "This month", value: "1,280 Kg", note: "Estimated yield" },
    { label: "Avg. rate", value: "₹38 / Kg", note: "Average sold" },
  ];

  const getStatusClass = (status) => {
    if (status === "Packed") return styles.statusPacked;
    if (status === "In transit") return styles.statusInTransit;
    if (status === "Ready") return styles.statusReady;
    return styles.statusDefault;
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>Buyer overview</p>
          <h1 className={styles.title}>
            Welcome back, {buyer?.name || "Farmer"}
          </h1>
        </div>
        <span className={styles.liveBadge}>Buy online</span>
      </header>

      <div className={styles.summaryGrid}>
        <section className={styles.profileCard}>
          <div className={styles.profileHead}>
            <div className={styles.avatar}>{buyer?.name?.charAt(0) || "F"}</div>
            <div>
              <h2>{buyer?.name || "Farmer Name"}</h2>
              <p>{buyer?.email || "seller@example.com"}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div>
              <span>Role</span>
              <strong>Buyer</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>Coimbatore</strong>
            </div>
            <div>
              <span>Trust</span>
              <strong>Excellent</strong>
            </div>
            <div>
              <span>Rating</span>
              <strong>4.8 / 5</strong>
            </div>
          </div>
        </section>

        <section className={styles.productCard}>
          <div className={styles.cardHeader}>
            <h3>Products being bought</h3>
            <span>{products.length} items</span>
          </div>

          <div className={styles.tagList}>
            {products.length > 0 ? (
              products.map((product) => (
                <span key={product} className={styles.tag}>
                  {product}
                </span>
              ))
            ) : (
              <span className={styles.emptyTag}>No products listed yet</span>
            )}
          </div>

          <div className={styles.noteCard}>
            <span className={styles.noteLabel}>Crop note</span>
            <p>Buying Products and Selling.</p>
          </div>
        </section>
      </div>

      <div className={styles.metricGrid}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metricCard}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <strong className={styles.metricValue}>{metric.value}</strong>
            <small>{metric.note}</small>
          </div>
        ))}
      </div>

      <section className={styles.ordersSection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>Orders</p>
            <h2 className={styles.sectionTitle}>Current active orders</h2>
          </div>
          <button type="button" className={styles.viewButton}>
            View all
          </button>
        </div>

        <div className={styles.ordersList}>
          {buyer.orders.map((order) => (
            <article className={styles.orderCard} key={order.id}>
              <div className={styles.orderMainRow}>
                <div className={styles.orderIdentity}>
                  <span className={styles.orderId}>{order.id}</span>
                  <h3>{order.productName}</h3>
                </div>
              </div>

              <div className={styles.orderDetailGrid}>
                <div>
                  <span>Quantity</span>
                  <strong>{order.productQuantity}</strong>
                </div>
                <div>
                  <span>Price</span>
                  <strong>{order.price}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyerDashboard;
