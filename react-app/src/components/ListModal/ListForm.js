import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createListThunk,
  getAllListsThunk,
  deleteListThunk,
  editListThunk,
} from "../../store/lists";
import styles from "./ListForm.module.css";

export default function ListForm({ setHasClicked, hasClicked }) {
  const listsArr = useSelector((state) => state.lists.lists);
  const dispatch = useDispatch();
  //   const [hasClicked, setHasClicked] = useState(false);
  //   const [errors, setErrors] = useState([]);

  //   useEffect(() => {
  //     dispatch(getAllListsThunk());
  //   }, [dispatch, hasClicked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = {
      name: e.target.name.value,
      private: e.target.checkbox.checked,
    };
    dispatch(createListThunk(list)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  const deleteList = (listId) => {
    dispatch(deleteListThunk(listId)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  const editList = (listId) => {
    dispatch(editListThunk(listId)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {listsArr.map((list) => {
        return (
          <div key={`list ${list.id}`} className={styles.list_name}>
            <div>{list.name}</div>
            <div>
              <button onClick={() => editList(list.id)}>Edit</button>
              <button onClick={() => deleteList(list.id)}>Delete</button>
            </div>
          </div>
        );
      })}
      <label>
        List Name
        <input type="text" name="name" />
      </label>
      <label>
        Private
        <input type="checkbox" name="checkbox" />
      </label>
      <button type="submit">Create List</button>
    </form>
  );
}
