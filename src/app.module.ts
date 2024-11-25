import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { TodoListsModule } from './modules/todo-lists/todo-lists.module';
import { TodoItemsModule } from './modules/todo-items/todo-items.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppLoggerMiddleware } from "./middleware/logger.middleware";
import { TodoList } from './modules/todo-lists/entities/todo-list.entity';
import { TodoItem } from './modules/todo-items/entities/todo-item.entity';
import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'pass123',
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([TodoList, TodoItem, User]),
    UsersModule,
    AuthModule,
    TodoListsModule,
    TodoItemsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
