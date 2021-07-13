import express from "express";
import socketIo from "socket.io";
import http from "http";

export class MossApp {
  private static _application: express.Application;
  private static _socketIo: socketIo.Server;

  static create() {
    if (this._application !== undefined || this._socketIo !== undefined) {
      throw new Error("invalid application state");
    }
    this._application = express();

    const server = http.createServer(this._application);
    this._socketIo = new socketIo.Server(server, {
      cors: {
        origin: "*",
      },
      transports: ["websocket"],
    });

    return {
      express: this._application,
      socketIo: this._socketIo,
    };
  }

  public static get application() {
    return this._application;
  }
  public static get socketIo() {
    return this._socketIo;
  }
}
