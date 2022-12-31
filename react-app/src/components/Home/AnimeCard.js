import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";

export default function AnimeCard({ anime, index }) {
  const history = useHistory();

  const animeDetails = (id) => {
    history.push(`/anime/${id}`);
  };

  return (
    <div
      className={styles.anime}
      onClick={() => {
        animeDetails(anime.mal_id);
      }}
    >
      <div>
        {`${index + 1}: `}
        {anime.title}
      </div>
    </div>
  );
}
