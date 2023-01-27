import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { getListsThunk } from "../../store/lists";
import { getUserThunk, followUnfollowThunk } from "../../store/session";
import { getAnimesByUserThunk } from "../../store/anime";
import LoadingBar from "../LoadingBar/LoadingBar";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
// import ReviewModal from "../ReviewModal";
import styles from "./Profile.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const getUser = useSelector((state) => state.session.getUser);
  const allAnime = useSelector((state) => state.anime.animeByUser?.animes);
  const lists = useSelector((state) => state.lists?.lists);
  // const reviews = useSelector((state) => state.reviews?.reviews);
  const [hasClicked, setHasClicked] = useState(false);
  const { userId, username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [reviews, setReviews] = useState();

  useEffect(() => {
    dispatch(getUserThunk(userId)).then(async (data) => {
      if (data.username !== username) {
        history.push(`/profile/${data.id}/${data.username}`);
      }
      const dateString = data.created_at;
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      setCreatedAt(`${month} ${day}, ${year}`);
      await dispatch(getAnimesByUserThunk(userId));
      await dispatch(getListsThunk(userId));
      await dispatch(getReviewsThunk(userId)).then((data) => {
        setReviews(data.reviews);
      });
      setIsLoaded(true);
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
      <div className={styles.main_info}>
        <div>
          <div className={styles.header}>
            <div className={styles.top_header}>
              <h1>{`${username}'s Profile`}</h1>
              <div>
                <button
                  onClick={() => userLists()}
                  className={styles.anime_lists}
                >
                  Anime
                </button>
              </div>
            </div>
          </div>
          <div className={styles.follow}>
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
            {user && user.id !== getUser.id && (
              <div>
                {getUser.followers.find(
                  (follower) => follower.id === user.id
                ) ? (
                  <button
                    className={styles.anime_lists}
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
                  <button
                    className={styles.anime_lists}
                    onClick={() => followUnfollow(getUser.id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <div>
            <h2 className={styles.h2_header}>Stats</h2>
            <div>Joined: {createdAt}</div>
            <div>Total Unique Anime: {allAnime ? allAnime.length : 0}</div>
            {lists.map((list) => {
              return (
                <div key={`list-${list.id}`}>
                  {list.name}: {list.anime.length}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.reviews}>
          <div className={styles.review_header}>
            <h2 className={styles.h2_header}>Reviews</h2>
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
    </div>
  );
}
