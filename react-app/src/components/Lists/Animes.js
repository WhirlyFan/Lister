import styles from "./Lists.module.css";

export default function Animes({ animes, animeDetails }) {
  return (
    <div className={styles.anime}>
      {animes &&
        !animes.name &&
        animes.map((anime) => {
          return (
            <div
              key={`anime-${anime.id}`}
              onClick={() => animeDetails(anime.mal_id)}
              className={styles.anime}
            >
              <div>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className={styles.anime_image}
                />

                <div>{anime.title}</div>
              </div>
            </div>
          );
        })}
      {animes?.anime &&
        animes?.anime.map((anime) => {
          return (
            <div
              key={`anime-${anime.id}`}
              onClick={() => animeDetails(anime.mal_id)}
              className={styles.anime}
            >
              <div>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className={styles.anime_image}
                />

                <div>{anime.title}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
