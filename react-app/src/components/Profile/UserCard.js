import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Profile.module.css";

export default function UserCard({ user, followUnfollow, setShowModal }) {
  const history = useHistory();
  const getUser = useSelector((state) => state.session.getUser);
  const current_user = useSelector((state) => state.session.user);

  const userProfile = (user) => {
    history.push(`/profile/${user.id}/${user.username}`);
    setShowModal(false);
  };
  return (
    <div className={styles.user_card}>
      <div onClick={() => userProfile(user)}>{user.username}</div>
      {current_user && current_user.id !== user.id && (
        <div>
          {getUser.following.find((follower) => follower.id === user.id) ? (
            <button
              className="grey_button"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to unfollow ${user.username}?`
                  )
                ) {
                  followUnfollow(user.id);
                }
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="blue_button"
              onClick={() => followUnfollow(user.id)}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
}
