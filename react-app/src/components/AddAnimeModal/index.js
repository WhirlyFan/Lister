import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import AddAnimeForm from "./AddAnimeForm";
import { getListsThunk } from "../../store/lists";

function AddAnimeModal({ anime, list, listMode, setList }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <button
        onClick={() => {
          dispatch(getListsThunk(user.id)).then(() => {
            setShowModal(true);
          });
        }}
      >
        {listMode ? "Edit" : "Add to List"}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddAnimeForm
            setShowModal={setShowModal}
            anime={anime}
            listMode={listMode}
            list={list}
            setList={setList}
          />
        </Modal>
      )}
    </>
  );
}

export default AddAnimeModal;
