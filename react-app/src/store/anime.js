//action types
const GET_ALL_ANIMES = "animes/GET_ALL_ANIMES";
const GET_ANIME = "animes/GET_ANIME";
const GET_ANIMES_BY_LIST = "animes/GET_ANIMES_BY_LIST";
const GET_ANIMES_BY_USER = "animes/GET_ANIMES_BY_USER";

//action creators
export const getAllAnimes = (payload) => {
  return {
    type: GET_ALL_ANIMES,
    payload,
  };
};

export const getAnime = (payload) => {
  return {
    type: GET_ANIME,
    payload,
  };
};

export const getAnimesByList = (payload) => {
  return {
    type: GET_ANIMES_BY_LIST,
    payload,
  };
};

export const getAnimesByUser = (payload) => {
  return {
    type: GET_ANIMES_BY_USER,
    payload,
  };
};

//thunks
export const getAllAnimesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/animes`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllAnimes(data));
  return data;
};

export const getAnimeThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/animes/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnime(data));
  return data;
};

export const getAnimesByListThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/animes/lists/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnimesByList(data));
  return data;
};

export const getAnimesByUserThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/animes/users/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnimesByUser(data));
  return data;
};

//reducer
const initialState = {
  allAnimes: {},
  anime: {},
  animesByList: {},
  animesByUser: {},
};

export default function animeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ANIMES:
      return { ...state, allAnime: action.payload };
    case GET_ANIME:
      return { ...state, anime: action.payload };
    case GET_ANIMES_BY_LIST:
      return { ...state, animeByList: action.payload };
    case GET_ANIMES_BY_USER:
      return { ...state, animeByUser: action.payload };
    default:
      return state;
  }
}
