//action types
const GET_ALL_ANIMES = "animes/GET_ALL_ANIMES";
const GET_ANIME = "animes/GET_ANIME";
const GET_ANIMES_BY_LIST = "animes/GET_ANIMES_BY_LIST";
const GET_ANIMES_BY_USER = "animes/GET_ANIMES_BY_USER";
const GET_MAL_ANIME = "animes/GET_MAL_ANIME";

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

export const getMalAnime = (payload) => {
  return {
    type: GET_MAL_ANIME,
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
  const data = await res.json();
  dispatch(getAnimesByUser(data));
  return data;
};

export const getMalAnimeThunk = (mal_id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/animes/mal/${mal_id}`);
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    dispatch(getMalAnime(data));
    return data;
  } catch (e) {
    if (e.status === 404) {
      return { error: "Anime Not Found!", status: "404", e };
    } else {
      return { error: "Error!", e };
    }
  }
};

export const addAnimeThunk = (anime) => async (dispatch) => {
  const res = await fetch(`/api/animes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anime),
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAnime(data));
  return data;
}

export const addAnimeToListThunk = (animeId, listId) => async () => {
  const res = await fetch(`/api/animes/${animeId}/lists/${listId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const removeAnimeFromListThunk = (animeId, listId) => async () => {
  const res = await fetch(`/api/animes/${animeId}/lists/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

//reducer
const initialState = {
  allAnimes: {},
  anime: {},
  animesByList: {},
  animeByUser: {},
  malAnime: {},
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
    case GET_MAL_ANIME:
      return { ...state, malAnime: action.payload };
    default:
      return state;
  }
}
