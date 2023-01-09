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
import LoadingBar from "../LoadingBar/LoadingBar";
import { removeAnimeFromListThunk } from "../../store/anime";

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
    return <LoadingBar />;
  }

  if (!list) {
    if (animeArr) {
      setList(animeArr);
    }
  }

  if (!getUser) {
    return <LoadingBar />;
  }

  const showAnime = (list) => {
    if (list) setList(list);
    else setList(animeArr);
  };

  const animeDetails = (anime) => {
    history.push(`/anime/${anime.mal_id}/${anime.title.replaceAll(" ", "_")}`);
  };

  const handleDelete = (anime) => {
    if (
      window.confirm(
        `Are you sure you want to remove "${anime.title}" from "${list.name}?"`
      )
    ) {
      dispatch(removeAnimeFromListThunk(anime.id, list.id)).then((data) => {
        if (data.errors) {
          alert("Something went wrong. Please try again.");
        } else {
          setList(data.list);
        }
      });
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.list_header}>
        <h1>{getUser.username}'s Lists</h1>
        {user && user.id === getUser.id && (
          <NewListModal hasClicked={hasClicked} setHasClicked={setHasClicked} />
        )}
      </div>
      <div className={styles.lists}>
        <div className={styles.list_name} onClick={() => showAnime()}>
          All Anime
        </div>
        {listsArr &&
          listsArr.map((list) => {
            return (
              <div
                key={`list-${list.id}`}
                className={styles.list_name}
                onClick={() => {
                  showAnime(list);
                }}
              >
                <div className={styles.list_name_text}>{list.name}</div>
                <div className={styles.lock_icon}>
                  {list.private && <i className="fas fa-lock"></i>}
                </div>
              </div>
            );
          })}
      </div>
      {list && (
        <div className={styles.animes}>
          <div>
            <div className={styles.anime_header}>
              <div className={styles.ghost_div}></div>
              {(!list.name || (!user && list?.private)) && <h3>All Anime</h3>}
              {(!user && list?.private) || (list.name && <h3>{list.name}</h3>)}
              {user && list.name && user.id === getUser.id && (
                <ListModal
                  className={styles.list_edit}
                  list={list}
                  setList={setList}
                  setHasClicked={setHasClicked}
                  hasClicked={hasClicked}
                />
              )}
              {!(user && list.name && user.id === getUser.id) && (
                <div className={styles.ghost_div}></div>
              )}
            </div>
          </div>
          {/* have to use context to setList to all animes on logout */}
          <Animes
            list={list}
            setList={setList}
            animeDetails={animeDetails}
            user={user}
            getUser={getUser}
            handleDelete={handleDelete}
            animeArr={animeArr}
          />
        </div>
      )}
      <div className="ghost_div"></div>
    </div>
  );
}
