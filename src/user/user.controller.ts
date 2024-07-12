import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpCode, HttpStatus, UseGuards, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/user/create.user.dto';
import {  ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserLogin } from 'src/common/dto/user/user.login.dto';
import { deleteFile, fileExists, FileUploadInterceptor } from 'src/common/helpers/upload';
import { join } from 'path';
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
      const { id } = req.user;
      const findUser = await this.userService.getUserById(id)
      if(!findUser) {
        return response.errorResponse(res,'User not found',HttpStatus.NOT_FOUND)
      }
        return response.successResponseWithData(res, 'User found successfully',HttpStatus.OK,findUser)
    }
    catch(err) {
      console.log(err)
      return response.internalServerError(res,'Internal Server Error !', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
   
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileUploadInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/update-profile-picture')
  async updateProfilePicture(@UploadedFile() file: Express.Multer.File, @Req() req:any, @Res() res:Response) {
    try{
      if(!req.file.filename) {
        return response.errorResponse(res,'file is required !',HttpStatus.BAD_REQUEST)
      }

      let updateProfilePic = await this.userService.updateUserWithCondition({id : req?.user?.id},{profilePic:req?.file?.filename})
      if(!updateProfilePic) {
        return response.errorResponse(res,'Error uploading file!',HttpStatus.BAD_REQUEST)
      }
      return response.successResponse(res,'Profile picture updated successfully',HttpStatus.OK)
    }
    catch(error) {
      console.log(error)
      return response.internalServerError(res,'Internal server error !',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileUploadInterceptor)
  @Post('remove-profile-picture')
  async removeProfilePicture(@Req() req:any, @Res() res:Response) {
    try {
      const userData = await this.userService.getUserById(req?.user?.id)
      if(userData) {
        const fullFileName = join(__dirname, '../../../uploads',userData.profilePic)
        if( fileExists(fullFileName) ) {
          deleteFile(fullFileName)
        }
        const deleteProfilePic = await this.userService.updateUserWithCondition({ id:req.user.id },{ profilePic :null})
        if(!deleteProfilePic) {
          return response.errorResponse(res,'failed to remove profile picture',HttpStatus.CONFLICT)
        }
        return response.successResponse(res,'Profile picture removed successfully',HttpStatus.OK)

      }
      else {
        return response.internalServerError(res,'User not found!',HttpStatus.NOT_FOUND)
      }
    }
    catch(error) {
      console.log(error)
      return response.internalServerError(res,'Internal server error !',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
  