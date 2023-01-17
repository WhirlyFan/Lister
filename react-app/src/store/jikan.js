//action types
const GET_TOP_ANIME = "jikan/GET_TOP_ANIME";
const GET_TOP_AIRING_ANIME = "jikan/GET_TOP_AIRING_ANIME";
const GET_TOP_UPCOMING_ANIME = "jikan/GET_TOP_UPCOMING_ANIME";
const GET_MOST_POPULAR_ANIME = "jikan/GET_MOST_POPULAR_ANIME";
const GET_ANIME = "jikan/GET_ANIME";
const SEARCH = "jikan/SEARCH";

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

export const search = (payload) => {
  return {
    type: SEARCH,
    payload,
  };
};

//thunks
export const getTopAnimeThunk = (page) => async (dispatch) => {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getTopAnime(data));
    return data;
  } catch (e) {
    if (e.status === 429) {
      return { error: "Too Many Requests!", status: "429", e };
    } else {
      return { error: "API not available!", e };
    }
  }
};

export const getTopAiringAnimeThunk = () => async (dispatch) => {
  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing");
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getTopAiringAnime(data));
    return data;
  } catch (e) {
    if (e.status === 429) {
      return { error: "Too Many Requests!", status: "429", e };
    } else {
      return { error: "API not available!", e };
    }
  }
};

export const getTopUpcomingAnimeThunk = () => async (dispatch) => {
  try {
    const res = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=upcoming"
    );
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getTopUpcomingAnime(data));
    return data;
  } catch (e) {
    if (e.status === 429) {
      return { error: "Too Many Requests!", status: "429", e };
    } else {
      return { error: "API not available!", e };
    }
  }
};

export const getMostPopularAnimeThunk = () => async (dispatch) => {
  try {
    const res = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
    );
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getMostPopularAnime(data));
    return data;
  } catch (e) {
    if (e.status === 429) {
      return { error: "Too Many Requests!", status: "429", e };
    } else {
      return { error: "API not available!", e };
    }
  }
};

export const getAnimeThunk = (id) => async (dispatch) => {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getAnime(data));
    return data;
  } catch (e) {
    if (e.status === 429) {
      return { error: "Too Many Requests!", status: "429", e };
    } else {
      return { error: "API not available!", e };
    }
  }
};

export const getHomeThunk = () => async (dispatch) => {
  const topAiringAnime = await dispatch(getTopAiringAnimeThunk());
  const topUpcomingAnime = await dispatch(getTopUpcomingAnimeThunk());
  const mostPopularAnime = await dispatch(getMostPopularAnimeThunk());
  if (
    topAiringAnime.status === "429" ||
    topUpcomingAnime.status === "429" ||
    mostPopularAnime.status === "429"
  ) {
    return { error: "Too Many Requests!", status: "429" };
  }
  return { topAiringAnime, topUpcomingAnime, mostPopularAnime };
};

export const searchThunk = (query) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&sfw`
    );
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(search(data));
    return data;
  } catch (e) {
    if (e.status === 429) {
      return { error: "Too Many Requests!", status: "429", e };
    } else {
      return { error: "API not available!", e };
    }
  }
};

//reducer
const initialState = {
  topAnime: {},
  topAiringAnime: {},
  topUpcomingAnime: {},
  mostPopularAnime: {},
  anime: {},
  search: {},
};

export default function jikanReducer(state = initialState, action) {
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
        ...state,
        anime: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
