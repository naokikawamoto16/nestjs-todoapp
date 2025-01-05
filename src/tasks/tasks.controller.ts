import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './interface/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(): Task[] {
    let tasks: Task[];
    try {
      tasks = this.tasksService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return tasks;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    let task: Task;
    try {
      task = this.tasksService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return task;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    let task: Task;
    try {
      task = this.tasksService.update(+id, updateTaskDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    try {
      this.tasksService.remove(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
