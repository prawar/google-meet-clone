"use client";

import { useEffect, useRef, useState } from "react";
const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet?.current) return;
    isPeerSet.current = true;
    (async function initPeer() {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on("open", (id): any => {
        console.log(id);
        setMyId(id);
        console.log(`the peer id is ${id}`);
      });
    })();
  }, []);
  return {
    peer,
    myId,
  };
};

export default usePeer;
