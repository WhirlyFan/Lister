import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddAnimeModal from "../AddAnimeModal";

export default function AnimeCard({ anime, index, top }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const animeDetails = (id) => {
    history.push(`/anime/${id}`);
  };

  return (
    <tr className={styles.anime}>
      {top && <td>{anime.rank}</td>}
      {!top && <td>{index + 1}</td>}
      <td
        className={styles.image}
        onClick={() => {
          animeDetails(anime.mal_id);
        }}
      >
        <img src={anime.images.jpg.image_url} alt={anime.title} />
      </td>
      <td
        className={styles.title}
        onClick={() => {
          animeDetails(anime.mal_id);
        }}
      >
        {anime.title}
      </td>
      {/* fix this */}
      {!anime.score && <td>n/a</td>}
      {anime.score && <td>{anime.score}</td>}
      {user && (
        <td>
          <AddAnimeModal />
        </td>
      )}
    </tr>
  );
}
