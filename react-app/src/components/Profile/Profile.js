import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUserThunk } from "../../store/session";
import {
  getFollowerFollowingThunk,
  followUnfollowThunk,
} from "../../store/follower";
import LoadingBar from "../LoadingBar/LoadingBar";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const getUser = useSelector((state) => state.session.get_user);
  const follows = useSelector((state) => state.followers?.Follows);
  const followers = useSelector((state) => state.followers?.Followers);
  const [hasClicked, setHasClicked] = useState(false);

  const { userId, username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk(userId)).then((data) => {
      if (data.username !== username) {
        history.push(`/profile/${data.id}/${data.username}`);
      }
      dispatch(getFollowerFollowingThunk(data.id)).then((data) => {
        setIsLoaded(true);
      });
    });
  }, [dispatch, history, userId, username, hasClicked]);

  if (!isLoaded || !getUser) {
    return <LoadingBar />;
  }

  const followUnfollow = () => {
    dispatch(followUnfollowThunk(userId)).then((data) => {
      if (data.error) {
        window.alert(data.error);
      }
      setHasClicked(!hasClicked);
    });
  };

  return (
    <div>
      <h1>{`${getUser.username}'s Profile`}</h1>
      {user && user.id !== getUser.id && (
        <div>
          {followers.find((follower) => follower.id === user.id) ? (
            <button onClick={() => followUnfollow()}>Unfollow</button>
          ) : (
            <button onClick={() => followUnfollow()}>Follow</button>
          )}
        </div>
      )}
    </div>
  );
}
