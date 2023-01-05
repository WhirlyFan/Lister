import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddAnimeForm from "./AddAnimeForm";
function AddAnimeModal({anime}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add to List</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddAnimeForm setShowModal={setShowModal} anime={anime}/>
        </Modal>
      )}
    </>
  );
}

export default AddAnimeModal;
