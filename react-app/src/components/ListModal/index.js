import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ListForm from "./ListForm";

export default function ListModal({ setHasClicked, hasClicked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>List Settings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListForm setHasClicked={setHasClicked} hasClicked={hasClicked} />
        </Modal>
      )}
    </>
  );
}
