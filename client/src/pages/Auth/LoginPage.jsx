import { useEffect, useRef } from "react";
import data from "../../data.json";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const actionData = useActionData();
  const formRef = useRef();

  useEffect(() => {
    if (actionData && actionData.error) {
      alert(actionData.error);
      formRef.current.reset();
    }
  }, actionData);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>SIH Platform</div>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>
          Welcome back. Choose your role and continue.
        </p>
        <Form className={styles.form} method="POST" ref={formRef}>
          <input
            className={styles.field}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            className={styles.field}
            type="password"
            placeholder="Password"
            name="password"
            required
            defaultValue=""
          />
          <select className={styles.select} name="role" required>
            <option value="">Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <button className={styles.submitButton} type="submit">
            Sign In
          </button>
        </Form>
      </div>
    </div>
  );
};

export const loginFormSubmitAction = async (d) => {
  const formData = await d.request.formData();
  const postData = Object.fromEntries(formData);

  const checkData = (arr, email, pass) => {
    return arr.find((user) => user.email === email && user.password === pass);
  };

  let arr;
  if (postData.role === "buyer") {
    arr = data.buyer;
  }
  if (postData.role === "seller") {
    arr = data.seller;
  }
  if (postData.role === "admin") {
    arr = data.admin;
  }

  const user = checkData(arr, postData.email, postData.password);
  if (user) {
    return redirect(`/${postData.role}-interface`);
  } else {
    return { error: "Invalid email, password, or role selection!" };
  }
};

export default LoginPage;
