import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { TaskEntity } from 'src/task/entities/task.entity';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT', '5432'), 5432),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: false,
  entities: [UserEntity, RoleEntity, TaskEntity],
  // migrations: ['src/migrations/*-migration.ts'],
};

export const dataSourceTypeOrmOptions: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  autoLoadEntities: true,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
