"use client";
import Player from "@/components/Player";
import { SOCKET } from "@/constant";
import { useSocket } from "@/context/socket";
import { useMediaStream } from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import React, { useEffect } from "react";

const Room = () => {
  const socket: any = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { player, setPlayer } = usePlayer();

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: string) => {
      console.log(`user connected in room with user id ${newUser}`);
      const call = peer?.call(newUser, stream);
      console.log("call object", call);
      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from-- ${newUser}`);
        setPlayer((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    };
    socket?.on(SOCKET.userConnected, handleUserConnected);

    return () => {
      socket.off(SOCKET.userConnected, handleUserConnected);
    };
  }, [peer, socket, stream]);

  useEffect(() => {
    if (!peer) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream); //answering the call and sending my on stream;
      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayer((prev) => ({
          ...prev,
          [callerId]: {
            url: stream,
            muted: false,
            playing: true,
          },
        }));
      });
    });
  }, [peer, setPlayer, stream]);

  useEffect(() => {
    if (!stream || myId) return;
    console.log("setting my stream");
    setPlayer((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayer, stream]);
  return (
    <div>
      {Object.keys(player).map((playerId) => {
        const { url, playing, muted } = player[playerId];
        return (
          <Player
            key={playerId}
            url={url}
            muted={true}
            playerId={myId}
            playing={playing}
          />
        );
      })}
    </div>
  );
};

export default Room;
