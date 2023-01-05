import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createListThunk } from "../../store/lists";
import { signUp } from "../../store/session";
import styles from "./auth.module.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  //! need to add default lists to the user
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
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className={styles.signup}>
      <div className={styles.body}>
        <h2>Start Using Lister</h2>
        <p>
          Join Lister to catalog your anime and manga, compare with your
          friends, create your own profile, and plenty more. It's Free.
        </p>
        <hr></hr>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required
          ></input>
        </div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
