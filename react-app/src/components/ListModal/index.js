import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ListForm from "./ListForm";
import styles from "../Lists/Lists.module.css";

export default function ListModal({
  list,
  setHasClicked,
  hasClicked,
  setList,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.icon}>
        <i className="fas fa-edit fa-lg" onClick={() => setShowModal(true)}></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListForm
            list={list}
            setShowModal={setShowModal}
            setHasClicked={setHasClicked}
            hasClicked={hasClicked}
            setList={setList}
          />
        </Modal>
      )}
    </>
  );
}
