import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todo-item.schema';
import { GetTodoItemQuery } from '../impl/get-todo-item.query';
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetTodoItemQuery)
export class GetTodoItemHandler implements IQueryHandler<GetTodoItemQuery> {
  constructor(
    @InjectModel(TodoItem.name) private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async execute(query: GetTodoItemQuery): Promise<TodoItem> {
    const { id } = query;
    const todoItem = await this.todoItemModel.findById(id).exec();
    if (!todoItem){
      throw new NotFoundException('Todo not found');
    }
    return todoItem;
  }
}
