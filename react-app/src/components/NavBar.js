import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import styles from "./NavBar.module.css";
import lister from "../images/lister-title.png";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_top}>
        <NavLink to="/" exact={true} activeClassName="active">
          <img src={lister} alt={"logo"} className="logo"></img>
        </NavLink>
        {!user && (
          <div className={styles.nav_right}>
            <div>
              <NavLink to="/login" exact={true} activeClassName="active">
                <button>Login</button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                <button>Sign Up</button>
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
      <ul className={styles.nav_bottom}>
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
      {/* <h1 className={styles.panel}>My Panel</h1> */}
    </nav>
  );
};

export default NavBar;
