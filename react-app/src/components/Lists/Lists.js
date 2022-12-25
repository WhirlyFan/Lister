import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimesByUserThunk } from "../../store/anime";
import { getListsThunk } from "../../store/lists";
import { getUserThunk } from "../../store/session";
import ListModal from "../ListModal";
import styles from "./Lists.module.css";

export default function Lists() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const listsArr = useSelector((state) => state.lists.lists);
  const animeArr = useSelector((state) => state.anime.animeByUser?.animes);
  const getUser = useSelector((state) => state.session?.get_user);
  const [animes, setAnimes] = useState({});
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getListsThunk(userId)).then(() => {
        setIsLoaded(true);
      });
      dispatch(getAnimesByUserThunk(userId));
      dispatch(getUserThunk(userId));
    }
  }, [dispatch, user, userId, animes]);

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

  if (!getUser) {
    return null
  }

  const showAnime = (list) => {
    setAnimes(list);
    console.log(animes);
  };

  return (
    <div>
      <div className={styles.list_header}>
        <h1>{getUser.username}'s Lists</h1>
        {user.id === Number(userId) && (
          <ListModal setHasClicked={setHasClicked} hasClicked={hasClicked} />
        )}
      </div>
      <div className={styles.lists}>
        <div className={styles.list_name}>All Anime</div>
        {listsArr.map((list) => {
          return (
            <div key={`list-${list.id}`} className={styles.list_name}>
              <div
                onClick={() => {
                  showAnime(list);
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
          return <div key={`anime-${anime.id}`}>{anime.title}</div>;
        })}
      {!animeArr &&
        animes.map((anime) => {
          return <div key={`anime-${anime.id}`}> {anime.title}</div>;
        })}
    </div>
  );
}
