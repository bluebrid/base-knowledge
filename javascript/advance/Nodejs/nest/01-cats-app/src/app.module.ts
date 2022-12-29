import { Module } from './common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './catscore/core.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './demoCore/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
// Module 只支持如下四种Meta
// export const MODULE_METADATA = {
//   IMPORTS: 'imports',
//   PROVIDERS: 'providers',
//   CONTROLLERS: 'controllers',
//   EXPORTS: 'exports',
// };
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CoreModule,
    CatsModule],
})
export class AppModule {}
// const imports = Reflect.getMetadata('imports', AppModule)
 
// export const appModule = AppModule;
