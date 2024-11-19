import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from "../commands/impl/create-todo-list.command";
import { UpdateTodoListCommand } from "../commands/impl/update-todo-list.command";
import { DeleteTodoListCommand } from "../commands/impl/delete-todo-list.command";
import { GetTodoListsQuery } from "../queries/impl/get-todo-lists.query";
import { GetTodoListQuery } from "../queries/impl/get-todo-list.query";
import {
  CreateTodoListInput,
  UpdateTodoListInput,
  DeleteTodoListInput } from '../interfaces/todo-list.interface';

@Injectable()
export class TodoListsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(todoList:CreateTodoListInput): Promise<TodoList> {
    const { userId, title } = todoList;
    return this.commandBus.execute(new CreateTodoListCommand(userId.toString(), title));
  }

  async findAllByUserId(userId: string): Promise<TodoList[]> {
    // return this.todoListRepository.findAllByUserId(userId);
    return  await this.queryBus.execute(new GetTodoListsQuery(userId));
  }

  async findById(id: string): Promise<TodoList> {
    return await this.queryBus.execute(new GetTodoListQuery(id));
  }

  async update(todoList: UpdateTodoListInput): Promise<TodoList> {
    const { id , userId, title } = todoList;
    return this.commandBus.execute(new UpdateTodoListCommand(id, userId, title));
  }

  async remove(todoList: DeleteTodoListInput): Promise<any> {
    const { id , userId } = todoList;
    return this.commandBus.execute(new DeleteTodoListCommand(id, userId));
  }
}
