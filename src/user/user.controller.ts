import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/create.user.dto';
import {  ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserLogin } from 'src/common/dto/user.login.dto';
const response = require('../common/helpers/response')


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  async userSignUp(@Body() body: CreateUserDto, @Req() req:Request, @Res() res:Response) {
    try {
      const { email } = body;
      let checkUser = await this.userService.checkUserByEmail(email)
      if(checkUser) {
        return await response.errorResponse(res,"User already exists",HttpStatus.BAD_REQUEST)
      }
      let createUser = await this.userService.signUpUser(body);
      if(!createUser) {
        return response.errorResponse(res,'Failed to create user',HttpStatus.CONFLICT)
      }
      return response.successResponseWithData(res,'User created successfully',HttpStatus.CREATED,createUser)

    }
    catch(err) {
      console.log(err)
      return response.internalServerError(res,'Internal Server Error !', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Post('/login')
  @ApiQuery({name : 'email',type: 'string',required: true})
  @ApiQuery({name : 'password',type: 'string',required: true})
  async login(@Query() query: UserLogin , @Req() req:Request, @Res() res:Response) {
    try {
      const { email, password } = query;
      const findUser = await this.userService.login(email, password)
      if(!findUser) {
        return response.errorResponse(res,'User not found',HttpStatus.NOT_FOUND)
      }
      return response.successResponseWithData(res,'User found successfully',HttpStatus.OK,findUser)

    }
    catch(err) {
      console.log(err)
      return response.internalServerError(res,'Internal Server Error !', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-user-details')
  async getUserDetails(@Req() req, @Res() res:Response) {
    try {
      console.log(req.user,"token details ========>>>>")
      const { id } = req.user;
      const findUser = await this.userService.getUserById(id)
      if(!findUser) {
        return response.errorResponse(res,'User not found',HttpStatus.NOT_FOUND)
      }
      return response.successResponseWithData(res,'User found successfully',HttpStatus.OK,findUser)
    }
    catch(err) {
      console.log(err)
      return response.internalServerError(res,'Internal Server Error !', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
