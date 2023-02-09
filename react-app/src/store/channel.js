//action types
const GET_CHANNEL = "channel/GET_CHANNEL";
const GET_USER_CHANNELS = "channel/GET_USER_CHANNELS";

//action creators
export const getChannel = (payload) => {
  return {
    type: GET_CHANNEL,
    payload,
  };
};

export const getUserChannels = (payload) => {
  return {
    type: GET_USER_CHANNELS,
    payload,
  };
};

//thunks
export const getChannelThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/channels/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getChannel(data));
  return data;
};

export const getUserChannelsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/channels/user/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getUserChannels(data));
  return data;
};

export const createChannelThunk = (channel) => async (dispatch) => {
  const res = await fetch(`/api/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getUserChannels(data));
  return data;
};

export const editChannelThunk = (channel) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channel.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getUserChannels(data));
  return data;
};

export const deleteChannelThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/channels/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getUserChannels(data));
  return data;
};

export const addChannelMembersThunk = (channelId, users) => async () => {
  const res = await fetch(`/api/channels/${channelId}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  return data;
};

//reducer
const initialState = {
  channel: null,
  channels: null,
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNEL:
      return { ...state, ...action.payload };
    case GET_USER_CHANNELS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
