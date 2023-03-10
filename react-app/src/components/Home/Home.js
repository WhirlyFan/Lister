import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeThunk } from "../../store/jikan";
import styles from "./Home.module.css";
import AnimeCard from "./AnimeCard";
import LoadingBar from "../LoadingBar/LoadingBar";

//try refactoring Home to pull data from the store instead of the API once initially loaded

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topAiringAnime, setTopAiringAnime] = useState(false);
  const [topUpcomingAnime, setTopUpcomingAnime] = useState(false);
  const [mostPopularAnime, setMostPopularAnime] = useState(false);
  const [delay, setDelay] = useState(false);

  // const topAiringAnimeStore = useSelector(
  //   (state) => state.jikan.topAiringAnime
  // );
  // const topUpcomingAnimeStore = useSelector(
  //   (state) => state.jikan.topUpcomingAnime
  // );
  // const mostPopularAnimeStore = useSelector(
  //   (state) => state.jikan.mostPopularAnime
  // );

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
    return <LoadingBar />;
  }

  return (
    <div className={styles.home}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Image</th>
            <th>
              <h2>Top Airing Anime</h2>
            </th>
            <th>Score</th>
            {user && <th>Add to List</th>}
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
        <thead>
          <tr>
            <th>Rank</th>
            <th>Image</th>
            <th>
              <h2>Most Popular Anime</h2>
            </th>
            <th>Score</th>
            {user && <th>Add to List</th>}
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
        <thead>
          <tr>
            <th>Rank</th>
            <th>Image</th>
            <th>
              <h2>Top Upcoming Anime</h2>
            </th>
            <th>Score</th>
            {user && <th>Add to List</th>}
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
      </table>
    </div>
  );
}
