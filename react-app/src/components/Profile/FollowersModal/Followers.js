import React from "react";
import UserCard from "../UserCard";

export default function Followers({
  user,
  setShowModal,
  hasClicked,
  setHasClicked,
  followUnfollow,
}) {
  return (
    <div>
      <h2>Followers</h2>
      {user.followers?.map((user) => {
        return (
          <div key={`user-${user.id}`}>
            <UserCard
              user={user}
              followUnfollow={followUnfollow}
              setShowModal={setShowModal}
            />
          </div>
        );
      })}
      {!user.followers.length && <div>No Followers Yet!</div>}
    </div>
  );
}
