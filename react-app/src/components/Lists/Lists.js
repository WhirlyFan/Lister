import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListsThunk } from "../../store/lists";
import styles from "./Lists.module.css";

export default function Lists() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const listsArr = useSelector((state) => state.lists.lists);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getListsThunk(user.id)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, user.id]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={styles.lists}>
      {listsArr.map((list) => {
        return (
          <div key={`list-${list.id}`} className={styles.list}>
            <div className={styles.listName}>{list.name}</div>
            <div className={styles.listStatus}>{`Private: ${list.private}`}</div>
            {list.anime.map((anime) => {
              return (
                <div key={`anime-${anime.id}`} className={styles.anime}>{anime.title}</div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
}
