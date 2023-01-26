import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUserThunk, followUnfollowThunk } from "../../store/session";
import LoadingBar from "../LoadingBar/LoadingBar";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const getUser = useSelector((state) => state.session.getUser);
  const [hasClicked, setHasClicked] = useState(false);
  const { userId, username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk(userId)).then((data) => {
      if (data.username !== username) {
        history.push(`/profile/${data.id}/${data.username}`);
      }
      setIsLoaded(true);
    });
  }, [dispatch, history, userId, username, hasClicked]);

  if (!isLoaded || !getUser) {
    return <LoadingBar />;
  }

  const followUnfollow = (userId) => {
    dispatch(followUnfollowThunk(userId)).then((data) => {
      if (data.error) {
        window.alert(data.error);
      }
      setHasClicked(!hasClicked);
    });
  };

  const lists = () => {
    history.push(`/lists/${userId}/${username}`);
  };

  return (
    <div>
      <h1>{`${username}'s Profile`}</h1>
      <button onClick={() => lists()}>Anime Lists</button>
      <FollowersModal
        user={getUser}
        hasClicked={hasClicked}
        setHasClicked={setHasClicked}
        followUnfollow={followUnfollow}
      />
      <FollowingModal
        user={getUser}
        hasClicked={hasClicked}
        setHasClicked={setHasClicked}
        followUnfollow={followUnfollow}
      />
      {user && user.id !== getUser.id && (
        <div>
          {getUser.followers.find((follower) => follower.id === user.id) ? (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to unfollow ${getUser.username}?`
                  )
                ) {
                  followUnfollow(getUser.id);
                }
              }}
            >
              Unfollow
            </button>
          ) : (
            <button onClick={() => followUnfollow(getUser.id)}>Follow</button>
          )}
        </div>
      )}
    </div>
  );
}
