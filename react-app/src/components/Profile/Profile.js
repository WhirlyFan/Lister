import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUserThunk } from "../../store/session";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { userId, username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk(userId)).then((data) => {
      if (data.username !== username) {
        history.push(`/profile/${data.id}/${data.username}`);
      }
      setUser(data);
      setIsLoaded(true);
    });
  }, [dispatch, history, userId, username]);

  if (!user || !isLoaded) {
    return null;
  }

  return (
    <div>
      <h1>{`${user.username}'s Profile`}</h1>
      <h2>Feature Coming Soon...</h2>
    </div>
  );
}
