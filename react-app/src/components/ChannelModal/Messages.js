import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChannelForm.module.css";

export default function Messages({ channel }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //   const getUser = useSelector((state) => state.user.users))

  const formatDateTime = (timestamp) => {
    let dateObj = new Date(timestamp);
    // Grab month, day, and year of dateObj then convert into string, do the same for time
    let date = dateObj.toLocaleString("default", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    let time = dateObj.toLocaleString("default", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      timeZone: "UTC",
    });
    //  Check if the message's date matches today and replace date with Today
    let todayObj = new Date();
    let todayDate = todayObj.toLocaleString("default", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    if (todayDate === date) {
      date = "Today at";
    }

    let formattedDate = `${date} ${time}`;
    return formattedDate;
  };

  useEffect(() => {});
  return (
    <>
      {channel.messages.map((message) => {
        return (
          <div key={`message-${message.id}`}>
            {console.log(message)}
            <div className={styles.message_header}>
              <strong className={styles.message_username}>
                {message.user.username}
              </strong>
              <div>{formatDateTime(message.created_at)}</div>
            </div>
            <div>{message.message}</div>
          </div>
        );
      })}
    </>
  );
}
