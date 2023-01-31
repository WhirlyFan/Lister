import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Messages({ messages }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //   const getUser = useSelector((state) => state.user.users))

  useEffect(() => {});
  return (
    <>
      {messages.map((message) => {
        return (
          <div key={`message-${message.id}`}>
            {console.log(message)}
            <strong>{message.user.username}</strong>
            <div>{message.message}</div>
          </div>
        );
      })}
    </>
  );
}
