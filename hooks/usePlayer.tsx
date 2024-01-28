import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { PlayerType } from "@/types";

const usePlayer = (myId: string) => {
  const [players, setPlayers] = useState<PlayerType>({});
  const playersCopy = cloneDeep(players);
  console.log(">>>>", players);
  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];
  const nonHighlightedPlayers = playersCopy;

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
  };
};

export default usePlayer;
