import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import styles from "./auth.module.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const demoButton = () => {
    dispatch(login("demo@aa.io", "password")).then((data) => {
      if (data) {
        setErrors(data);
      }
    });
  };

  return (
    <div className={styles.login_body}>
      <div className={styles.login_content}>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="error">
                {error}
              </div>
            ))}
          </div>
          <div className={styles.login_input}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <p className={styles.login_warning}>
            Beware of phishing sites pretending to be Lister. Always check the
            domain is myanimelist.net before entering your password.
          </p>
          <button type="submit" className={styles.login_button}>
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              demoButton();
            }}
            className={styles.demo_button}
          >
            Demo User
          </button>
          <p>
            Don't have an account?{" "}
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
