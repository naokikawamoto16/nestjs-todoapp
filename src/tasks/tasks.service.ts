import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interface/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2', completed: false },
  ];

  create(createTaskDto: CreateTaskDto): Task {
    const id = this.tasks.length + 1;
    const task: Task = {
      id,
      name: createTaskDto.name,
      completed: false,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.tasks.find((task) => task.id === id);
  }
}
