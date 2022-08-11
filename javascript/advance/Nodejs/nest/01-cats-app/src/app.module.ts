import { Module } from './common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './catscore/core.module';

@Module({
  imports: [CoreModule, CatsModule],
})
export class AppModule {}
