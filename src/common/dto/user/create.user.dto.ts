import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../../interfaces/user/address.interface";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example :"raman",required:true})
    @IsNotEmpty()
    @IsString()
    firstName:string

    @ApiProperty({example :"thakur",required:true})
    @IsNotEmpty()
    @IsString()
    lastName:string

    @ApiProperty({example :"abc@gmail.com",required:true})
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty({example :"123456",required:true})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({required:true, type: []})
    address:Address[]

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    country : string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    gender : string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    dob : Date

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    profilePic:string
}
