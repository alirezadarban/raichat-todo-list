import { forwardRef, Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListsController } from './controllers/todo-lists.controller';
import { TodoListsService } from './services/todo-lists.service';
import { CreateTodoListHandler } from './commands/handler/create-todo-list.handler';
import { UpdateTodoListHandler} from './commands/handler/update-todo-list.handler'
import { GetTodoListsHandler } from './queries/handler/get-todo-lists.handler';
import { GetTodoListHandler } from './queries/handler/get-todo-list.handler';
import { DeleteTodoListHandler } from './commands/handler/delete-todo-list.handler';
import { TodoListDeletedHandler } from "./events/handlers/todo-list-deleted.handler";
import { TodoListCreatedHandler } from "./events/handlers/todo-list-created.handler";
import { UsersModule } from "../users/users.module";
import { TodoItemsModule } from "../todo-items/todo-items.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { User } from '../users/entities/user.entity'

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    forwardRef(() => TodoItemsModule),
    TypeOrmModule.forFeature([TodoList, User])
  ],
  controllers: [TodoListsController],
  providers: [
    TodoListsService,
    CreateTodoListHandler,
    UpdateTodoListHandler, 
    GetTodoListsHandler,
    GetTodoListHandler,
    DeleteTodoListHandler,
    TodoListCreatedHandler,
    TodoListDeletedHandler
  ],
  exports: [
    TodoListsService]
})
export class TodoListsModule {}