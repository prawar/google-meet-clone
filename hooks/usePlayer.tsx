import React, { useState } from "react";

const usePlayer = () => {
  const [player, setPlayer] = useState({});
  return {
    player,
    setPlayer,
  };
};

export default usePlayer;
