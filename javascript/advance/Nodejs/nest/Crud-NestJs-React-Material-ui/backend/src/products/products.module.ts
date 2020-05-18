import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/produc.schema';
import { ProductsController } from './products.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Products',
      schema: ProductSchema
    }])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
