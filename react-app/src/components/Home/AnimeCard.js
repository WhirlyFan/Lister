import styles from "./Home.module.css";

export default function AnimeCard({ anime, index }) {
  return (
    <div className={styles.anime}>
      <div>
        {`${index + 1}: `}
        {anime.title}
      </div>
    </div>
  );
}
