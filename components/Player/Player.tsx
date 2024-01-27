"use client";
import React from "react";
import ReactPlayer from "react-player";

type PlayerPropType = {
  playerId: string;
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
};
export const Player = ({ playerId, url, muted, playing }: PlayerPropType) => {
  return (
    <div>
      <ReactPlayer key={playerId} url={url} muted={muted} playing={playing} />
    </div>
  );
};
