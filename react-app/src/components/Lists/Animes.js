import styles from "./Lists.module.css";
import AddAnimeModal from "../AddAnimeModal";

export default function list({
  list,
  animeDetails,
  setList,
  user,
  getUser,
  handleDelete,
  animeArr,
}) {
  return (
    <div className={styles.anime}>
      {((list && //this can be changed. Just not touching it because of presentation tmrw. (only really checking for animeArr) honestly gl tho lol.
        !list.name) ||
        (!user && list?.private)) &&
        animeArr.map((anime) => {
          return (
            <div className={styles.anime} key={`all-anime-${anime.id}`}>
              <div className={styles.anime_content}>
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
            </div>
          );
        })}
      {(!user && list?.private) ||
        (list?.anime &&
          list?.anime.map((anime) => {
            return (
              <div key={`anime-${anime.id}`} className={styles.anime}>
                <div className={styles.anime_content}>
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className={styles.anime_image}
                    onClick={() => animeDetails(anime)}
                  />
                  {user && user.id === getUser.id && (
                    <AddAnimeModal
                      listMode={true}
                      anime={anime}
                      setList={setList}
                    />
                  )}
                  {user && user.id === getUser.id && (
                    <div
                      className={styles.delete_icon}
                      onClick={() => {
                        handleDelete(anime);
                      }}
                    >
                      <i className={"fas fa-trash-can fa-lg"}></i>
                    </div>
                  )}
                  <div
                    className={styles.anime_title}
                    onClick={() => animeDetails(anime)}
                  >
                    {anime.title}
                  </div>
                </div>
              </div>
            );
          }))}
    </div>
  );
}
