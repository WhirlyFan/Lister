import styles from "./Home.module.css";

export default function TopAnimeCard({ anime }) {
  return (
    <div className={styles.anime}>
      <div>{anime.title}</div>
    </div>
  );
}
