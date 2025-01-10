import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';
import { TasksFilterDto } from './dto/tasks-filter.dto';

const taskWithSubtasks = Prisma.validator<Prisma.TaskDefaultArgs>()({
  include: { subtasks: true },
});
export type TaskWithSubtasks = Prisma.TaskGetPayload<typeof taskWithSubtasks>;

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, parentTaskId } = createTaskDto;
    return this.prisma.task.create({
      data: {
        name,
        completed: false,
        userId,
        parentTaskId,
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

  findOne(userId: number, id: number): Promise<TaskWithSubtasks | null> {
    return this.prisma.task.findUnique({
      where: {
        userId,
        id,
      },
      include: { subtasks: true },
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
