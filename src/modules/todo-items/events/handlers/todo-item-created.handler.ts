import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoItemCreatedEvent } from '../impl/todo-item-created.event';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from '../../entities/todo-item.entity';
import { TodoList } from '../../../todo-lists/entities/todo-list.entity';

@EventsHandler(TodoItemCreatedEvent)
export class TodoItemCreatedHandler implements IEventHandler<TodoItemCreatedEvent> {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
  ) {}

  async handle(event: TodoItemCreatedEvent): Promise<void> {
    const { todoListId, todoItemId } = event;

    const todoList = await this.todoListRepository.findOne({
      where: { id: todoListId },
      relations: ['todoItems'],
    });

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    const todoItem = await this.todoItemRepository.findOne({ where: { id: todoItemId } });
    if (!todoItem) {
      throw new Error('Todo item not found');
    }

    if (!todoList.todoItems.some(item => item.id === todoItemId)) {
      todoList.todoItems.push(todoItem);
      await this.todoListRepository.save(todoList);
    }
  }
}
