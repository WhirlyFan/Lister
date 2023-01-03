import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";

export default function AddReviewForm({
  hasClicked,
  setHasClicked,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const { malAnimeId } = useParams();
  const [rev, setRev] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      review: rev,
      rating: rating,
    };
    dispatch(
      createReviewThunk(payload).then((e) => {
        setHasClicked(!hasClicked);
        setShowModal(false);
      })
    );
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
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <button type="submit">Add Review</button>
    </form>
  );
}
