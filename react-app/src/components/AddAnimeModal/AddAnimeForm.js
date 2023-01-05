import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListsThunk } from "../../store/lists";
import {
  addAnimeThunk,
  addAnimeToListThunk,
  getMalAnimeThunk,
  removeAnimeFromListThunk,
} from "../../store/anime";

export default function AddAnimeModal({ setShowModal, anime, list, listMode }) {
  const dispatch = useDispatch();
  const [listId, setListId] = useState("");
  const listsArr = useSelector((state) => state.lists.lists);
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getListsThunk(user.id)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, user]);

  if (!Object.keys(listsArr).length || !isLoaded) {
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

  const handleDelete = () => {
    // console.log(anime, list, listMode);
    dispatch(removeAnimeFromListThunk(anime.id, list.id)).then((data) => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setShowModal(false);
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
      <select value={listId} onChange={(e) => setListId(e.target.value)}>
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
      <button type="submit">Submit</button>
      {listMode && (
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
      )}
    </form>
  );
}
