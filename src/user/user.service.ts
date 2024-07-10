import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { createUser } from 'src/common/interfaces/createUser.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  secret:string
  salt:string
  constructor(
    private readonly jwtService:JwtService,
    private readonly configService:ConfigService,
    @InjectRepository(UserRepository) private usersRepository: UserRepository
  ) {
    this.secret = this.configService.get<string>('JWT_SECRET');
    this.salt = this.configService.get<string>('SALT');
  }

  async validateUser(payload:any) {
    try {
      let findUser = await this.usersRepository.getUserById(payload.id)
      let token = await this.jwtService.signAsync(payload)
      return {...findUser , token};
    }
    catch(err) {
      throw new error
    }
  }

  async checkUserByEmail(email:string) {
    return await this.usersRepository.checkUserByEmail(email)
  }

  async signUpUser(payload: createUser) {
    let hash = bcrypt.hash(payload.password,this.salt)
    payload['password'] = hash;
    return await this.usersRepository.signUpUser(payload)
  }

  async verifyUser(payload:any) {
    return await this.usersRepository.getUserById(payload.id)
  }

  async login(email: string, password: string) {
    let getUser = await this.usersRepository.checkUserByEmail(email)
    if(getUser) {
      let originalPassword = bcrypt.compare(password, getUser.password)
      let findUser = await this.usersRepository
    }
    return
  }
  
}
