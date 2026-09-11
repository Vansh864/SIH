import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom";
import styles from "./BuyerHome.module.css";

const BuyerHome = () => {
  let buyerId = useLoaderData();
  buyerId = JSON.parse(buyerId);

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.brand}>SIH Seller</div>
          <div className={styles.navList}>
            <NavLink
              to="/buyer-interface"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/buyer-interface/find-seller"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Find Seller
            </NavLink>
            <NavLink
              to="/buyer-interface/buy-order"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              + Create Buy Order
            </NavLink>
          </div>
        </div>
      </nav>

      <main className={styles.content}>
        <Outlet context={{ buyerId }}></Outlet>
        {/* This can be used using useOutletContext in the children pages */}
      </main>
    </div>
  );
};

export const buyerHomeLoader = () => {
  const buyerObj = JSON.parse(localStorage.getItem("loggedInUser"));
  if (buyerObj == null || buyerObj.role !== "buyer") return redirect("/");
  return JSON.stringify(buyerObj.id);
};

export default BuyerHome;
