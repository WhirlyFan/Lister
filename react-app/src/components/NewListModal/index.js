import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewListForm from "./NewListForm";
import styles from "./NewListModal.module.css";

export default function ListModal({ hasClicked, setHasClicked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.new_list_blue_button}>
        New List
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewListForm
            setShowModal={setShowModal}
            hasClicked={hasClicked}
            setHasClicked={setHasClicked}
          />
        </Modal>
      )}
    </>
  );
}
