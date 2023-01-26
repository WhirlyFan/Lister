import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { getListsThunk } from "../../store/lists";
import { getUserThunk, followUnfollowThunk } from "../../store/session";
import { getAllAnimesThunk } from "../../store/anime";
import LoadingBar from "../LoadingBar/LoadingBar";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import ReviewModal from "../ReviewModal";
import styles from "./Profile.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const getUser = useSelector((state) => state.session.getUser);
  const allAnime = useSelector((state) => state.anime.allAnime?.animes);
  const lists = useSelector((state) => state.lists?.lists);
  const [hasClicked, setHasClicked] = useState(false);
  const { userId, username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(getUserThunk(userId)).then((data) => {
      if (data.username !== username) {
        history.push(`/profile/${data.id}/${data.username}`);
      }
      const dateString = data.created_at;
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      setCreatedAt(`${month} ${day}, ${year}`);
      (async () => {
        await dispatch(getAllAnimesThunk());
        await dispatch(getListsThunk(userId));
        dispatch(getReviewsThunk(userId)).then((data) => {
          setReviews(data.reviews);
          setIsLoaded(true);
        });
      })();
    });
  }, [dispatch, history, userId, username, hasClicked]);

  if (!isLoaded || !getUser) {
    return <LoadingBar />;
  }

  const followUnfollow = (userId) => {
    dispatch(followUnfollowThunk(userId)).then((data) => {
      if (data.error) {
        window.alert(data.error);
      }
      setHasClicked(!hasClicked);
    });
  };

  const userLists = () => {
    history.push(`/lists/${userId}/${username}`);
  };

  const animeDetails = (anime) => {
    const title = anime.title.split(" ").join("_");
    history.push(`/anime/${anime.mal_id}/${title}`);
  };

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className={styles.top_header}>
          <h1>{`${username}'s Profile`}</h1>
          <div>
            <button onClick={() => userLists()} className={styles.anime_lists}>
              Anime
            </button>
          </div>
        </div>
        <div>Joined: {createdAt}</div>
      </div>
      <div>
        <FollowersModal
          user={getUser}
          hasClicked={hasClicked}
          setHasClicked={setHasClicked}
          followUnfollow={followUnfollow}
        />
        <FollowingModal
          user={getUser}
          hasClicked={hasClicked}
          setHasClicked={setHasClicked}
          followUnfollow={followUnfollow}
        />
      </div>
      {user && user.id !== getUser.id && (
        <div>
          {getUser.followers.find((follower) => follower.id === user.id) ? (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to unfollow ${getUser.username}?`
                  )
                ) {
                  followUnfollow(getUser.id);
                }
              }}
            >
              Unfollow
            </button>
          ) : (
            <button onClick={() => followUnfollow(getUser.id)}>Follow</button>
          )}
        </div>
      )}
      <div>
        <h2>Stats</h2>
        <div>Total Unique Anime: {allAnime.length}</div>
        {lists.map((list) => {
          return (
            <div key={`list-${list.id}`}>
              {list.name}: {list.anime.length}
            </div>
          );
        })}
      </div>
      <div>
        <div className={styles.review_header}>
          <h2>Reviews</h2>
        </div>
        <ul>
          {!reviews && <li>No reviews yet!</li>}
          {reviews &&
            reviews.map((review) => {
              return (
                <li key={`review-${review.id}`} className={styles.review}>
                  <div className={styles.review_info}>
                    <strong>
                      <span>
                        {getUser.username} ★{review.rating}
                      </span>
                    </strong>
                  </div>
                  <div className={styles.review_content}>
                    <div onClick={() => animeDetails(review.anime)}>
                      Anime: {review.anime.title}
                    </div>
                    <div>Review: {review.review}</div>
                  </div>
                  {/* {user && user.id === review.user_id && (
                  <ReviewModal
                    review={review}
                    hasClicked={hasClicked}
                    setHasClicked={setHasClicked}
                  />
                )} */}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
