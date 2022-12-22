import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTopAiringAnimeThunk } from "../../store/jikan";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopAiringAnimeThunk());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <h1>Welcome to Lister!</h1>
      <h2>Where you can create lists of your favorite anime!</h2>
      <h3>Sign up or log in to get started!</h3>
      <div>Top Anime</div>
    </div>
  );
}
