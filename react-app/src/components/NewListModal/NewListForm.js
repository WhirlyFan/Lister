import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createListThunk } from "../../store/lists";

export default function NewListForm({
  setShowModal,
  hasClicked,
  setHasClicked,
}) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [priv, setPriv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: listName,
      private: priv,
    };
    dispatch(createListThunk(payload)).then(() => {
      setShowModal(false);
      setHasClicked(!hasClicked);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="listName">List Name</label>
        <input
          type="text"
          name="listName"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="listPrivate">Private</label>
        <input
          type="checkbox"
          name="private"
          checked={priv}
          onChange={(e) => setPriv(e.target.value)}
        />
      </div>
      <button type="submit">Create List</button>
    </form>
  );
}
