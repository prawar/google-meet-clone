export type PlayerType = {
  [myId: string]: {
    url: string | MediaStream | undefined;
    muted: boolean;
    playing: true;
  };
};
