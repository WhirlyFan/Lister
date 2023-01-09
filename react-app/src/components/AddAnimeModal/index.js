import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import AddAnimeForm from "./AddAnimeForm";
import { getListsThunk } from "../../store/lists";
import styles from "./AddAnimeModal.module.css";
import list_styles from "../Lists/Lists.module.css";

function AddAnimeModal({ anime, listMode, setList }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {!listMode && (
        <button
          onClick={() => {
            dispatch(getListsThunk(user.id)).then(() => {
              setShowModal(true);
            });
          }}
          className={styles.blue_button}
        >
          Add
        </button>
      )}
      {listMode && (
        <div
          onClick={() => setShowModal(true)}
          className={list_styles.edit_icon}
        >
          <i className={"fas fa-plus fa-lg"}></i>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddAnimeForm
            setShowModal={setShowModal}
            anime={anime}
            listMode={listMode}
            setList={setList}
          />
        </Modal>
      )}
    </>
  );
}

export default AddAnimeModal;
