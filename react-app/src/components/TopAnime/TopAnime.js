import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTopAnimeThunk } from "../../store/jikan";
// import styles from "./TopAnime.module.css";
import AnimeCard from "../Home/AnimeCard";

export default function Lists() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [topAnime, setTopAnime] = useState(false);
  const [page, setPage] = useState(1);
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    dispatch(getTopAnimeThunk(page))
      .then((data) => {
        if (data.status === 429) {
          setTimeout(() => {
            setDelay(!delay);
          }, 1000); //delay used because of API rate limit
        } else {
          setTopAnime(data.data);
        }
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch, page, delay]);

  if (!isLoaded || !topAnime) {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <div>
      {topAnime.map((anime) => (
        <AnimeCard key={`anime-${anime.mal_id}`} anime={anime} />
      ))}
      <div>Page: {page}</div>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
