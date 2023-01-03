import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddReviewForm from "./AddReviewForm";

export default function AddReviewModal({ hasClicked, setHasClicked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewForm
            setShowModal={setShowModal}
            hasClicked={hasClicked}
            setHasClicked={setHasClicked}
          />
        </Modal>
      )}
    </>
  );
}
