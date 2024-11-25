import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTodoListQuery } from '../impl/get-todo-list.query';
import { TodoList } from '../../entities/todo-list.entity';

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler implements IQueryHandler<GetTodoListQuery> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
  ) {}

  async execute(query: GetTodoListQuery): Promise<TodoList> {
    const { id } = query;
    return await this.todoListRepository.findOneByOrFail({ id: id });
  }
}
