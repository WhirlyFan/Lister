import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnimeThunk,
  addAnimeToListThunk,
  getMalAnimeThunk,
  removeAnimeFromListThunk,
} from "../../store/anime";

export default function AddAnimeModal({
  setShowModal,
  anime,
  list,
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
      if (data.status) {
        dispatch(
          addAnimeThunk({
            mal_id: anime.mal_id,
            image: anime.images.jpg.image_url,
            title: anime.title,
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

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove "${anime.title}" from "${list.name}?"`)) {
      dispatch(removeAnimeFromListThunk(anime.id, list.id)).then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setList(data.list);
          setShowModal(false);
        }
      });
    }
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
      <label>Add to List</label>
      <select
        value={listId}
        onChange={(e) => {
          setErrors([]);
          setListId(e.target.value);
        }}
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
      <button type="submit" className="blue_button">Submit</button>
      {listMode && (
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
          className="grey_button"
        >
          Delete
        </button>
      )}
    </form>
  );
}
