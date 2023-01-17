import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Search.module.css";
import { searchThunk } from "../../store/jikan";
import { getUsersThunk } from "../../store/session";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (e.target.category.value === "Anime" && e.target.search.value.length) {
  //     dispatch(searchThunk(e.target.search.value)).then((data) => {
  //       if (data.status) {
  //         setTimeout(() => {
  //           dispatch(searchThunk(e.target.search.value));
  //         }, 1500);
  //       } else {
  //         history.push("/search/animes");
  //       }
  //     }); //might have to add an anime argument here for manga integration later
  //   }
  //   if (e.target.category.value === "User" && e.target.search.value.length) {
  //     dispatch(getUsersThunk(e.target.search.value)).then(() => {
  //       history.push("/search/users");
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchThunk(e.target.search.value)).then((data) => {
      if (data.status) {
        setTimeout(() => {
          dispatch(searchThunk(e.target.search.value));
        }, 1500);
      } else {
        history.push("/search/animes");
      }
    }); //might have to add an anime argument here for manga integration later
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search_bar}>
      {/* <select name="category">
        <option>Anime</option>
        <option>User</option>
      </select> */}
      <input name="search" type="text" placeholder="Search for Animes" />
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}
