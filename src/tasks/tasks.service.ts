import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task as TaskInterface } from './interface/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  private tasks: TaskInterface[] = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2', completed: false },
  ];

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        completed: false,
      },
    });
  }

  findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
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

  remove(id: number): void {
    this.prisma.task.delete({
      where: { id },
    });
  }
}
