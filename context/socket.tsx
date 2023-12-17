import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket;
}
export const SocketProvider = (props: any) => {
  const { children } = props;
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const connection = io();
    setSocket(connection);
    console.log(connection)
  }, []);

  socket?.on('connect_error', async (err: any)=>{
    console.log("error in connection", err);
    await fetch('/api/socket');
  })

  return (
      <SocketContext.Provider value = {socket}>
      {children}
      </SocketContext.Provider>
  );
};
