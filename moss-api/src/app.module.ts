import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MossSocketModule } from './moss-socket/moss-socket.module';

@Module({
  imports: [MossSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
