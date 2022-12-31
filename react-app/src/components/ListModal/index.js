import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ListForm from "./ListForm";

export default function ListModal({
  list,
  setHasClicked,
  hasClicked,
  setAnimes,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit List</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListForm
            list={list}
            setShowModal={setShowModal}
            setHasClicked={setHasClicked}
            hasClicked={hasClicked}
            setAnimes={setAnimes}
          />
        </Modal>
      )}
    </>
  );
}
