import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Types } from 'mongoose';
// import { TodoListRepository } from '../repositories/todo-list.repository';
import { TodoSagaRepository } from '../repositories/todo.saga.repository';
import { CreateTodoListDto } from '../dto/create-todolist.dto';
import { CreateTodoItemDto } from '../dto/create-todoitem.dto';
import { TodoList } from '../schemas/todo-list.schema';
import { CreateTodoListCommand } from './../commands/impl/create-todo-list.command';
import { UpdateTodoListCommand } from './../commands/impl/update-todo-list.command';
import { 
  CreateTodoListInput,
  UpdateTodoListInput } from '../interfaces/todo-list.interface'

@Injectable()
export class TodoListsService {
  constructor(
    private readonly todoListRepository: TodoListRepository,
    private readonly todoSagaRepository: TodoSagaRepository,
    private readonly commandBus: CommandBus
  ) {}

  async create(todoList:CreateTodoListInput): Promise<TodoList> {
    return this.commandBus.execute(new CreateTodoListCommand(userId.toString(), title));
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<TodoList[]> {
    return this.todoListRepository.findAllByUserId(userId);
  }

  async findById(id: Types.ObjectId): Promise<TodoList> {
    const todoList = await this.todoListRepository.findById(id);
    if (!todoList) {
      throw new NotFoundException('TodoList not found');
    }
    return todoList;
  }

  async update(todoList: UpdateTodoListInput): Promise<TodoList> {
    // return this.todoListRepository.update(id, updateTodoListDto);
    return this.commandBus.execute(new UpdateTodoListCommand(todoList));
  }

  async remove(id: Types.ObjectId): Promise<any> {
    return this.todoListRepository.remove(id);
  }
}
