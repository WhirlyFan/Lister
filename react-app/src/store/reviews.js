import { normalize } from "./lists";

//action types
const GET_ALL_REVIEWS = "review/GET_ALL_REVIEWS";
const GET_REVIEW = "review/GET_REVIEW";
const GET_REVIEWS = "review/GET_REVIEWS";
const GET_ANIME_REVIEWS = "review/GET_ANIME_REVIEWS";

//action creators

export const getAllReviews = (payload) => {
  return {
    type: GET_ALL_REVIEWS,
    payload,
  };
};

export const getReview = (payload) => {
  return {
    type: GET_REVIEW,
    payload,
  };
};

export const getReviews = (payload) => {
  return {
    type: GET_REVIEWS,
    payload,
  };
};

export const getAnimeReviews = (payload) => {
  return {
    type: GET_ANIME_REVIEWS,
    payload,
  };
};

//thunks
export const getAllReviewsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/reviews`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllReviews(data));
  return data;
};

export const getReviewThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getReview(data));
  return data;
};

export const getReviewsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/users/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getReviews(data));
  return data;
};

export const getAnimeReviewsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/anime/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnimeReviews(data));
  return data;
};

export const createReviewThunk = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  // if (!res.ok) {
  //   throw res;
  // }
  const data = await res.json();
  dispatch(getReviews(data));
  return data;
};

export const editReviewThunk = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  // if (!res.ok) {
  //   throw res;
  // }
  const data = await res.json();
  dispatch(getReviews(data));
  return data;
};

export const deleteReviewThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getReviews(data));
  return data;
};

const initial_state = {
  // allReviews: null,
  // review: null,
  // reviews: null,
};
//reducer
export default function reviewReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_REVIEW:
      return { ...state, review: { ...action.payload } };
    case GET_ALL_REVIEWS:
      const normalizedAllReviews = normalize(action.payload.reviews);
      return { ...state, allReviews: { ...normalizedAllReviews } };
    case GET_REVIEWS:
      return { ...state, ...action.payload };
    case GET_ANIME_REVIEWS:
      return { ...state, animeReviews: { ...action.payload } };
    default:
      return state;
  }
}
