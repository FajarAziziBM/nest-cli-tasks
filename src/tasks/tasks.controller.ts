import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException
} from '@nestjs/common';

import { CreateTaskDto } from './dtos/create-tasks.dto';
import { TasksService } from './tasks.service';

interface Task {
  title: string;
}

@Controller('tasks')
export class TasksController {
  constructor(public tasksService: TasksService) {
  }

  @Get()
  listTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body.content);
  }

  @Get('/:id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.findOne(parseInt(id));
      
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

}
