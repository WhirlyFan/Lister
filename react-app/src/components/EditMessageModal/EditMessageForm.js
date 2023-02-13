import React, { useState } from "react";
import styles from "./EditMessageForm.module.css";

export default function EditMessageForm({
  message,
  editMessage,
  setShowModal,
}) {
  const [editedMessage, setEditedMessage] = useState(message.message);

  return (
    <div className={styles.container}>
      <label>Message</label>
      <textarea
        type="text"
        value={editedMessage}
        className={styles.message}
        onChange={(e) => setEditedMessage(e.target.value)}
      />
      <button
        className={"blue_button"}
        onClick={() => {
          editMessage(message.id, editedMessage);
          setShowModal(false);
        }}
      >
        Edit
      </button>
    </div>
  );
}
