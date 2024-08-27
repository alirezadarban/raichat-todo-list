import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { TodoItem } from '../schemas/todo-item.schema';
import { CreateTodoItemCommand } from "../commands/impl/create-todo-item.command";
import { UpdateTodoItemCommand } from "../commands/impl/update-todo-item.command";
import { DeleteTodoItemCommand } from "../commands/impl/delete-todo-item.command";
import { GetTodoItemsQuery } from "../queries/impl/get-todo-items.query";
import { GetTodoItemQuery } from "../queries/impl/get-todo-item.query";
import {
  CreateTodoItemInput,
  UpdateTodoItemInput,
  DeleteTodoItemInput, GetTodoItemInput
} from "../interfaces/todo-item.interface";

@Injectable()
export class TodoItemsService {
  constructor(
    // private readonly todoItemRepository: TodoItemRepository,
    // private readonly todoSagaRepository: TodoSagaRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(todoItem:CreateTodoItemInput, userId: string): Promise<TodoItem> {
    const {
      title,
      description,
      priority,
      todoListId } = todoItem;
    return this.commandBus.execute(
      new CreateTodoItemCommand(
        title,
        description,
        priority,
        todoListId,
        userId));
  }

  async findAllByUserId(userId: string): Promise<TodoItem[]> {
    return  await this.queryBus.execute(new GetTodoItemsQuery(userId));
  }

  async findById(todoItemId: GetTodoItemInput): Promise<TodoItem> {
    return await this.queryBus.execute(new GetTodoItemQuery(todoItemId.id));
  }

  async update(todoItem: UpdateTodoItemInput, userId: string): Promise<TodoItem> {
    const {
      id,
      title,
      description,
      priority} = todoItem;
    return this.commandBus.execute(new UpdateTodoItemCommand(
      id,
      title,
      description,
      priority,
      userId
    ));
  }

  async remove(todoItemId: DeleteTodoItemInput, userId: string): Promise<any> {
    return this.commandBus.execute(new DeleteTodoItemCommand(todoItemId.id, userId));
  }
}
