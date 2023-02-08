import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddChannelForm from "./AddChannelForm";
import styles from "./AddChannelForm.module.css";

export default function ChannelModel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <i
          className={`${styles.channel_add} fas fa-plus`}
          onClick={() => setShowModal(true)}
        ></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddChannelForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
