import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from '../impl/todo-list-created.event';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from '../../../todo-lists/entities/todo-list.entity';
import { User } from '../../../users/entities/user.entity'

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedHandler implements IEventHandler<TodoListCreatedEvent> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,

    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async handle(event: TodoListCreatedEvent): Promise<void> {
    const { todoListId, userId } = event;

    const user = await this.UserRepository.findOne({
      where: { id: userId },
      relations: ['todoLists'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const todoList = await this.todoListRepository.findOne({ where: { id: userId } });
    if (!todoList) {
      throw new Error('Todo List not found');
    }

    if (!user.todoLists.some(item => item.id === todoListId)) {
      user.todoLists.push(todoList);
      await this.UserRepository.save(user);
    }
  }
}
