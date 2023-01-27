import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import Following from "./Following";

export default function FollowingModal({
  setHasClicked,
  hasClicked,
  user,
  followUnfollow
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setShowModal(true)} className="grey_button">Following</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Following
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
