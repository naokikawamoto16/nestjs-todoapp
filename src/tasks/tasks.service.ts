import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        completed: false,
        userId,
      },
    });
  }

  findAll(userId: number, tasksFilterDto?: TasksFilterDto): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
        ...tasksFilterDto,
      },
    });
  }

  findOne(userId: number, id: number): Promise<Task | null> {
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
