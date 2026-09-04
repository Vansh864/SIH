import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import LoginPage from "./pages/Auth/LoginPage";

const App = () => {
  return (
    <AuthProvider>
      <Outlet></Outlet>
    </AuthProvider>
  );
};

export default App;
