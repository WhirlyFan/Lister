import React from "react";
import UserCard from "../UserCard";

export default function Following({
  user,
  setShowModal,
  hasClicked,
  setHasClicked,
  followUnfollow,
}) {
  return (
    <div>
      <h2>Following</h2>
      {user.following?.map((user) => {
        return (
          <div key={`follow-${user.id}`}>
            <UserCard
              user={user}
              followUnfollow={followUnfollow}
              setShowModal={setShowModal}
            />
          </div>
        );
      })}
      {!user.following.length && <div>Not Following Anyone Yet!</div>}
    </div>
  );
}
