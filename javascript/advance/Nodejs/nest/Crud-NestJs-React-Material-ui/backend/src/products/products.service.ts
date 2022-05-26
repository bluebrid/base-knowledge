import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
 

@Injectable()
export class ProductsService {
    constructor (
        @InjectModel('Products') private readonly productModel: Model<Product>
    ) {}

    async addProduct(createProduct: CreateProductDTO): Promise<Product> {
        const newProduct = await this.productModel(createProduct);
        return newProduct.save()
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products;
    }

    async getProduct(productID): Promise<Product> {
        const product = await this.productModel.findById(productID).exec();
        return product;
    }

    async editProduct(productID: any, createProduct: CreateProductDTO): Promise<Product> {
        const editProduct = await this.productModel.findByIdAndUpdate(productID, createProduct, { new: true });
        return editProduct;
    }

    async deleteProduct(productID: any): Promise<any> {
        const deleteProduct = await this.productModel.findByIdAndRemove(productID);
        return deleteProduct
    }
}
