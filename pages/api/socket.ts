import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import { SOCKET } from "@/constant";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const Sockethandler = (res: NextApiResponseWithSocket, req: NextApiRequest) => {
  console.log("hereee");
  if (res?.socket?.server?.io) {
    console.log("socket already connected");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("server is connected");
      socket.on(SOCKET.joinRoom, (roomId, id) => {
        console.log(`a new user ${roomId} ${id}`);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit(SOCKET.userConnected, id);
      });
    });
  }
  res?.end();
};

export default Sockethandler;
