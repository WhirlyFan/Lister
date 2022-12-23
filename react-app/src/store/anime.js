//action types
const GET_ALL_ANIME = "anime/GET_ALL_ANIME";
const GET_ANIME = "anime/GET_ANIME";
const GET_ANIME_BY_LIST = "anime/GET_ANIME_BY_LIST";
const GET_ANIME_BY_USER = "anime/GET_ANIME_BY_USER";

//action creators
export const getAllAnime = (payload) => {
  return {
    type: GET_ALL_ANIME,
    payload,
  };
};

export const getAnime = (payload) => {
  return {
    type: GET_ANIME,
    payload,
  };
};

export const getAnimeByList = (payload) => {
  return {
    type: GET_ANIME_BY_LIST,
    payload,
  };
};

export const getAnimeByUser = (payload) => {
  return {
    type: GET_ANIME_BY_USER,
    payload,
  };
};

//thunks
export const getAllAnimeThunk = () => async (dispatch) => {
  const res = await fetch(`/api/anime`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllAnime(data));
  return data;
};

export const getAnimeThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/anime/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnime(data));
  return data;
};

export const getAnimeByListThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/anime/lists/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnimeByList(data));
  return data;
};

export const getAnimeByUserThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/anime/users/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnimeByUser(data));
  return data;
};

//reducer
const initialState = {
  allAnime: {},
  anime: {},
  animeByList: {},
  animeByUser: {},
};

export default function animeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ANIME:
      return { ...state, allAnime: action.payload };
    case GET_ANIME:
      return { ...state, anime: action.payload };
    case GET_ANIME_BY_LIST:
      return { ...state, animeByList: action.payload };
    case GET_ANIME_BY_USER:
      return { ...state, animeByUser: action.payload };
    default:
      return state;
  }
}
