export const socketServerBaseUri = "http://localhost";
// export const socketServerBaseUri = "http://192.168.0.2";
export const sockerServerPort = 3000;
export const socketUri = `${socketServerBaseUri}:${sockerServerPort}`;

export interface SocketClient {
  room: string;
}
