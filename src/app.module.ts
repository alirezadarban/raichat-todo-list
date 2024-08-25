import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
// import { TodoListsModule } from './todo-lists/todo-lists.module';
// import { TodoItemsModule } from './todo-items/todo-items.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo'),
    UsersModule,
    AuthModule,
    // TodoListsModule,
    // TodoItemsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
