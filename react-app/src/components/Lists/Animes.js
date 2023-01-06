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
              <div>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className={styles.anime_image}
                  onClick={() => animeDetails(anime.mal_id)}
                />

                <div>
                  <div>{anime.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      {list?.anime &&
        list?.anime.map((anime) => {
          return (
            <div key={`anime-${anime.id}`} className={styles.anime}>
              <div>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className={styles.anime_image}
                  onClick={() => animeDetails(anime.mal_id)}
                />
                <div>{anime.title}</div>
                {user && user.id === getUser.id && (
                  <AddAnimeModal
                    listMode={listMode}
                    anime={anime}
                    list={list}
                    setList={setList}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
