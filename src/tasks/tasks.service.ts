import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task as TaskInterface } from './interface/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

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

  findAll(): TaskInterface[] {
    if (!this.tasks) throw new Error('Tasks not found');
    return this.tasks;
  }

  findOne(id: number): TaskInterface {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): TaskInterface {
    const task = this.findOne(id);
    if (!task) throw new Error('Task not found');
    task.name = updateTaskDto.name ?? task.name;
    task.completed = updateTaskDto.completed ?? task.completed;
    return task;
  }

  remove(id: number): void {
    const task = this.findOne(id);
    if (!task) throw new Error('Task not found');
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
