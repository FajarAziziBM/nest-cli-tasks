import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CreateTaskDto } from './dtos/create-tasks.dto';
import { TasksService } from './tasks.service';

interface Task {
  title: string;
}

@Controller('tasks')
export class TasksController {
  taksService: TasksService;
  constructor() {
    this.taksService = new TasksService();
  }

  @Get()
  listTasks() {
    return this.taksService.findAll();
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return body;
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return `Task found with ID: ${id}`;
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: Task) {
    return `Task updated with ID: ${id}`;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return `Task deleted with ID: ${id}`;
  }
}
