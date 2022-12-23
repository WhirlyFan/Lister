import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav>
      <div className={styles.nav}>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
        {!user && (
          <div className={styles.nav_right}>
            <div>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
        {user && (
          <div className={styles.nav_right}>
            <div>
              <NavLink
                to={`/lists/${user.id}`}
                exact={true}
                activeClassName="active"
              >
                Lists
              </NavLink>
            </div>
            <div>
              <NavLink to="/login" exact={true} activeClassName="active">
                {user.username}
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/topanime" exact={true} activeClassName="active">
            Top Anime
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
