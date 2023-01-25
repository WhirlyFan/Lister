import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import Following from "./Following";

export default function FollowingModal({ setHasClicked, hasClicked, following }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setShowModal(true)}>Following</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Following
            following={following}
            setShowModal={setShowModal}
            setHasClicked={setHasClicked}
            hasClicked={hasClicked}
          />
        </Modal>
      )}
    </>
  );
}
