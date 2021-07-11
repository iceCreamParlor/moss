import { Socket } from "socket.io";

export class MossGateway {
  private _clients: Socket[] = [];
  constructor(socket: Socket) {
    console.log("a user connected");
    socket.on("disconnect", this.handleDisconnect);
  }

  private handleDisconnect() {
    console.log("handleDisconnect");
  }
  private handleJoin(client: Socket, data: any) {
    const { room } = data;
    this._clients.push(client);
    client.emit(`${room}.msgToClient`, `${room}방에 접속했습니다.`);
  }
}
