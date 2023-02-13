import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditMessageForm from "./EditMessageForm";
// import styles from "./EditMessageForm.module.css";
import messageStyles from "../ChannelModal/ChannelForm.module.css";

export default function EditMessageModal({ message, editMessage }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={messageStyles.edit} onClick={() => setShowModal(true)}>
        <i className={`fas fa-edit`}></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditMessageForm
            setShowModal={setShowModal}
            message={message}
            editMessage={editMessage}
          />
        </Modal>
      )}
    </>
  );
}
