import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import styles from "./auth.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      //temporary fix that navigates user back a page if their history is greater than 2
      if (history.length > 2) history.goBack();
      else history.push("/");
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoButton = () => {
    dispatch(login("demo@aa.io", "password")).then((data) => {
      if (data) {
        setErrors(data);
      } else {
        //temporary fix that navigates user back a page if their history is greater than 2
        if (history.length > 2) history.goBack();
        else history.push("/");
      }
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <h2 className={styles.login_header}>Log In</h2>
        <form onSubmit={onLogin} className={styles.form}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="error">
                {error}
              </div>
            ))}
          </div>
          <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className={styles.login_warning}>
            <i className="fa-solid fa-circle-exclamation user-password-note-icon"></i>
            <p>
              Beware of phishing sites pretending to be Lister. Always check the
              domain is lister.whirlyfan.com before entering your password.
            </p>
          </div>
          <button type="submit" className={styles.blue_button}>
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              demoButton();
            }}
            className={styles.grey_button}
          >
            Demo User
          </button>
          <p className={styles.signup_desc}>
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
