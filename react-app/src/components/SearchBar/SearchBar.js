import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBar.module.css";
import { searchThunk } from "../../store/jikan";
import { getUsersThunk } from "../../store/session";

export default function SearchBar() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.session.get_users);
  const animes = useSelector((state) => state.jikan.search);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.category.value === "Anime" && e.target.search.value.length) {
      dispatch(searchThunk(e.target.search.value)); //might have to add an anime argument here for manga integration later
    }
    if (e.target.category.value === "User" && e.target.search.value.length) {
      dispatch(getUsersThunk(e.target.search.value));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search_bar}>
      <select name="category">
        <option>Anime</option>
        <option>User</option>
      </select>
      <input
        name="search"
        type="text"
        placeholder="Search for Animes or Users!"
      />
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}
