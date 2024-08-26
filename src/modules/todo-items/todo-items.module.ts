import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoItemsController } from './controllers/todo-items.controller';
import { TodoItemsService } from './services/todo-items.service';
import { TodoItem, TodoItemSchema } from './schemas/todo-item.schema';
import { CreateTodoItemHandler } from './commands/handler/create-todo-item.handler';
import { UpdateTodoItemHandler} from './commands/handler/update-todo-item.handler'
import { GetTodoItemsHandler } from './queries/handler/get-todo-items.handler';
import { GetTodoItemHandler } from './queries/handler/get-todo-item.handler';
import { DeleteTodoItemHandler } from './commands/handler/delete-todo-item.handler';
import { TodoListsModule } from "../todo-lists/todo-lists.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }]),
    CqrsModule,
    TodoListsModule
  ],
  controllers: [TodoItemsController],
  providers: [
    TodoItemsService,
    // TodoItemRepository,
    CreateTodoItemHandler,
    UpdateTodoItemHandler,
    GetTodoItemsHandler,
    GetTodoItemHandler,
    DeleteTodoItemHandler
  ],
})
export class TodoItemsModule {}