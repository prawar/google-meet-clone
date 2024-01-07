import { useSocket } from "@/context/socket";
import { useMediaStream } from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import React, { useEffect } from "react";

const Room = () => {
  const socket: any = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket?.id);
    });
  }, []);
  return <div>Room</div>;
};

export default Room;
