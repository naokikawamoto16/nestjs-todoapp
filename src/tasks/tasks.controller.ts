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
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): TaskInterface {
  //   let task: TaskInterface;
  //   try {
  //     task = this.tasksService.update(+id, updateTaskDto);
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  //   return task;
  // }

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
