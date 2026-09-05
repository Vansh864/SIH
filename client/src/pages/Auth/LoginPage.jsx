import { useRef } from "react";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailElement = useRef("");
  const passElement = useRef("");
  const roleElement = useRef("");
  const navigate = useNavigate();

  const checkData = (arr, email, pass) => {
    for (let user of arr) {
      if (user.email == email && user.password == pass) return true;
    }
    return false;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailElement.current.value;
    const pass = passElement.current.value;
    const role = roleElement.current.value;
    emailElement.current.value = "";
    passElement.current.value = "";
    roleElement.current.value = "";
    let arr;
    if (role === "buyer") {
      arr = data.buyer;
    }
    if (role === "seller") {
      arr = data.seller;
    }
    if (role === "admin") {
      arr = data.admin;
    }
    if (checkData(arr, email, pass)) {
      console.log("Data found");
      navigate(`/${role}-interface`);
    } else {
      console.log("Date Doesnt exist");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login to SIH Platform</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        onSubmit={formSubmitHandler}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          ref={emailElement}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          ref={passElement}
        />
        <select name="role" required ref={roleElement}>
          <option value="">Role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
