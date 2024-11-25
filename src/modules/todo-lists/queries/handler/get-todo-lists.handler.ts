import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTodoListsQuery } from '../impl/get-todo-lists.query';
import { TodoList } from '../../entities/todo-list.entity';

@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
  ) {}

  async execute(query: GetTodoListsQuery): Promise<TodoList[]> {
    const { userId } = query;
    return await this.todoListRepository.find(
      { 
        where: {
          user: { id: userId },
        } 
      });
  }
}
