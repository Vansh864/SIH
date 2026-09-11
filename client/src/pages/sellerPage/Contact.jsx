import { useParams, useNavigate } from "react-router-dom";
import styles from "./Contact.module.css";

const ContactThekedar = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const { id } = useParams();
  const navigate = useNavigate();

  const thekedar = data.buyer.find((t) => t.id === Number(id));

  if (!thekedar) {
    return (
      <div className={styles.page}>
        <h2 className={styles.emptyState}>Thekedar Not Found</h2>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/seller-interface")}
        >
          ← Back to Dashboard
        </button>

        <h2 className={styles.title}>{thekedar.name}</h2>
        <hr className={styles.divider} />

        <div className={styles.metaList}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Product Offering</span>
            <span className={styles.infoValue}>
              {thekedar.product || "General demand"}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email</span>
            <span className={styles.infoValue}>{thekedar.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Role</span>
            <span className={styles.infoValue}>{thekedar.role}</span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <a href={`mailto:${thekedar.email}`}>
            <button className={styles.primaryAction}>
              Email {thekedar.email}
            </button>
          </a>
          <button
            className={styles.secondaryAction}
            onClick={() =>
              alert(
                `Message sent to ${thekedar.name} regarding ${thekedar.product || "your demand"}!`,
              )
            }
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactThekedar;
