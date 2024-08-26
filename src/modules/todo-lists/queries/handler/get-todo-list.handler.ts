import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { GetTodoListQuery } from '../impl/get-todo-list.query';
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler implements IQueryHandler<GetTodoListQuery> {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async execute(query: GetTodoListQuery): Promise<TodoList> {
    const { id } = query;
    const todoList = await this.todoListModel.findById(id).exec();
    if (!todoList){
      throw new Error('Todo not found');
    }
    return todoList;
  }
}
