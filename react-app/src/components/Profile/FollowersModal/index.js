import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import Followers from "./Followers";

export default function FollowersModal({
  setHasClicked,
  hasClicked,
  user,
  followUnfollow,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setShowModal(true)} className="blue_button">Followers</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Followers
            user={user}
            setShowModal={setShowModal}
            setHasClicked={setHasClicked}
            hasClicked={hasClicked}
            followUnfollow={followUnfollow}
          />
        </Modal>
      )}
    </>
  );
}
