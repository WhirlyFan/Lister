import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";
import AnimeDetails_styles from "../AnimeDetails/AnimeDetails.module.css";

export default function ReviewModal({ review, hasClicked, setHasClicked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={AnimeDetails_styles.icon}>
        <i className="fas fa-edit fa-lg" onClick={() => setShowModal(true)}></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
            setShowModal={setShowModal}
            review={review}
            hasClicked={hasClicked}
            setHasClicked={setHasClicked}
          />
        </Modal>
      )}
    </>
  );
}
