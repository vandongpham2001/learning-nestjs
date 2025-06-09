import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RoleModule } from './role/role.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import {
  dataSourceOptions,
  dataSourceTypeOrmOptions,
} from './config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceTypeOrmOptions),
    TaskModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*any', method: RequestMethod.ALL });
  }
}
