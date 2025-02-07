import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  private async hashPassword(plainPassword): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  }

  findOne(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password }: UpdateUserDto = updateUserDto;
    let hashedPassword = undefined;
    if (password) hashedPassword = await this.hashPassword(password);
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
