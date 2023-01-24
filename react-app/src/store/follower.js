//action types
const GET_FOLLOWER_FOLLOWING = "follower/GET_FOLLOWER_FOLLOWING";
const FOLLOW_UNFOLLOW = "follower/FOLLOW_UNFOLLOW";

//action creators

export const getFollowerFollowing = (payload) => {
  return {
    type: GET_FOLLOWER_FOLLOWING,
    payload,
  };
};

export const followUnfollow = (payload) => {
  return {
    type: FOLLOW_UNFOLLOW,
    payload,
  };
};

//thunks
export const getFollowerFollowingThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/followers/${id}`);
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  dispatch(getFollowerFollowing(data));
  return data;
};

export const followUnfollowThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/followers/follow/${id}`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  console.log(data);
  dispatch(getFollowerFollowing(data));
  return data;
};

const initialState = {
  Follows: null,
  Followers: null,
};

export default function followerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWER_FOLLOWING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
