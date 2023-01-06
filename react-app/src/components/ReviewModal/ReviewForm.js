import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
import {
  editReviewThunk,
  // getReviewsThunk,
  deleteReviewThunk,
} from "../../store/reviews";

export default function ReviewForm({
  review,
  hasClicked,
  setHasClicked,
  setShowModal,
}) {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const { malAnimeId } = useParams();
  const [rev, setRev] = useState(review.review);
  const [rating, setRating] = useState(review.rating);
  const [errors, setErrors] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: review.id,
      review: rev,
      rating: rating,
    };
    dispatch(editReviewThunk(payload)).then((data) => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setHasClicked(!hasClicked);
        setShowModal(false);
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteReviewThunk(id)).then(() => {
      setHasClicked(!hasClicked);
      setShowModal(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="error">
            {error}
          </li>
        ))}
      </ul>
      <label>Review</label>
      <input
        type="textarea"
        name="review"
        value={rev}
        onChange={(e) => setRev(e.target.value)}
        required
      />
      <label>Rating</label>
      <input
        type="number"
        name="rating"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <button type="submit">Edit</button>
      <button
        type="button"
        onClick={() => {
          handleDelete(review.id);
        }}
      >
        Delete
      </button>
    </form>
  );
}
