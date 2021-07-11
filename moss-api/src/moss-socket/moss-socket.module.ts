import { Module } from '@nestjs/common';
import { MossGateway } from './moss.gateway';

@Module({
  providers: [MossGateway],
})
export class MossSocketModule {}
