import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: Payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
