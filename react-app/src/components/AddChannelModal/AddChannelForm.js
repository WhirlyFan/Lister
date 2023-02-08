import React, { useState } from "react";

export default function AddChannelForm() {
//   const [users, setUsers] = useState([]);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <label>Add Channel</label>
      <input
        type="text"
        value={channelName}
        placeholder="Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
        required
      />
      {/* <label>Users</label>
        <input type="text" placeholder="User" /> */}
    </div>
  );
}
