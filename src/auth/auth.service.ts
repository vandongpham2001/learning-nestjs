import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/request/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(request.password, 10);
    request.password = hashedPassword;
    return this.userService.create(request);
  }

  async validateUser(request: RegisterUserDto): Promise<any> {
    const user = await this.userService.findByEmail(request.email);
    if (user && (await bcrypt.compare(request.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
