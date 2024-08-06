import { Inject, Injectable } from '@nestjs/common';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { createUser } from 'src/common/interfaces/user/create.user.interface';
import * as bcrypt from 'bcrypt';
import { updateUser } from 'src/common/interfaces/user/update.user.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  secret:string
  salt:string
  constructor(
    private readonly jwtService:JwtService,
    private readonly configService:ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
    try {
      let hash = await bcrypt.hash(payload.password,parseInt(this.salt))
      payload['password'] = hash;
      const createUser =  await this.usersRepository.signUpUser(payload)
      let token = await this.jwtService.signAsync(createUser)
      return {...createUser, token}
    }
    catch(err) {
      throw err
    }
    
  }

  async verifyUser(payload:any) {
    return await this.usersRepository.getUserById(payload.id)
  }

  async login(email: string, password: string) {
    let getUser:User = await this.usersRepository.checkUserByEmail(email)
    if(getUser) {
      let originalPassword:boolean = bcrypt.compare(password, getUser.password)
      if(originalPassword) {
        let obj = {} 
        Object.assign(obj,getUser)
        let token:string = await this.jwtService.signAsync(obj)
        await this.cacheManager.set(`user_${getUser.id}`, getUser, 5000000000);
        return { ...getUser, token }
      }
    }
    return
  }

  async getUserById(id:string): Promise<User> { 
    let value:User = await this.cacheManager.get(`user_${id}`) ??  await this.usersRepository.getUserById(id)
    return value 
  }

  async updateUserWithCondition(condition:any,payload:updateUser) {
    return await this.usersRepository.updateUserWithCondition(condition,payload)
  }
  
}
