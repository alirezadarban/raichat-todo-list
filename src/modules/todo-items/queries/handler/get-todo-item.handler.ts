import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTodoItemQuery } from '../impl/get-todo-item.query';
import { TodoItem } from '../../entities/todo-item.entity';

@QueryHandler(GetTodoItemQuery)
export class GetTodoItemHandler implements IQueryHandler<GetTodoItemQuery> {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async execute(query: GetTodoItemQuery): Promise<TodoItem> {
    const { id } = query;
    return await this.todoItemRepository.findOneByOrFail({ id: id });
  }
}
