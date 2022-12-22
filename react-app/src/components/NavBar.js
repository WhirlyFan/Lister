import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/topanime" exact={true} activeClassName="active">
            Top Anime
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/lists" exact={true} activeClassName="active">
            Lists
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
