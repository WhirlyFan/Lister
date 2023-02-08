import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import ChannelForm from "./ChannelForm";
import styles from "./ChannelForm.module.css";
import { getUserChannelsThunk } from "../../store/channel";

export default function ChannelModel() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserChannelsThunk(user.id));
  }, [dispatch, user]);

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
