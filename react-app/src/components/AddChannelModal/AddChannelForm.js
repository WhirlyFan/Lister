import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/channel";

export default function AddChannelForm({ setShowModal }) {
  //   const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const channel = {
      name: channelName.length ? channelName : null,
    };
    dispatch(createChannelThunk(channel));
    setChannelName("");
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add Channel</label>
        <input
          type="text"
          value={channelName}
          placeholder="(Optional) Channel Name"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
