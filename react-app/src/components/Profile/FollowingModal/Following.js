import React from "react";
import { useHistory } from "react-router-dom";

export default function Following({
  following,
  setShowModal,
  hasClicked,
  setHasClicked,
}) {
  const history = useHistory();
  const userProfile = (follow) => {
    history.push(`/profile/${follow.id}/${follow.username}`);
  };

  return (
    <div>
      <h2>Following</h2>
      {following?.map((follow) => {
        return (
          <div key={`follow-${follow.id}`} onClick={() => userProfile(follow)}>
            {follow.username}
          </div>
        );
      })}
      {!following.length && <div>Not Following Anyone Yet!</div>}
    </div>
  );
}
