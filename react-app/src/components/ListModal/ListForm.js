import React from "react";
// import { useDispatch } from "react-redux";
// import { editListThunk, deleteListThunk } from "../../store/lists";
// import styles from "./ListForm.module.css";

export default function ListForm({ animes }) {
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      {console.log(animes)}
      <div>{animes.name}</div>
      <button>Edit</button>
      <button>Delete</button>
    </form>
  );
}
