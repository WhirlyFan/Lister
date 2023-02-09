import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../../store/session";
import {
  createChannelThunk,
  addChannelMembersThunk,
  getUserChannelsThunk,
} from "../../store/channel";
import styles from "./AddChannelForm.module.css";

export default function AddChannelForm({ setShowModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [channelName, setChannelName] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  // const allUsers = useSelector((state) => state.session.users);

  //this is for the filtered list of users
  useEffect(() => {
    dispatch(getUsersThunk()).then((data) => {
      setFilteredUsers(
        data.users.filter(
          (filteredUser) =>
            filteredUser.username
              .toLowerCase()
              .includes(search.length ? search.toLowerCase() : null) &&
            filteredUser.id !== user.id
        )
      );
    });
  }, [dispatch, search, user]);

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
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Add Channel</label>
        <input
          type="text"
          value={channelName}
          placeholder="(Optional) Channel Name"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button type="submit">Submit</button>
        <ul>
          {users.map((user) => (
            <li key={`user-${user.id}`}>
              <div>{user.username}</div>
              <div>
                <i
                  onClick={() => setUsers(users.filter((u) => u !== user))}
                  className="fas fa-x"
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </form>
      <label>Users</label>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {filteredUsers.map((user) => (
          <li
            key={`user-${user.id}`}
            onClick={() => {
              if (users.includes(user)) return;
              setUsers([...users, user]);
            }}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
