import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createListThunk } from "../../store/lists";
import styles from "./NewListModal.module.css";

export default function NewListForm({
  setShowModal,
  hasClicked,
  setHasClicked,
  form,
}) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [priv, setPriv] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: listName,
      private: priv,
    };
    dispatch(createListThunk(payload)).then((data) => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        if (form) {
          setListName("");
          setPriv(false);
          setErrors([]);
        } else {
          setShowModal(false);
        }
        setHasClicked(!hasClicked);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="error">
            {error}
          </li>
        ))}
      </ul>

        <label>List Name</label>
        <input
          type="text"
          name="listName"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />

      <div className={styles.private}>
        <label>Private</label>
        <input
          type="checkbox"
          name="private"
          checked={priv}
          onChange={(e) => setPriv(e.target.checked)}
        />
      </div>
      <button className="blue_button" type="submit">
        Create List
      </button>
    </form>
  );
}
