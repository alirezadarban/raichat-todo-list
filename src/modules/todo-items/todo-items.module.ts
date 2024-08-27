import { forwardRef, Module } from "@nestjs/common";
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
import { TodoItemCreatedHandler } from './events/handlers/todo-item-created.handler';
import { TodoItemDeletedHandler } from './events/handlers/todo-item-deleted.handler';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }]),
    CqrsModule,
    forwardRef(() => TodoListsModule)
  ],
  controllers: [TodoItemsController],
  providers: [
    TodoItemsService,
    CreateTodoItemHandler,
    UpdateTodoItemHandler,
    GetTodoItemsHandler,
    GetTodoItemHandler,
    DeleteTodoItemHandler,
    TodoItemCreatedHandler,
    TodoItemDeletedHandler,
  ],
  exports: [MongooseModule],
})
export class TodoItemsModule {}