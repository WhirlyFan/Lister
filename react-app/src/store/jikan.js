//action types
const GET_TOP_ANIME = "jikan/GET_TOP_ANIME";
const GET_TOP_AIRING_ANIME = "jikan/GET_TOP_AIRING_ANIME";
const GET_TOP_UPCOMING_ANIME = "jikan/GET_TOP_UPCOMING_ANIME";
const GET_MOST_POPULAR_ANIME = "jikan/GET_MOST_POPULAR_ANIME";
const GET_ANIME = "jikan/GET_ANIME";

//action creators
export const getTopAnime = (payload) => {
  return {
    type: GET_TOP_ANIME,
    payload,
  };
};

export const getTopAiringAnime = (payload) => {
  return {
    type: GET_TOP_AIRING_ANIME,
    payload,
  };
};

export const getTopUpcomingAnime = (payload) => {
  return {
    type: GET_TOP_UPCOMING_ANIME,
    payload,
  };
};

export const getMostPopularAnime = (payload) => {
  return {
    type: GET_MOST_POPULAR_ANIME,
    payload,
  };
};

export const getAnime = (payload) => {
  return {
    type: GET_ANIME,
    payload,
  };
};

//thunks
export const getTopAnimeThunk = (page) => async (dispatch) => {
  if (page) {
    const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getTopAnime(data));
    return data;
  }
  const res = await fetch("https://api.jikan.moe/v4/top/anime");
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getTopAnime(data));
  return data;
};

export const getTopAiringAnimeThunk = () => async (dispatch) => {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing");
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getTopAiringAnime(data));
  return data;
};

export const getTopUpcomingAnimeThunk = () => async (dispatch) => {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?filter=upcoming");
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getTopUpcomingAnime(data));
  return data;
};

export const getMostPopularAnimeThunk = () => async (dispatch) => {
  const res = await fetch(
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
  );
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getMostPopularAnime(data));
  return data;
};

export const getAnimeThunk = (id) => async (dispatch) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnime(data));
  return data;
};

//reducer
const initialState = {
  topAnime: null,
  topAiringAnime: null,
  topUpcomingAnime: null,
  mostPopularAnime: null,
  anime: null,
};

export const jikanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_ANIME:
      return {
        ...state,
        topAnime: action.payload,
      };
    case GET_TOP_AIRING_ANIME:
      return {
        ...state,
        topAiringAnime: action.payload,
      };
    case GET_TOP_UPCOMING_ANIME:
      return {
        ...state,
        topUpcomingAnime: action.payload,
      };
    case GET_MOST_POPULAR_ANIME:
      return {
        ...state,
        mostPopularAnime: action.payload,
      };
    case GET_ANIME:
        return {
            ...state, anime: action.payload
        }
    default:
      return state;
  }
};
