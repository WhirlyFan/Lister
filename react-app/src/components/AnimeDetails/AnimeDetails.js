import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimeThunk } from "../../store/jikan";
import { getMalAnimeThunk } from "../../store/anime";
import { getAnimeReviewsThunk, createReviewThunk } from "../../store/reviews";
import styles from "./AnimeDetails.module.css";
import ReviewModal from "../ReviewModal";

export default function AnimeDetails() {
  const dispatch = useDispatch();
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
      console.log(anime)
      if (!anime.status) {
        dispatch(getAnimeReviewsThunk(anime.id)).then((reviews) => {
          setReviews(reviews.reviews);
        });
      }
    });
  }, [dispatch, malAnimeId, hasClicked]);

  if (!malAnime || !isLoaded) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const review = dispatch(getAnimeThunk(anime.id));
    // if (!review) {
    //   console.log("test");
    // }
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
  };

  return (
    <div>
      <h1>{malAnime.title}</h1>
      <div>
        <img src={malAnime.images.jpg.image_url} alt="anime poster" />
      </div>
      <div>
        <h2>Synopsis</h2>
        <p>{malAnime.synopsis}</p>
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
                    <div>{review.user.username}</div>
                    <div>★{review.rating}</div>
                  </div>
                  <div>{review.review}</div>
                  {user && user.id === review.user_id && (
                    <div>
                      <ReviewModal
                        review={review}
                        hasClicked={hasClicked}
                        setHasClicked={setHasClicked}
                      />
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
        <div>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx} className="error">
                  {error}
                </li>
              ))}
            </ul>
            <label>Add Review</label>
            <input
              type="textarea"
              name="add review"
              value={rev}
              onChange={(e) => setRev(e.target.value)}
              required
            />
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <button type="submit">Create Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}
