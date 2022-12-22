import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTopAnimeThunk } from "../../store/jikan";
// import styles from "./TopAnime.module.css";
import TopAnimeCard from "./TopAnimeCard";

export default function Lists() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getTopAnimeThunk(page)).then((data) => {
      setIsLoaded(true);
      setData(data.data);
    });
  }, [dispatch, page]);

  if (!isLoaded || !Object.keys(data).length) {
    return null;
  }

  return (
    <div>
      {data.map((anime) => (
        <TopAnimeCard key={`anime-${anime.mal_id}`} anime={anime} />
      ))}
      <div>Page: {page}</div>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
