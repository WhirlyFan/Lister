import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUserThunk } from "../../store/session";
import { getFollowerFollowingThunk } from "../../store/follower";
import LoadingBar from "../LoadingBar/LoadingBar";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const getUser = useSelector((state) => state.session.get_user);
  const follows = useSelector((state) => state.followers?.Follows);
  const followers = useSelector((state) => state.followers?.Followers);

  const { userId, username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk(userId)).then((data) => {
      if (data.username !== username) {
        history.push(`/profile/${data.id}/${data.username}`);
      }
      dispatch(getFollowerFollowingThunk(data.id)).then(() => {
        setIsLoaded(true);
      });
    });
  }, [dispatch, history, userId, username]);

  if (!user || !isLoaded || !getUser) {
    return <LoadingBar />;
  }

  return (
    <div>
      <h1>{`${user.username}'s Profile`}</h1>
      <div>
        {console.log(user)}
        {console.log(getUser)}
        {console.log(follows)}
        {console.log(followers)}
      </div>
    </div>
  );
}
