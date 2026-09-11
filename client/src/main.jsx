import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import { loginFormSubmitAction } from "./pages/Auth/LoginPage.jsx";
import AdminHome from "./pages/adminPage/AdminHome.jsx";
import SellerHome, {
  sellerHomeLoader,
} from "./pages/sellerPage/SellerHome.jsx";
import FindBuyer from "./pages/sellerPage/FindBuyer.jsx";
import BuyerContact from "./pages/sellerPage/BuyerContact.jsx";
import SellOrderForm, {
  sellOrderFormSubmitAction,
} from "./pages/sellerPage/SellOrderForm.jsx";
import SellerDashboard from "./pages/sellerPage/SellerDashboard.jsx";
import BuyerHome, { buyerHomeLoader } from "./pages/buyerPage/BuyerHome.jsx";
import FindSeller from "./pages/buyerPage/FindSeller.jsx";
import SellerContact from "./pages/buyerPage/SellerContact.jsx";
import BuyOrderForm, {
  buyOrderFormSubmitAction,
} from "./pages/buyerPage/BuyOrderForm.jsx";
import BuyerDashboard from "./pages/buyerPage/BuyerDashboard.jsx";
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
      {
        path: "/buyer-interface",
        element: <BuyerHome></BuyerHome>,
        loader: buyerHomeLoader,
        children: [
          { index: true, element: <BuyerDashboard></BuyerDashboard> },
          { path: "find-seller", element: <FindSeller></FindSeller> },
          { path: ":id", element: <SellerContact></SellerContact> },
          {
            path: "buy-order",
            element: <BuyOrderForm></BuyOrderForm>,
            action: buyOrderFormSubmitAction,
          },
        ],
      },
      {
        path: "/seller-interface",
        element: <SellerHome></SellerHome>,
        loader: sellerHomeLoader,
        children: [
          { index: true, element: <SellerDashboard></SellerDashboard> },
          { path: "find-buyer", element: <FindBuyer></FindBuyer> },
          { path: ":id", element: <BuyerContact></BuyerContact> },
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
