import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { GetTodoListsQuery } from '../impl/get-todo-lists.query';

@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async execute(query: GetTodoListsQuery): Promise<TodoList[]> {
    const { userId } = query;
    return this.todoListModel.find({ userId }).exec();
  }
}
