import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAnimeThunk } from "../../store/jikan";
import { addAnimeThunk, getMalAnimeThunk } from "../../store/anime";
import { getAnimeReviewsThunk, createReviewThunk } from "../../store/reviews";
import styles from "./AnimeDetails.module.css";
import ReviewModal from "../ReviewModal";
import LoadingBar from "../LoadingBar/LoadingBar";

export default function AnimeDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { malAnimeId } = useParams();
  const [anime, setAnime] = useState(null);
  const malAnime = useSelector((state) => state.jikan.anime.data);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState("");
  const [rev, setRev] = useState("");

  useEffect(() => {
    dispatch(getAnimeThunk(malAnimeId)).then(() => {
      setIsLoaded(true);
    });
    dispatch(getMalAnimeThunk(malAnimeId)).then((anime) => {
      setAnime(anime);
      if (!anime.status) {
        dispatch(getAnimeReviewsThunk(anime.id)).then((reviews) => {
          setReviews(reviews.reviews);
        });
      }
    });
  }, [dispatch, malAnimeId, hasClicked]);

  if (!malAnime || !isLoaded) {
    return <LoadingBar />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (anime.status) {
      dispatch(
        addAnimeThunk({
          mal_id: malAnimeId,
          image: malAnime.images.jpg.image_url,
          title: malAnime.title,
        })
      ).then((anime) => {
        dispatch(
          createReviewThunk({ rating, review: rev, anime_id: anime.id })
        ).then((data) => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setHasClicked(!hasClicked);
            setRev("");
            setRating("");
          }
        });
      });
    } else {
      dispatch(
        createReviewThunk({ rating, review: rev, anime_id: anime.id })
      ).then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setHasClicked(!hasClicked);
          setRev("");
          setRating("");
        }
      });
    }
  };

  const userLists = (review_user) => {
    history.push(`/lists/${review_user.id}/${review_user.username}`);
  };

  return (
    <div className={styles.anime_details}>
      <div>
        <h1 className={styles.title}>{malAnime.title}</h1>
        <div className={styles.anime_content}>
          <div className={styles.anime_image_info}>
            <div>
              <img src={malAnime.images.jpg.image_url} alt="anime-poster" />
            </div>
            <div className={styles.info}>
              <h2 className={styles.information}>Information</h2>
              <div>Top Rank: #{malAnime.rank}</div>
              <div>Score: ★{malAnime.score}</div>
              <h2 className={styles.synopsis}>Synopsis</h2>
              <p className={styles.synopsis_info}>{malAnime.synopsis}</p>
            </div>
          </div>
        </div>
        <div className={styles.trailer}>
          <h2>Trailer</h2>
          <iframe
            src={malAnime.trailer.embed_url?.slice(0, -1) + "0"}
            title={malAnime.title}
            allowFullScreen
          ></iframe>
        </div>
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
                    <strong
                      onClick={() => {
                        userLists(review.user);
                      }}
                    >
                      {review.user.username}
                    </strong>
                    <div>★{review.rating}</div>
                  </div>
                  <div className={styles.review_content}>{review.review}</div>
                  {user && user.id === review.user_id && (
                    <ReviewModal
                      review={review}
                      hasClicked={hasClicked}
                      setHasClicked={setHasClicked}
                    />
                  )}
                </li>
              );
            })}
        </ul>
        {user && (
          <>
            <form onSubmit={handleSubmit} className={styles.add_review}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx} className="error">
                    {error}
                  </li>
                ))}
              </ul>
              <label>Add Review:</label>
              <textarea
                type="text"
                name="add review"
                value={rev}
                onChange={(e) => setRev(e.target.value)}
                required
                className={styles.review_textarea}
              />
              <label>Rating:</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
              <button type="submit" className="blue_button">
                Submit
              </button>
            </form>
          </>
        )}
        {!user && <div>Login to add a review!</div>}
      </div>
      <div className={styles.ghost_div}></div>
    </div>
  );
}
