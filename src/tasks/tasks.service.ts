import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interface/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

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
    if (!this.tasks) throw new Error('Tasks not found');
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
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
