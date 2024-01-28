"use client";
import Player from "@/components/Player";
import { SOCKET } from "@/constant";
import { useSocket } from "@/context/socket";
import { useMediaStream } from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import React, { useEffect } from "react";
import s from "@/styles/Room.module.scss";

const Room = () => {
  const socket: any = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { players, setPlayers, playerHighlighted, nonHighlightedPlayers } =
    usePlayer(myId);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: string) => {
      // console.log(`user connected in room with user id ${newUser}`);
      const call = peer?.call(newUser, stream);
      // console.log("call object", call);
      call.on("stream", (incomingStream) => {
        // console.log(`incoming stream from-- ${newUser}`);
        setPlayers((prev) => ({
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
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: stream,
            muted: false,
            playing: true,
          },
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    // console.log("setting my stream");
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);
  return (
    <div className={s.root}>
      <div className={s.activePlayerContainer}>
        {playerHighlighted && (
          <Player
            url={playerHighlighted?.url}
            muted={playerHighlighted?.muted}
            playing={playerHighlighted?.playing}
            isActive={true}
          />
        )}
      </div>
      <div className={s.inactivePlayerContainer}>
        {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, playing, muted } = nonHighlightedPlayers[playerId];
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
    </div>
  );
};

export default Room;
