import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"
import { Categories } from "src/entities/category"

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    productName: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    weight: number

    @IsNotEmpty()
    @IsString()
    colour: string

    @IsOptional()
    @IsString()
    image: string

    @IsOptional()
    @IsString()
    material: string

    @IsOptional()
    @IsString()
    dimentions: string

    @IsNotEmpty()
    @IsString()
    manufacturer :string

    @IsNotEmpty()
    @IsNumber()
    avgRatings: number

    @IsNotEmpty()
    @IsString()
    categoryId: Categories

}
