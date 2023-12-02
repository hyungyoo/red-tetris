import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './gateways/game.gateway';

@Module({
  providers: [GameGateway, GameService],
})
export class GameModule {}
