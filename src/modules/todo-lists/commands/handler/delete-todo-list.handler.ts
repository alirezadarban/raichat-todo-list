import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteTodoListCommand } from '../impl/delete-todo-list.command';
import { TodoListDeletedEvent } from '../../events/impl/todo-list-deleted.event';
import { TodoList } from '../../entities/todo-list.entity';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteTodoListCommand): Promise<void> {
    const { id, userId } = command;

    const todoList = await this.todoListRepository.findOne({
      where: { id },
      relations: ['todoItems', 'user'],
    });

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    if (todoList.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    await this.todoListRepository.remove(todoList);

    this.eventBus.publish(new TodoListDeletedEvent(todoList.id, userId));
  }
}
