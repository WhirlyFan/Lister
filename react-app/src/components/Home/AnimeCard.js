import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddAnimeModal from "../AddAnimeModal";

export default function AnimeCard({ anime, index, top }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const animeDetails = (anime) => {
    history.push(`/anime/${anime.mal_id}/${anime.title.replaceAll(" ", "_")}`);
  };

  return (
    <tr className={styles.anime}>
      {console.log(anime)}
      {top && <td>#{anime.rank}</td>}
      {!top && <td>#{index + 1}</td>}
      <td
        className={styles.image}
        onClick={() => {
          animeDetails(anime);
        }}
      >
        <img src={anime.images.jpg.image_url} alt={anime.title} />
      </td>
      <td
        className={styles.title}
        onClick={() => {
          animeDetails(anime);
        }}
      >
        {anime.title_english ? anime.title_english : anime.title}
      </td>
      {!anime.score && <td>n/a</td>}
      {anime.score && <td>★{anime.score}</td>}
      {user && (
        <td>
          <AddAnimeModal anime={anime} />
        </td>
      )}
    </tr>
  );
}
