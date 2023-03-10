import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnimeThunk,
  addAnimeToListThunk,
  getMalAnimeThunk,
} from "../../store/anime";
import styles from "./AddAnimeForm.module.css";

export default function AddAnimeModal({
  setShowModal,
  anime,
  setList,
  listMode,
}) {
  const dispatch = useDispatch();
  const [listId, setListId] = useState("");
  const listsArr = useSelector((state) => state.lists.lists);
  const [errors, setErrors] = useState([]);

  if (!Object.keys(listsArr).length) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listId === "") {
      setErrors(["Please select a list."]);
    }
    dispatch(getMalAnimeThunk(anime.mal_id)).then((data) => {
      const animeTitle = anime.title_english
        ? anime.title_english
        : anime.title;
      if (data.status) {
        dispatch(
          addAnimeThunk({
            mal_id: anime.mal_id,
            image: anime.images.jpg.image_url,
            title: animeTitle,
          })
        ).then((data) => {
          dispatch(addAnimeToListThunk(data.id, listId)).then((data) => {
            if (data.errors) {
              setErrors(data.errors);
            } else {
              setShowModal(false);
            }
          });
        });
      } else {
        dispatch(addAnimeToListThunk(data.id, listId)).then((data) => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            if (listMode) setList(data.list);
            setShowModal(false);
          }
        });
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
      <label>Add to List</label>
      <select
        value={listId}
        onChange={(e) => {
          setErrors([]);
          setListId(e.target.value);
        }}
        className={styles.select}
      >
        <option value="" disabled hidden>
          --- Select a List ---
        </option>
        {listsArr.map((list) => {
          return (
            <option key={`option-${list.id}`} value={list.id}>
              {list.name}
            </option>
          );
        })}
      </select>
      <button type="submit" className="blue_button">
        Submit
      </button>
    </form>
  );
}
