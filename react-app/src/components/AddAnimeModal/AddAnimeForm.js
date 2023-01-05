import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListsThunk } from "../../store/lists";
import { getUserThunk } from "../../store/session";

export default function AddAnimeModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const listsArr = useSelector((state) => state.lists.lists);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getListsThunk(user.id))
  }, [dispatch, user]);

  if (!listsArr) {
    return null;
  }

  return (
    <div>
      <label>Add to List</label>
      {/* {console.log(listsArr)} */}
      <select>
        {listsArr.map((list) => {
          return <option value={list.name}>{list.name}</option>;
        })}
      </select>
      <button type="submit">Create List</button>
    </div>
  );
}
