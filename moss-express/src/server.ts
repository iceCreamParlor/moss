import { MossApp } from "./app";
import { SocketGateway } from "./lib/socket";

const { express, socketIo } = MossApp.create();

const port = process.env.PORT || 3000;

const server = express.listen(port, () =>
  console.log(`App started on port ${port}`)
);

socketIo.listen(server);

socketIo.on("connection", (socket) => {
  SocketGateway.instance.handleConnect(socket);
});
