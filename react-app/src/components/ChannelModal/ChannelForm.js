import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChannelForm.module.css";
import { getUserChannelsThunk } from "../../store/channel";
// import LoadingBar from "../LoadingBar/LoadingBar";
import Channels from "./Channels";
import Messages from "./Messages";

export default function ChannelForm({ setShowModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    dispatch(getUserChannelsThunk(user.id)).then(() => {
      //move this to the onClick on the index file to fix flickering
      setIsLoaded(true);
    });
  }, [dispatch, user]);

  if (!isLoaded) {
    return null;
  }

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // socket.emit("chat", {
    //   id: user.id,
    //   user: user.username,
    //   msg: chatInput,
    //   channelId: channelId,
    //   room: serverId + "-" + channelId,
    // });
    setChatInput("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.channels}>
        <div>{user.username}'s Channels</div>
        <Channels setMessages={setMessages} />
      </div>
      <div className={styles.messages}>
        <div>Messages</div>
        <Messages messages={messages} />
        {messages.length !== 0 && (
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
