import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import AddAnime from "./AddAnimeForm";

export default function AddAnimeModal() {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);


  return <div>test</div>;
}
