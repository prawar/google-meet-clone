"use client";

import { SOCKET } from "@/constant";
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
const usePeer = () => {
  const socket = useSocket();
  const [peer, setPeer] = useState<Peer>();
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const router = useRouter();
  const roomId = router.query.roomid;

  useEffect(() => {
    if (isPeerSet?.current || !roomId || !socket) return;
    isPeerSet.current = true;
    (async function initPeer() {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on(SOCKET.open, (id): any => {
        console.log(id);
        setMyId(id);
        console.log(`the peer id is ${id}`);
        socket?.emit(SOCKET.joinRoom, roomId, id);
      });
    })();
  }, [roomId, socket]);
  return {
    peer,
    myId,
  };
};

export default usePeer;
