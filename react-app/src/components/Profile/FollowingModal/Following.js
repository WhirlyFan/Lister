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
      <strong>Following</strong>
      <hr />
      {user.following?.map((user) => {
        return (
          <UserCard
            key={`following-${user.id}`}
            user={user}
            followUnfollow={followUnfollow}
            setShowModal={setShowModal}
          />
        );
      })}
      {!user.following.length && <div>Not Following Anyone Yet!</div>}
    </div>
  );
}
