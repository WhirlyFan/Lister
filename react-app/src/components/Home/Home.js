import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getHomeThunk } from "../../store/jikan";
import styles from "./Home.module.css";
import AnimeCard from "./AnimeCard";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [topAiringAnime, setTopAiringAnime] = useState(false);
  const [topUpcomingAnime, setTopUpcomingAnime] = useState(false);
  const [mostPopularAnime, setMostPopularAnime] = useState(false);
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    dispatch(getHomeThunk())
      .then((data) => {
        if (data.status) {
          setTimeout(() => {
            setDelay(!delay);
          }, 1500); //delay used because of API rate limit
        } else {
          setTopAiringAnime(data.topAiringAnime.data);
          setTopUpcomingAnime(data.topUpcomingAnime.data);
          setMostPopularAnime(data.mostPopularAnime.data);
        }
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch, delay]);

  if (!isLoaded || !topAiringAnime || !topUpcomingAnime || !mostPopularAnime) {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
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
