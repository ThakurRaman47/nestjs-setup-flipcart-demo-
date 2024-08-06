import { Categories } from "src/entities/category"

export class CreateProductInterface {

    productName: string
    description: string
    price: number
    weight: number
    colour: string
    image?: string
    material?: string
    dimentions?: string
    manufacturer :string
    avgRatings: number
    categoryId: Categories
}