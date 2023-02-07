import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelForm from "./ChannelForm";
import styles from "./ChannelForm.module.css";

export default function ChannelModel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <i
          className={`${styles.envelope} fas fa-envelope fa-xl`}
          onClick={() => setShowModal(true)}
        ></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
