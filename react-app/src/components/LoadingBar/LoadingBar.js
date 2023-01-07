import styles from "./LoadingBar.module.css";

export default function LoadingBar() {
  return (
    <div className={styles.loading_bar}>
      <div className={styles.progress}>
        <div className={styles.color}></div>
      </div>
    </div>
  );
}
