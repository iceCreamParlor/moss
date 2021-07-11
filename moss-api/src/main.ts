import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

declare const module: any;

(async function () {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // app.enableCors();
  // SocketIo
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`App listening at port ${port}`);
})();
