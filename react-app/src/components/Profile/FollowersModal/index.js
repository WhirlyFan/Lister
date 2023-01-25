import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import Followers from "./Followers";

export default function FollowersModal({
  setHasClicked,
  hasClicked,
  followers,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setShowModal(true)}>Followers</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Followers
            followers={followers}
            setShowModal={setShowModal}
            setHasClicked={setHasClicked}
            hasClicked={hasClicked}
          />
        </Modal>
      )}
    </>
  );
}
