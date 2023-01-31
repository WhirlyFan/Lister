import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Channels({ setMessages }) {
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel.channels);

  return (
    <>
      {channels.map((channel) => {
        if (channel.users.length < 2) {
          channel.name = channel.users[0].username; //this code should never run if channels are properly getting deleted
        } else if (channel.users.length === 2) {
          const other_user = channel.users.find((channel_member) => {
            return channel_member.id !== user.id;
          });
          channel.name = other_user.username;
        } else {
          channel.name = `${channel.users[0].username} and ${
            channel.users.length - 1
          } others`;
        }
        return (
          <div
            key={`channel-${channel.id}`}
            onClick={() => {
              setMessages(channel.messages);
            }}
          >
            {channel.name ? channel.name : "general"}
          </div>
        );
      })}
    </>
  );
}
