import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListsThunk } from "../../store/lists";
import styles from "./Lists.module.css";
import { Redirect } from "react-router-dom";
//logout doesn't redirect to home page
export default function Lists() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const listsArr = useSelector((state) => state.lists.lists);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getListsThunk(user.id)).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch, user]);

  if (!isLoaded) {
    return null;
  }

  if (!listsArr) {
    return (
      <div>
        <h1>You don't have any lists yet!</h1>
      </div>
    );
  }

  // if (!user) {
  //   return (
  //     <div>
  //       <h1>You must be logged in to view your lists!</h1>
  //     </div>
  //   );
  // }
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.lists}>
      {listsArr.map((list) => {
        return (
          <div key={`list-${list.id}`} className={styles.list}>
            <div className={styles.listName}>{list.name}</div>
            <div
              className={styles.listStatus}
            >{`Private: ${list.private}`}</div>
            {list.anime.map((anime) => {
              return (
                <div key={`anime-${anime.id}`} className={styles.anime}>
                  {anime.title}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
