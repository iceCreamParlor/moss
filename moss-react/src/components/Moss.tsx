import { socketUri } from "../Socket";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export const Moss = () => {
  const [room, setRoom] = useState("1");
  const [socket, setSocket] = useState(io.connect(socketUri));

  useEffect(() => {
    console.log("useEffect");
    // socket.on(`${room}.msgToClient`, receiveMessage);
    socket.on("connect", () => {
      console.log("connected");
      const response = join();
      console.log(response);
    });
    socket.on(`msgToClient`, receiveMessage);
  }, []);

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
