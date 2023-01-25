import React from "react";
import { useHistory } from "react-router-dom";

export default function Followers({
  followers,
  setShowModal,
  hasClicked,
  setHasClicked,
}) {
  const history = useHistory();
  const userProfile = (follower) => {
    history.push(`/profile/${follower.id}/${follower.username}`);
  };

  return (
    <div>
      <h2>Followers</h2>
      {followers?.map((follower) => {
        return (
          <div
            key={`follower-${follower.id}`}
            onClick={() => userProfile(follower)}
          >
            {follower.username}
          </div>
        );
      })}
      {!followers.length && <div>No Followers Yet!</div>}
    </div>
  );
}
