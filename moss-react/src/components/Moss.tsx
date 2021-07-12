import { socketUri } from "../Socket";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Stack } from "../lib/stack";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export const Moss = () => {
  const [room, setRoom] = useState("1");
  const [socket, setSocket] = useState(io.connect(socketUri));
  const [stack, setStack] = useState(new Stack<string>());
  const [msg, setMsg] = useState("");
  const forceUpdate = useForceUpdate();

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

  const receiveMessage = (message: any) => {
    console.log(message);
    setMsg(message.msg);
  };

  const join = () => {
    const response = socket.emit("join", { room });
    console.log(response);
  };

  const sendMessage = (e: any) => {
    const response = socket.emit(`msgToServer`, {
      room,
      msg: stack.toString(),
    });
    console.log(response);
  };

  const handleDot = (e: any) => {
    setStack(stack.push("."));
    forceUpdate();
  };

  const handleUnderscore = (e: any) => {
    setStack(stack.push("_"));
    forceUpdate();
  };

  const handleClear = () => {
    setStack(stack.clear());
    forceUpdate();
  };

  return (
    <>
      <p>Moss</p>
      <p>보낼 메세지 : {stack.toString()}</p>
      <p>받은 메세지 : {msg}</p>
      <br />
      <button onClick={sendMessage}>send</button>
      <br />
      <br />
      <button onClick={handleDot}>.</button>
      <br />
      <br />
      <button onClick={handleUnderscore}>_</button>
      <br />
      <br />
      <button onClick={handleClear}>clear</button>
    </>
  );
};
