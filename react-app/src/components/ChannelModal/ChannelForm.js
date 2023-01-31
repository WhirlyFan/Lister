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

  useEffect(() => {
    dispatch(getUserChannelsThunk(user.id)).then(() => {
      //move this to the onClick on the index file to fix flickering
      setIsLoaded(true);
    });
  }, [dispatch, user]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.channels}>
        <div>{user.username}'s Channels</div>
        <Channels setMessages={setMessages} />
      </div>
      <div className={styles.messages}>
        <div>Messages</div>
        <Messages messages={messages} />
      </div>
    </div>
  );
}
