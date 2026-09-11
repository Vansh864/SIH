import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom";
import styles from "./SellerHome.module.css";

const SellerHome = () => {
  let sellerId = useLoaderData();
  sellerId = JSON.parse(sellerId);

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
            <NavLink
              to="/seller-interface/sell-order"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              + Create Sell Order
            </NavLink>
          </div>
        </div>
      </nav>

      <main className={styles.content}>
        <Outlet context={{ sellerId }}></Outlet>
        {/* This can be used using useOutletContext in the children pages */}
      </main>
    </div>
  );
};

export const sellerHomeLoader = () => {
  const sellerObj = JSON.parse(localStorage.getItem("loggedInUser"));
  if (sellerObj == null || sellerObj.role !== "seller") return redirect("/");
  return JSON.stringify(sellerObj.id);
};

export default SellerHome;
