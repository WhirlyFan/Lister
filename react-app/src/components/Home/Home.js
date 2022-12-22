import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTopAiringAnimeThunk,
  getTopUpcomingAnimeThunk,
  getMostPopularAnimeThunk,
} from "../../store/jikan";
import styles from "./Home.module.css";
import AnimeCard from "./AnimeCard";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [topAiringAnime, setTopAiringAnime] = useState({});
  const [topUpcomingAnime, setTopUpcomingAnime] = useState({});
  const [mostPopularAnime, setMostPopularAnime] = useState({});

  useEffect(() => {
    dispatch(getTopAiringAnimeThunk())
      .then((data) => {
        setTopAiringAnime(data.data);
      })
      .then(() => {
        dispatch(getTopUpcomingAnimeThunk()).then((data) => {
          setTopUpcomingAnime(data.data);
        });
      })
      .then(() => {
        dispatch(getMostPopularAnimeThunk()).then((data) => {
          setMostPopularAnime(data.data);
          setTimeout(() => {
            setIsLoaded(true);
          }, 1200);
        });
      });
  }, [dispatch]);

  if (!isLoaded) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div className={styles.home}>
      <h1>Welcome to Lister!</h1>
      <h2>Where you can create lists of your favorite anime!</h2>
      <h3>Sign up or log in to get started!</h3>
      <div>
        <h2>Top Airing Anime</h2>
        {topAiringAnime.slice(0, 10).map((anime) => {
          return <AnimeCard key={`anime-${anime.mal_id}`} anime={anime} />;
        })}
        <h2>Top Upcoming Anime</h2>
        {topUpcomingAnime.slice(0, 10).map((anime) => {
          return <AnimeCard key={`anime-${anime.mal_id}`} anime={anime} />;
        })}
        <h2>Most Popular Anime</h2>
        {mostPopularAnime.slice(0, 10).map((anime) => {
          return <AnimeCard key={`anime-${anime.mal_id}`} anime={anime} />;
        })}
      </div>
    </div>
  );
}
