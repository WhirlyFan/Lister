import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimeThunk as getMalAnimeThunk } from "../../store/jikan";

export default function AnimeDetails() {
  const dispatch = useDispatch();
  const { malAnimeId } = useParams();
  const anime = useSelector((state) => state.anime.anime);
  const malAnime = useSelector((state) => state.jikan.anime.data);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMalAnimeThunk(malAnimeId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, malAnimeId]);

  if (!anime || !malAnime || !isLoaded) {
    return null;
  }

  return (
    <div>
      <h1>{malAnime.title}</h1>
      <div>
        <img src={malAnime.images.jpg.image_url} alt="anime poster" />
      </div>
      <div>
        <h2>Synopsis</h2>
        <p>{malAnime.synopsis}</p>
      </div>
      <div>
        <h2>Reviews</h2>
        <ul>
          <li>Review 1</li>
        </ul>
      </div>
    </div>
  );
}
