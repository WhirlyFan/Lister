import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelThunk } from "../../store/channel";

export default function Channels({ setChannel }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel.channels);

  const getChannel = (channelId) => {
    dispatch(getChannelThunk(channelId)).then((channel) => {
      setChannel(channel);
      console.log(channel)
    })
  };

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
            onClick={() => getChannel(channel.id)}
          >
            {channel.name ? channel.name : "general"}
          </div>
        );
      })}
    </>
  );
}
