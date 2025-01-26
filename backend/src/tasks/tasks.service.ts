import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const { name } = createTaskDto;
    return this.prisma.task.create({
      data: {
        name,
        completed: false,
        userId,
      },
    });
  }

  findAll(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: number, id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: {
        userId,
        id,
      },
    });
  }

  update(
    userId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: {
        userId,
        id,
      },
      data: updateTaskDto,
    });
  }

  async remove(userId: number, id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        userId,
        id,
      },
    });
  }
}
