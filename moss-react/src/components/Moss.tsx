import { socketUri } from "../Socket";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export const Moss = () => {
  const [room, setRoom] = useState("1");

  useEffect(() => {
    console.log("useEffect");
    // socket.on(`${room}.msgToClient`, receiveMessage);
    socket.on(`msgToClient`, receiveMessage);
  }, []);

  const socket = io.connect(socketUri);
  socket.on("connect", () => {
    console.log("connected");
    const response = join();
    console.log(response);
  });

  const receiveMessage = (message: string) => {
    console.log(message);
  };

  const join = () => {
    const response = socket.emit("join", { room });
    console.log(response);
  };

  const sendMessage = (e: any) => {
    const response = socket.emit(`msgToServer`, { room, msg: "test" });
    console.log(response);
  };

  return (
    <>
      <p>Moss</p>
      <button onClick={sendMessage}>tick</button>
    </>
  );
};
