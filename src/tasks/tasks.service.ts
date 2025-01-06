import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        completed: false,
      },
    });
  }

  findAll(tasksFilterDto?: TasksFilterDto): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: tasksFilterDto ? { ...tasksFilterDto } : {},
    });
  }

  findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
