import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import AdminHome from "./pages/adminPage/AdminHome.jsx";
import BuyerHome from "./pages/buyerPage/BuyerHome.jsx";
import SellerHome, {
  sellerHomeLoader,
} from "./pages/sellerPage/SellerHome.jsx";
import FindBuyer from "./pages/sellerPage/FindBuyer.jsx";
import Contact from "./pages/sellerPage/Contact.jsx";
import SellOrderForm from "./pages/sellerPage/SellOrderForm.jsx";
import SellerDashboard from "./pages/sellerPage/SellerDashboard.jsx";
import { loginFormSubmitAction } from "./pages/Auth/LoginPage.jsx";
import { sellOrderFormSubmitAction } from "./pages/sellerPage/SellOrderForm.jsx";
import data from "./data.json";

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(data));
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <LoginPage></LoginPage>,
        action: loginFormSubmitAction,
      },
      { path: "/buyer-interface", element: <BuyerHome></BuyerHome> },
      {
        path: "/seller-interface",
        element: <SellerHome></SellerHome>,
        loader: sellerHomeLoader,
        children: [
          { index: true, element: <SellerDashboard></SellerDashboard> },
          { path: "find-buyer", element: <FindBuyer></FindBuyer> },
          { path: ":id", element: <Contact></Contact> },
          {
            path: "sell-order",
            element: <SellOrderForm></SellOrderForm>,
            action: sellOrderFormSubmitAction,
          },
        ],
      },
      { path: "/admin-interface", element: <AdminHome></AdminHome> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
