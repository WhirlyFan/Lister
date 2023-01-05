import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddAnimeForm from "./AddAnimeForm";
function AddAnimeModal({ anime, listMode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        {listMode ? "Edit" : "Add to List"}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddAnimeForm
            setShowModal={setShowModal}
            anime={anime}
            listMode={listMode}
          />
        </Modal>
      )}
    </>
  );
}

export default AddAnimeModal;
