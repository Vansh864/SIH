import { NavLink, Outlet } from "react-router-dom";
import styles from "./SellerHome.module.css";

const SellerInterface = () => {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.brand}>SIH Seller</div>
          <div className={styles.navList}>
            <NavLink
              to="/seller-interface"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/seller-interface/find-buyer"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Find Buyer
            </NavLink>
          </div>
        </div>
      </nav>

      <main className={styles.content}>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default SellerInterface;
