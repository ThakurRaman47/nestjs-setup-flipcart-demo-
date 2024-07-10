import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
      return await this.userService.validateUser({username, pass});
    }
}
