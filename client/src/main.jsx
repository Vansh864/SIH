import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [{ path: "/", element: <LoginPage></LoginPage> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
