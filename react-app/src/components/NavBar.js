import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import styles from "./NavBar.module.css";
import lister from "../images/lister-title.png";
import SearchBar from "./Search/SearchBar";
import ChannelModal from "./ChannelModal"

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
              <NavLink
                to="/login"
                exact={true}
                activeClassName="active"
                className={styles.navlink}
              >
                <div className={styles.left}>Login</div>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/sign-up"
                exact={true}
                activeClassName="active"
                className={styles.navlink}
              >
                <div className={styles.right}>Sign Up</div>
              </NavLink>
            </div>
          </div>
        )}
        {user && (
          <div className={styles.nav_right}>
            <ChannelModal/>
            <div>
              <NavLink
                to={`/lists/${user.id}/${user.username}`}
                exact={true}
                activeClassName="active"
                className={styles.navlink}
              >
                <div className={styles.left}>Lists</div>
              </NavLink>
            </div>
            <div>
              <NavLink
                to={`/profile/${user.id}/${user.username}`}
                exact={true}
                activeClassName="active"
                className={styles.navlink}
              >
                <div className={styles.right}>{user.username}</div>
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
        <div className={styles.nav_bottom_right}>
          <SearchBar />
          {user && (
            <li>
              <LogoutButton />
            </li>
          )}
        </div>
      </ul>
      <div className={styles.panel}>
        <h1 className={styles.title}>Welcome to Lister! Demo Account Available!</h1>
        <div className={styles.about_me}>
          <div>About Me:</div>
          <div>
            <a
              href="https://github.com/WhirlyFan"
              target="_blank"
              rel="noreferrer"
              className={styles.anchor}
            >
              <i className="fa-brands fa-github fa-xl"></i>
              <div>WhirlyFan</div>
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/michael3l/"
              target="_blank"
              rel="noreferrer"
              className={styles.anchor}
            >
              <i className="fa-brands fa-linkedin fa-xl"></i>
              <div>Michael Lee</div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
