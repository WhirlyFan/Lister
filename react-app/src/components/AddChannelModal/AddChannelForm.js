import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChannelThunk,
  addChannelMembersThunk,
  getUserChannelsThunk,
} from "../../store/channel";

export default function AddChannelForm({ setShowModal }) {
  //   const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [channelName, setChannelName] = useState("");
  const [users, setUsers] = useState([1, 2, 3]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const channel = {
      name: channelName.length ? channelName : null,
    };
    dispatch(createChannelThunk(channel))
      .then((channel) => {
        dispatch(addChannelMembersThunk(channel.id, { users: users }));
      })
      .then(() => {
        dispatch(getUserChannelsThunk(user.id));
      });
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
