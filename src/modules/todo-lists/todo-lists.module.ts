import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListController } from './controllers/todo-lists.controller';
import { TodoListService } from './services/todo-lists.service';
// import { TodoListRepository } from './repositories/todo-list.repository';
import { TodoList, TodoListSchema } from './schemas/todo-list.schema';
import { CreateTodoListHandler } from './commands/handler/create-todo-list.handler';
import { UpdateTodoListHandler} from './commands/handler/update-todo-list.handler'
import { GetTodoListsHandler } from './queries/handler/get-todo-list.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }]),
    CqrsModule,
  ],
  controllers: [TodoListController],
  providers: [
    TodoListService, 
    // TodoListRepository, 
    CreateTodoListHandler,
    UpdateTodoListHandler, 
    GetTodoListsHandler],
})
export class TodoListsModule {}