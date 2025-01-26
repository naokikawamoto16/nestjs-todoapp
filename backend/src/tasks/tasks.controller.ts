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
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: any,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const userId = req.user.id;
    return this.tasksService.create(userId, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any): Promise<Task[]> {
    const userId = req.user.id;
    return this.tasksService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string): Promise<Task> {
    const userId = req.user.id;
    const task = await this.tasksService.findOne(userId, +id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const userId = req.user.id;
    return this.tasksService.update(userId, +id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Request() req: any, @Param('id') id: string): Promise<void> {
    const userId = req.user.id;
    await this.tasksService.remove(userId, +id);
  }
}
