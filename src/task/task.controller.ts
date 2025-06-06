import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { TaskResponseDto } from './dto/response/task-response.dto';
import { FilterTaskDto } from './dto/request/filter-task.dto';
import { PageResponse } from '../common/dto/response/page-response.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() request: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.taskService.create(request);
  }

  @Get()
  async findAll(
    @Query() filter: FilterTaskDto,
  ): Promise<PageResponse<TaskResponseDto>> {
    return await this.taskService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    return await this.taskService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.taskService.update(task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.taskService.delete(+id);
  }
}
