import styles from "./Lists.module.css";
import AddAnimeModal from "../AddAnimeModal";

export default function list({ list, animeDetails, setList, user, getUser }) {
  const listMode = true;
  return (
    <div className={styles.anime}>
      {list &&
        !list.name &&
        list.map((anime) => {
          return (
            <div key={`anime-${anime.id}`} className={styles.anime}>
              <img
                src={anime.image}
                alt={anime.title}
                className={styles.anime_image}
                onClick={() => animeDetails(anime)}
              />
              <div
                className={styles.anime_title}
                onClick={() => animeDetails(anime)}
              >
                {anime.title}
              </div>
            </div>
          );
        })}
      {list?.anime &&
        list?.anime.map((anime) => {
          return (
            <div key={`anime-${anime.id}`} className={styles.anime}>
              <img
                src={anime.image}
                alt={anime.title}
                className={styles.anime_image}
                onClick={() => animeDetails(anime)}
              />
              {user && user.id === getUser.id && (
                <AddAnimeModal
                  listMode={listMode}
                  anime={anime}
                  list={list}
                  setList={setList}
                />
              )}
              <div
                className={styles.anime_title}
                onClick={() => animeDetails(anime)}
              >
                {anime.title}
              </div>
            </div>
          );
        })}
    </div>
  );
}
