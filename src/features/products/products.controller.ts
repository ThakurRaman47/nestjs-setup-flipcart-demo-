import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from '../../common/dto/product/update.product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';
import { CreateProductDto } from 'src/common/dto/product/create.product.dto';
import { Request, Response } from 'express';
import { ApiQuery } from '@nestjs/swagger';
const response = require('../../common/helpers/response')

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 1, ttl: 60 } })
  @Post('/create')
  async addProduct(@Body() body: CreateProductDto, @Req() req: Request, @Res() res: Response) {
    try {
      await this.productsService.addProduct(body)
      return response.successResponse(res, 'Producr added succcessfully',HttpStatus.CREATED)
    }
    catch(err) {
      console.log(err)
      return response.internalServerError(res,'Internal Server Error !', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 1, ttl: 60 } })
  @ApiQuery({name: 'id', required: true, type: 'string'})
  async getProductById(@Query() query, @Req() req : Request, @Res() res: Response) {
    try {
      const { id } = query;
      const productDetails = await this.productsService.findById(id)
      return response.successResponseWithData(res, 'Product Details', HttpStatus.OK, productDetails)
    }
    catch(error) {
      console.log(error)
      return response.internalServerError(res,'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
