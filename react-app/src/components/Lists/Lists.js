import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getListsThunk } from "../../store/lists";
import styles from "./Lists.module.css";

export default function Lists() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const listsArr = useSelector((state) => state.lists.lists);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getListsThunk(userId)).then(() => {
        setIsLoaded(true);
      });
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

  return (
    <div>
      <div>
        <h1>{user.username}'s Lists</h1>
      </div>
      <div className={styles.lists}>
        {listsArr.map((list) => {
          return (
            <div key={`list-${list.id}`} className={styles.list_name}>
              <div className={styles.listName}>{list.name}</div>
              {/* <div
                className={styles.listStatus}
              >{`Private: ${list.private}`}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div>
  //       <h1>{user.username}'s Lists</h1>
  //     </div>
  //     <div className={styles.lists}>
  //       {listsArr.map((list) => {
  //         return (
  //           <div key={`list-${list.id}`} className={styles.list}>
  //             <div className={styles.listName}>{list.name}</div>
  //             <div
  //               className={styles.listStatus}
  //             >{`Private: ${list.private}`}</div>
  //             {list.anime.map((anime) => {
  //               return (
  //                 <div key={`anime-${anime.id}`} className={styles.anime}>
  //                   {anime.title}
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
