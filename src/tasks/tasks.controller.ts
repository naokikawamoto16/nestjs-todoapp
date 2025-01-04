import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './interface/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    let task: Task;
    try {
      task = this.tasksService.findOne(Number(id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return task;
  }
}
