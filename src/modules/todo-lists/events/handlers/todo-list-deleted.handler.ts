import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoListDeletedEvent } from '../impl/todo-list-deleted.event';
import { TodoList } from '../../entities/todo-list.entity';
import { User } from '../../../users/entities/user.entity';

@EventsHandler(TodoListDeletedEvent)
export class TodoListDeletedHandler implements IEventHandler<TodoListDeletedEvent> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handle(event: TodoListDeletedEvent): Promise<void> {
    const { todoListId, userId } = event;

    const user = await this.userRepository.findOne({
      where: { id: todoListId },
      relations: ['todoLists'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const todoListIndex = user.todoLists.findIndex((item) => item.id === todoListId);
    if (todoListIndex !== -1) {
      user.todoLists.splice(todoListIndex, 1);
      await this.todoListRepository.save(user);
    } else {
      throw new Error('Todo item not found in the list');
    }

    await this.todoListRepository.delete(todoListId);
  }
}
