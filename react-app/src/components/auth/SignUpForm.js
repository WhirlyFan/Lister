import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { createListThunk } from "../../store/lists";
import { signUp } from "../../store/session";
import styles from "./auth.module.css";

const SignUpForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      signUp(username, email, password, repeatPassword)
    );
    if (data) {
      setErrors(data);
    } else {
      dispatch(createListThunk({ name: "Currently Watching", private: false }));
      dispatch(createListThunk({ name: "Completed", private: false }));
      dispatch(createListThunk({ name: "On Hold", private: false }));
      dispatch(createListThunk({ name: "Favorites", private: false }));
      dispatch(createListThunk({ name: "Plan to Watch", private: false }));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    history.push("/");
  }

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <h2 className={styles.signup_header}>Sign Up</h2>
        <p className={styles.signup_desc}>
          Join Lister to catalog your anime, compare with your friends, create
          your own profile, and plenty more. It's Free.
        </p>
        <hr className={styles.signup_line}></hr>
        <form onSubmit={onSignUp} className={styles.form}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="error">
                {error}
              </div>
            ))}
          </div>
          <div className={styles.input}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div className={styles.input}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className={styles.input}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className={styles.input}>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required
            ></input>
          </div>
          <button type="submit" className={styles.blue_button}>
            Sign Up
          </button>
        </form>
        <p className={styles.signup_desc}>
          By clicking Sign Up, you agree to our Terms and Privacy Policy
        </p>
        <p className={styles.signup_desc}>
          Already have an account?{" "}
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </p>
        <p className={styles.signup_desc}>
          © 2023 Lister Co.,Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
