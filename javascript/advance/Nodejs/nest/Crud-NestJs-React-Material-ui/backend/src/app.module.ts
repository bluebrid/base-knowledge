import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost/nest-blog-project', { useNewUrlParser: true }),
    // MongooseModule.forRoot('mongodb+srv://nene:nenelobo@cluster0-ynzrr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
