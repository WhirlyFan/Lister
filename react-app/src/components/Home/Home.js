import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getHomeThunk } from "../../store/jikan";
import styles from "./Home.module.css";
import AnimeCard from "./AnimeCard";

//try refactoring Home to pull data from the store instead of the API

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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Image</th>
              <th>Title</th>
              <th>Score</th>
              <th>Add to List</th>
            </tr>
          </thead>
          <tbody>
            {topAiringAnime.slice(0, 10).map((anime, index) => {
              return (
                <AnimeCard
                  key={`anime-${anime.mal_id}`}
                  anime={anime}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
        <h2>Most Popular Anime</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Image</th>
              <th>Title</th>
              <th>Score</th>
              <th>Add to List</th>
            </tr>
          </thead>
          <tbody>
            {mostPopularAnime.slice(0, 10).map((anime, index) => {
              return (
                <AnimeCard
                  key={`anime-${anime.mal_id}`}
                  anime={anime}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
        <h2>Top Upcoming Anime</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Image</th>
              <th>Title</th>
              <th>Score</th>
              <th>Add to List</th>
            </tr>
          </thead>
          <tbody>
            {topUpcomingAnime.slice(0, 10).map((anime, index) => {
              return (
                <AnimeCard
                  key={`anime-${anime.mal_id}`}
                  anime={anime}
                  index={index}
                />
              );
            })}
          </tbody>
          {/* <tfoot></tfoot> */}
        </table>
      </div>
    </div>
  );
}
