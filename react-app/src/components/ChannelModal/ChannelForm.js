import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChannelForm.module.css";

export default function ChannelForm({ setShowModal }) {
  const user = useSelector((state) => state.session.user);
  return (
    <div className={styles.main}>
      <div className={styles.channels}>
        <div>{user.username}'s Channels</div>
      </div>
      <div className={styles.messages}>
        <div>Messages</div>
      </div>
    </div>
  );
}
