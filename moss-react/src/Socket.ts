
export const socketServerBaseUri = "http://localhost";
export const sockerServerPort = 3000;
export const socketUri = `${socketServerBaseUri}:${sockerServerPort}`;


export interface SocketClient {
  room: string
}