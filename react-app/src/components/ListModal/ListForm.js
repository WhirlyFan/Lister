import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editListThunk } from "../../store/lists";
import styles from "./ListForm.module.css";

export default function ListForm({ list }) {
  const [name, setName] = useState(list.name);
  const [priv, setPriv] = useState(list.private);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: list.id,
      name,
      private: priv,
    };
    dispatch(editListThunk(payload))
      .then(() => {
        setName("");
        setPriv(false);
      })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="error">
            {error}
          </li>
        ))}
      </ul>
      {console.log(list)}
      <label>List Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
            <label>Private</label>
      <input
        type="checkbox"
        checked={priv}
        onChange={(e) => setPriv(e.target.checked)}
      />
      <button type="submit">Edit</button>
    </form>
  );
}
