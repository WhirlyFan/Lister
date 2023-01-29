import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelForm from "./ChannelForm";

export default function ChannelModel({ hasClicked, setHasClicked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setShowModal(true)}>Messages</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelForm
            setShowModal={setShowModal}
            hasClicked={hasClicked}
            setHasClicked={setHasClicked}
          />
        </Modal>
      )}
    </>
  );
}
