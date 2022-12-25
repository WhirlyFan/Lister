import styles from "./Home.module.css";

export default function AnimeCard({ anime }) {
  return (
    <div className={styles.anime}>
      <div>
        {anime.rank && `Rank: ${anime.rank} - `} {anime.title}
      </div>
    </div>
  );
}
