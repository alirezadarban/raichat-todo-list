import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItemDeletedEvent } from '../impl/todo-item-deleted.event';
import { TodoList } from '../../../todo-lists/entities/todo-list.entity';
import { TodoItem } from '../../entities/todo-item.entity';

@EventsHandler(TodoItemDeletedEvent)
export class TodoItemDeletedHandler implements IEventHandler<TodoItemDeletedEvent> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async handle(event: TodoItemDeletedEvent): Promise<void> {
    const { todoListId, todoItemId } = event;

    const todoList = await this.todoListRepository.findOne({
      where: { id: todoListId },
      relations: ['todoItems'],
    });

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    const todoItemIndex = todoList.todoItems.findIndex((item) => item.id === todoItemId);
    if (todoItemIndex !== -1) {
      todoList.todoItems.splice(todoItemIndex, 1);
      await this.todoListRepository.save(todoList);
    } else {
      throw new Error('Todo item not found in the list');
    }

    await this.todoItemRepository.delete(todoItemId);
  }
}
