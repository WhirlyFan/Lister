import styles from "./LoadingBar.module.css";

export default function LoadingBar() {
  return (
    <div className={styles.loading_bar}>
      <div class={styles.progress}>
        <div class={styles.color}></div>
      </div>
    </div>
  );
}
