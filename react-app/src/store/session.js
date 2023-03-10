// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER";
const GET_USERS = "session/GET_USERS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

const getUsers = (payload) => ({
  type: GET_USERS,
  payload,
});

const initialState = { user: null, getUser: null, users: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, repeatPassword) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        repeat_password: repeatPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const getUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    throw response;
  }
  const data = await response.json();
  dispatch(getUser(data));
  return data;
};

// export const getUsersThunk = (query) => async (dispatch) => {
//   const response = await fetch(`/api/users?q=${query}&limit=20`);

//   if (!response.ok) {
//     throw response;
//   }
//   const data = await response.json();
//   dispatch(getUsers(data));
//   return data;
// };

export const getUsersThunk = () => async (dispatch) => {
  const response = await fetch(`/api/users`);

  if (!response.ok) {
    throw response;
  }
  const data = await response.json();
  dispatch(getUsers(data));
  return data;
};

export const followUnfollowThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/followers/${id}`, {
    method: "POST",
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getUser(data));
  return data;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case GET_USER:
      return { ...state, getUser: action.payload };
    case GET_USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
