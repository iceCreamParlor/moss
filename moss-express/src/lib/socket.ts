import { Socket } from "socket.io";

interface Client {
  socket: Socket;
  room: string;
}

export class SocketGateway {
  private _clients: Client[] = [];
  private static _instance: SocketGateway = new SocketGateway();

  constructor() {
    console.log("SocketGateway Created.");
  }
  /**
   * Socket 클라이언트가 접속했을 때 실행됨
   */
  public handleConnect(socket: Socket) {
    socket.on("join", (data) => this.handleJoin(socket, data));
  }
  /**
   * Socket 클라이언트가 방에 참가했을 때 실행됨
   **/
  public handleJoin(socket: Socket, data: any) {
    const room = this.getRoom(data);
    this._clients.push({ socket, room });
    socket.join(room);
    socket.to(room).emit("msgToClient", `${room}방에 접속했습니다.`);
    socket.on("msgToServer", (data) => this.handleMsgToServer(socket, data));
    socket.on("disconnect", () => this.handleDisconnect(socket));

    console.log(this._clients.length);
  }
  /**
   * Socket 클라이언트에서 서버로 메세지를 전송했을 때 실행됨
   **/
  private handleMsgToServer(socket: Socket, data: any) {
    const room = this.getRoom(data);
    socket.to(room).emit("msgToClient", data);
  }
  /**
   * Socket 클라이언트가 방을 떠날 때 실행됨
   * TODO 테스트 필요
   */
  private handleLeave(socket: Socket) {
    const client = this._clients.find((c) => c.socket.id === socket.id);
    if (!client) {
      throw new Error("Room not found");
    }
    socket.leave(client.room);
    this._clients = this._clients.filter((c) => c.socket.id !== socket.id);
  }
  /**
   * Socket client 의 접속이 끊겼을 때에 실행됨
   **/
  private handleDisconnect(socket: Socket) {
    console.log("handleDisconnect");
    this._clients = this._clients.filter((c) => c.socket.id !== socket.id);
  }
  /**
   * Socket client 에서 데이터를 전송받았을 때 실행됨
   **/
  private getRoom(data: any) {
    if (data instanceof Socket) {
      return data.data.room;
    }
    return data.room;
  }
  /**
   * Singleton getter
   * */
  public static get instance() {
    return this._instance;
  }
}
