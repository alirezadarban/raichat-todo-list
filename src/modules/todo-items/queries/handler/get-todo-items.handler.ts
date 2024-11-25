import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTodoItemsQuery } from '../impl/get-todo-items.query';
import { TodoItem } from '../../entities/todo-item.entity';

@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async execute(query: GetTodoItemsQuery): Promise<TodoItem[]> {
    const { todoListId } = query;
    return await this.todoItemRepository.find(
      { 
        where: {
          todoList: { id: todoListId },
        } 
      });
  }
}
