"use client";
import React from "react";
import s from "./Player.module.scss";
import ReactPlayer from "react-player";
import cn from "classnames";

type PlayerPropType = {
  playerId?: string;
  url: string | MediaStream | undefined;
  muted: boolean;
  playing: boolean;
  isActive?: boolean;
};
export const Player = ({
  playerId,
  url,
  muted,
  playing,
  isActive = false,
}: PlayerPropType) => {
  console.log(">>>>", isActive);

  return (
    <div
      className={cn(s.playerContainer, {
        [s.active]: isActive,
        [s.notActive]: !isActive,
      })}
    >
      <ReactPlayer
        key={playerId}
        url={url}
        muted={true}
        playing={playing}
        width="100%"
        height="100%"
      />
    </div>
  );
};
