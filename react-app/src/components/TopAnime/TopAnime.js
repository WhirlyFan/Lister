import React, { useEffect, useState } from "react";
import styles from "./TopAnime.module.css";
import TopAnimeCard from "./TopAnimeCard";

export default function Lists() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setData(data);
      });
  }, []);

  if (!isLoaded || !data.data) {
    return null;
  }

  return (
    <div>
      {data.data.map((anime) => (
        <TopAnimeCard key={`anime-${anime.mal_id}`} anime={anime} />
      ))}
    </div>
  );
}
