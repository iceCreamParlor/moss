import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MossGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {
    console.log(`Constructed`);
  }
  private webSocketClients: Socket[] = [];
  @WebSocketServer() server: Server;

  @SubscribeMessage('join')
  connectSomeone(@MessageBody() data, @ConnectedSocket() client) {
    console.log(data);
    const { room } = data;
    client.emit(`${room}.msgToClient`, `${room}방에 접속했습니다.`);
    this.webSocketClients.push(client);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): string {
    const { room } = data;
    this.broadcast(`${room}.msgToClient`, client, data);
    return data;
  }

  private broadcast(event, client, message: any) {
    for (const c of this.webSocketClients) {
      if (client.id == c.id) {
        continue;
      }
      c.emit(event, message);
    }
  }

  afterInit(server: Server) {
    console.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client Connected : ${client.id}`);
  }
}
