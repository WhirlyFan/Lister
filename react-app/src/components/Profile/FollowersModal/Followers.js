import React from "react";
import UserCard from "../UserCard";
import styles from "../Profile.module.css"

export default function Followers({
  user,
  setShowModal,
  hasClicked,
  setHasClicked,
  followUnfollow,
}) {
  return (
    <div className={styles.followers}>
      <strong>Followers</strong>
      <hr />
      {user.followers?.map((user) => {
        return (
          <UserCard
            key={`follower-${user.id}`}
            user={user}
            followUnfollow={followUnfollow}
            setShowModal={setShowModal}
          />
        );
      })}
      {!user.followers.length && <div>No Followers Yet!</div>}
    </div>
  );
}
