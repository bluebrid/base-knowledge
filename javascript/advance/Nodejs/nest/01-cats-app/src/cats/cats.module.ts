import { Module } from '../common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
// export class CatsModule {}
export class CatsModule {
  constructor() {
    console.log('==========constructor')
  }
  onModuleInit() {
    console.log('===========onModuleInit')
  }
  onApplicationBootstrap() {
    console.log('=============onApplicationBootstrap')
  }
}