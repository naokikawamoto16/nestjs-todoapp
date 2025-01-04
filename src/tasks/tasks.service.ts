import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interface/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2', completed: false },
  ];

  create(createTaskDto: CreateTaskDto) {
    const id = this.tasks.length + 1;
    const task: Task = {
      id,
      name: createTaskDto.name,
      completed: false,
    };
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }
}
