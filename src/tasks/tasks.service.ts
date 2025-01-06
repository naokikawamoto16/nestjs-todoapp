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

  // update(id: number, updateTaskDto: UpdateTaskDto): TaskInterface {
  //   const task = this.findOne(id);
  //   if (!task) throw new Error('Task not found');
  //   task.name = updateTaskDto.name ?? task.name;
  //   task.completed = updateTaskDto.completed ?? task.completed;
  //   return task;
  // }

  remove(id: number): void {
    const task = this.findOne(id);
    if (!task) throw new Error('Task not found');
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
