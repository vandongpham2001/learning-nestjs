import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { TaskResponseDto } from './dto/response/task-response.dto';
import { FilterTaskDto } from './dto/request/filter-task.dto';
import { PageResponse } from '../common/dto/response/page-response.dto';
import { resolvePaginationParams } from 'src/common/utils/pagination.util';
import { TaskNotFoundException } from 'src/common/filters/task-not-found.exception';
import { WinstonLogger } from 'src/common/logger/winstion-config.logger';

@Injectable()
export class TaskService {
  private readonly logger = new WinstonLogger();

  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(request: CreateTaskDto): Promise<TaskResponseDto> {
    const entity = await this.taskRepository.save(request);
    return this.toResponseDto(entity);
  }

  async findAll(filter: FilterTaskDto): Promise<PageResponse<TaskResponseDto>> {
    const { title, status } = filter;
    const { page, limit, sortBy, sortOrder } = resolvePaginationParams(filter);

    const where: FindOptionsWhere<TaskEntity> = {};

    if (title) where.title = Like(`%${title}%`);
    if (status) where.status = status;

    const [entities, total] = await this.taskRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { [sortBy]: sortOrder },
    });

    const list = entities.map(this.toResponseDto);

    return new PageResponse<TaskResponseDto>({
      list,
      total,
      page,
      limit,
    });

    // const entities = await this.taskRepository.find();
    // return entities.map(this.toResponseDto);
  }

  async findOne(id: number): Promise<TaskResponseDto> {
    const entity = await this.taskRepository.findOneBy({ id });
    if (!entity) {
      this.logger.error(`Task with ID: ${id} not exist`);
      throw new TaskNotFoundException();
    }
    return this.toResponseDto(entity);
  }

  async update(update: UpdateTaskDto): Promise<TaskResponseDto> {
    const entity = await this.taskRepository.save(update);
    if (!entity) throw new TaskNotFoundException();
    return this.toResponseDto(entity);
  }

  async delete(id: number) {
    await this.taskRepository.delete(id);
  }

  private toResponseDto(entity: TaskEntity): TaskResponseDto {
    const { id, title, description, status } = entity;
    return { id, title, description, status };
  }
}
