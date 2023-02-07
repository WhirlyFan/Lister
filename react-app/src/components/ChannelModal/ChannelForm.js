import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChannelForm.module.css";
import { getUserChannelsThunk } from "../../store/channel";
// import LoadingBar from "../LoadingBar/LoadingBar";
import Channels from "./Channels";
import Messages from "./Messages";
import { io } from "socket.io-client";
let socket;

export default function ChannelForm({ setShowModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [channel, setChannel] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    dispatch(getUserChannelsThunk(user.id)).then(() => {
      //move this to the onClick on the index file to fix flickering
      setIsLoaded(true);
    });
  }, [dispatch, user]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    // socket.on("chat", () => {
    //   dispatch(getUserChannelsThunk(user.id)).then((messages) => {
    //     setMessages(messages.Messages);
    //   });
    // });
    // socket.on("delete", () => {
    //   dispatch(getUserChannelsThunk(user.id)).then((messages) => {
    //     setMessages(messages.Messages);
    //   });
    // });
    //join room
    socket.emit("join", {
      user: user.username,
      room: channel.id,
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [channelId, serverId, user.username, dispatch]);

  if (!isLoaded) {
    return null;
  }

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      id: user.id,
      user: user.username,
      message: chatInput,
      channelId: channel.id,
      room: channel.id,
    });
    setChatInput("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.channels}>
        <div>{user.username}'s Channels</div>
        <Channels setChannel={setChannel} />
      </div>
      <div className={styles.messages}>
        <div>Messages</div>
        <Messages channel={channel} />
        {channel.messages.length !== 0 && (
          <form className={styles.form} onSubmit={sendChat}>
            <input
              className={styles.chatBox}
              value={chatInput}
              onChange={updateChatInput}
              placeholder={"Message"}
            />
          </form>
        )}
      </div>
    </div>
  );
}
