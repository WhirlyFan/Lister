import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListsThunk } from "../../store/lists";
import {
  addAnimeThunk,
  addAnimeToListThunk,
  getMalAnimeThunk,
} from "../../store/anime";

export default function AddAnimeModal({ setShowModal, anime }) {
  const dispatch = useDispatch();
  const [listId, setListId] = useState("");
  const listsArr = useSelector((state) => state.lists.lists);
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getListsThunk(user.id));
  }, [dispatch, user]);

  if (!Object.keys(listsArr).length) {
    return null;
  }
  // need to add default value to select
  const handleSubmit = (e) => {
    e.preventDefault();
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
            setShowModal(false);
          }
        });
      }
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
      <label>Add to List</label>
      {console.log(listsArr)}
      <select value={listId} onChange={(e) => setListId(e.target.value)}>
        {listsArr.map((list) => {
          return (
            <option key={`option-${list.id}`} value={list.id}>
              {list.name}
            </option>
          );
        })}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
