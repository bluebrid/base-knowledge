import { Module } from './common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './catscore/core.module';

// Module 只支持如下四种Meta
// export const MODULE_METADATA = {
//   IMPORTS: 'imports',
//   PROVIDERS: 'providers',
//   CONTROLLERS: 'controllers',
//   EXPORTS: 'exports',
// };
@Module({
  imports: [CoreModule, CatsModule],
})
export class AppModule {}
// const imports = Reflect.getMetadata('imports', AppModule)
 
// export const appModule = AppModule;
