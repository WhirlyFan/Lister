import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ListForm from "./ListForm";

export default function ListModal({ list }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit List</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListForm list={list} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}
