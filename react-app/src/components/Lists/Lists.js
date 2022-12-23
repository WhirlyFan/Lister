import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimesByUserThunk } from "../../store/anime";
import { getListsThunk } from "../../store/lists";
import styles from "./Lists.module.css";

export default function Lists() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const listsArr = useSelector((state) => state.lists.lists);
  const animeArr = useSelector((state) => state.anime.animeByUser?.animes);
  // const [animes, setAnimes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getListsThunk(userId)).then(() => {
        setIsLoaded(true);
      });
      dispatch(getAnimesByUserThunk(userId));
    }
  }, [dispatch, user, userId]);

  if (!isLoaded) {
    return null;
  }

  if (!listsArr) {
    return (
      <div>
        <h1>There are no lists here!</h1>
      </div>
    );
  }

  if (!animeArr) {
    return (
      <div>
        <h1>There are no anime here!</h1>
      </div>
    );
  }

  const hasClicked = (id) => {};

  return (
    <div>
      <div className={styles.list_header}>
        <h1>{user.username}'s Lists</h1>
        <button>New List</button>
      </div>
      <div className={styles.lists}>
        <div className={styles.list_name}>All Anime</div>
        {listsArr.map((list) => {
          return (
            <div key={`list-${list.id}`} className={styles.list_name}>
              <div
                onClick={() => {
                  hasClicked(list.id);
                }}
                className={styles.listName}
              >
                {list.name}
              </div>
              {/* <div
                className={styles.listStatus}
              >{`Private: ${list.private}`}</div> */}
            </div>
          );
        })}
      </div>
      {animeArr &&
        animeArr.map((anime) => {
          return <div>{anime.title}</div>;
        })}
    </div>
  );
}
