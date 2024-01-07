"use client";
import { useEffect, useRef, useState } from "react";

export const useMediaStream = () => {
  const [state, setState] = useState<MediaStream>();
  const isStreamSet = useRef(false);
  async function initStream() {
    console.log("infunction");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setState(stream);
      console.log("set your stream");
      isStreamSet.current = true;
    } catch (e) {
      console.log("error", e);
    }
  }
  useEffect(() => {
    if (isStreamSet?.current) return;
    initStream();
  }, []);

  return {
    stream: state,
  };
};
