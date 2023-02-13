import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./ChannelForm.module.css";
import AddChannelModal from "../AddChannelModal";
import {
  getChannelThunk,
  deleteChannelThunk,
  getUserChannelsThunk,
} from "../../store/channel";
import formatDateTime from "../formatDateTime";
import { io } from "socket.io-client";
import EditMessageModal from "../EditMessageModal";
let socket;

export default function ChannelForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel.channels);
  const [channel, setChannel] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });

  useEffect(() => {
    dispatch(getUserChannelsThunk(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.on("chat", () => {
      dispatch(getChannelThunk(channel.id)).then((channel) => {
        setChannel(channel);
      });
    });
    //this is faking the websocket by dispatching the thunk
    socket.on("edit-message", () => {
      dispatch(getChannelThunk(channel.id)).then((channel) => {
        setChannel(channel);
      });
    });
    //this is faking the websocket by dispatching the thunk
    socket.on("delete-message", () => {
      dispatch(getChannelThunk(channel.id)).then((channel) => {
        setChannel(channel);
      });
    });
    //this is faking the websocket by dispatching the thunk
    // socket.on("delete-channel", () => {
    //   dispatch(getUserChannelsThunk(user.id));
    // });
    // socket.on("edit-channel", () => {
    //   dispatch(getUserChannelsThunk(user.id));
    // });

    //this code is not working when channel is empty e.g., before selecting a channel
    //join room
    if (channel) {
      socket.emit("join", {
        user: user.username,
        room: channel.id,
      });
    }
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [user, dispatch, channel]);

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

  const getChannel = (channelId) => {
    dispatch(getChannelThunk(channelId)).then((channel) => {
      setChannel(channel);
    });
  };

  const editMessage = (messageId, editedMessage) => {
    if (editedMessage === "") {
      socket.emit("delete-message", { id: messageId, room: channel.id });
      return;
    }
    socket.emit("edit-message", {
      id: messageId,
      message: editedMessage,
      room: channel.id,
    });
  };

  const deleteMessage = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      socket.emit("delete-message", { id: messageId, room: channel.id });
    }
  };

  const deleteChannel = (channelId) => {
    if (window.confirm("Are you sure you want to delete this channel?")) {
      // socket.emit("delete-channel", { id: channelId, room: channelId });

      //non websocket version that doesn't update on other user's screens
      dispatch(deleteChannelThunk(channelId)).then(() => {
        if (channel?.id === channelId) {
          setChannel(null);
        }
        dispatch(getUserChannelsThunk(user.id));
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.channels}>
        <i className="beta">Beta Mode</i>
        <div className={styles.channels_header}>
          <div>{user.username}'s Channels</div>
          <AddChannelModal />
        </div>
        <div>
          {channels.map((channel) => {
            if (channel.users.length < 2) {
              if (!channel.name) {
                channel.name = channel.users[0].username; //this code should never run if channels are properly getting deleted
              }
            } else if (channel.users.length === 2) {
              if (!channel.name) {
                const other_user = channel.users.find((channel_member) => {
                  return channel_member.id !== user.id;
                });
                channel.name = other_user.username;
              }
            } else {
              if (!channel.name) {
                channel.name = `${channel.users[0].username} and ${
                  channel.users.length - 1
                } others`;
              }
            }
            return (
              <div
                key={`channel-${channel.id}`}
                onClick={() => getChannel(channel.id)}
                className={styles.channel}
              >
                <div>{channel.name ? channel.name : "general"}</div>
                <div className={styles.channel_icons}>
                  {/* {channel.owner_id === user.id && (
                    <div className={styles.edit}>
                      <i className="fas fa-edit"></i>
                    </div>
                  )} */}
                  {(user.id === channel.owner_id ||
                    channel.users.length === 2) && (
                    <div
                      className={styles.delete}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChannel(channel.id);
                      }}
                    >
                      <i className="fas fa-trash-can"></i>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.messages_main}>
        <div className={styles.messages}>
          {!channel && (
            <div className={styles.no_channel}>
              Select a channel to start chatting!
            </div>
          )}
          {channel && !channel.messages.length && (
            <div className={styles.no_messages}>No messages yet!</div>
          )}
          {channel &&
            channel.messages.map((message) => {
              return (
                <div key={`message-${message.id}`} className={styles.message}>
                  <div className={styles.message_header}>
                    <div className={styles.message_user_info}>
                      <strong
                        className={styles.message_username}
                        onClick={() => {
                          history.push(
                            `/profile/${message.user.id}/${message.user.username}`
                          );
                          setShowModal(false);
                        }}
                      >
                        {message.user.username}
                      </strong>
                      <div>{formatDateTime(message.created_at)}</div>
                    </div>
                    {user.id === message.user.id && (
                      <div className={styles.message_icons}>
                        {/* <div
                          className={styles.edit}
                          onClick={() => {
                            editMessage(message);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </div> */}
                        <EditMessageModal
                          message={message}
                          editMessage={editMessage}
                        />
                        <div
                          className={styles.delete}
                          onClick={() => deleteMessage(message.id)}
                        >
                          <i className="fas fa-trash-can"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>{message.message}</div>
                </div>
              );
            })}
          <div ref={messageRef} />
        </div>
        {channel && (
          <form className={styles.form} onSubmit={sendChat}>
            <input
              className={styles.chat_input}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={"Message"}
            />
          </form>
        )}
      </div>
    </div>
  );
}
