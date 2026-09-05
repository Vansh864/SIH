import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import AdminHome from "./pages/adminPage/AdminHome.jsx";
import BuyerHome from "./pages/buyerPage/BuyerHome.jsx";
import SellerHome from "./pages/sellerPage/SellerHome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <LoginPage></LoginPage> },
      { path: "/buyer-interface", element: <BuyerHome></BuyerHome> },
      { path: "/seller-interface", element: <SellerHome></SellerHome> },
      { path: "/admin-interface", element: <AdminHome></AdminHome> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
