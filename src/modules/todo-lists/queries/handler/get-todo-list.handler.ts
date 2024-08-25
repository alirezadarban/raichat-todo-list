import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from '../impl/get-todo-lists.query';
import { TodoListRepository } from '../../repositories/todo-list.repository';
import { Types } from 'mongoose';

@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(query: GetTodoListsQuery) {
    const { userId } = query;
    return this.todoListRepository.findAllByUserId(new Types.ObjectId(userId));
  }
}