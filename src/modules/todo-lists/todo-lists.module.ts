import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListsController } from './controllers/todo-lists.controller';
import { TodoListsService } from './services/todo-lists.service';
import { TodoList, TodoListSchema } from './schemas/todo-list.schema';
import { CreateTodoListHandler } from './commands/handler/create-todo-list.handler';
import { UpdateTodoListHandler} from './commands/handler/update-todo-list.handler'
import { GetTodoListsHandler } from './queries/handler/get-todo-lists.handler';
import { GetTodoListHandler } from './queries/handler/get-todo-list.handler';
import { DeleteTodoListHandler } from './commands/handler/delete-todo-list.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }]),
    CqrsModule,
  ],
  controllers: [TodoListsController],
  providers: [
    TodoListsService,
    // TodoListRepository, 
    CreateTodoListHandler,
    UpdateTodoListHandler, 
    GetTodoListsHandler,
    GetTodoListHandler,
    DeleteTodoListHandler
  ],
  exports: [TodoListsService],
})
export class TodoListsModule {}