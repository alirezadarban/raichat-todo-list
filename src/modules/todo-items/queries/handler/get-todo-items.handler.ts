import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todo-item.schema';
import { GetTodoItemsQuery } from '../impl/get-todo-items.query';

@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
  constructor(
    @InjectModel(TodoItem.name) private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async execute(query: GetTodoItemsQuery): Promise<TodoItem[]> {
    const { userId } = query;
    return this.todoItemModel.find({ userId }).exec();
  }
}
