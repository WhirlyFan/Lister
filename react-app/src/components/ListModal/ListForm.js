import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListThunk,
  editListThunk,
} from "../../store/lists";
// import styles from "./ListForm.module.css";

export default function ListForm({
  list,
  setShowModal,
  setHasClicked,
  hasClicked,
  setAnimes,
}) {
  const [name, setName] = useState(list.name);
  const [priv, setPriv] = useState(list.private);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const animeArr = useSelector((state) => state.anime.animeByUser?.animes);

  if (!animeArr) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: list.id,
      name,
      private: priv,
    };
    dispatch(editListThunk(payload))
      .then(() => {
        setShowModal(false);
        setHasClicked(!hasClicked);
        // setAnimes(animeArr);
      })
      // .then(dispatch(getListsThunk(list.owner_id)))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteListThunk(id)).then(() => {
      setAnimes(animeArr);

      // setHasClicked(!hasClicked);
    });
    setShowModal(false);

    // .then(dispatch(getListsThunk(list.owner_id)))
    // .catch((res) => {
    //   if (res.data && res.data.errors) setErrors(res.data.errors);
    // });
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
      <button onClick={() => handleDelete(list.id)}>Delete</button>
    </form>
  );
}
