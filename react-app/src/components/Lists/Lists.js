import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAnimesByUserThunk } from "../../store/anime";
import { getListsThunk } from "../../store/lists";
import { getUserThunk } from "../../store/session";
import ListModal from "../ListModal";
import styles from "./Lists.module.css";
import NewListModal from "../NewListModal";
import Animes from "./Animes";

export default function Lists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const listsArr = useSelector((state) => state.lists.lists);
  const animeArr = useSelector((state) => state.anime.animeByUser?.animes);
  const getUser = useSelector((state) => state.session?.get_user);
  const [list, setList] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getListsThunk(userId));
      await dispatch(getAnimesByUserThunk(userId));
      await dispatch(getUserThunk(userId));
      setIsLoaded(true);
    })();
  }, [dispatch, user, userId, list, hasClicked]);

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

  if (!list) setList(animeArr);

  if (!getUser) {
    return null;
  }

  const showAnime = (list) => {
    if (list) setList(list);
    else setList(animeArr);
  };

  const animeDetails = (mal_id) => {
    history.push(`/anime/${mal_id}`);
  };

  return (
    <div>
      <div className={styles.list_header}>
        <h1>{getUser.username}'s Lists</h1>
        <NewListModal hasClicked={hasClicked} setHasClicked={setHasClicked} />
      </div>
      <div className={styles.lists}>
        <div className={styles.list_name} onClick={() => showAnime()}>
          All Anime
        </div>
        {listsArr.map((list) => {
          return (
            <div
              key={`list-${list.id}`}
              className={styles.list_name}
              onClick={() => {
                showAnime(list);
              }}
            >
              <div className={styles.listName}>
                {list.name}
                {list.private && <i className="fas fa-lock"></i>}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.animes}>
        <div>
          <div className={styles.anime_header}>
            {!list.name && <h2 className={styles.h2}>All Anime</h2>}
            {list.name && <h2>{list.name}</h2>}
          </div>
          {list.name && user.id === Number(userId) && (
            <ListModal
              className={styles.list_edit}
              list={list}
              setList={setList}
              setHasClicked={setHasClicked}
              hasClicked={hasClicked}
            />
          )}
        </div>
        <Animes list={list} setList={setList} animeDetails={animeDetails} />
      </div>
    </div>
  );
}
