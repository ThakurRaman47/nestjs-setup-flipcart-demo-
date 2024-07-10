import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/create.user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
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
      let createUser =  this.userService.signUpUser(body);
      return response.successResponseWithData(res,'User created successfully',HttpStatus.CREATED,createUser)

    }
    catch(err) {
      console.log(err)
      return response.internalServerError(res,'Internal Server Error !', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @UseGuards(JwtAuthGuard)
  @Post('/login')
  @ApiQuery({name : 'email',type: 'string',required: true})
  @ApiQuery({name : 'password',type: 'string',required: true})
  async login(@Query() query: UserLogin , @Req() req:Request, @Res() res:Response) {
    try {
      

    }
    catch(err) {
      return response.internalServerError(res,'Internal Server Errpr !', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

}
