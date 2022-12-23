//action types
const GET_ALL_LISTS = "list/GET_ALL_LISTS";
const GET_LIST = "list/GET_LIST";
const GET_LISTS = "list/GET_LISTS";
const GET_ALL_LIST_ANIME = "list/GET_ALL_LIST_ANIME";

//action creators
export const getList = (payload) => {
  return {
    type: GET_LIST,
    payload,
  };
};

export const getAllLists = (payload) => {
  return {
    type: GET_ALL_LISTS,
    payload,
  };
};

export const getLists = (payload) => {
  return {
    type: GET_LISTS,
    payload,
  };
};

export const getAllListAnime = (payload) => {
  return {
    type: GET_ALL_LIST_ANIME,
    payload,
  };
};

//thunks
export const getListThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/lists/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getList(data));
  return data;
};

export const getAllListsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/lists`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllLists(data));
  return data;
};

export const getListsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/lists/users/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getLists(data));
  return data;
};

export const getAllListAnimeThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/lists/${id}/anime`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllListAnime(data));
  return data;
}

export const createListThunk = (list) => async (dispatch) => {
  const res = await fetch(`/api/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllLists(data));
  return data;
};

export const updateListThunk = (list) => async (dispatch) => {
  const res = await fetch(`/api/lists/${list.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      private: list.private,
      title: list.title,
    }),
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllLists(data));
  return data;
};

export const deleteListThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/lists/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getAllLists(data));
  return data;
};

//reducer
const initialState = {
  allLists: {},
  list: {},
  lists: {},
};

export const normalize = (lists) => {
  const normalized = {};
  lists.forEach((list) => {
    normalized[list.id] = list;
  });
  return normalized;
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return { ...state, list: { ...action.payload } };
    case GET_ALL_LISTS:
      const normalizedAllLists = normalize(action.payload.lists);
      return { ...state, allLists: { ...normalizedAllLists } };
    case GET_LISTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
