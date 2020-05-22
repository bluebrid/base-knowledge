import { Controller, Get, Post, Res, Body, HttpStatus, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';
import { ProductsService } from './products.service'
import { CreateProductDTO } from './dto/create-product.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ) {}
    // Adiciona um
    @Post('/product') 
    async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const newProduct = await this.productsService.addProduct(createProductDTO);
        return res.status(HttpStatus.OK).json(
            {
                message: 'O produto foi enviado com sucesso!',
                product: newProduct
            }
        )
    }
    // Tudo
    @Get('products')
    async getProducts(@Res() res) {
        const products = await this.productsService.getProducts()
        return res.status(HttpStatus.OK).json(products)
    }
    // Um pelo id
    @Get('product/:productID')
    async getProduct(@Res() res, @Param('productID', new ValidateObjectId()) productID) {
        const product = await this.productsService.getProduct(productID);
        if (!product) {
            throw new NotFoundException('O produto não existe!');
        }
        return res.status(HttpStatus.OK).json(product);
    }

    @Put('/edit')
    async editProduct(@Res() res, @Query('productID', new ValidateObjectId()) productID, @Body() createProductDTO: CreateProductDTO) {
        const editedProduct = await this.productsService.editProduct(productID, createProductDTO)
        if (!editedProduct) {
            throw new NotFoundException('O produto não existe!')
        }
        return res.status(HttpStatus.OK).json(
            {
                message: 'O producto foi actualizado com sucesso!',
                product: editedProduct
            }
        )
    }   

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID', new ValidateObjectId()) productID) {
        const deleteProduct = await this.productsService.deleteProduct(productID)
        if (!deleteProduct) {
            throw new NotFoundException('O produto não existe!')
        }
        return res.status(HttpStatus.OK).json(
            {
                message: 'O produto foi apagaado com sucesso!',
                product: deleteProduct
            }
        )
    }
}
